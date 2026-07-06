import { User, Calendar } from "lucide-react";
import Markdown from "react-markdown";
import { CldImage } from "next-cloudinary";
import { BlogPostFormData } from "@/lib/validations/blog";
import { createHeadingRenderer } from "@/lib/helpers/blog-post";

interface PreviewSectionProps {
  adminName: string;
  formData: BlogPostFormData;
}

export const PreviewSection = ({
  adminName,
  formData,
}: PreviewSectionProps) => (
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
