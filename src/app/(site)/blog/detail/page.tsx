import React from "react";
import Link from "next/link";
import BlogCard from "@/components/SharedComponent/Blog/blogCard";
import {
  getAllBlogs,
  type BlogItem,
  type BlogPagination,
} from "@/lib/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bookmyworkers.com"),

  title:
    "BookMyWorker Blog | Hiring Tips, Workforce Insights & Labour Market Updates",

  description:
    "Read the latest BookMyWorker blogs covering hiring tips, labour market trends, workforce insights, manpower planning, and employer guidance for skilled, semi-skilled, and unskilled workers across India.",

  keywords: [
    "BookMyWorker blog",
    "BookMyWorker blogs",
    "workforce insights India",
    "hiring tips India",
    "labour market updates",
    "manpower hiring tips",
    "worker hiring guide",
    "employer hiring guide",
    "skilled workers India",
    "semi skilled workers India",
    "unskilled workers India",
    "construction labour hiring",
    "hire workers India",
    "labour hiring tips",
    "worker marketplace India",
    "manpower planning India",
    "labour trends India",
    "BookMyWorker news",
    "workforce blog India",
    "industrial hiring insights",
  ],

  alternates: {
    canonical: "https://www.bookmyworkers.com/blog",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:
      "BookMyWorker Blog | Hiring Tips, Workforce Insights & Labour Market Updates",
    description:
      "Explore BookMyWorker blogs for hiring tips, workforce insights, labour trends, employer guidance, and worker hiring updates across India.",
    url: "https://www.bookmyworkers.com/blog",
    siteName: "BookMyWorker",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.bookmyworkers.com/images/seo/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BookMyWorker Blog and Workforce Insights",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "BookMyWorker Blog | Workforce Insights & Hiring Tips",
    description:
      "Read BookMyWorker blogs on hiring workers, labour market trends, manpower planning, and workforce insights across India.",
    images: ["https://www.bookmyworkers.com/images/seo/og-image.jpg"],
  },

  category: "blog",
};

type BlogPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

const BLOGS_PER_PAGE = 6;

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  const params = searchParams ? await searchParams : {};
  const currentPage = Math.max(Number(params?.page || 1), 1);

  let blogs: BlogItem[] = [];
  let pagination: BlogPagination | undefined;

  try {
    const response = await getAllBlogs(currentPage, BLOGS_PER_PAGE);
    blogs = response.blogs;
    pagination = response.pagination;
  } catch (error) {
    blogs = [];
    pagination = undefined;
  }

  const totalPages = pagination?.totalPages || 1;

  return (
    <section className="flex flex-wrap justify-center py-1 lg:py-1 dark:bg-dark">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-1">
        {blogs.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-muted dark:text-white/60">
              No blogs found.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
              {blogs.map((blog, i) => (
                <div
                  key={blog._id || i}
                  className="w-full"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  data-aos-duration="1000"
                >
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={currentPage > 1 ? `/blog?page=${currentPage - 1}` : "#"}
                  className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
                    currentPage > 1
                      ? "border-gray-300 text-midnight_text hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
                      : "pointer-events-none cursor-not-allowed border-gray-200 text-gray-400"
                  }`}
                >
                  Previous
                </Link>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (page) => (
                    <Link
                      key={page}
                      href={`/blog?page=${page}`}
                      className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                        currentPage === page
                          ? "bg-primary text-white"
                          : "border border-gray-300 text-midnight_text hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
                      }`}
                    >
                      {page}
                    </Link>
                  )
                )}

                <Link
                  href={
                    currentPage < totalPages ? `/blog?page=${currentPage + 1}` : "#"
                  }
                  className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
                    currentPage < totalPages
                      ? "border-gray-300 text-midnight_text hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
                      : "pointer-events-none cursor-not-allowed border-gray-200 text-gray-400"
                  }`}
                >
                  Next
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogPage;