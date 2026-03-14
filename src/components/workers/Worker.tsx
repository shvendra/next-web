import React from "react";
import Image from "next/image";

const workerBenefits = [
  "Get work opportunities near your location",
  "No need to wait daily at labour square",
  "Suitable for skilled, semi-skilled, and unskilled workers",
  "Direct connection with employers and suppliers",
  "More chances of regular and faster work",
  "Easy profile visibility for multiple job categories",
  "Helpful for construction, factory, domestic, driver, helper, and other workers",
  "Supports better livelihood with consistent opportunities",
];

const workerCategories = [
  "Construction Workers",
  "Mason / Rajmistri",
  "Painter",
  "Electrician",
  "Plumber",
  "Carpenter",
  "Factory Workers",
  "Helpers",
  "Drivers",
  "Housekeeping Staff",
  "Domestic Workers",
  "Loading / Unloading Workers",
];

const WorkerPage: React.FC = () => {
  return (
    <section className="bg-white py-16 dark:bg-slate-950 lg:py-24">
      <div className="container mx-auto max-w-[1200px] px-4">
        {/* Top Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
            For Workers
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Better Work Opportunities for Every Worker
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            BookMyWorker helps skilled, semi-skilled, and unskilled workers find
            work opportunities without the struggle of daily searching. Our
            platform connects workers with employers and suppliers in a simple,
            faster, and more reliable way.
          </p>
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Left Image */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <div className="relative  w-full sm:h-[500px]">
              <Image
                src="/images/about/worker-page.jpg"
                alt="BookMyWorker workers"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="max-w-md rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  Work Made Easier for Workers
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-100 sm:text-base">
                  Find work opportunities, connect with trusted employers and
                  suppliers, and build better earning opportunities through one
                  platform.
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
                is built to support workers across multiple categories by making
                job discovery easier and faster. Many workers spend valuable time
                searching for work every day, waiting at labour squares, or
                depending only on local contacts. Our platform reduces that
                struggle by helping workers connect with real work opportunities
                in nearby areas.
              </p>

              <p>
                Whether you are a{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  skilled worker
                </span>{" "}
                like a mason, electrician, plumber, carpenter, painter, machine
                operator, or driver, or an{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  unskilled worker
                </span>{" "}
                such as helper, loader, housekeeping staff, domestic worker, or
                general labourer, BookMyWorker gives you a better way to be seen
                by employers and manpower providers.
              </p>

              <p>
                Our goal is to create more employment access for workers by
                reducing unnecessary effort in job searching. Workers can benefit
                from wider visibility, more chances of getting work, and better
                connections with people who genuinely need manpower.
              </p>

              <p>
                Instead of spending long hours waiting for uncertain work,
                workers can use BookMyWorker as a platform that opens access to
                trusted opportunities across construction, household services,
                transport, industrial work, and many other sectors.
              </p>
            </div>

  
          </div>
        </div>
 <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {workerBenefits.map((item, index) => (
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
        {/* Worker Categories */}
        <div className="mt-16 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Workers We Support
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
              BookMyWorker is designed to support different categories of
              workers across industries and daily work needs.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {workerCategories.map((category, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 p-8 text-white shadow-xl sm:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-extrabold sm:text-3xl">
                Join BookMyWorker and Explore Better Work Opportunities
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-blue-50">
                If you are a worker looking for more job opportunities, less
                dependency on daily labour square waiting, and a better way to
                connect with work providers, BookMyWorker can help you move
                forward.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <a
                href="https://play.google.com/store/apps/details?id=com.app.myworker&pcampaignid=web_share"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-slate-100"
              >
                Register as Worker
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

export default WorkerPage;