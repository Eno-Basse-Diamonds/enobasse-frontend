"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Alert,  Button, Pagination } from "@/components";
import { AdminBlogSkeletonLoader } from "@/components/loader";
import { Header } from "../_components/header";
import { BlogPostForm } from "./_components/blog-post-form";
import { BlogPostList } from "./_components/blog-post-list";
import { getBlogPosts, deleteBlogPost } from "@/lib/api/blog-posts";
import { BlogPost } from "@/lib/types/blog-post";
import "./styles.scss";

interface AdminBlogPageProps {
  searchParams?: { page?: string };
}

export default function AdminBlogPage({ searchParams }: AdminBlogPageProps) {
  const { page }: any = React.use(searchParams as any);
  const currentPage = Number(page) || 1;
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  const [alertState, setAlertState] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({ visible: false, type: "success", message: "" });

  const originalPosts = blogPosts;

  const fetchBlogPosts = useCallback(async () => {
    const { posts, totalPages } = await getBlogPosts(currentPage);
    setBlogPosts(posts);
    setTotalPages(totalPages);
    setLoading(false);
  }, [currentPage]);

  useEffect(() => {
    fetchBlogPosts();
  }, [fetchBlogPosts]);

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleDelete = async (slug: string) => {
    try {
      await deleteBlogPost(slug);

      setAlertState({
        visible: true,
        type: "success",
        message: "Blog post deleted successfully!",
      });

      setBlogPosts(blogPosts.filter((post) => post.slug !== slug));
      router.refresh();
    } catch (err) {
      setBlogPosts(originalPosts);
      setAlertState({
        visible: true,
        type: "error",
        message: "Failed to delete blog post. Please try again.",
      });
    }
  };

  const handleFormClose = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
    fetchBlogPosts();
    document.body.style.overflow = "auto";
  };

  const dismissAlert = () => {
    setAlertState((prev) => ({ ...prev, visible: false }));
  };

  return (
    <>
      {alertState.visible && (
        <div className="fixed top-4 right-4 max-w-md w-full z-50">
          <Alert type={alertState.type} dismissible onDismiss={dismissAlert}>
            {alertState.message}
          </Alert>
        </div>
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

      {loading ? (
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
              blogPosts={blogPosts}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <div className="mb-12 mt-12 md:mt-16 lg:mt-20 px-4 sm:px-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
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
