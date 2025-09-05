"use client";

import { useState, useEffect } from "react";
import { Eye, X, User, Calendar } from "lucide-react";
import Markdown from "react-markdown";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { Button, Alert } from "@/components";
import { BlogPost } from "@/lib/types/blog-post";
import { BlogPostFormData } from "@/lib/validations/blog";
import { FormErrors, FormState } from "@/lib/api/blog-posts";
import { createHeadingRenderer } from "@/lib/helpers/blog-post";
import { textToSlug } from "@/lib/utils/string";
import { useCreateBlogPost, useUpdateBlogPost } from "@/lib/hooks/use-blog";
import { useSession } from "next-auth/react";

interface BlogPostFormProps {
  blogPost: BlogPost | null;
  onClose: () => void;
}

const MARKDOWN_PLACEHOLDER = `
# Your Blog Title (H1 Heading)

Start writing your content here using Markdown syntax...

## Subheading (H2)
### H3 Heading
#### H4 Heading
##### H5 Heading

**Bold text**
*Italic text*
~~Strikethrough text~~

[Link text](https://example.com)
![Image alt text](https://www.example.com/image.jpg)

- Unordered list item 1
- Unordered list item 2

1. Ordered list item 1
2. Ordered list item 2

Horizontal rule:
---
`;

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

  const handleInputChange = (field: keyof BlogPostFormData, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      if (field === "title") {
        newData.slug = textToSlug(value);
      }
      return newData;
    });
  };

  const handleImageChange = (
    field: keyof typeof formData.image,
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
        author: session?.user || { name: "", email: "" },
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

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-7xl h-full flex flex-col shadow-2xl"
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

const AlertMessage = ({ state }: { state: FormState }) => {
  if (!state.message) return null;

  return (
    <div className="fixed top-4 right-4 max-w-md w-full z-[9999]">
      <Alert
        type={state.success ? "success" : "error"}
        className="mb-6"
        dismissible
      >
        {state.message}
      </Alert>
    </div>
  );
};

interface FormHeaderProps {
  title: string;
  showPreview: boolean;
  onTogglePreview: () => void;
  onClose: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  showPreview,
  onTogglePreview,
  onClose,
}) => (
  <div className="flex items-center justify-between p-6 border-b border-primary-500/10 bg-gray-50">
    <h3 className="text-2xl font-semibold text-primary-500">{title}</h3>
    <div className="flex items-center space-x-3">
      <Button
        size="sm"
        variant="outline"
        leadingIcon={<Eye />}
        onClick={onTogglePreview}
      >
        {showPreview ? "Hide Preview" : "Show Preview"}
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="rounded-full w-8 h-8"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </Button>
    </div>
  </div>
);

