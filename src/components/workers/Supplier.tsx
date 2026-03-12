import React from "react";
import Image from "next/image";

const supplierBenefits = [
  "Get direct business opportunities from employers",
  "Expand your worker supply network across nearby locations",
  "Receive manpower requirements from multiple industries",
  "Increase earning opportunities through worker supply commissions",
  "Showcase your available worker groups in one place",
  "Build trust with employers through a professional digital presence",
  "Support skilled, semi-skilled, and unskilled worker demand",
  "Grow long-term business relationships with employers and contractors",
];

const supplierCategories = [
  "Group Labour Supplier",
  "Skilled Labour Supplier",
  "Unskilled Labour Supplier",
  "Contract Labour Supplier",
  "Construction Workforce Supplier",
  "Factory Labour Supplier",
  "Housekeeping Staff Supplier",
  "Driver / Transport Workforce Supplier",
  "Loading / Unloading Labour Supplier",
  "Domestic Worker Supplier",
  "Industrial Worker Supplier",
  "Multi-category Workforce Supplier",
];

const SupplierPage: React.FC = () => {
  return (
    <section className="bg-white py-16 dark:bg-slate-950 lg:py-24">
      <div className="container mx-auto max-w-[1200px] px-4">
        {/* Top Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
            For Suppliers
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Grow Your Workforce Supply Business with BookMyWorker
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            BookMyWorker helps suppliers connect with employers who need workers
            for construction, factory, domestic, industrial, transport, and many
            other manpower requirements. If you manage a group of workers, this
            platform gives you a professional way to reach more employers and
            grow your business.
          </p>
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Left Image */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <div className="relative h-[420px] w-full sm:h-[500px]">
              <Image
                src="/images/about/supplier-page.jpg"
                alt="BookMyWorker supplier network"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="max-w-md rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  More Employers. More Worker Supply Opportunities.
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-100 sm:text-base">
                  Manage your workforce better, reach genuine demand faster, and
                  grow your manpower supply business with stronger visibility.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <div className="space-y-6 leading-8 text-slate-700 dark:text-slate-300">
              <p>
                <span className="font-semibold text-slate-900 dark:text-white">
                  BookMyWorker
                </span>{" "}
                is designed to support suppliers who provide groups of workers to
                employers, contractors, businesses, and individuals. If you are
                supplying manpower for different categories of work, our platform
                helps you connect with employers who are actively searching for
                workers near their location.
              </p>

              <p>
                Suppliers often manage teams of{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  skilled, semi-skilled, and unskilled workers
                </span>{" "}
                and need a reliable way to find more business opportunities.
                Through BookMyWorker, suppliers can present their workforce
                availability, respond to manpower demand, and build stronger
                connections with employers across industries.
              </p>

              <p>
                Our platform can help suppliers receive work opportunities where
                they may earn commission or service value directly from the
                employer, or through opportunities connected via BookMyWorker,
                depending on the working arrangement. This creates a better
                ecosystem where suppliers can expand their business and workers
                can reach more job opportunities.
              </p>

              <p>
                Whether you supply labour for construction, factory work,
                housekeeping, transport, loading, domestic services, or other
                manpower needs, BookMyWorker helps reduce dependence on limited
                local contacts and gives you access to a broader digital
                marketplace.
              </p>

              <p>
                By joining BookMyWorker, suppliers can improve visibility,
                increase manpower utilization, manage work opportunities more
                efficiently, and build long-term professional relationships with
                employers who regularly require workforce support.
              </p>
            </div>

            {/* Benefits */}
          
          </div>
        </div>
  <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {supplierBenefits.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
                    ✓
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
        {/* Supplier Categories */}
        <div className="mt-16 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Supplier Types We Support
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
              BookMyWorker supports different supplier categories who manage and
              provide groups of workers for multiple industries and manpower
              requirements.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {supplierCategories.map((category, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        {/* Why Suppliers Choose Us */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Better Visibility
            </h4>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Your workforce supply business gets better digital visibility, so
              more employers can discover your manpower services when they need
              workers.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              More Demand Access
            </h4>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Reach employers looking for worker groups in construction,
              factories, domestic work, transport, industrial work, and other
              categories.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Business Growth
            </h4>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Build long-term business opportunities by supplying workers more
              consistently and strengthening relationships with employers and
              work providers.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 p-8 text-white shadow-xl sm:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-extrabold sm:text-3xl">
                Join BookMyWorker as a Supplier
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-blue-50">
                If you supply groups of workers and want to connect with more
                employers, generate better opportunities, and grow your manpower
                supply business, BookMyWorker can help you move to the next
                level.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <a
                href="/app/register"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-slate-100"
              >
                Register as Supplier
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/50 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupplierPage;