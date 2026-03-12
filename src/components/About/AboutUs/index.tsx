import React from "react";
import Image from "next/image";
const features = [
  "Verified Skilled & Unskilled Workforce",
  "Extensive Workforce Network",
  "Fast & Hassle-Free Hiring",
  "Trusted by Businesses & Individuals",
  "Transparent & Efficient Process",
  "Empowering Workers, Supporting Growth",
];

const AboutUs: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-dark">
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left Image */}
          <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/images/about/about-us.jpg"
              alt="About BookMyWorker"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right Content */}
{/* Right Content */}
<div>
  <div className="space-y-6 leading-8 text-gray-700 dark:text-gray-300">
    <p>
      <span className="font-semibold text-gray-500 dark:text-gray-400">
        BookMyWorker
      </span>{" "}
      is a digital platform designed to connect employers with skilled,
      semi-skilled, and unskilled workers across India. Instead of acting as a
      manpower supplier, we provide a transparent marketplace where employers can
      easily discover and hire workforce providers and workers near their
      location.
    </p>

    <p>
      Our platform simplifies the process of finding reliable manpower. Employers
      can post their requirements, explore available workers or service agents in
      nearby areas, and choose the most suitable workforce based on their needs.
      This helps businesses save time, reduce hiring effort, and access manpower
      quickly.
    </p>

    <p>
      For workforce suppliers and service agents, BookMyWorker provides an
      opportunity to connect with businesses that require manpower. Suppliers can
      showcase their available workers, receive job requests, and grow their
      network by working with multiple employers across industries.
    </p>

    <p>
      We also empower workers by helping them access more employment
      opportunities. Through our platform, workers can connect with verified
      suppliers and employers, enabling them to find consistent work and improve
      their livelihood.
    </p>

    <p>
      BookMyWorker is built to create a trusted ecosystem where employers,
      suppliers, and workers can collaborate efficiently. By bridging the gap
      between demand and supply, we aim to make manpower hiring faster,
      transparent, and accessible for everyone.
    </p>
  </div>


</div>
  {/* Features */}
  <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
    {features.map((item, index) => (
      <div
        key={index}
        className="flex items-center gap-3 rounded-lg bg-gray-100 px-4 py-4 font-medium text-gray-700 dark:bg-slate-800 dark:text-gray-200"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
          ✓
        </span>
        {item}
      </div>
    ))}
  </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;