"use client";

import * as React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Plus, MessageSquare } from "lucide-react";
import { Alert, Button } from "@/components";
import { EmptyState } from "@/components/empty-state";
import { AdminHeader } from "../_components/admin-header";
import { TestimonialForm } from "./_components/testimonial-form";
import { TestimonialList } from "./_components/testimonial-list";
import { Testimonial } from "@/lib/types/testimonial";
import {
  useTestimonialsForAdmin,
  useDeleteTestimonial,
} from "@/lib/hooks/use-testimonials";

export default function AdminTestimonialsPage() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);

  const [alertState, setAlertState] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({ visible: false, type: "success", message: "" });

  const { data: testimonials, isLoading } = useTestimonialsForAdmin();
  const deleteMutation = useDeleteTestimonial();

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        setAlertState({
          visible: true,
          type: "success",
          message: "Testimonial deleted successfully!",
        });
      },
      onError: () => {
        setAlertState({
          visible: true,
          type: "error",
          message: "Failed to delete testimonial. Please try again.",
        });
      },
    });
  };

  const handleFormClose = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
    document.body.style.overflow = "auto";
  };

  const dismissAlert = () => {
    setAlertState((prev) => ({ ...prev, visible: false }));
  };

  return (
    <>
      {alertState.visible && (
        <Alert
          type={alertState.type}
          dismissible
          onDismiss={dismissAlert}
          duration={5000}
        >
          {alertState.message}
        </Alert>
      )}

      <AdminHeader
        title="Testimonials Management"
        admin={{
          name: session?.user?.name || "Admin User",
          email: session?.user?.email || "admin@example.com",
        }}
      />

      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Customer Testimonials ({testimonials?.length || 0})
            </h3>
            <p className="text-sm text-gray-500">
              Manage customer testimonials and reviews
            </p>
          </div>
          <Button
            leadingIcon={<Plus />}
            onClick={() => {
              setIsModalOpen(true);
              document.body.style.overflow = "hidden";
            }}
          >
            New Testimonial
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white shadow animate-pulse p-6">
                <div className="h-4 bg-gray-200 mb-4"></div>
                <div className="h-4 bg-gray-200 mb-2"></div>
                <div className="h-4 bg-gray-200 w-3/4"></div>
              </div>
            ))}
          </div>
        ) : testimonials && testimonials.length > 0 ? (
          <TestimonialList
            testimonials={testimonials}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <EmptyState
            title="No Testimonials Found"
            description="Start building trust with your customers by adding testimonials and reviews."
            icon={<MessageSquare className="w-16 h-16 text-gray-400" />}
          />
        )}

        {isModalOpen && (
          <TestimonialForm
            testimonial={editingTestimonial}
            onClose={handleFormClose}
          />
        )}
      </div>
    </>
  );
}
