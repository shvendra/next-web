import type { MetadataRoute } from "next";
import { getAllBlogs } from "@/lib/blog";

const BASE_URL = "https://www.bookmyworkers.com";

/** Worker skill types */
const workerTypes = ["skilled", "semi-skilled", "unskilled"];

/** 50 worker categories */
const workerCategories = [
  "helper",
  "skilled-helper",
  "machine-operator",
  "cnc-operator",
  "vmc-operator",
  "welder",
  "fitter",
  "fabricator",
  "quality-checker",
  "hvac-technician",
  "other-industrial",
  "mason",
  "carpenter",
  "shuttering-carpenter",
  "steel-fixer",
  "bar-bender",
  "plumber",
  "electrician",
  "tile-fitter",
  "building-painter",
  "civil-helper",
  "other-construction",
  "loader",
  "unloader",
  "picker",
  "packer",
  "warehouse-helper",
  "parcel-sorter",
  "delivery-boy",
  "courier-boy",
  "dispatch-worker",
  "inventory-assistant",
  "other-logistics",
  "agriculture-worker",
  "farm-labour",
  "tractor-driver",
  "dairy-worker",
  "poultry-worker",
  "animal-care",
  "irrigation-worker",
  "crop-cutting",
  "pesticide-sprayer",
  "farm-equipment-operator",
  "other-agriculture",
  "maid",
  "housekeeping",
  "cook",
  "cleaner",
  "babysitter",
  "nanny",
  "elder-care",
  "patient-care",
  "kitchen-helper",
  "dishwasher",
  "other-household",
  "mechanic",
  "helper-mechanic",
  "denter",
  "auto-painter",
  "tyre-mechanic",
  "battery-technician",
  "wheel-alignment",
  "vehicle-ac-mechanic",
  "car-washer",
  "service-advisor-helper",
  "other-automobile",
  "sales-boy",
  "sales-girl",
  "cashier",
  "store-helper",
  "cleaning-staff",
  "billing-assistant",
  "delivery-executive",
  "customer-support-helper",
  "stock-boy",
  "visual-merchandiser-helper",
  "other-retail",
  "waiter",
  "room-service",
  "reception-helper",
  "kitchen-staff",
  "steward",
  "hotel-housekeeping",
  "dish-washer",
  "banquet-helper",
  "cook-helper",
  "catering-worker",
  "other-hospitality",
  "ward-boy",
  "nursing-helper",
  "hospital-cleaner",
  "medical-attendant",
  "bedside-helper",
  "dressing-helper",
  "ot-helper",
  "ambulance-assistant",
  "pharmacy-helper",
  "other-healthcare",
  "security-guard",
  "cctv-operator",
  "office-boy",
  "facility-cleaner",
  "sweeper",
  "maintenance-helper",
  "lift-operator",
  "pantry-boy",
  "gatekeeper",
  "watchman",
  "other-facility",
  "lmv-driver",
  "hmv-driver",
  "auto-driver",
  "e-rickshaw-driver",
  "delivery-driver",
  "truck-helper",
  "bus-helper",
  "crane-helper",
  "tempo-driver",
  "tractor-transport",
  "other-driving"
];

/** 300+ Indian cities */
const cities = [
  "delhi",
  "mumbai",
  "bangalore",
  "hyderabad",
  "chennai",
  "kolkata",
  "pune",
  "ahmedabad",
  "jaipur",
  "surat",
  "lucknow",
  "kanpur",
  "nagpur",
  "indore",
  "thane",
  "bhopal",
  "visakhapatnam",
  "patna",
  "vadodara",
  "ghaziabad",
  "ludhiana",
  "agra",
  "nashik",
  "faridabad",
  "meerut",
  "rajkot",
  "varanasi",
  "srinagar",
  "aurangabad",
  "amritsar",
  "navi-mumbai",
  "allahabad",
  "ranchi",
  "howrah",
  "coimbatore",
  "jabalpur",
  "gwalior",
  "vijayawada",
  "jodhpur",
  "madurai",
  "raipur",
  "kota",
  "guwahati",
  "chandigarh",
  "mysore",
  "gurgaon",
  "aligarh",
  "jalandhar",
  "bhubaneswar",
  "salem",
  "warangal",
  "guntur",
  "gorakhpur",
  "bikaner",
  "amravati",
  "noida",
  "jamshedpur",
  "bhilai",
  "cuttack",
  "kochi",
  "nellore",
  "dehradun",
  "durgapur",
  "asansol",
  "rourkela",
  "nanded",
  "kolhapur",
  "ajmer",
  "ujjain",
  "siliguri",
  "jhansi",
  "jammu",
  "mangalore",
  "tirunelveli",
  "gaya",
  "jalgaon",
  "udaipur",
  "tiruppur",
  "kozhikode",
  "kurnool",
  "rajahmundry",
  "bokaro",
  "bellary",
  "patiala",
  "agartala",
  "bhagalpur",
  "rohtak",
  "bhilwara",
  "muzaffarpur",
  "ahmednagar",
  "mathura",
  "kollam",
  "bilaspur",
  "satara",
  "shivamogga",
  "thrissur",
  "alwar",
  "nizamabad"
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
    url: `${BASE_URL}/hire-workers`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/category`,
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
    url: `${BASE_URL}/workers/manpower-supplier`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/workers/labor-supplier`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/workers/labor-contractor`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/service`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/pricing`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  },

  {
    url: `${BASE_URL}/about`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/contact`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  },

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
  }
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