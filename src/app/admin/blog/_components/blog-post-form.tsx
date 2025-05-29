"use client";

import { useState, useActionState, useEffect } from "react";
import { Eye, X, User, Calendar } from "lucide-react";
import Markdown from "react-markdown";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { Button, Alert } from "@/components";
import { BlogPost } from "@/lib/types/blog-post";
import { BlogPostFormData } from "@/lib/validations/blog";
import {
  createBlogPost,
  updateBlogPost,
  FormErrors,
  FormState,
} from "@/lib/api/blog-posts";
import { createHeadingRenderer } from "@/lib/helpers/blog-post";
import { textToSlug } from "@/lib/utils/string";

interface BlogPostFormProps {
  blogPost: BlogPost;
  onClose: () => void;
}

const initialState: FormState = {
  errors: {},
  message: "",
  success: false,
};

const ADMIN = {
  id: "a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890",
  name: "John Doe",
  avatar: {
    alt: "John Doe avatar",
    url: "https://example.com/avatars/john.jpg",
  },
};

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

const prepareFormData = (formData: BlogPostFormData) => {
  const newFormData = new FormData();
  newFormData.append("title", formData.title);
  newFormData.append("slug", formData.slug);
  newFormData.append("excerpt", formData.excerpt);
  newFormData.append("content", formData.content);
  newFormData.append("isPublished", formData.isPublished.toString());
  newFormData.append("image.src", formData.image.src);
  newFormData.append("image.alt", formData.image.alt);
  formData.tags.forEach((tag: string) => newFormData.append("tags", tag));
  return newFormData;
};

