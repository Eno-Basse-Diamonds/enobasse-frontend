import { AdminBlogClient } from "./_components/admin-blog-client";

interface AdminBlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminBlogPage({ searchParams }: AdminBlogPageProps) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;

  return <AdminBlogClient page={page} />;
}
