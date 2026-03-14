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
import { WorkerCategoryData, indianStates } from "@/app/api/data";

// const cityOptions = [
//   // Madhya Pradesh
//   "Bhopal",
//   "Indore",
//   "Jabalpur",
//   "Gwalior",
//   "Ujjain",
//   "Sagar",
//   "Satna",
//   "Rewa",

//   // Uttar Pradesh
//   "Lucknow",
//   "Kanpur",
//   "Varanasi",
//   "Prayagraj",
//   "Agra",
//   "Meerut",
//   "Ghaziabad",
//   "Noida",
//   "Bareilly",
//   "Aligarh",
//   "Moradabad",
//   "Gorakhpur",

//   // Jharkhand
//   "Ranchi",
//   "Jamshedpur",
//   "Dhanbad",
//   "Bokaro",
//   "Hazaribagh",

//   // Maharashtra
//   "Mumbai",
//   "Pune",
//   "Nagpur",
//   "Nashik",
//   "Aurangabad",
//   "Solapur",
//   "Kolhapur",
//   "Amravati",
//   "Nanded",
//   "Akola",

//   // Telangana
//   "Hyderabad",
//   "Warangal",
//   "Karimnagar",
//   "Nizamabad",
//   "Khammam",

//   // Gujarat
//   "Ahmedabad",
//   "Surat",
//   "Vadodara",
//   "Rajkot",
//   "Bhavnagar",
//   "Jamnagar",
//   "Junagadh",
//   "Gandhinagar",

//   // Rajasthan
//   "Jaipur",
//   "Jodhpur",
//   "Udaipur",
//   "Kota",
//   "Ajmer",
//   "Bikaner",
//   "Alwar",
//   "Bharatpur",

//   // Delhi
//   "New Delhi",
//   "Dwarka",
//   "Rohini",
//   "Karol Bagh",

//   // Haryana
//   "Gurgaon",
//   "Faridabad",
//   "Panipat",
//   "Ambala",
//   "Hisar",
//   "Rohtak",
//   "Karnal",

//   // Punjab
//   "Ludhiana",
//   "Amritsar",
//   "Jalandhar",
//   "Patiala",
//   "Bathinda",
//   "Mohali",

//   // Chhattisgarh
//   "Raipur",
//   "Bhilai",
//   "Durg",
//   "Bilaspur",
//   "Korba",
//   "Rajnandgaon",

//   // Andhra Pradesh
//   "Visakhapatnam",
//   "Vijayawada",
//   "Guntur",
//   "Tirupati",
//   "Kurnool",
//   "Nellore",
//   "Rajahmundry",

//   // Karnataka
//   "Bengaluru",
//   "Mysuru",
//   "Hubli",
//   "Mangalore",
//   "Belgaum",
//   "Davangere",
//   "Ballari",

//   // Goa
//   "Panaji",
//   "Margao",
//   "Vasco da Gama",
//   "Mapusa",

//   // Uttarakhand
//   "Dehradun",
//   "Haridwar",
//   "Roorkee",
//   "Haldwani",
//   "Rishikesh",
//   "Kashipur",
// ];
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
  const donationInfo = useContext(DonationFormContext);

  const [jobTitle, setJobTitle] = useState("");
const [city, setCity] = useState("");
const [showCityDropdown, setShowCityDropdown] = useState(false);
  const router = useRouter();

  const handleCandidateSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  if (!jobTitle) {
    alert("Please select worker category");
    return;
  }

  if (!city) {
    alert("Please enter city");
    return;
  }
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

<div className="w-full max-w-5xl rounded-[24px] border border-white/40 bg-white/92 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.20)] backdrop-blur-md dark:border-white/10 dark:bg-[#0F172A]/90 sm:p-5 md:p-6">
  <div className="mb-4 flex items-center gap-2">
    <h3 className="text-lg font-semibold text-[#2F2F2F] dark:text-white sm:text-2xl">
      Search skill & unskilled workers/agents
    </h3>
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#4056C6] text-xs font-semibold text-[#4056C6] dark:border-[#7C8CFF] dark:text-[#A5B4FC]">
      i
    </span>
  </div>

  <form
    onSubmit={handleCandidateSearch}
    className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-end"
  >
<div className="md:col-span-5">
  <label className="mb-2 block text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-200">
    Select Worker Category
  </label>

  <div className="relative">
  <select
  value={jobTitle}
  onChange={(e) => setJobTitle(e.target.value)}
  required
  className="h-[56px] w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-12 text-sm font-medium text-slate-700 shadow-sm outline-none transition-all duration-200 hover:border-indigo-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-900/40"
>
      <option value="">Select Worker Category</option>

      {WorkerCategoryData.map((item) => (
       <option
  key={item.slug}
  value={item.title}
  className="bg-white text-black dark:bg-slate-900 dark:text-white"
>
  {item.title}
</option>
      ))}
    </select>

    {/* Dropdown Icon */}
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 dark:text-indigo-400">
      <svg
        className="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  </div>
</div>

    <div className="md:col-span-5">
      <label className="mb-2 block text-sm font-medium text-[#3A3A3A] dark:text-slate-200">
        Select city
      </label>

      <div className="relative">
      <input
  type="text"
  value={city}
  onChange={(e) => {
    setCity(e.target.value);
    setShowCityDropdown(true);
  }}
  onFocus={() => setShowCityDropdown(true)}
  placeholder="Search or type city"
  required
  className="h-[52px] w-full rounded-xl border border-[#D9DCE8] bg-[#F8F9FC] px-4 pr-10  text-[#2F2F2F] placeholder:text-slate-400 outline-none transition focus:border-[#4056C6] focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-[#7C8CFF] dark:focus:bg-slate-950"
/>

{showCityDropdown && city && (
  <div className="absolute z-40 mt-2 max-h-52 w-full overflow-auto rounded-xl border border-[#D9DCE8] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
            {cityOptions.filter((item) =>
              item.toLowerCase().includes(city.toLowerCase())
            ).length > 0 ? (
              cityOptions
                .filter((item) =>
                  item.toLowerCase().includes(city.toLowerCase())
                )
                .map((item) => (
                  <div
                    key={item}
                    onClick={() => {
  setCity(item);
  setShowCityDropdown(false);
}}
                    className="cursor-pointer px-4 py-2.5 text-sm text-[#2F2F2F] transition hover:bg-[#F1F4FF] dark:text-white dark:hover:bg-slate-800"
                  >
                    {item}
                  </div>
                ))
            ) : (
              <div className="px-4 py-2.5 text-sm text-slate-500 dark:text-slate-400">
                No city found
              </div>
            )}
          </div>
        )}
      </div>
    </div>

    <div className="md:col-span-2">
      <button
        type="submit"
        className="flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#4056C6] px-4 text-white shadow-md transition hover:bg-[#3347b2] dark:bg-[#5B6EF5] dark:hover:bg-[#4C5FE0] md:min-w-[64px]"
      >
        Search
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