const FormFields = ({
  formData,
  errors,
  showPreview,
  tagInput,
  onInputChange,
  onImageChange,
  onAddTag,
  onRemoveTag,
  onTagInputChange,
}: {
  formData: BlogPostFormData;
  errors: FormErrors;
  showPreview: boolean;
  tagInput: string;
  onInputChange: (field: keyof BlogPostFormData, value: any) => void;
  onImageChange: (field: keyof typeof formData.image, value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onTagInputChange: (value: string) => void;
}) => (
  <div
    className={`p-6 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#D1A559] ${
      showPreview ? "w-1/2 border-r border-gray-200" : "w-full"
    }`}
  >
    <div className="space-y-6">
      <FormField
        label="Blog Title *"
        name="title"
        value={formData.title}
        onChange={(e) => onInputChange("title", e.target.value)}
        placeholder="Enter an engaging blog title..."
        error={errors?.title?.[0]}
      />

      <FormField
        label="Slug *"
        name="slug"
        value={formData.slug}
        onChange={(e) => onInputChange("slug", e.target.value)}
        placeholder="blog-post-slug"
        error={errors?.slug?.[0]}
      />

      <ImageUploadField
        formData={formData}
        errors={errors}
        onImageChange={onImageChange}
      />

      <FormTextareaField
        label="Excerpt *"
        name="excerpt"
        value={formData.excerpt}
        onChange={(e) => onInputChange("excerpt", e.target.value)}
        rows={3}
        placeholder="Write a compelling excerpt that will appear in blog previews..."
        characterCount={formData.excerpt.length}
        maxCharacters={160}
        error={errors?.excerpt?.[0]}
      />

      <TagsField
        tags={formData.tags}
        tagInput={tagInput}
        onAddTag={onAddTag}
        onRemoveTag={onRemoveTag}
        onTagInputChange={onTagInputChange}
        error={errors?.tags?.[0]}
      />

      <FormTextareaField
        label="Content * (Markdown supported)"
        name="content"
        value={formData.content}
        onChange={(e) => onInputChange("content", e.target.value)}
        rows={16}
        placeholder={MARKDOWN_PLACEHOLDER}
        className="font-mono text-primary-500"
        error={errors?.content?.[0]}
      />

      <StatusField
        isPublished={formData.isPublished}
        onChange={(value) => onInputChange("isPublished", value)}
        error={errors?.isPublished?.[0]}
      />
    </div>
  </div>
);

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
}) => (
  <div className="block">
    <label className="block text-sm font-semibold text-primary-400 mb-2">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-primary-100 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

interface FormTextareaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows: number;
  error?: string;
  characterCount?: number;
  maxCharacters?: number;
  className?: string;
  helpText?: string;
}

const FormTextareaField: React.FC<FormTextareaFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows,
  error,
  characterCount,
  maxCharacters,
  className = "",
  helpText,
}) => (
  <div className="block">
    <label className="block text-sm font-semibold text-primary-400 mb-2">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`w-full p-4 border border-primary-100 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300 ${className}`}
      placeholder={placeholder}
    />
    {characterCount !== undefined && maxCharacters !== undefined && (
      <p className="text-xs text-gray-500 mt-1">
        {characterCount}/{maxCharacters} characters
      </p>
    )}
    {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const ImageUploadField = ({
  formData,
  errors,
  onImageChange,
}: {
  formData: BlogPostFormData;
  errors: FormErrors;
  onImageChange: (field: keyof typeof formData.image, value: string) => void;
}) => (
  <div className="image-upload">
    <label className="block text-sm font-semibold text-primary-400 mb-2">
      Featured Image *
    </label>
    <div className="flex flex-row gap-2 items-center">
      <CldUploadWidget
        uploadPreset="blog-posts"
        options={{
          sources: ["local", "url", "camera"],
          resourceType: "image",
          multiple: false,
          maxFiles: 1,
        }}
        onSuccess={(result: any) => {
          if (result.info) {
            onImageChange("src", result.info.secure_url);
            onImageChange("alt", formData.title || "Blog featured image");
          }
        }}
      >
        {({ open }) => (
          <Button type="button" onClick={() => open()}>
            Upload Image
          </Button>
        )}
      </CldUploadWidget>

      <input
        type="text"
        name="image.alt"
        value={formData.image.alt}
        onChange={(e) => onImageChange("alt", e.target.value)}
        className="h-10 px-3 py-2 border text-sm border-primary-100 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
        placeholder="Image alt text"
      />
    </div>
    {formData.image.src && (
      <div className="mt-3">
        <CldImage
          src={formData.image.src}
          alt={formData.image.alt || "Preview"}
          width={800}
          height={400}
          crop="fill"
          gravity="auto"
          quality="auto"
          format="avif"
          className="w-full h-48 object-cover border border-gray-200"
        />
      </div>
    )}
    {errors?.image && (
      <p className="text-red-500 text-sm mt-1">{errors.image[0]}</p>
    )}
  </div>
);

interface TagsFieldProps {
  tags: string[];
  tagInput: string;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onTagInputChange: (value: string) => void;
  error?: string;
}

const TagsField: React.FC<TagsFieldProps> = ({
  tags,
  tagInput,
  onAddTag,
  onRemoveTag,
  onTagInputChange,
  error,
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Tags *</label>
    <div className="flex gap-2">
      <input
        type="text"
        value={tagInput}
        onChange={(e) => onTagInputChange(e.target.value)}
        className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300"
        placeholder="Add tags..."
        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), onAddTag())}
      />
      <Button type="button" onClick={onAddTag}>
        Add
      </Button>
    </div>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center bg-gray-100 px-3 py-1 text-sm text-gray-800"
        >
          {tag}
          <button
            type="button"
            onClick={() => onRemoveTag(tag)}
            className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &times;
          </button>
        </span>
      ))}
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

