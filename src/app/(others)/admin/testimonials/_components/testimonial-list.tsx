import Image from "next/image";
import { Edit, Trash2, Eye, EyeOff, MessageSquare } from "lucide-react";
import { Testimonial } from "@/lib/types/testimonial";
import { memo } from "react";
import { Button } from "@/components/button";

interface TestimonialListProps {
  testimonials: Testimonial[];
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string) => void;
}

export const TestimonialList = memo(function TestimonialList({
  testimonials,
  onEdit,
  onDelete,
}: TestimonialListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.id}
          className="bg-white shadow overflow-hidden hover:shadow-md transition-all duration-300 border border-primary-500/10 flex flex-col h-full"
        >
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-primary-500" />
                <span className="text-xs font-medium text-primary-400">
                  Order: {testimonial.order}
                </span>
              </div>
              <div
                className={`px-2 py-1 text-xs font-semibold ${
                  testimonial.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {testimonial.isActive ? (
                  <span className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    Active
                  </span>
                ) : (
                  <span className="flex items-center">
                    <EyeOff className="w-3 h-3 mr-1" />
                    Inactive
                  </span>
                )}
              </div>
            </div>

            <div className="flex-grow">
              <blockquote className="text-primary-500 mb-4 line-clamp-4 leading-relaxed">
                "{testimonial.text}"
              </blockquote>
            </div>

            <div className="mt-auto">
              <div className="flex items-center space-x-3 mb-6">
                {testimonial.avatar?.url ? (
                  <Image
                    src={testimonial.avatar.url}
                    alt={testimonial.avatar.alt || testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-500">
                      {getInitials(testimonial.name)}
                    </span>
                  </div>
                )}
                <div>
                  <div className="font-semibold text-primary-500 text-sm">
                    {testimonial.name}
                  </div>
                  {testimonial.handle && (
                    <div className="text-primary-400 text-xs">
                      {testimonial.handle}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-3 w-full">
                <Button
                  leadingIcon={<Edit />}
                  onClick={() => onEdit(testimonial)}
                  className="w-full"
                >
                  <span>Edit</span>
                </Button>
                <Button
                  variant="outline"
                  leadingIcon={<Trash2 />}
                  onClick={() => onDelete(testimonial.id)}
                  className="w-full"
                >
                  <span>Delete</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
