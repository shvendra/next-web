import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
import UrgentWorker from "@/components/Home/UrgentDonation";
import PricingPlan from "@/components/pricing/PricingPlan";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bookmyworkers.com"),

  title:
    "Contact BookMyWorker | Workforce Hiring Support & Business Enquiries",

  description:
    "Contact BookMyWorker for workforce hiring assistance, manpower supply enquiries, worker supplier partnerships, and employer support. Get help hiring skilled, semi-skilled, and unskilled workers across India.",

  keywords: [
    "BookMyWorker contact",
    "contact BookMyWorker",
    "BookMyWorker support",
    "hire workers support India",
    "workforce hiring support",
    "manpower enquiry",
    "labour hiring support",
    "worker supplier contact",
    "manpower supplier partnership",
    "business enquiry BookMyWorker",
    "employer hiring support",
    "contractor hiring enquiry",
    "labour supply enquiry",
    "worker marketplace support",
    "contact manpower platform India",
  ],

  alternates: {
    canonical: "https://www.bookmyworkers.com/contact",
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
      "Contact BookMyWorker | Workforce Hiring Support & Business Enquiries",
    description:
      "Get in touch with BookMyWorker for worker hiring support, manpower supply partnerships, and workforce solutions across India.",
    url: "https://www.bookmyworkers.com/contact",
    siteName: "BookMyWorker",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.bookmyworkers.com/images/seo/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact BookMyWorker Workforce Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact BookMyWorker Workforce Platform",
    description:
      "Reach BookMyWorker for hiring support, workforce enquiries, and supplier partnerships.",
    images: ["https://www.bookmyworkers.com/images/seo/og-image.jpg"],
  },

  category: "contact",
};

const page = () => {
  return (
    <>
      <HeroSub title="BookMyWorker Pricing Plans" />
      <PricingPlan />
      <UrgentWorker />
    </>
  );
};

export default page;