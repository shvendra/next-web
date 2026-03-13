import React from "react";
import AboutUs from "@/components/About/AboutUs";
import HeroSub from "@/components/SharedComponent/HeroSub";
import UrgentWorker from "@/components/Home/UrgentDonation";

import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bookmyworkers.com"),

  title:
    "About BookMyWorker | Worker Hiring & Manpower Supply Platform in India",

  description:
    "BookMyWorker is a workforce hiring platform in India connecting employers, contractors, manpower suppliers, and workers. Hire skilled, semi-skilled, and unskilled workers such as electricians, plumbers, helpers, drivers, and construction labour across multiple cities.",

  keywords: [
    "BookMyWorker",
    "about BookMyWorker",
    "worker hiring platform India",
    "manpower hiring platform",
    "labour marketplace India",
    "hire workers India",
    "construction workers India",
    "skilled workers India",
    "semi skilled workers India",
    "unskilled workers India",
    "labour supplier platform",
    "manpower supply platform",
    "worker marketplace India",
    "labour contractor platform",
    "hire electricians India",
    "hire plumbers India",
    "hire helpers India",
    "factory workers India",
    "driver hiring platform",
    "construction labour platform",
  ],

  alternates: {
    canonical: "https://www.bookmyworkers.com/about",
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
      "About BookMyWorker | Workforce Hiring & Manpower Platform India",
    description:
      "BookMyWorker connects employers, contractors, suppliers, and workers through a trusted worker marketplace. Find skilled, semi-skilled, and unskilled workers across India.",
    url: "https://www.bookmyworkers.com/about",
    siteName: "BookMyWorker",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.bookmyworkers.com/images/seo/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BookMyWorker Workforce Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About BookMyWorker Workforce Platform",
    description:
      "BookMyWorker helps employers hire skilled, semi-skilled, and unskilled workers across India.",
    images: ["https://www.bookmyworkers.com/images/seo/og-image.jpg"],
  },

  category: "workforce hiring platform",
};

const AboutPage = () => {
  return (
    <>
      <HeroSub title="About BookMyWorker" />

      <AboutUs />

      <UrgentWorker />
    </>
  );
};

export default AboutPage;