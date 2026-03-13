import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
import SupplierPage from "@/components/workers/Supplier";


export const metadata: Metadata = {
  metadataBase: new URL("https://www.bookmyworkers.com"),

  title:
    "For Suppliers | Manpower & Labour Supplier Platform | Grow Your Worker Supply Business | BookMyWorker",

  description:
    "Join BookMyWorker as a manpower supplier and connect with employers, contractors, and companies looking for skilled, semi-skilled, and unskilled workers. Supply labour groups, expand your workforce network, and grow your manpower supply business across construction, factory, warehouse, and service industries.",

  keywords: [
    // Brand
    "BookMyWorker",
    "book my worker",
    "BookMyWorker suppliers",
    "BookMyWorker manpower supplier",
    "BookMyWorker labour supplier",

    // Platform intent
    "worker supplier platform",
    "labour supplier platform",
    "manpower supplier platform",
    "online manpower supply platform",
    "online labour supply platform",
    "worker supply marketplace",
    "labour contractor platform",

    // Supplier intent
    "manpower supplier",
    "labour supplier",
    "worker supplier",
    "manpower provider",
    "worker supply contractor",
    "labour supply contractor",
    "worker supply company",
    "labour supply agency",
    "manpower supply agency",

    // Near me searches
    "manpower supplier near me",
    "labour supplier near me",
    "worker supplier near me",
    "labour contractor near me",
    "construction labour supplier near me",

    // Industry use cases
    "construction labour supplier",
    "factory labour supplier",
    "warehouse labour supplier",
    "building labour supplier",
    "industrial manpower supplier",

    // Skill based supply
    "skilled labour supplier",
    "semi skilled labour supplier",
    "unskilled labour supplier",

    // Business growth intent
    "manpower supply business",
    "labour supply business",
    "worker supply business",
    "grow labour supply network",
    "expand manpower business",

    // B2B hiring intent
    "supply workers to companies",
    "supply workers to contractors",
    "supply workers to construction sites",
    "supplier workers to employers",

    // Group labour intent
    "group labour supplier",
    "labour group supplier",
    "worker group supplier",
    "contract labour supplier",
  ],

  alternates: {
    canonical: "https://www.bookmyworkers.com/suppliers",
  },

  category: "manpower supply platform",

  openGraph: {
    title:
      "For Suppliers | Manpower & Labour Supplier Platform | BookMyWorker",
    description:
      "BookMyWorker helps manpower suppliers connect with employers, contractors, and companies needing worker groups across construction, factory, and service industries.",
    url: "https://www.bookmyworkers.com/suppliers",
    siteName: "BookMyWorker",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.bookmyworkers.com/images/seo/supplier-og.jpg",
        width: 1200,
        height: 630,
        alt: "BookMyWorker Manpower Supplier Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "For Suppliers | Join BookMyWorker Manpower Supply Platform",
    description:
      "Supply workers to employers, contractors, and companies across India. Grow your labour supply business with BookMyWorker.",
    images: [
      "https://www.bookmyworkers.com/images/seo/supplier-og.jpg",
    ],
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
};

const page = () => {
  return (
    <>
      <HeroSub title="For Suppliers" />
      <SupplierPage />
    </>
  );
};

export default page;