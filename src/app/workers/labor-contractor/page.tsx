import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
import SupplierPage from "@/components/workers/Supplier";

export const metadata: Metadata = {
  title: "For Suppliers | Grow Your Workforce Supply Business | BookMyWorker",

  description:
    "BookMyWorker helps manpower suppliers connect with employers who need skilled, semi-skilled, and unskilled workers. Expand your worker supply network, supply labour groups, and grow your manpower supply business across construction, factory, and service industries.",

  keywords: [
    "BookMyWorker supplier",
    "bookmyworker labour supplier",
    "bookmyworker manpower supplier",
    "manpower supplier India",
    "labour supplier platform",
    "worker supplier platform",
    "manpower supply platform",
    "worker supply marketplace",
    "labour contractor platform",

    "manpower supplier",
    "labour supplier",
    "worker supplier",
    "manpower supplier near me",
    "labour supplier near me",
    "worker supplier near me",

    "labour contractor",
    "labour contractor near me",
    "construction labour contractor",
    "contract labour supplier",
    "construction labour supplier",
    "building labour supplier",

    "skilled labour supplier",
    "unskilled labour supplier",
    "semi skilled labour supplier",

    "worker supply agency",
    "labour supply agency",
    "manpower supply agency",
    "worker supply company",

    "manpower supply business",
    "labour supply business",
    "worker supply business",

    "supplier workers to companies",
    "supplier workers to contractors",
    "supply workers to construction sites",

    "labour supply for construction",
    "factory labour supplier",
    "warehouse labour supplier",

    "group labour supplier",
    "labour group supplier",
    "workers group supplier",

    "manpower provider",
    "manpower provider near me",

    "worker supply contractor",
    "labour supply contractor",

    "supplier for workers",
    "worker supplier for employers",
    "workers supplier platform",

    "supply workers online",
    "online labour supply platform",
    "online manpower supply platform",
  ],

  alternates: {
    canonical: "https://www.bookmyworkers.com/suppliers",
  },

  openGraph: {
    title: "For Suppliers | Grow Your Workforce Supply Business | BookMyWorker",
    description:
      "Join BookMyWorker as a manpower supplier and connect with employers who need skilled, semi-skilled, and unskilled workers across construction, factory, and service industries.",
    url: "https://www.bookmyworkers.com/suppliers",
    siteName: "BookMyWorker",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.bookmyworkers.com/images/seo/supplier-og.jpg",
        width: 1200,
        height: 630,
        alt: "BookMyWorker Supplier Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "For Suppliers | BookMyWorker Supplier Platform",
    description:
      "Join BookMyWorker as a manpower supplier and supply worker groups to employers, contractors, and companies across India.",
    images: ["https://www.bookmyworkers.com/images/seo/supplier-og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
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