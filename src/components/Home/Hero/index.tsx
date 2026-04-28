"use client";

import { useContext, useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import DonationFormContext from "@/app/context/donationContext";
import { useRouter } from "next/navigation";
import {
  heroSliderSettings,
  heroHeadlines,
  heroBgImages,
} from "../../data/heroSlider";
import { WorkerCategoryData } from "@/app/api/data";
import toast, { Toaster } from 'react-hot-toast';

const cityOptions = [
  "delhi",
  "mumbai",
  "bangalore",
  "hyderabad",
  "chennai",
  "kolkata",
  "pune",
  "ahmedabad",
  "jaipur",
  "surat",
  "lucknow",
  "kanpur",
  "nagpur",
  "indore",
  "thane",
  "bhopal",
  "visakhapatnam",
  "patna",
  "vadodara",
  "ghaziabad",
  "ludhiana",
  "agra",
  "nashik",
  "faridabad",
  "meerut",
  "rajkot",
  "kalyan",
  "vasai-virar",
  "varanasi",
  "srinagar",
  "aurangabad",
  "dhanbad",
  "amritsar",
  "navi-mumbai",
  "allahabad",
  "ranchi",
  "howrah",
  "coimbatore",
  "jabalpur",
  "gwalior",
  "vijayawada",
  "jodhpur",
  "madurai",
  "raipur",
  "kota",
  "guwahati",
  "chandigarh",
  "solapur",
  "hubli",
  "tiruchirappalli",
  "bareilly",
  "moradabad",
  "mysore",
  "gurgaon",
  "aligarh",
  "jalandhar",
  "bhubaneswar",
  "salem",
  "warangal",
  "guntur",
  "bhiwandi",
  "saharanpur",
  "gorakhpur",
  "bikaner",
  "amravati",
  "noida",
  "jamshedpur",
  "bhilai",
  "cuttack",
  "firozabad",
  "kochi",
  "nellore",
  "bhavnagar",
  "dehradun",
  "durgapur",
  "asansol",
  "rourkela",
  "nanded",
  "kolhapur",
  "ajmer",
  "akola",
  "gulbarga",
  "jamnagar",
  "ujjain",
  "loni",
  "siliguri",
  "jhansi",
  "ulhasnagar",
  "jammu",
  "sangli-miraj-kupwad",
  "mangalore",
  "erode",
  "belgaum",
  "ambattur",
  "tirunelveli",
  "malegaon",
  "gaya",
  "jalgaon",
  "udaipur",
  "maheshtala",
  "tiruppur",
  "davanagere",
  "kozhikode",
  "kurnool",
  "rajpur-sonarpur",
  "rajahmundry",
  "bokaro",
  "south-dumdum",
  "bellary",
  "patiala",
  "gopalpur",
  "agartala",
  "bhagalpur",
  "muzaffarnagar",
  "bhatpara",
  "panihati",
  "latur",
  "dhule",
  "rohtak",
  "korba",
  "bhilwara",
  "berhampur",
  "muzaffarpur",
  "ahmednagar",
  "mathura",
  "kollam",
  "avadi",
  "kadapa",
  "kamarhati",
  "sambalpur",
  "bilaspur",
  "shahjahanpur",
  "satara",
  "bijapur",
  "rampur",
  "shivamogga",
  "chandrapur",
  "junagadh",
  "thrissur",
  "alwar",
  "bardhaman",
  "kulti",
  "kakinada",
  "nizamabad",
  "parbhani",
  "tumkur",
  "khammam",
  "ozhukarai",
  "bihar-sharif",
  "panipat",
  "darbhanga",
  "bally",
  "aizawl",
  "dewas",
  "ichalkaranji",
  "tirupati",
  "karnal",
  "bathinda",
  "jalna",
  "eluru",
  "barasat",
  "kirari-suleman-nagar",
  "purnia",
  "satna",
  "mau",
  "sonipat",
  "farrukhabad",
  "sagar",
  "rourkela-industrial-township",
  "durg",
  "imphal",
  "ratlam",
  "hapur",
  "arrah",
  "anantapur",
  "karimnagar",
  "etawah",
  "ambernath",
  "north-dumdum",
  "bharatpur",
  "begusarai",
  "new-delhi",
  "gandhidham",
  "baranagar",
  "tiruvottiyur",
  "pondicherry",
  "sikar",
  "thoothukudi",
  "rewa",
  "mirzapur",
  "raichur",
  "pali",
  "ramagundam",
  "haridwar",
  "vijayanagaram",
  "katihar",
  "nagercoil",
  "sri-ganganagar",
  "karawal-nagar",
  "mango",
  "thane-west",
  "bulandshahr",
  "uluberia",
  "murwara",
  "sambhal",
  "singrauli",
  "nadiad",
  "secunderabad",
  "naihati",
  "yamunanagar",
  "bidhan-nagar",
  "pallavaram",
  "bidar",
  "munger",
  "panchkula",
  "burhanpur",
  "raurkela",
  "kharagpur",
  "dindigul",
  "gandhinagar",
  "hosur",
  "nangloi-jat",
  "english-bazar",
  "ongole",
  "malda",
  "proddatur",
  "haldia",
  "hazaribagh",
  "bhusawal",
  "kharagpur",
  "rewari",
  "mandsaur",
  "bhind",
  "chittoor",
  "midnapore",
  "amroha",
  "anand",
  "morena",
  "bhiwani",
  "berhampore",
  "ambala",
  "morbi",
  "fatehpur",
  "rae-bareli",
  "khora",
  "guna",
  "nagda",
  "lalitpur",
  "datia",
  "siwan",
  "barmer",
  "alappuzha",
  "sultanpur",
  "chhapra",
  "gopalganj",
  "shivpuri",
  "khandwa",
  "hospet",
  "adoni",
  "sambhalpur",
  "tonk",
  "kishanganj",
  "balurghat",
  "gangtok",
  "dimapur",
  "shillong",
  "itanagar",
  "kohima",
  "port-blair",
  "silchar",
  "tezpur",
  "tinsukia",
  "dibrugarh",
  "jorhat",
  "nagaon",
  "goalpara",
  "bongaigaon",
  "karimganj",
  "haldwani",
  "rudrapur",
  "roorkee",
  "almora",
  "pithoragarh",
  "rishikesh",
  "udhampur",
  "anantnag",
  "baramulla",
  "leh",
  "kargil",
  "shimla",
  "solan",
  "mandi",
  "dharamshala",
  "una",
  "palampur",
  "bilaspur-hp",
  "sirsa",
  "hisar",
  "kaithal",
  "kurukshetra",
  "jhajjar",
  "rewari-haryana",
  "palwal",
  "bahadurgarh",
  "mohali",
  "zirakpur",
  "pathankot",
  "moga",
  "hoshiarpur",
  "barnala",
  "phagwara",
  "kapurthala",
  "yamuna-nagar",
  "muzaffarpur-bihar",
  "gaya-bihar",
  "ara",
  "hajipur",
  "motihari",
  "samastipur",
  "sasaram",
  "madhubani",
  "sitamarhi",
  "begusarai-bihar",
  "purnea",
  "darbhanga-bihar",
  "daltonganj",
  "deoghar",
  "giridih",
  "ramgarh",
  "phusro",
  "chakradharpur",
  "bokaro-steel-city",
  "dumka",
  "hazaribag",
  "jagdalpur",
  "rajnandgaon",
  "korba-chhattisgarh",
  "ambikapur",
  "raigarh",
  "dhamtari",
  "mahasamund",
  "bilaspur-chhattisgarh",
  "janjgir",
  "bhilai-nagar",
  "panaji",
  "margao",
  "mapusa",
  "vasco-da-gama",
  "porvorim",
  "verna",
  "bhuj",
  "surendranagar",
  "godhra",
  "bharuch",
  "ankleshwar",
  "valsad",
  "vapi",
  "mehsana",
  "palanpur",
  "porbandar",
  "gandhidham-gujarat",
  "botad",
  "veraval",
  "jetpur",
  "navsari",
  "dahod",
  "ratnagiri",
  "satna-mp",
  "chhindwara",
  "seoni",
  "vidisha",
  "sagar-mp",
  "damoh",
  "khargone",
  "dewas-mp",
  "hoshangabad",
  "itarsi",
  "singrauli-mp",
  "burhanpur-mp",
  "neemuch",
  "mandsaur-mp",
  "ujjain-mp",
  "bhopal-mp",
  "indore-mp",
  "pune-mh",
  "nanded-mh",
  "akola-mh",
  "amravati-mh",
  "solapur-mh",
  "kolhapur-mh",
  "latur-mh",
  "parbhani-mh",
  "beed",
  "osmanabad",
  "wardha",
  "yavatmal",
  "chandrapur-mh",
  "gondia",
  "wardha-mh",
  "sangli",
  "miraj",
  "ichalkaranji-mh",
  "cochin",
  "thrissur-kl",
  "kannur",
  "palakkad",
  "kottayam",
  "kasaragod",
  "malappuram",
  "tirur",
  "manjeri",
  "thalassery",
  "kozhikode-kl",
  "hubballi",
  "mangaluru",
  "belagavi",
  "kalaburagi",
  "ballari",
  "tumakuru",
  "shivamogga-ka",
  "davanagere-ka",
  "bidar-ka",
  "raichur-ka",
  "udupi",
  "chitradurga",
  "hassan",
  "mandya",
  "vijayapura",
  "hosapete",
  "gadag",
  "bagalkot",
  "yadgir",
  "mysuru",
  "warangal-ts",
  "karimnagar-ts",
  "nizamabad-ts",
  "khammam-ts",
  "ramagundam-ts",
  "mahbubnagar",
  "nalgonda",
  "adilabad",
  "suryapet",
  "miryalaguda",
  "siddipet",
  "tirupati-ap",
  "vijayawada-ap",
  "guntur-ap",
  "nellore-ap",
  "kurnool-ap",
  "kadapa-ap",
  "anantapur-ap",
  "eluru-ap",
  "ongole-ap",
  "machilipatnam",
  "tenali",
  "chittoor-ap",
  "srikakulam",
  "vizianagaram",
  "bhimavaram",
  "tanuku",
  "kakinada-ap",
  "rajahmundry-ap",
  "thoothukudi-tn",
  "tiruppur-tn",
  "erode-tn",
  "vellore",
  "thanjavur",
  "nagercoil-tn",
  "hosur-tn",
  "kanchipuram",
  "cuddalore",
  "karur",
  "kumbakonam",
  "sivakasi",
  "tiruvannamalai",
  "pollachi",
  "ooty",
  "tiruchirappalli-tn",
  "madurai-tn",
  "coimbatore-tn",
  "durgapur-wb",
  "asansol-wb",
  "siliguri-wb",
  "malda-wb",
  "baharampur",
  "habra",
  "raiganj",
  "krishnanagar",
  "balurghat-wb",
  "alipurduar",
  "darjeeling",
  "kalimpong",
  "purulia",
  "kharagpur-wb",
  "howrah-wb",
  "bhatpara-wb",
  "cuttack-od",
  "rourkela-od",
  "sambalpur-od",
  "balasore",
  "puri",
  "baripada",
  "jharsuguda",
  "jeypore",
  "bhadrak",
  "paradip",
];

const Hero = () => {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState("");
  const [city, setCity] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
const [isSearching, setIsSearching] = useState(false);
// 1. Properly type the Ref
const searchRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  // 2. Add 'MouseEvent' type to the event parameter
  const handleClickOutside = (event: MouseEvent) => {
    // 3. Cast event.target as a Node so .contains() works correctly
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setShowCategoryDropdown(false);
      setShowCityDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

// If this is in a .tsx file, specify the element type for better precision
const handleCandidateSearch = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!jobTitle) {
    toast.error("Category Required", { icon: '👷', id: 'cat-error' });
    return;
  }

  if (!city || city.trim() === "") {
    toast.error("Location Required", { icon: '📍', id: 'city-error' });
    return;
  }

  toast.success(`Searching in ${city}...`, {
    duration: 2000,
    style: { borderRadius: '12px', background: '#1e293b', color: '#fff' },
  });

  setIsSearching(true);
  
  const query = new URLSearchParams();
  query.set("workerType", jobTitle);
  query.set("city", city);
  
  setTimeout(() => {
    router.push(`/workers?${query.toString()}`);
  }, 1000);
};

  return (
    <section className="relative mt-20 min-h-[820px] sm:mt-44 lg:mt-40 lg:min-h-[860px]">
      {/* 1. ADD THIS HERE - This makes the toasts actually appear */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="absolute inset-0 z-0">
        <Slider {...heroSliderSettings}>
          {heroBgImages.map((img, index) => (
            <div key={index}>
              <div className="h-[820px] w-full bg-cover bg-center lg:h-[860px]" style={{ backgroundImage: `url(${img})` }} />
            </div>
          ))}
        </Slider>
      </div>

      <div className="absolute inset-0 z-10 bg-black/45" />

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
                  <p className="mb-1 text-xs text-muted">
                    🧑‍🏭 Workers Available
                  </p>
                  <h4 className="text-xl font-bold text-secondary">4.5L+</h4>
                </div>

                <div className="px-3 py-4 text-center">
                  <p className="mb-1 text-xs text-muted">
                    🏢 Suppliers Network
                  </p>
                  <h4 className="text-xl font-bold text-secondary">10K+</h4>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() =>
                    window.open(
                      "https://www.bookmyworkers.com/app/register",
                      "_blank",
                    )
                  }
                  className="rounded-md border bg-linear-to-r from-error to-warning px-7 py-4 text-sm font-semibold text-white"
                >
                  Get Workers Instantly
                </button>
              </div>
            </div>

            {/* Search Area */}
            <div ref={searchRef} className="w-full max-w-5xl rounded-2xl border border-white/40 bg-white/95 p-6 shadow-2xl backdrop-blur-sm dark:border-white/10 dark:bg-dark/90 sm:p-8">
<div className="mb-6 flex items-center gap-2">
  <h3 className="text-xl font-bold text-midnight_text dark:text-white sm:text-2xl">
    Search workers/Suppliers
  </h3>
  
  {/* Tooltip Container */}
  <div className="group relative flex items-center">
    <span className="inline-flex h-6 w-6 cursor-help items-center justify-center rounded-full border border-secondary text-xs font-semibold text-secondary transition-colors hover:bg-secondary hover:text-white">
      i
    </span>

    {/* Tooltip Card */}
    <div className="invisible absolute bottom-full mb-3 flex w-64 flex-col items-center group-hover:visible group-hover:opacity-100 opacity-0 transition-all duration-300">
      <div className="rounded-lg bg-midnight_text p-3 text-xs leading-relaxed text-white shadow-xl dark:bg-[#1E293B] border border-white/10">
        <p className="font-semibold text-secondary mb-1">Quick Search Guide:</p>
        Select a <span className="text-warning">worker category</span> and <span className="text-warning">city</span> to find skilled/unskilled workers or suppliers instantly. 
        <br />
        <span className="mt-1 block italic opacity-80">🇮🇳 You can search for workers anywhere in India.</span>
      </div>
      {/* Tooltip Arrow */}
      <div className="h-2 w-2 rotate-45 bg-midnight_text dark:bg-[#1E293B]"></div>
    </div>
  </div>
</div>

              <form onSubmit={handleCandidateSearch} className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-end">
                
                {/* Category Selection */}
                <div className="md:col-span-5 relative">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted dark:text-white/60">Category</label>
                  <div 
                    onClick={() => {
                      setShowCategoryDropdown(!showCategoryDropdown);
                      setShowCityDropdown(false);
                    }}
                    className="flex h-[56px] w-full cursor-pointer items-center justify-between rounded-xl border border-border bg-white/50 px-4 text-sm font-medium text-midnight_text dark:border-dark_border dark:bg-white/5 dark:text-white"
                  >
                    <span className={!jobTitle ? "opacity-50" : ""}>{jobTitle || "Select Worker Category"}</span>
                    <svg className={`h-5 w-5 text-secondary transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" /></svg>
                  </div>

                  {showCategoryDropdown && (
                    <div className="absolute left-0 right-0 z-[100] mt-2 max-h-60 overflow-y-auto rounded-xl border border-border bg-white shadow-2xl dark:border-dark_border dark:bg-[#0F172A]">
                      {WorkerCategoryData.map((item) => (
                        <div key={item.slug} onClick={() => { setJobTitle(item.title); setShowCategoryDropdown(false); }} className="cursor-pointer px-4 py-3 text-sm text-midnight_text hover:bg-secondary/10 dark:text-white dark:hover:bg-white/10">
                          {item.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* City Selection */}
                <div className="md:col-span-5 relative">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted dark:text-white/60">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => { setCity(e.target.value); setShowCityDropdown(true); }}
                    onFocus={() => { setShowCityDropdown(true); setShowCategoryDropdown(false); }}
                    placeholder="Search city"
                    className="h-[56px] w-full rounded-xl border border-border bg-white/50 px-4 text-sm font-medium text-midnight_text dark:border-dark_border dark:bg-white/5 dark:text-white outline-none"
                  />
                  {showCityDropdown && city && (
                    <div className="absolute left-0 right-0 z-[100] mt-2 max-h-60 overflow-y-auto rounded-xl border border-border bg-white shadow-2xl dark:border-dark_border dark:bg-[#0F172A]">
                      {cityOptions.filter(item => item.toLowerCase().includes(city.toLowerCase())).map((item) => (
                        <div key={item} onClick={() => { setCity(item); setShowCityDropdown(false); }} className="cursor-pointer px-4 py-3 text-sm text-midnight_text hover:bg-secondary/10 dark:text-white dark:hover:bg-white/10">
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Button */}
<div className="md:col-span-2">
  <button
    type="submit"
    disabled={isSearching}
    className={`flex h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-error to-warning px-4 text-sm font-bold text-white shadow-lg transition-all ${
      isSearching ? "cursor-not-allowed opacity-90" : "active:scale-95 hover:scale-[1.02]"
    }`}
  >
    {isSearching ? (
      <>
        {/* Animated Spinner */}
        <svg
          className="h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span>Searching...</span>
      </>
    ) : (
      <>
        <span>Search</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </>
    )}
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