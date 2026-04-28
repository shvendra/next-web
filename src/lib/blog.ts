export type BlogItem = {
  _id: string;
  slug: string;
  title: string;
  link: string; // Changed from slug to link
  subtitle?: string;
  body?: string;
  photo?: string;
  likes?: number;
  createdAt: string;
    updatedAt?: string;
};

export type BlogPagination = {
  totalBlogs: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type GetAllBlogsResponse = {
  blogs: BlogItem[];
  pagination?: BlogPagination;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:5000";

function normalizeBaseUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function buildUrl(baseUrl: string, path: string) {
  const safeBase = normalizeBaseUrl(baseUrl);
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return new URL(safePath, safeBase).toString();
}

export async function getAllBlogs(
  page?: number,
  limit?: number
): Promise<GetAllBlogsResponse> {
  const baseUrl = buildUrl(API_BASE_URL, "/api/v1/blogs/list-publish");
  const url = new URL(baseUrl);

  if (page) url.searchParams.set("page", String(page));
  if (limit) url.searchParams.set("limit", String(limit));

  // Determine if we should bypass the cache (Next.js has a 2MB cache limit)
  // Large limits (like 5000 for sitemaps) usually exceed this.
  const isLargeRequest = limit && limit > 100;

  const res = await fetch(url.toString(), {
    // If it's a large request, use 'no-store' to avoid the 2MB cache error
    cache: isLargeRequest ? 'no-store' : 'default',
    next: isLargeRequest ? undefined : { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch blogs. Status: ${res.status}`);
  }

  const data = await res.json();

  return {
    blogs: data?.blogs || [],
    pagination: data?.pagination,
  };
}

// Rename to getBlogByLink for clarity, or keep name but use 'link' logic
export async function getBlogBySlug(link: string): Promise<BlogItem | null> {
  if (!link) return null;
console.log("Fetching blog with link:", link);
  // Ensure this matches your backend route which looks up by the link string
  const url = buildUrl(
    API_BASE_URL,
    `/api/v1/blogs/${encodeURIComponent(link)}`
  );
    console.log(url);

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  // Ensure the frontend uses 'link' instead of 'slug' from the response
  return data?.blog || null;
}

export function getBlogImageUrl(photo?: string) {
  if (!photo) return "/images/blog/default-blog.jpg";

  if (photo.startsWith("http://") || photo.startsWith("https://")) {
    return photo;
  }

  return buildUrl("https://bookmyworker.s3.eu-north-1.amazonaws.com", photo);
}

export async function likeBlogById(id: string): Promise<{ likes: number }> {
  if (!id) {
    throw new Error("Blog id is required");
  }

  const url = buildUrl(API_BASE_URL, `/api/v1/blogs/like/${id}`);

  const res = await fetch(url, {
    method: "PUT",
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to like blog");
  }

  return {
    likes: data?.likes || 0,
  };
}
