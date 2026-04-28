import React from "react";
import Link from "next/link";
import BlogCard from "@/components/SharedComponent/Blog/blogCard";
import { getAllBlogs, type BlogItem, type BlogPagination } from "@/lib/blog";
import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bookmyworkers.com"),

  title:
    "BookMyWorker Blog | Hiring Tips, Workforce Insights & Labour Market Updates",

  description:
    "Read the latest BookMyWorker blogs covering hiring tips, labour market trends, workforce insights, manpower planning, and employer guidance for hiring skilled, semi-skilled, and unskilled workers across India.",

  keywords: [
    "BookMyWorker blog",
    "BookMyWorker blogs",
    "workforce blog India",
    "workforce insights India",
    "hiring tips India",
    "labour hiring tips",
    "labour market updates",
    "manpower hiring tips",
    "worker hiring guide",
    "employer hiring guide",
    "construction labour hiring",
    "skilled workers India",
    "semi skilled workers India",
    "unskilled workers India",
    "hire workers India",
    "labour hiring strategies",
    "workforce planning India",
    "industrial hiring insights",
    "BookMyWorker news",
    "worker marketplace insights",
    "manpower trends India",
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
      "BookMyWorker Blog | Hiring Tips, Workforce Insights & Labour Market Trends",
    description:
      "Explore BookMyWorker blogs for hiring strategies, labour market trends, workforce insights, and employer guidance for hiring skilled and unskilled workers across India.",
    url: "https://www.bookmyworkers.com/blog",
    siteName: "BookMyWorker",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.bookmyworkers.com/images/seo/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BookMyWorker Workforce Blog",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "BookMyWorker Blog | Workforce Insights & Worker Hiring Tips",
    description:
      "Discover hiring tips, labour trends, manpower insights, and workforce guidance through the BookMyWorker blog.",
    images: ["https://www.bookmyworkers.com/images/seo/og-image.jpg"],
  },

  category: "blog",
};
type BlogPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

const BLOGS_PER_PAGE = 12;

// 1. HELPER FUNCTION FOR SLIDING WINDOW PAGINATION
const getVisiblePages = (current: number, total: number) => {
  const delta = 2; 
  const range = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number | undefined;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
};

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  const params = await searchParams;
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
    <>
      <HeroSub title="Blogs | BookMyWorker Workforce Insights" />
      <section className="flex flex-wrap justify-center py-16 lg:py-24 dark:bg-dark">
        <div className="container mx-auto px-4 lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
          <div className="mx-auto mb-10 max-w-[820px] text-center">
            <h1 className="mb-4 text-3xl font-bold text-midnight_text dark:text-white md:text-5xl">
              BookMyWorker Blog & Workforce Insights
            </h1>
            <p className="text-base leading-8 text-muted dark:text-white/70 md:text-lg">
              Stay updated with BookMyWorker blogs covering workforce hiring and market trends.
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg text-muted dark:text-white/60">No blogs found.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                {blogs.map((blog, i) => (
                  <div key={blog.link || i} className="w-full" data-aos="fade-up">
                    <BlogCard blog={blog} />
                  </div>
                ))}
              </div>

              {/* 2. UPDATED PAGINATION UI */}
              {totalPages > 1 && (
                <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href={currentPage > 1 ? `/blog?page=${currentPage - 1}` : "#"}
                    className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
                      currentPage > 1
                        ? "border-gray-300 text-midnight_text hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
                        : "pointer-events-none opacity-40 border-gray-200 text-gray-400"
                    }`}
                  >
                    Previous
                  </Link>

                  {getVisiblePages(currentPage, totalPages).map((p, index) => {
                    if (p === '...') {
                      return (
                        <span key={`dots-${index}`} className="px-2 text-midnight_text dark:text-white">
                          ...
                        </span>
                      );
                    }
                    return (
                      <Link
                        key={`page-${p}`}
                        href={`/blog?page=${p}`}
                        className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                          currentPage === p
                            ? "bg-primary text-white"
                            : "border border-gray-300 text-midnight_text hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
                        }`}
                      >
                        {p}
                      </Link>
                    );
                  })}

                  <Link
                    href={currentPage < totalPages ? `/blog?page=${currentPage + 1}` : "#"}
                    className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
                      currentPage < totalPages
                        ? "border-gray-300 text-midnight_text hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
                        : "pointer-events-none opacity-40 border-gray-200 text-gray-400"
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
    </>
  );
};

export default BlogPage;