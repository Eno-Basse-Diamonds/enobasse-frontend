"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { Plus, Search, X, FileText } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { AdminHeader } from "../_components/admin-header";
import { BlogPostForm } from "./_components/blog-post-form";
import { BlogPostList } from "./_components/blog-post-list";
import { AdminFilterSortPanel } from "../_components/admin-filter-sort-panel";
import { BlogPost } from "@/lib/types/blog-post";
import { useBlogPostsForAdmin, useDeleteBlogPost } from "@/lib/hooks/use-blog";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Alert } from "@/components/alert";
import { Button } from "@/components/button";
import { AdminBlogSkeletonLoader } from "@/components/loaders/blog";
import { Pagination } from "@/components/pagination";

export default function AdminBlogPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [inputValue, setInputValue] = useState("");

  const [alertState, setAlertState] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({ visible: false, type: "success", message: "" });

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("search") || "";
  const currentSort = searchParams.get("sortBy") || "createdAt";
  const currentSortOrder =
    (searchParams.get("sortOrder") as "ASC" | "DESC") || "DESC";
  const currentPublished = searchParams.get("isPublished");

  const filterOptions = {
    page: currentPage,
    perPage: 9,
    sortBy: currentSort as
      | "title"
      | "createdAt"
      | "updatedAt"
      | "readingTime"
      | "author",
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
    [router, searchParams]
  );

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
        title="Blog Management"
        admin={{
          name: session?.user?.name || "Admin User",
          email: session?.user?.email || "admin@example.com",
        }}
      />

      {isLoading ? (
        <AdminBlogSkeletonLoader />
      ) : (
        <>
          <div className="flex-1 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Posts ({data?.total || 0})
                </h3>
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
                  placeholder="Search collections..."
                  value={inputValue}
                  onChange={handleInputChange}
                  className="pl-10 pr-20 w-full p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
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
              <BlogPostList
                blogPosts={data.posts}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
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

          {isModalOpen && (
            <BlogPostForm blogPost={editingBlog} onClose={handleFormClose} />
          )}
        </>
      )}
    </>
  );
}
