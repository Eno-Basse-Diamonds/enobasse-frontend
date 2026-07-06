import { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/button";
import { BlogPostFormData } from "@/lib/validations/blog";
import { FormErrors } from "@/lib/api/blog-posts";

type ImageField = "src" | "alt";

interface FormFieldsProps {
  formData: BlogPostFormData;
  errors: FormErrors;
  showPreview: boolean;
  tagInput: string;
  onInputChange: (field: keyof BlogPostFormData, value: string | boolean | string[]) => void;
  onImageChange: (field: ImageField, value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onTagInputChange: (value: string) => void;
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
---`;

export const FormFields = ({
  formData,
  errors,
  showPreview,
  tagInput,
  onInputChange,
  onImageChange,
  onAddTag,
  onRemoveTag,
  onTagInputChange,
}: FormFieldsProps) => (
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

export const FormField: React.FC<FormFieldProps> = ({
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
}

export const FormTextareaField: React.FC<FormTextareaFieldProps> = ({
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
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

interface ImageUploadFieldProps {
  formData: BlogPostFormData;
  errors: FormErrors;
  onImageChange: (field: ImageField, value: string) => void;
}

export const ImageUploadField = ({
  formData,
  errors,
  onImageChange,
}: ImageUploadFieldProps) => (
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

export const TagsField: React.FC<TagsFieldProps> = ({
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

export const StatusField: React.FC<StatusFieldProps> = ({
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
