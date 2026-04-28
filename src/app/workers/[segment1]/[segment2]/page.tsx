import { notFound } from "next/navigation";
import type { Metadata } from "next";
export const dynamic = 'force-dynamic';
export const revalidate = 3600;
import Link from "next/link";
import {
  isCity,
  isWorkerCategory,
  isWorkerType,
  formatLabel,
  workerTypes,
  workerCategories,
  cities,
} from "../../../../lib/workerData";
import HeroSub from "@/components/SharedComponent/HeroSub";
import UrgentWorker from "@/components/Home/UrgentDonation";

type PageProps = {
  params: Promise<{
    segment1: string;
    segment2: string;
  }>;
};

const BASE_URL = "https://www.bookmyworkers.com";

export async function generateStaticParams() {
  const typePages = workerTypes.flatMap((type) =>
    workerCategories.map((category) => ({
      segment1: type,
      segment2: category,
    }))
  );

  const cityPages = cities.flatMap((city) =>
    workerCategories.map((category) => ({
      segment1: city,
      segment2: category,
    }))
  );

  return [...typePages, ...cityPages];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { segment1, segment2 } = await params;

  const first = segment1.toLowerCase();
  const second = segment2.toLowerCase();

  if (!isWorkerCategory(second) || (!isWorkerType(first) && !isCity(first))) {
    return {
      title: "Page Not Found | BookMyWorkers",
      description: "The page you are looking for does not exist.",
    };
  }

  const formattedFirst = formatLabel(first);
  const formattedSecond = formatLabel(second);
  const url = `${BASE_URL}/workers/${first}/${second}`;

  const isType = isWorkerType(first);

  const title = isType
    ? `Hire ${formattedSecond} ${formattedFirst} Workers | BookMyWorkers`
    : `Hire ${formattedSecond} Workers in ${formattedFirst} | BookMyWorkers`;

  const description = isType
    ? `Find ${formattedFirst.toLowerCase()} ${formattedSecond.toLowerCase()} workers on BookMyWorkers. Connect with workers, suppliers, contractors, and manpower providers for trusted hiring support.`
    : `Find ${formattedSecond.toLowerCase()} workers in ${formattedFirst} on BookMyWorkers. Hire skilled, semi-skilled, and unskilled workers for daily work, contract work, and project-based needs.`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "BookMyWorkers",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function WorkerDynamicPage({ params }: PageProps) {
  const { segment1, segment2 } = await params;

  const first = segment1.toLowerCase();
  const second = segment2.toLowerCase();

  const validCategory = isWorkerCategory(second);
  const typePage = isWorkerType(first);
  const cityPage = isCity(first);

  if (!validCategory || (!typePage && !cityPage)) {
    notFound();
  }

  const formattedFirst = formatLabel(first);
  const formattedSecond = formatLabel(second);

  const heroTitle = typePage
    ? `${formattedSecond} ${formattedFirst} Workers`
    : `${formattedSecond} Workers in ${formattedFirst}`;

  const heading = typePage
    ? `Find ${formattedSecond} for ${formattedFirst} Worker Requirements`
    : `Find ${formattedSecond} Workers in ${formattedFirst}`;

  const description = typePage
    ? `BookMyWorkers helps employers, contractors, suppliers, and manpower agencies connect with ${formattedFirst.toLowerCase()} ${formattedSecond.toLowerCase()} workers quickly and easily.`
    : `BookMyWorkers helps you find ${formattedSecond.toLowerCase()} workers in ${formattedFirst} for daily work, urgent requirements, contract hiring, and project-based manpower needs.`;

  const relatedWorkerTypes = workerTypes.filter((type) => type !== first).slice(0, 3);
  const popularCities = cities.filter((city) => city !== first).slice(0, 12);
  const relatedCategories = workerCategories.filter((category) => category !== second).slice(0, 12);

  return (
    <>
      <HeroSub title={heroTitle} />

      <section className="bg-white py-16 dark:bg-slate-950 lg:py-24">
        <div className="container mx-auto max-w-[1200px] px-4">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
              BookMyWorkers
            </span>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              {heading}
            </h1>

            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              {description}
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl space-y-12">
            {/* Intro */}
            <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                Reliable manpower support through BookMyWorkers
              </h2>

              <div className="space-y-5 text-base leading-8 text-slate-700 dark:text-slate-300">
                <p>
                  BookMyWorkers is a trusted platform that helps employers,
                  contractors, agencies, suppliers, and manpower seekers connect
                  with workers across multiple categories. Whether you need
                  workers for short-term tasks, urgent manpower, daily work, or
                  long-term project requirements, our platform helps simplify
                  the search process.
                </p>

                <p>
                  This page is specially designed for people looking for{" "}
                  <strong>{formattedSecond}</strong>{" "}
                  {typePage ? (
                    <>
                      under the <strong>{formattedFirst}</strong> worker segment.
                    </>
                  ) : (
                    <>
                      in <strong>{formattedFirst}</strong>.
                    </>
                  )}{" "}
                  Our goal is to make worker discovery easier, faster, and more
                  accessible for businesses as well as individuals.
                </p>

                <p>
                  BookMyWorkers supports skilled, semi-skilled, and unskilled
                  worker hiring across construction, domestic, industrial,
                  transport, maintenance, warehouse, delivery, and service-based
                  work requirements. Employers can explore available worker
                  categories and connect according to the type of work they need.
                </p>
              </div>
            </div>

            {/* Why choose */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {[
                {
                  title: "Multiple worker categories",
                  text: "Explore workers across construction, domestic, transport, maintenance, industrial, and support services.",
                },
                {
                  title: "Useful for urgent and regular hiring",
                  text: "Whether you need immediate manpower or repeated hiring support, BookMyWorkers helps streamline the process.",
                },
                {
                  title: "Support for employers and suppliers",
                  text: "Companies, contractors, agencies, and worker suppliers can all use the platform for manpower needs.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Service content */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                Services available for {formattedSecond}
                {cityPage ? ` in ${formattedFirst}` : ""}
              </h2>

              <div className="mt-5 space-y-5 text-base leading-8 text-slate-700 dark:text-slate-300">
                <p>
                  If you are looking for <strong>{formattedSecond}</strong>{" "}
                  workers, BookMyWorkers can help you explore manpower support
                  for many different kinds of work requirements. Depending on
                  the category, workers may be needed for daily work, site work,
                  repair support, installation work, operations support,
                  contract-based assignments, or long-term project needs.
                </p>

                <p>
                  {cityPage ? (
                    <>
                      In <strong>{formattedFirst}</strong>, manpower demand can
                      vary across residential, commercial, industrial, and
                      project-based sectors. BookMyWorkers helps users discover
                      worker options in the city and connect based on their
                      category-specific requirements.
                    </>
                  ) : (
                    <>
                      Under the <strong>{formattedFirst}</strong> segment,
                      employers can find worker options suitable for different
                      business sizes and project requirements. This helps create
                      better visibility for both workers and manpower seekers.
                    </>
                  )}
                </p>

                <p>
                  Along with <strong>{formattedSecond}</strong>, users can also
                  explore many other worker categories and locations through the
                  platform. This makes BookMyWorkers useful not just for one
                  category, but for wider manpower discovery and hiring support.
                </p>
              </div>
            </div>

            {/* Explore worker types */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                Explore more worker types
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-600 dark:text-slate-300">
                BookMyWorkers supports skilled, semi-skilled, and unskilled
                manpower requirements across different industries and job roles.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {(typePage ? relatedWorkerTypes : workerTypes).map((type) => (
                  <Link
                    key={type}
                    href={`/workers/${type}/${second}`}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                  >
                    {formatLabel(type)} {formattedSecond}
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular cities */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                Explore {formattedSecond} workers in popular cities
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-600 dark:text-slate-300">
                Services are available for different worker categories across
                major cities. Explore city-based worker pages for broader hiring
                options.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {popularCities.map((city) => (
                  <Link
                    key={city}
                    href={`/workers/${city}/${second}`}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                  >
                    {formattedSecond} in {formatLabel(city)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Related categories */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                Explore other worker categories
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-600 dark:text-slate-300">
                In addition to {formattedSecond}, BookMyWorkers also provides
                access to many other worker categories across skill levels and
                locations.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {relatedCategories.map((category) => (
                  <Link
                    key={category}
                    href={`/workers/${first}/${category}`}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                  >
                    {formatLabel(category)}
                  </Link>
                ))}
              </div>
            </div>

            {/* FAQ style content */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                Frequently searched manpower needs
              </h2>

              <div className="mt-6 space-y-5">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Can I find different types of workers on BookMyWorkers?
                  </h3>
                  <p className="mt-2 text-base leading-8 text-slate-600 dark:text-slate-300">
                    Yes, BookMyWorkers supports multiple worker categories
                    including skilled, semi-skilled, and unskilled manpower for
                    different industries and work requirements.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Is the service useful for contractors, agencies, and companies?
                  </h3>
                  <p className="mt-2 text-base leading-8 text-slate-600 dark:text-slate-300">
                    Yes, the platform is useful for employers, contractors,
                    manpower suppliers, agencies, and companies looking for
                    workers according to category and location.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Can I explore workers in other cities and categories too?
                  </h3>
                  <p className="mt-2 text-base leading-8 text-slate-600 dark:text-slate-300">
                    Yes, BookMyWorkers provides pages for different worker
                    categories and major cities, helping users discover broader
                    manpower options according to their needs.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 p-8 text-white shadow-xl sm:p-10">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-extrabold sm:text-3xl">
                    Explore more worker categories and city-based services
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-blue-50">
                    BookMyWorkers supports multiple worker categories, skill
                    types, and service locations. Whether you need workers for
                    construction, domestic support, transport, industrial work,
                    or general labour requirements, you can explore more options
                    through our platform.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
                  <Link
                    href="/category"
                    className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-slate-100"
                  >
                    Explore Categories
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-xl border border-white/50 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <UrgentWorker />
    </>
  );
}