interface StatusFieldProps {
  isPublished: boolean;
  onChange: (value: boolean) => void;
  error?: string;
}

const StatusField: React.FC<StatusFieldProps> = ({
  isPublished,
  onChange,
  error,
}) => (
  <div className="status-field">
    <label className="block text-sm font-semibold text-primary-400 mb-2">
      Status *
    </label>
    <div className="flex items-center space-x-4">
      <label className="inline-flex items-center">
        <input
          type="radio"
          name="isPublished"
          checked={isPublished}
          onChange={() => onChange(true)}
          className="h-4 w-4 text-primary-500 focus:ring-primary-300 focus:ring-1"
        />
        <span className="ml-2">Publish</span>
      </label>
      <label className="inline-flex items-center">
        <input
          type="radio"
          name="isPublished"
          checked={!isPublished}
          onChange={() => onChange(false)}
          className="h-4 w-4 text-primary-500 focus:ring-primary-300 focus:ring-1"
        />
        <span className="ml-2">Draft</span>
      </label>
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const PreviewSection = ({
  adminName,
  formData,
}: {
  adminName: string;
  formData: BlogPostFormData;
}) => (
  <div className="w-1/2 bg-gray-50 p-6 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#D1A559]">
    <div className="bg-white p-8 shadow-sm max-w-none">
      <h1 className="font-primary text-3xl mb-4 font-semibold text-primary-500">
        {formData.title || "Blog Title Preview"}
      </h1>
      {formData.image?.src && (
        <CldImage
          src={formData.image.src}
          alt={formData.image.alt || "Featured"}
          width={800}
          height={400}
          crop="fill"
          gravity="auto"
          quality="auto"
          format="avif"
          className="w-full h-64 object-cover mb-6 border border-gray-200"
        />
      )}
      <div className="flex items-center space-x-6 text-sm text-primary-400 mb-6 pb-6 border-b border-primary-500/10">
        <span className="flex items-center">
          <User className="w-4 h-4 mr-2" />
          {adminName}
        </span>
        <span className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date().toLocaleDateString()}
        </span>
        <span
          className={`px-3 py-1 text-xs font-semibold ${
            formData.isPublished
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {formData.isPublished ? "Published" : "Draft"}
        </span>
      </div>
      <div className="max-w-none">
        {formData.content ? (
          <article className="blog-detail__content-main text-neutral-300 font-light leading-relaxed blog-post">
            <Markdown
              components={{
                h1: createHeadingRenderer(1),
                h2: createHeadingRenderer(2),
                h3: createHeadingRenderer(3),
                h4: createHeadingRenderer(4),
              }}
            >
              {formData.content}
            </Markdown>
          </article>
        ) : (
          <p className="text-gray-400 italic">
            Content preview will appear here...
          </p>
        )}
      </div>
    </div>
  </div>
);

interface FormFooterProps {
  onClose: () => void;
  isPending: boolean;
  isValid: boolean;
  submitButtonText: string;
}

const FormFooter: React.FC<FormFooterProps> = ({
  onClose,
  isPending,
  isValid,
  submitButtonText,
}) => (
  <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
    <Button variant="outline" onClick={onClose}>
      Cancel
    </Button>
    <Button type="submit" loading={isPending} disabled={!isValid}>
      <span>{submitButtonText}</span>
    </Button>
  </div>
);