export function BlogPostForm({ blogPost, onClose }: BlogPostFormProps) {
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

  const createPostAction = async (state: FormState): Promise<FormState> => {
    const formPayload = prepareFormData(formData);
    return await createBlogPost(formPayload, ADMIN.id);
  };

  const updatePostAction = async (state: FormState): Promise<FormState> => {
    const formPayload = prepareFormData(formData);
    return await updateBlogPost(blogPost.slug, formPayload);
  };

  const [state, formAction, isPending] = useActionState<FormState>(
    blogPost ? updatePostAction : createPostAction,
    initialState
  );

  useEffect(() => {
    if (state.message && state.success) {
      const timer = setTimeout(onClose, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.message, state.success, onClose]);

  const formTitle = blogPost ? "Edit Blog Post" : "Create New Blog Post";
  const submitButtonText = blogPost ? "Update" : "Create";
  const isFormValid = Boolean(
    !isPending &&
      formData.title.trim() &&
      formData.content.trim() &&
      formData.excerpt.trim()
  );

  return (
    <>
      <AlertMessage state={state} />

      <div className="modal-overlay">
        <form action={formAction} className="modal-form">
          <FormHeader
            title={formTitle}
            showPreview={showPreview}
            onTogglePreview={() => setShowPreview(!showPreview)}
            onClose={onClose}
          />

          <div className="modal-content">
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

            {showPreview && <PreviewSection formData={formData} />}
          </div>

          <FormFooter
            onClose={onClose}
            isPending={isPending}
            isValid={isFormValid}
            submitButtonText={`${submitButtonText} Blog Post`}
          />
        </form>
      </div>
    </>
  );
}

const AlertMessage = ({ state }: { state: FormState }) =>
  state.message && (
    <div className="alert-message-container">
      <Alert
        type={state.success ? "success" : "error"}
        className="mb-6"
        dismissible
      >
        {state.message}
      </Alert>
    </div>
  );

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
  <div className="form-header">
    <h3 className="form-header__title">{title}</h3>
    <div className="form-header__actions">
      <Button
        size="sm"
        variant="outline"
        leadingIcon={<Eye />}
        onClick={onTogglePreview}
      >
        {showPreview ? "Hide Preview" : "Show Preview"}
      </Button>
      <Button size="sm" variant="ghost" onClick={onClose}>
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
    className={`form-fields form-fields__scrollbar ${
      showPreview ? "form-fields--preview" : "form-fields--full"
    }`}
  >
    <div className="form-fields__container">
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
        className="form-fields__content-textarea"
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
  <div className="form-field">
    <label className="form-field__label">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="form-field__input"
      placeholder={placeholder}
    />
    {error && <p className="form-field__error">{error}</p>}
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
  <div className="form-textarea-field">
    <label className="form-textarea-field__label">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`form-textarea-field__textarea ${className}`}
      placeholder={placeholder}
    />
    {characterCount !== undefined && maxCharacters !== undefined && (
      <p className="form-textarea-field__character-count">
        {characterCount}/{maxCharacters} characters
      </p>
    )}
    {helpText && <p className="form-textarea-field__help-text">{helpText}</p>}
    {error && <p className="form-textarea-field__error">{error}</p>}
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
    <label className="image-upload__label">Featured Image *</label>
    <div className="image-upload__controls">
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
        className="image-upload__alt-input"
        placeholder="Image alt text"
      />
    </div>
    {formData.image.src && (
      <div className="image-upload__preview">
        <CldImage
          src={formData.image.src}
          alt={formData.image.alt || "Preview"}
          width={800}
          height={400}
          crop="fill"
          gravity="auto"
          quality="auto"
          format="avif"
          className="image-upload__image"
        />
      </div>
    )}
    {errors?.image && <p className="image-upload__error">{errors.image[0]}</p>}
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
  <div className="tags-field">
    <label className="tags-field__label">Tags *</label>
    <div className="tags-field__input-container">
      <input
        type="text"
        value={tagInput}
        onChange={(e) => onTagInputChange(e.target.value)}
        className="tags-field__input"
        placeholder="Add tags..."
        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), onAddTag())}
      />
      <Button type="button" onClick={onAddTag}>
        Add
      </Button>
    </div>
    <div className="tags-field__tags-container">
      {tags.map((tag) => (
        <span key={tag} className="tags-field__tag">
          {tag}
          <button
            type="button"
            onClick={() => onRemoveTag(tag)}
            className="tags-field__remove-button"
          >
            &times;
          </button>
        </span>
      ))}
    </div>
    {error && <p className="tags-field__error">{error}</p>}
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
    <label className="status-field__label">Status *</label>
    <div className="status-field__options">
      <label className="status-field__option">
        <input
          type="radio"
          name="isPublished"
          checked={isPublished}
          onChange={() => onChange(true)}
          className="status-field__radio"
        />
        <span className="status-field__option-label">Publish</span>
      </label>
      <label className="status-field__option">
        <input
          type="radio"
          name="isPublished"
          checked={!isPublished}
          onChange={() => onChange(false)}
          className="status-field__radio"
        />
        <span className="status-field__option-label">Draft</span>
      </label>
    </div>
    {error && <p className="status-field__error">{error}</p>}
  </div>
);

const PreviewSection = ({ formData }: { formData: BlogPostFormData }) => (
  <div className="preview-section">
    <div className="preview-section__container">
      <h1 className="preview-section__title">
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
          className="preview-section__image"
        />
      )}
      <div className="preview-section__meta">
        <span className="preview-section__meta-item">
          <User className="w-4 h-4 mr-2" />
          {ADMIN.name}
        </span>
        <span className="preview-section__meta-item">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date().toLocaleDateString()}
        </span>
        <span
          className={`preview-section__status ${
            formData.isPublished
              ? "preview-section__status--published"
              : "preview-section__status--draft"
          }`}
        >
          {formData.isPublished ? "Published" : "Draft"}
        </span>
      </div>
      <div className="preview-section__content">
        {formData.content ? (
          <article className="blog-detail__content-main blog-post">
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
          <p className="preview-section__empty-content">
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
  <div className="form-footer">
    <Button variant="outline" onClick={onClose}>
      Cancel
    </Button>
    <Button type="submit" loading={isPending} disabled={!isValid}>
      <span>{submitButtonText}</span>
    </Button>
  </div>
);
