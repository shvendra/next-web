import type { MetadataRoute } from "next";
import { getAllBlogs } from "@/lib/blog";

const BASE_URL = "https://www.bookmyworkers.com";

/** Worker skill types */
const workerTypes = ["skilled", "semi-skilled", "unskilled"];


/** Top 20 high-demand worker categories */
const workerCategories = [
  "helper",
  "general-labour",
  "construction-worker",
  "mason",
  "carpenter",
  "painter",
  "electrician",
  "plumber",
  "welder",
  "fabricator",
  "tile-fitter",
  "steel-fixer",
  "scaffolding-worker",
  "factory-worker",
  "machine-operator",
  "warehouse-worker",
  "loader",
  "unloader",
  "security-guard",
  "driver",
];

/** Top 30 high-demand Indian cities for workers */
const cities = [
  "delhi",
  "new-delhi",
  "noida",
  "gurgaon",
  "ghaziabad",
  "faridabad",
  "mumbai",
  "navi-mumbai",
  "thane",
  "pune",
  "bangalore",
  "hyderabad",
  "chennai",
  "kolkata",
  "ahmedabad",
  "surat",
  "vadodara",
  "jaipur",
  "lucknow",
  "kanpur",
  "indore",
  "bhopal",
  "nagpur",
  "visakhapatnam",
  "vijayawada",
  "coimbatore",
  "kochi",
  "bhubaneswar",
  "chandigarh",
  "guwahati",
];

/** Optional: dedupe in case of repeated values */
const uniqueCities = [...new Set(cities)];
const uniqueWorkerCategories = [...new Set(workerCategories)];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

 const staticPages: MetadataRoute.Sitemap = [
  {
    url: `${BASE_URL}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 1,
  },
  {
    url: `${BASE_URL}/workers`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/blog`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.9,
  },

  {
    url: `${BASE_URL}/category`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  },

  // Static pages
  {
    url: `${BASE_URL}/about`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/pricing`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/hire-workers`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/workers/manpower-supplier`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/workers/labor-supplier`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/workers/labor-contractor`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/service`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/contact`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  },

  // Legal pages
  {
    url: `${BASE_URL}/privacy`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/terms`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/refund`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

  const workerTypePages: MetadataRoute.Sitemap = workerTypes.flatMap((type) =>
    uniqueWorkerCategories.map((category) => ({
      url: `${BASE_URL}/workers/${type}/${category}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  const cityPages: MetadataRoute.Sitemap = uniqueCities.flatMap((city) =>
    uniqueWorkerCategories.map((category) => ({
      url: `${BASE_URL}/workers/${city}/${category}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  let blogPages: MetadataRoute.Sitemap = [];

  try {
    /**
     * Fetch all blogs.
     * Increase limit if needed.
     * Better: create a dedicated API/backend method that returns all blog slugs.
     */
    const blogResponse = await getAllBlogs(1, 5000);

    blogPages = (blogResponse?.blogs || [])
      .filter((blog) => blog?.slug)
      .map((blog) => ({
        url: `${BASE_URL}/blog/${blog.slug}`,
        lastModified: blog.updatedAt
          ? new Date(blog.updatedAt)
          : blog.createdAt
          ? new Date(blog.createdAt)
          : now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
  } catch (error) {
    console.error("Sitemap blog fetch failed:", error);
    blogPages = [];
  }

  return [...staticPages, ...workerTypePages, ...cityPages, ...blogPages];
}