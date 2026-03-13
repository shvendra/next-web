import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
import SupplierPage from "@/components/workers/Supplier";

export const metadata: Metadata = {
  title: "For Suppliers | Grow Your Workforce Supply Business | BookMyWorker",

  description:
    "BookMyWorker helps manpower suppliers connect with employers who need skilled and unskilled workers. Expand your worker supply network and grow your manpower business across multiple industries.",

  keywords: [
    "BookMyWorker supplier",
    "labour supplier platform",
    "manpower supplier India",
    "worker supplier business",
    "construction labour supplier",
    "contract labour supplier",
    "group labour supplier",
    "skilled labour supplier",
    "manpower supply platform",
    "BookMyWorker suppliers",
  ],

  alternates: {
    canonical: "https://www.bookmyworkers.com/suppliers",
  },

  openGraph: {
    title: "For Suppliers | Grow Your Workforce Supply Business | BookMyWorker",
    description:
      "BookMyWorker connects labour suppliers with employers who need skilled and unskilled workers. Expand your workforce supply network and grow your manpower business.",
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
    title: "For Suppliers | BookMyWorker",
    description:
      "Join BookMyWorker as a manpower supplier and connect with employers looking for worker groups across industries.",
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