"use client";

import * as React from "react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Alert, Button, Pagination } from "@/components";
import { AdminBlogSkeletonLoader } from "@/components/loaders";
import { Header } from "../../_components/header";
import { BlogPostForm } from "./blog-post-form";
import { BlogPostList } from "./blog-post-list";
import { BlogPost } from "@/lib/types/blog-post";
import { useBlogPosts, useDeleteBlogPost } from "@/lib/hooks/use-blog";

interface AdminBlogClientProps {
  page: number;
}

export function AdminBlogClient({ page }: AdminBlogClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  const [alertState, setAlertState] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({ visible: false, type: "success", message: "" });

  const { data, isLoading } = useBlogPosts(page);
  const deleteMutation = useDeleteBlogPost(page);

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleDelete = (slug: string) => {
    deleteMutation.mutate(slug, {
      onSuccess: () => {
        setAlertState({
          visible: true,
          type: "success",
          message: "Blog post deleted successfully!",
        });
      },
      onError: () => {
        setAlertState({
          visible: true,
          type: "error",
          message: "Failed to delete blog post. Please try again.",
        });
      },
    });
  };

  const handleFormClose = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
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

      <Header
        title="Blog Management"
        admin={{
          name: "Helen David",
          avatar: {
            src: "https://i.pravatar.cc/300",
            alt: "Helen David's profile picture",
          },
        }}
      />

      {isLoading ? (
        <AdminBlogSkeletonLoader />
      ) : (
        <>
          <div className="flex-1 p-8">
            <div className="flex items-center justify-end mb-8">
              <Button
                leadingIcon={<Plus />}
                onClick={() => {
                  setIsModalOpen(true);
                  document.body.style.overflow = "hidden";
                }}
              >
                New Post
              </Button>
            </div>

            <BlogPostList
              blogPosts={data?.posts || []}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <div className="mb-12 mt-12 md:mt-16 lg:mt-20 px-4 sm:px-6">
              <Pagination
                currentPage={page}
                totalPages={data?.totalPages || 1}
                hrefBuilder={(page) => `/admin/blog?page=${page}`}
              />
            </div>
          </div>

          {isModalOpen && (
            <BlogPostForm blogPost={editingBlog} onClose={handleFormClose} />
          )}
        </>
      )}
    </>
  );
}

