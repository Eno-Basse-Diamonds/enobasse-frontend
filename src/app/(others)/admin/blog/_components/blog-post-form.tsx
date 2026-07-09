"use client";

import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { BlogPost } from "@/lib/types/blog-post";
import { BlogPostFormData } from "@/lib/validations/blog";
import { FormState } from "@/lib/api/blog-posts";
import { textToSlug } from "@/lib/utils/string";
import { useCreateBlogPost, useUpdateBlogPost } from "@/lib/hooks/use-blog";
import { useSession } from "next-auth/react";
import { Button } from "@/components/button";
import { AlertMessage } from "./blog-post-form/alert-message";
import { FormFields } from "./blog-post-form/form-fields";
import { PreviewSection } from "./blog-post-form/preview-section";
import { AdminModal } from "../../products/_components/_elements/admin-modal";

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

  const handleInputChange = (
    field: keyof BlogPostFormData,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      if (field === "title" && typeof value === "string") {
        newData.slug = textToSlug(value);
      }
      return newData;
    });
  };

  const handleImageChange = (field: "src" | "alt", value: string) => {
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

  const formTitle = blogPost ? "Edit Blog Post" : "New Blog Post";
  const submitButtonText = blogPost ? "Update" : "Create";
  const isFormValid =
    !createPostMutation.isPending &&
    !updatePostMutation.isPending &&
    formData.title.trim() &&
    formData.content.trim() &&
    formData.excerpt.trim() &&
    formData.image.src;

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

      <AdminModal
        title={formTitle}
        onClose={onClose}
        maxWidth="max-w-7xl"
        customHeader={
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-primary-500/10 bg-gray-50 shrink-0">
            <h3 className="text-lg sm:text-xl font-semibold text-primary-500 truncate pr-2">
              {formTitle}
            </h3>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                leadingIcon={<Eye />}
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? "Hide Preview" : "Preview"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onClose}
                className="rounded-full w-8 h-8"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
          </div>
        }
        footer={
          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              loading={mutation.isPending}
              disabled={!isFormValid}
            >
              {submitButtonText} Blog Post
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="flex-1 flex overflow-hidden -mx-4 sm:-mx-6">
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
        </form>
      </AdminModal>
    </>
  );
}