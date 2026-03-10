"use client";

import { useContext, useState } from "react";
import Slider from "react-slick";
import DonationFormContext from "@/app/context/donationContext";
import { useRouter } from "next/navigation";
import {
  heroSliderSettings,
  heroHeadlines,
  heroBgImages,
} from "../../data/heroSlider";
import { WorkerCategoryData, indianStates} from "@/app/api/data"



const cityOptions = [
  // Madhya Pradesh
  "Bhopal","Indore","Jabalpur","Gwalior","Ujjain","Sagar","Satna","Rewa",

  // Uttar Pradesh
  "Lucknow","Kanpur","Varanasi","Prayagraj","Agra","Meerut","Ghaziabad","Noida",
  "Bareilly","Aligarh","Moradabad","Gorakhpur",

  // Jharkhand
  "Ranchi","Jamshedpur","Dhanbad","Bokaro","Hazaribagh",

  // Maharashtra
  "Mumbai","Pune","Nagpur","Nashik","Aurangabad","Solapur","Kolhapur","Amravati",
  "Nanded","Akola",

  // Telangana
  "Hyderabad","Warangal","Karimnagar","Nizamabad","Khammam",

  // Gujarat
  "Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar","Jamnagar","Junagadh",
  "Gandhinagar",

  // Rajasthan
  "Jaipur","Jodhpur","Udaipur","Kota","Ajmer","Bikaner","Alwar","Bharatpur",

  // Delhi
  "New Delhi","Dwarka","Rohini","Karol Bagh",

  // Haryana
  "Gurgaon","Faridabad","Panipat","Ambala","Hisar","Rohtak","Karnal",

  // Punjab
  "Ludhiana","Amritsar","Jalandhar","Patiala","Bathinda","Mohali",

  // Chhattisgarh
  "Raipur","Bhilai","Durg","Bilaspur","Korba","Rajnandgaon",

  // Andhra Pradesh
  "Visakhapatnam","Vijayawada","Guntur","Tirupati","Kurnool","Nellore","Rajahmundry",

  // Karnataka
  "Bengaluru","Mysuru","Hubli","Mangalore","Belgaum","Davangere","Ballari",

  // Goa
  "Panaji","Margao","Vasco da Gama","Mapusa",

  // Uttarakhand
  "Dehradun","Haridwar","Roorkee","Haldwani","Rishikesh","Kashipur"
];

const Hero = () => {
  const donationInfo = useContext(DonationFormContext);

  const [jobTitle, setJobTitle] = useState("");
  const [city, setCity] = useState("");

const router = useRouter();

const handleCandidateSearch = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const query = new URLSearchParams();

  if (jobTitle) query.set("workerType", jobTitle);
  if (city) query.set("city", city);

  router.push(`/workers?${query.toString()}`);
};

  return (
    <section className="relative mt-20 min-h-[820px] overflow-hidden sm:mt-44 lg:mt-40 lg:min-h-[860px]">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <Slider {...heroSliderSettings}>
          {heroBgImages.map((img, index) => (
            <div key={index}>
              <div
                className="h-[820px] w-full bg-cover bg-center lg:h-[860px]"
                style={{ backgroundImage: `url(${img})` }}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/45" />

      {/* Centered content */}
      <div className="relative z-20 flex min-h-[820px] items-center justify-center px-4 py-10 lg:min-h-[860px]">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col items-center justify-center gap-6 lg:gap-8">
            {/* Main card */}
            <div className="w-full max-w-2xl rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur-sm sm:p-8 dark:bg-dark/90">
              <div className="mb-4 text-center">
                <Slider {...heroSliderSettings}>
                  {heroHeadlines.map((text, i) => (
                    <h1
                      key={i}
                      className="text-3xl font-bold leading-tight text-midnight_text dark:text-white md:text-4xl lg:text-5xl"
                    >
                      {text}
                    </h1>
                  ))}
                </Slider>
              </div>

              <p className="mb-6 text-center text-sm text-muted dark:text-white/60">
                BookMyWorker is a digital platform where workers, manpower
                suppliers, and employers connect in one place.
              </p>

              <div className="mb-6 grid grid-cols-3 border-t border-border dark:border-dark_border">
                <div className="border-r border-border px-3 py-4 text-center">
                  <p className="mb-1 text-xs text-muted">👨‍💼 Employers Served</p>
                  <h4 className="text-xl font-bold text-secondary">8k+</h4>
                </div>

                <div className="border-r border-border px-3 py-4 text-center">
                  <p className="mb-1 text-xs text-muted">🧑‍🏭 Workers Available</p>
                  <h4 className="text-xl font-bold text-secondary">4.5L+</h4>
                </div>

                <div className="px-3 py-4 text-center">
                  <p className="mb-1 text-xs text-muted">🏢 Suppliers Network</p>
                  <h4 className="text-xl font-bold text-secondary">10K+</h4>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() =>
                    window.open(
                      "https://www.bookmyworkers.com/app/register",
                      "_blank"
                    )
                  }
                  className="rounded-md border bg-linear-to-r from-error to-warning px-7 py-4 text-sm font-semibold text-white"
                >
                  Get Workers Instantly
                </button>
              </div>
            </div>

            {/* Search form below card */}
            <div className="w-full max-w-5xl rounded-[24px] border border-white/40 bg-white/92 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.20)] backdrop-blur-md sm:p-5 md:p-6">
              <div className="mb-4 flex items-center gap-2">
                <h3 className="text-lg font-semibold text-[#2F2F2F] sm:text-2xl">
                  Search skill & unskilled workers/agents
                </h3>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#4056C6] text-xs font-semibold text-[#4056C6]">
                  i
                </span>
              </div>

              <form
                onSubmit={handleCandidateSearch}
                className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-end"
              >
                <div className="md:col-span-5">
                  <label className="mb-2 block text-sm font-medium text-[#3A3A3A]">
                    Select Worker Category
                  </label>
                  <div className="relative">
                    <select
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="h-[52px] w-full appearance-none rounded-xl border border-[#D9DCE8] bg-[#F8F9FC] px-4 pr-10 text-sm text-[#2F2F2F] outline-none transition focus:border-[#4056C6] focus:bg-white"
                    >
                      <option value="">All Work</option>
                    {WorkerCategoryData.map((item) => (
      <option key={item.slug} value={item.title}>
        {item.title}
      </option>
    ))}
                    </select>

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#4056C6]">
                      ▼
                    </span>
                  </div>
                </div>

             <div className="md:col-span-5">
  <label className="mb-2 block text-sm font-medium text-[#3A3A3A]">
    Select city
  </label>

  <div className="relative">
    <input
      type="text"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      placeholder="Search or type city"
      className="h-[52px] w-full rounded-xl border border-[#D9DCE8] bg-[#F8F9FC] px-4 pr-10 text-sm text-[#2F2F2F] outline-none transition focus:border-[#4056C6] focus:bg-white"
    />

    {/* Dropdown */}
    {city && (
      <div className="absolute z-40 mt-1 max-h-52 w-full overflow-auto rounded-lg border bg-white shadow-lg">
        {cityOptions
          .filter((item) =>
            item.toLowerCase().includes(city.toLowerCase())
          )
          .map((item) => (
            <div
              key={item}
              onClick={() => setCity(item)}
              className="cursor-pointer px-4 py-2 text-sm hover:bg-[#F1F4FF]"
            >
              {item}
            </div>
          ))}
      </div>
    )}
  </div>
</div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="flex h-[52px] w-full items-center justify-center rounded-xl bg-[#4056C6] px-4 text-white shadow-md transition hover:bg-[#3347b2] md:min-w-[64px]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-3.5-3.5" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;