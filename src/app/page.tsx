import React from "react";
import { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import Help from "@/components/Home/Help";
import Causes from "@/components/Home/Causes";
import FutureEvents from "@/components/Home/FutureEvents";
import UrgentDonation from "@/components/Home/UrgentDonation";
import Newsletter from "@/components/Home/NewsLetter";
import Testimonial from "@/components/Home/Testimonial";
import Volunteer from "@/components/SharedComponent/Volunteer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bookmyworkers.com"),

  title:
    "BookMyWorker | Hire Skilled, Semi-Skilled & Unskilled Workers Across India",

  description:
    "BookMyWorker is a worker marketplace for employers, suppliers, contractors, and workers. Hire skilled, semi-skilled, and unskilled workers such as electricians, plumbers, painters, drivers, helpers, factory workers, and construction labour across India.",

  keywords: [
    "BookMyWorker",
    "book my worker",
    "hire workers",
    "hire workers online",
    "workers near me",
    "worker marketplace",
    "worker hiring platform",
    "manpower supplier",
    "labour supplier",
    "labour contractor",
    "labour supply agency",
    "manpower supply platform",
    "hire skilled workers",
    "hire semi skilled workers",
    "hire unskilled workers",
    "construction workers near me",
    "daily wage workers",
    "helper near me",
    "hire helper",
    "electrician near me",
    "hire electrician",
    "plumber near me",
    "hire plumber",
    "painter near me",
    "hire painter",
    "carpenter near me",
    "driver near me",
    "factory workers near me",
    "housekeeping staff near me",
    "domestic workers near me",
    "workers for employers",
    "workers for contractors",
    "workers for companies",
    "supplier workers to employers",
    "worker platform for suppliers",
    "job platform for workers",
    "find workers in India",
    "hire labour in India",
    "worker booking platform",
    "all category workers platform",
  ],

  alternates: {
    canonical: "https://www.bookmyworkers.com",
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
      "BookMyWorker | Hire Skilled, Semi-Skilled & Unskilled Workers Across India",
    description:
      "BookMyWorker helps employers, suppliers, contractors, and companies connect with skilled, semi-skilled, and unskilled workers across multiple categories and cities in India.",
    url: "https://www.bookmyworkers.com",
    siteName: "BookMyWorker",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.bookmyworkers.com/images/seo/home-og.jpg",
        width: 1200,
        height: 630,
        alt: "BookMyWorker Worker Hiring Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "BookMyWorker | Worker Marketplace for Employers, Suppliers & Workers",
    description:
      "Hire electricians, plumbers, helpers, drivers, painters, construction workers, and more through BookMyWorker across India.",
    images: ["https://www.bookmyworkers.com/images/seo/home-og.jpg"],
  },

  category: "worker marketplace",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Help />
      <Causes />
      {/* <FutureEvents /> */}
      <UrgentDonation />
      {/* <Newsletter /> */}
      <Testimonial />
      <Volunteer />
    </main>
  );
}