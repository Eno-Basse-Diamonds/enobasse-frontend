"use client";

import { useState, useEffect } from "react";
import { BlogPost } from "@/lib/types/blog-post";
import { BlogPostFormData } from "@/lib/validations/blog";
import { FormState } from "@/lib/api/blog-posts";
import { textToSlug } from "@/lib/utils/string";
import { useCreateBlogPost, useUpdateBlogPost } from "@/lib/hooks/use-blog";
import { useSession } from "next-auth/react";
import { AlertMessage } from "./blog-post-form/alert-message";
import { FormHeader } from "./blog-post-form/form-header";
import { FormFooter } from "./blog-post-form/form-footer";
import { FormFields } from "./blog-post-form/form-fields";
import { PreviewSection } from "./blog-post-form/preview-section";

interface BlogPostFormProps {
  blogPost: BlogPost | null;
  onClose: () => void;
}

export function BlogPostForm({ blogPost, onClose }: BlogPostFormProps) {
  const { data: session } = useSession();
  const [showPreview, setShowPreview] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: blogPost?.title || "",
    slug: blogPost?.slug || "",
    tags: blogPost?.tags || [],
    content: blogPost?.content || "",
    excerpt: blogPost?.excerpt || "",
    isPublished: blogPost?.isPublished || false,
    image: blogPost?.image || { src: "", alt: "" },
  });

  const createPostMutation = useCreateBlogPost();
  const updatePostMutation = useUpdateBlogPost();

  const handleInputChange = (field: keyof BlogPostFormData, value: string | boolean | string[]) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      if (field === "title" && typeof value === "string") {
        newData.slug = textToSlug(value);
      }
      return newData;
    });
  };

  const handleImageChange = (
    field: "src" | "alt",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      image: { ...prev.image, [field]: value },
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (blogPost) {
      updatePostMutation.mutate({ slug: blogPost.slug, formData });
    } else {
      createPostMutation.mutate({
        formData,
        author: {
          name: session?.user?.name || "",
          email: session?.user?.email || "",
        },
      });
    }
  };

  useEffect(() => {
    const mutation = blogPost ? updatePostMutation : createPostMutation;
    if (mutation.isSuccess && mutation.data?.success) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [blogPost, createPostMutation, updatePostMutation, onClose]);

  const formTitle = blogPost ? "Edit Blog Post" : "Create New Blog Post";
  const submitButtonText = blogPost ? "Update" : "Create";
  const isFormValid = Boolean(
    !createPostMutation.isPending &&
      !updatePostMutation.isPending &&
      formData.title.trim() &&
      formData.content.trim() &&
      formData.excerpt.trim() &&
      formData.image.src
  );

  const mutation = blogPost ? updatePostMutation : createPostMutation;
  const state: FormState = {
    errors: mutation.error?.message
      ? { title: [mutation.error.message] }
      : mutation.data?.errors || {},
    message: mutation.data?.message || "",
    success: mutation.isSuccess,
    post: mutation.data?.post,
  };

  return (
    <>
      <AlertMessage state={state} />

      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6 md:p-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-7xl max-h-[calc(100vh-2rem)] md:max-h-[90vh] flex flex-col shadow-2xl rounded-sm"
        >
          <FormHeader
            title={formTitle}
            showPreview={showPreview}
            onTogglePreview={() => setShowPreview(!showPreview)}
            onClose={onClose}
          />

          <div className="flex-1 flex overflow-hidden">
            <FormFields
              formData={formData}
              errors={state.errors}
              showPreview={showPreview}
              tagInput={tagInput}
              onInputChange={handleInputChange}
              onImageChange={handleImageChange}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
              onTagInputChange={setTagInput}
            />

            {showPreview && (
              <PreviewSection
                adminName={session?.user?.name || ""}
                formData={formData}
              />
            )}
          </div>

          <FormFooter
            onClose={onClose}
            isPending={mutation.isPending}
            isValid={isFormValid}
            submitButtonText={`${submitButtonText} Blog Post`}
          />
        </form>
      </div>
    </>
  );
}


