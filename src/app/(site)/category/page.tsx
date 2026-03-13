import HeroSub from "@/components/SharedComponent/HeroSub";
import CategoryList from "@/components/Cause/CategoryList";
import Volunteer from "@/components/SharedComponent/Volunteer";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bookmyworkers.com"),

  title:
    "Worker Categories | Hire Skilled, Semi-Skilled & Unskilled Workers | BookMyWorker",

  description:
    "Explore worker categories on BookMyWorker and hire skilled, semi-skilled, and unskilled workers across India. Find construction workers, electricians, plumbers, drivers, helpers, factory workers, warehouse staff, and many other workforce categories.",

  keywords: [
    "BookMyWorker",
    "worker categories",
    "hire workers India",
    "worker categories India",
    "skilled workers India",
    "semi skilled workers India",
    "unskilled workers India",
    "construction workers India",
    "factory workers India",
    "warehouse workers India",
    "helper workers India",
    "electrician workers India",
    "plumber workers India",
    "driver workers India",
    "labour categories India",
    "manpower categories",
    "worker marketplace India",
    "find workers near me",
    "hire labour India",
    "labour hiring platform",
  ],

  alternates: {
    canonical: "https://www.bookmyworkers.com/worker-category",
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
      "Worker Categories | Hire Skilled, Semi-Skilled & Unskilled Workers | BookMyWorker",
    description:
      "Browse worker categories on BookMyWorker and hire skilled, semi-skilled, and unskilled workers across construction, factory, warehouse, household, and service industries.",
    url: "https://www.bookmyworkers.com/worker-category",
    siteName: "BookMyWorker",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.bookmyworkers.com/images/seo/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BookMyWorker Worker Categories",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Worker Categories | Hire Skilled & Unskilled Workers | BookMyWorker",
    description:
      "Explore worker categories and hire electricians, plumbers, helpers, drivers, construction workers, and more through BookMyWorker.",
    images: ["https://www.bookmyworkers.com/images/seo/og-image.jpg"],
  },

  category: "worker marketplace",
};

const Page = () => {
  return (
    <>
      <HeroSub title="Worker Categories" />
      <CategoryList />
      <Volunteer />
    </>
  );
};

export default Page;