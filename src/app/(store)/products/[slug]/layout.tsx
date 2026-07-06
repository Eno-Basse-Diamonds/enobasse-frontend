import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getProduct } from "@/lib/api/products";
import { getPreferredCurrency } from "@/lib/api/account";
import { getServerSession } from "next-auth";
import { logger } from "@/lib/utils/logger";

const DEFAULT_CURRENCY = "USD";

async function resolvePreferredCurrency(
  email: string | null | undefined,
): Promise<string> {
  if (!email) return DEFAULT_CURRENCY;
  try {
    return await getPreferredCurrency(email);
  } catch (error) {
    logger.error("Failed to fetch preferred currency", error);
    return DEFAULT_CURRENCY;
  }
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const session = await getServerSession();
  const preferredCurrency = await resolvePreferredCurrency(
    session?.user?.email,
  );
  const product = await getProduct(slug, preferredCurrency);

  if (!product) {
    return {
      title: "Product not found",
      description: "This product does not exist.",
    };
  }

  const description =
    product.variants && product.variants.length > 0
      ? product.variants[0].description
      : "No description available for this product.";

  return {
    title: `${product.name} - Eno Bassé Diamonds`,
    description: description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} - Eno Bassé Diamonds`,
      description: product.description,
      images: [
        {
          url: `${product.images[0].url}`,
          width: 1200,
          height: 630,
          alt: product.images[0].alt || product.name,
        },
      ],
    },
    twitter: {
      title: `${product.name} - Eno Bassé Diamonds`,
      description: description,
      images: [`${product.images[0].url}`],
    },
  };
}

export default async function ProductPage({
  params,
  children,
}: ProductPageProps) {
  const { slug } = await params;
  const session = await getServerSession();
  const preferredCurrency = await resolvePreferredCurrency(
    session?.user?.email,
  );
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product", slug, preferredCurrency],
    queryFn: () => getProduct(slug, preferredCurrency),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
