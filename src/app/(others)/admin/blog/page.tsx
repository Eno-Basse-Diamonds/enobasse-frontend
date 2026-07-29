"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import { FileText, Plus, Search, X } from "lucide-react";

import { AdminFilterSortPanel } from "@/app/(others)/admin/_components/AdminFilterSortPanel";
import { AdminHeader } from "@/app/(others)/admin/_components/AdminHeader";
import { useBlogPostsForAdmin, useDeleteBlogPost } from "@/modules/blog/hooks";
import { BlogPost } from "@/modules/blog/types";
import { Alert } from "@/shared/components/Alert";
import { Button } from "@/shared/components/Button";
import { EmptyState } from "@/shared/components/EmptyState";
import { DeleteConfirmationModal } from "@/shared/components/Modal";
import { Pagination } from "@/shared/components/Pagination";
import { AdminBlogSkeletonLoader } from "@/shared/components/loaders/Blog";

import { BlogPostForm } from "./_components/BlogPostForm";
import { BlogPostList } from "./_components/BlogPostList";

export default function AdminBlogPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("modal") === "create") {
      setIsModalOpen(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const [alertState, setAlertState] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({ visible: false, type: "success", message: "" });

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("search") || "";
  const currentSort = searchParams.get("sortBy") || "createdAt";
  const currentSortOrder = (searchParams.get("sortOrder") as "ASC" | "DESC") || "DESC";
  const currentPublished = searchParams.get("isPublished");

  const filterOptions = {
    page: currentPage,
    perPage: 9,
    sortBy: currentSort as "title" | "createdAt" | "updatedAt" | "readingTime" | "author",
    sortOrder: currentSortOrder,
    search: currentSearch || undefined,
    isPublished: currentPublished ? currentPublished === "true" : undefined,
  };

  const { data, isLoading } = useBlogPostsForAdmin(filterOptions);
  const deleteMutation = useDeleteBlogPost(currentPage);

  const updateURL = useCallback(
    (newParams: Record<string, string | number>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === "" || value === undefined) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      router.push(`/admin/blog?${params.toString()}`);
    },
    [router, searchParams],
  );

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleDelete = (slug: string) => {
    setDeleteSlug(slug);
  };

  const handleConfirmDelete = () => {
    if (!deleteSlug) return;
    deleteMutation.mutate(deleteSlug, {
      onSuccess: () => {
        setAlertState({
          visible: true,
          type: "success",
          message: "Blog post deleted successfully!",
        });
        setDeleteSlug(null);
      },
      onError: () => {
        setAlertState({
          visible: true,
          type: "error",
          message: "Failed to delete blog post. Please try again.",
        });
        setDeleteSlug(null);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL({ search: inputValue, page: 1 });
  };

  const clearSearch = () => {
    setInputValue("");
    updateURL({ search: "", page: 1 });
  };

  const handleSortChange = (sort: string) => {
    updateURL({ sortBy: sort, page: 1 });
  };

  const handleSortOrderChange = (order: "ASC" | "DESC") => {
    updateURL({ sortOrder: order, page: 1 });
  };

  const handleFilterChange = (filters: string[]) => {
    const publishedFilter = filters.includes("published");
    updateURL({ isPublished: publishedFilter ? "true" : "", page: 1 });
  };

  const sortOptions = [
    { value: "createdAt", label: "Date Created" },
    { value: "updatedAt", label: "Last Updated" },
    { value: "title", label: "Title" },
    { value: "author", label: "Author" },
  ];

  const filterOptionsList = [{ value: "published", label: "Published Only" }];

  const currentFilters = currentPublished === "true" ? ["published"] : [];

  return (
    <>
      {alertState.visible && (
        <Alert type={alertState.type} dismissible onDismiss={dismissAlert} duration={5000}>
          {alertState.message}
        </Alert>
      )}

      <AdminHeader
        title="Blog Management"
        admin={{
          name: session?.user?.name || "Admin User",
          email: session?.user?.email || "admin@example.com",
        }}
      />

      {isLoading ? (
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <AdminBlogSkeletonLoader />
        </div>
      ) : (
        <>
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Posts ({data?.total || 0})</h3>
                <p className="text-sm text-gray-500">Manage your blog posts</p>
              </div>
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

            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <form onSubmit={handleSearchSubmit} className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={inputValue}
                  onChange={handleInputChange}
                  className="pl-10 pr-20 w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                />
                {(currentSearch || inputValue) && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>

              <div className="md:w-auto">
                <AdminFilterSortPanel
                  sortOptions={sortOptions}
                  filterOptions={filterOptionsList}
                  currentSort={currentSort}
                  currentSortOrder={currentSortOrder}
                  currentFilters={currentFilters}
                  onSortChange={handleSortChange}
                  onSortOrderChange={handleSortOrderChange}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>

            {!isLoading && data?.posts && data.posts.length > 0 ? (
              <BlogPostList blogPosts={data.posts} onEdit={handleEdit} onDelete={handleDelete} />
            ) : !isLoading && data?.posts && data.posts.length === 0 ? (
              <EmptyState
                title="No Blog Posts Found"
                description="Start building your blog by creating your first post to engage with your audience."
                icon={<FileText className="w-16 h-16 text-gray-400" />}
              />
            ) : null}

            {/* Pagination */}
            {data && data.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={data.totalPages}
                  hrefBuilder={(page) => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("page", String(page));
                    return `/admin/blog?${params.toString()}`;
                  }}
                />
              </div>
            )}
          </div>

          {isModalOpen && <BlogPostForm blogPost={editingBlog} onClose={handleFormClose} />}

          <DeleteConfirmationModal
            isOpen={deleteSlug !== null}
            onClose={() => setDeleteSlug(null)}
            onConfirm={handleConfirmDelete}
            title="Delete Blog Post"
            isDeleting={deleteMutation.isPending}
          />
        </>
      )}
    </>
  );
}
