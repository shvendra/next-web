import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
import WorkerPage from "@/components/workers/Worker";

export const metadata: Metadata = {
  title: "For Workers | Find Work Opportunities Near You | BookMyWorker",

  description:
    "BookMyWorker helps skilled, semi-skilled, and unskilled workers find work opportunities near their location. Explore jobs without daily hard searching or waiting at labour squares.",

  keywords: [
    "workers page BookMyWorker",
    "find work near me",
    "jobs for workers in India",
    "skilled workers jobs",
    "unskilled workers jobs",
    "construction worker jobs",
    "daily wage worker jobs",
    "helper jobs near me",
    "labour work opportunities",
    "BookMyWorker for workers",
    "worker job platform India",
    "employment opportunities for workers",
  ],

  alternates: {
    canonical: "https://www.bookmyworkers.com/workers",
  },

  openGraph: {
    title: "For Workers | Find Work Opportunities Near You | BookMyWorker",
    description:
      "BookMyWorker helps workers connect with work opportunities faster. Skilled and unskilled workers can discover nearby jobs and improve employment access.",
    url: "https://www.bookmyworkers.com/workers",
    siteName: "BookMyWorker",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.bookmyworkers.com/images/seo/worker-page-og.jpg",
        width: 1200,
        height: 630,
        alt: "BookMyWorker Worker Opportunities",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "For Workers | Find Work Opportunities Near You | BookMyWorker",
    description:
      "Discover better work opportunities for skilled and unskilled workers with BookMyWorker.",
    images: ["https://www.bookmyworkers.com/images/seo/worker-page-og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const page = () => {
  return (
    <>
      <HeroSub title="For Workers" />
      <WorkerPage />
    </>
  );
};

export default page;