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
  title: "Hire Skilled & Unskilled Workers | Manpower Supply Solutions India",
  description:
    "The ultimate platform for employers and manpower suppliers. Hire verified construction, factory, and warehouse workers. Get expert workforce insights, labor market trends, and employer guidance for sourcing skilled, semi-skilled, and unskilled labor across India.",
  keywords: [
    "hire workers India",
    "manpower supplier India",
    "labor contractor services",
    "find skilled laborers",
    "unskilled worker supply",
    "bulk labor hiring",
    "construction worker supply",
    "factory worker recruitment",
    "warehouse manpower solutions",
    "manpower consultancy India",
    "hire daily wage workers",
    "verified worker marketplace",
    "manpower outsourcing India",
    "employer hiring guide",
    "labor supply business tips",
    "industrial manpower recruitment",
    "BookMyWorker for employers",
    "contract labor supply India",
    "workforce management solutions",
  ],
  alternates: { canonical: "https://www.bookmyworkers.com/blog" },
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
    title: "Hire Verified Workers & Source Manpower | BookMyWorker for Employers",
    description:
      "Scale your business with verified manpower. From construction sites to factory floors, find the right workers or register as a supplier on India's leading worker marketplace.",
    url: "https://www.bookmyworkers.com/blog",
    siteName: "BookMyWorker",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.bookmyworkers.com/images/seo/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hire Skilled and Unskilled Workers - BookMyWorker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reliable Manpower Supply & Worker Hiring | BookMyWorker",
    description:
      "Bridging the gap between employers and manpower suppliers. Hire verified laborers across India with ease.",
    images: ["https://www.bookmyworkers.com/images/seo/og-image.jpg"],
  },
  category: "Business & Recruitment",
};

type BlogPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

const BLOGS_PER_PAGE = 6;

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
                  key={blog.link || i}
                  className="w-full"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  data-aos-duration="1000"
                >
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>

            {/* 2. UPDATED SLIDING WINDOW PAGINATION UI */}
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
  );
};

export default BlogPage;