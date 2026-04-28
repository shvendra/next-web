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
  "Alluri Sitharama Raju",
  "Anakapalli",
  "Annamaiah",
  "Bapatla",
  "Dr. B.R. Ambedkar Konaseema",
  "Eluru",
  "Kakinada",
  "Nandyal",
  "NTR",
  "Palnadu",
  "Parvathipuram Manyam",
  "Sri Potti Sriramulu Nellore",
  "Sri Sathya Sai",
  "Tirupati",
  "Anantapur",
  "Chittoor",
  "East Godavari",
  "Guntur",
  "Krishna",
  "Kurnool",
  "Nellore",
  "Prakasam",
  "Srikakulam",
  "Visakhapatnam",
  "Vizianagaram",
  "West Godavari",
  "YSR Kadapa",
  "Itanagar Capital Complex",
  "Kamle",
  "Lepa Rada",
  "Pakke-Kessang",
  "Shi-Yomi",
  "Upper Dibang Valley",
  "Tawang",
  "West Kameng",
  "East Kameng",
  "Papum Pare",
  "Kurung Kumey",
  "Kra Daadi",
  "Lower Subansiri",
  "Upper Subansiri",
  "West Siang",
  "East Siang",
  "Siang",
  "Upper Siang",
  "Lower Siang",
  "Lower Dibang Valley",
  "Dibang Valley",
  "Anjaw",
  "Lohit",
  "Namsai",
  "Changlang",
  "Tirap",
  "Longding",
  "Bajali",
  "Tamulpur",
  "Hojai",
  "Biswanath",
  "Baksa",
  "Barpeta",
  "Biswanath",
  "Bongaigaon",
  "Cachar",
  "Charaideo",
  "Chirang",
  "Darrang",
  "Dhemaji",
  "Dhubri",
  "Dibrugarh",
  "Dima Hasao",
  "Goalpara",
  "Golaghat",
  "Hailakandi",
  "Hojai",
  "Jorhat",
  "Kamrup",
  "Kamrup Metropolitan",
  "Karbi Anglong",
  "West Karbi Anglong",
  "Karimganj",
  "Kokrajhar",
  "Lakhimpur",
  "Majuli",
  "Morigaon",
  "Nagaon",
  "Nalbari",
  "Dima Hasao",
  "Sivasagar",
  "Sonitpur",
  "South Salmara-Mankachar",
  "Tinsukia",
  "Udalguri",
  "West Karbi Anglong",
  "Sheohar",
  "Gopalganj",
  "West Champaran",
  "Vaishali",
  "Araria",
  "Arwal",
  "Aurangabad",
  "Banka",
  "Begusarai",
  "Bhagalpur",
  "Bhojpur",
  "Buxar",
  "Darbhanga",
  "East Champaran (Motihari)",
  "Gaya",
  "Gopalganj",
  "Jamui",
  "Jehanabad",
  "Kaimur (Bhabua)",
  "Katihar",
  "Khagaria",
  "Kishanganj",
  "Lakhisarai",
  "Madhepura",
  "Madhubani",
  "Munger (Monghyr)",
  "Muzaffarpur",
  "Nalanda",
  "Nawada",
  "Patna",
  "Purnia (Purnea)",
  "Rohtas",
  "Saharsa",
  "Samastipur",
  "Saran",
  "Sheikhpura",
  "Sheohar",
  "Sitamarhi",
  "Siwan",
  "Supaul",
  "Vaishali",
  "West Champaran",
  "Chandigarh",
  "Gaurela-Pendra-Marwahi",
  "Khairagarh-Chhuikhadan-Gandai",
  "Manendragarh-Chirmiri-Bharatpur",
  "Mohla-Manpur-Chowki",
  "Sarangarh-Bilaigarh",
  "Sakti",
  "Balod",
  "Baloda Bazar",
  "Balrampur",
  "Bastar",
  "Bemetara",
  "Bijapur",
  "Bilaspur",
  "Dantewada (South Bastar)",
  "Dhamtari",
  "Durg",
  "Gariyaband",
  "Janjgir-Champa",
  "Jashpur",
  "Kabirdham (Kawardha)",
  "Kanker (North Bastar)",
  "Kondagaon",
  "Korba",
  "Korea (Koriya)",
  "Mahasamund",
  "Mungeli",
  "Narayanpur",
  "Raigarh",
  "Raipur",
  "Rajnandgaon",
  "Sukma",
  "Surajpur",
  "Surguja",
  "Dadra & Nagar Haveli",
  "Daman",
  "Diu",
  "Central Delhi",
  "East Delhi",
  "New Delhi",
  "North Delhi",
  "North East Delhi",
  "North West Delhi",
  "Shahdara",
  "South Delhi",
  "South East Delhi",
  "South West Delhi",
  "West Delhi",
  "North Goa",
  "South Goa",
  "Ahmedabad",
  "Amreli",
  "Anand",
  "Aravalli",
  "Banaskantha (Palanpur)",
  "Bharuch",
  "Bhavnagar",
  "Botad",
  "Chhota Udepur",
  "Dahod",
  "Dangs (Ahwa)",
  "Devbhoomi Dwarka",
  "Gandhinagar",
  "Gir Somnath",
  "Jamnagar",
  "Junagadh",
  "Kachchh",
  "Kheda (Nadiad)",
  "Mahisagar",
  "Mehsana",
  "Morbi",
  "Narmada (Rajpipla)",
  "Navsari",
  "Panchmahal (Godhra)",
  "Patan",
  "Porbandar",
  "Rajkot",
  "Sabarkantha (Himmatnagar)",
  "Surat",
  "Surendranagar",
  "Tapi (Vyara)",
  "Vadodara",
  "Valsad",
  "Ambala",
  "Bhiwani",
  "CharkhiDadri",
  "Faridabad",
  "Fatehabad",
  "Gurgaon",
  "Hisar",
  "Jhajjar",
  "Jind",
  "Kaithal",
  "Karnal",
  "Kurukshetra",
  "Mahendragarh",
  "Mewat",
  "Palwal",
  "Panchkula",
  "Panipat",
  "Rewari",
  "Rohtak",
  "Sirsa",
  "Sonipat",
  "Yamunanagar",
  "Bilaspur",
  "Chamba",
  "Hamirpur",
  "Kangra",
  "Kinnaur",
  "Kullu",
  "Lahaul & Spiti",
  "Mandi",
  "Shimla",
  "Sirmaur (Sirmour)",
  "Solan",
  "Una",
  "Anantnag",
  "Bandipore",
  "Baramulla",
  "Budgam",
  "Doda",
  "Ganderbal",
  "Jammu",
  "Kargil",
  "Kathua",
  "Kishtwar",
  "Kulgam",
  "Kupwara",
  "Leh",
  "Poonch",
  "Pulwama",
  "Rajouri",
  "Ramban",
  "Reasi",
  "Samba",
  "Shopian",
  "Srinagar",
  "Udhampur",
  "Bokaro",
  "Chatra",
  "Deoghar",
  "Dhanbad",
  "Dumka",
  "East Singhbhum",
  "Garhwa",
  "Giridih",
  "Godda",
  "Gumla",
  "Hazaribag",
  "Jamtara",
  "Khunti",
  "Koderma",
  "Latehar",
  "Lohardaga",
  "Pakur",
  "Palamu",
  "Ramgarh",
  "Ranchi",
  "Sahibganj",
  "Seraikela-Kharsawan",
  "Simdega",
  "West Singhbhum",
  "Bagalkot",
  "Ballari (Bellary)",
  "Belagavi (Belgaum)",
  "Bengaluru (Bangalore) Rural",
  "Bengaluru (Bangalore) Urban",
  "Bidar",
  "Chamarajanagar",
  "Chikballapur",
  "Chikkamagaluru (Chikmagalur)",
  "Chitradurga",
  "Dakshina Kannada",
  "Davangere",
  "Dharwad",
  "Gadag",
  "Hassan",
  "Haveri",
  "Kalaburagi (Gulbarga)",
  "Kodagu",
  "Kolar",
  "Koppal",
  "Mandya",
  "Mysuru (Mysore)",
  "Raichur",
  "Ramanagara",
  "Shivamogga (Shimoga)",
  "Tumakuru (Tumkur)",
  "Udupi",
  "Uttara Kannada (Karwar)",
  "Vijayapura (Bijapur)",
  "Yadgir",
  "Alappuzha",
  "Ernakulam",
  "Idukki",
  "Kannur",
  "Kasaragod",
  "Kollam",
  "Kottayam",
  "Kozhikode",
  "Malappuram",
  "Palakkad",
  "Pathanamthitta",
  "Thiruvananthapuram",
  "Thrissur",
  "Wayanad",
  "Agatti",
  "Amini",
  "Androth",
  "Bithra",
  "Chethlath",
  "Kavaratti",
  "Kadmath",
  "Kalpeni",
  "Kilthan",
  "Minicoy",
  "Agar Malwa",
  "Alirajpur",
  "Anuppur",
  "Ashoknagar",
  "Balaghat",
  "Barwani",
  "Betul",
  "Bhind",
  "Bhopal",
  "Burhanpur",
  "Chhatarpur",
  "Chhindwara",
  "Damoh",
  "Datia",
  "Dewas",
  "Dhar",
  "Ujjain",
  "Dindori",
  "Guna",
  "Gwalior",
  "Harda",
  "Hoshangabad",
  "Indore",
  "Jabalpur",
  "Jhabua",
  "Katni",
  "Khandwa",
  "Khargone",
  "Mandla",
  "Mandsaur",
  "Morena",
  "Narsinghpur",
  "Neemuch",
  "Niwari",
  "Panna",
  "Raisen",
  "Rajgarh",
  "Ratlam",
  "Rewa",
  "Sidhi",
  "Sagar",
  "Satna",
  "Sehore",
  "Seoni",
  "Shahdol",
  "Shajapur",
  "Vidisha",
  "Ahmednagar",
  "Akola",
  "Amravati",
  "Aurangabad",
  "Beed",
  "Bhandara",
  "Buldhana",
  "Chandrapur",
  "Dhule",
  "Gadchiroli",
  "Gondia",
  "Hingoli",
  "Jalna",
  "Jalgaon",
  "Kolhapur",
  "Latur",
  "Mumbai City",
  "Mumbai Suburban",
  "Nagpur",
  "Nanded",
  "Nandurbar",
  "Nashik",
  "Osmanabad",
  "Palghar",
  "Parbhani",
  "Pune",
  "Raigad",
  "Ratnagiri",
  "Raigad",
  "Satara",
  "Sindhudurg",
  "Solapur",
  "Thane",
  "Wardha",
  "Washim",
  "Yavatmal",
  "Bishnupur",
  "Chandel",
  "Churachandpur",
  "Imphal East",
  "Imphal West",
  "Jiribam",
  "Kakching",
  "Kamjong",
  "Kangpokpi",
  "Noney",
  "Pherzawl",
  "Senapati",
  "Tamenglong",
  "Thoubal",
  "Ukhrul",
  "Eastern West Khasi Hills",
  "North Garo Hills",
  "South West Khasi Hills",
  "West Jaintia Hills",
  "East Garo Hills",
  "East Khasi Hills",
  "Jaintia Hills",
  "Ri-Bhoi",
  "South Garo Hills",
  "South West Garo Hills",
  "West Garo Hills",
  "West Khasi Hills",
  "Aizawl",
  "Champhai",
  "Hnahthial",
  "Khawzawl",
  "Kolasib",
  "Lawngtlai",
  "Lunglei",
  "Mamit",
  "Saiha",
  "Serchhip",
  "Chümoukedima",
  "Niuland",
  "Shamator",
  "Tseminyu",
  "Noklak",
  "Dimapur",
  "Kiphire",
  "Kohima",
  "Mokokchung",
  "Mon",
  "Peren",
  "Phek",
  "Tuensang",
  "Wokha",
  "Zunheboto",
  "Angul",
  "Bargarh",
  "Baleswar (Balasore)",
  "Balangir",
  "Boudh",
  "Cuttack",
  "Dhenkanal",
  "Gajapati",
  "Ganjam",
  "Jagatsinghpur",
  "Jajpur",
  "Jharsuguda",
  "Kalahandi",
  "Kandhamal",
  "Kendrapara",
  "Keonjhar",
  "Khurda",
  "Koraput",
  "Malkangiri",
  "Mayurbhanj",
  "Nabarangpur",
  "Nayagarh",
  "Nuapada",
  "Puri",
  "Rayagada",
  "Sambalpur",
  "Sundargarh",
  "Amritsar",
  "Barnala",
  "Bathinda",
  "Faridkot",
  "Fatehgarh Sahib",
  "Fazilka",
  "Firozpur",
  "Gurdaspur",
  "Hoshiarpur",
  "Jalandhar",
  "Kapurthala",
  "Ludhiana",
  "Malerkotla",
  "Mansa",
  "Moga",
  "Pathankot",
  "Patiala",
  "Rupnagar",
  "S.A.S. Nagar(Mohali)",
  "Sangrur",
  "Shahid Bhagat Singh Nagar",
  "Sri Muktsar Sahib",
  "Tarn Taran",
  "Karaikal",
  "Mahe",
  "Puducherry",
  "Yanam",
  "Anoopgarh",
  "Balotra",
  "Beawar",
  "Kekri",
  "Deeg",
  "Didwana-Kuchaman",
  "Dudu",
  "Gangapur City",
  "Jaipur Rural",
  "Jodhpur Rural",
  "Kotputli-Behror",
  "Khairthal-Tijara",
  "Neem Ka Thana",
  "Phalodi",
  "Salumber",
  "Sanchore",
  "Shahpura",
  "Ajmer",
  "Alwar",
  "Banswara",
  "Baran",
  "Barmer",
  "Bharatpur",
  "Bhilwara",
  "Bikaner",
  "Bundi",
  "Chittorgarh",
  "Churu",
  "Dausa",
  "Dholpur",
  "Dungarpur",
  "Ganganagar",
  "Hanumangarh",
  "Jaipur",
  "Jaisalmer",
  "Jalore",
  "Jhalawar",
  "Jhunjhunu",
  "Jodhpur",
  "Karauli",
  "Kota",
  "Nagaur",
  "Pali",
  "Pratapgarh",
  "Rajsamand",
  "Sawai Madhopur",
  "Sikar",
  "Sirohi",
  "Tonk",
  "Udaipur",
  "East Sikkim",
  "West Sikkim",
  "North Sikkim",
  "South Sikkim",
  "Adilabad",
  "Bhadradri Kothagudem",
  "Hyderabad",
  "Jagtial",
  "Jangaon",
  "Jayashankar Bhupalpally",
  "Jogulamba Gadwal",
  "Kamareddy",
  "Karimnagar",
  "Khammam",
  "Komaram Bheem Asifabad",
  "Mahabubabad",
  "Mahabubnagar",
  "Mancherial",
  "Medak",
  "Medchal–Malkajgiri",
  "Nagarkurnool",
  "Nalgonda",
  "Nirmal",
  "Nizamabad",
  "Peddapalli",
  "Rajanna Sircilla",
  "Rangareddy",
  "Sangareddy",
  "Siddipet",
  "Suryapet",
  "Vikarabad",
  "Wanaparthy",
  "Warangal (Rural)",
  "Warangal (Urban)",
  "Yadadri Bhuvanagiri",
  "Chennai",
  "Kancheepuram",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kanniyakumari",
  "Karur",
  "Madurai",
  "Nagapattinam",
  "Namakkal",
  "Nilgiris",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Salem",
  "Sivagangai",
  "Thanjavur",
  "Theni",
  "Thiruvarur",
  "Thoothukudi",
  "Tiruchirapalli",
  "Tirunelveli",
  "Tiruvallur",
  "Tiruvannamalai",
  "Vellore",
  "Villupuram",
  "Virudhunagar",
  "Dhalai",
  "Gomati",
  "Khowai",
  "North Tripura",
  "Sepahijala",
  "South Tripura",
  "Unakoti",
  "West Tripura",
  "Ayodhya",
  "Balrampur",
  "Banda",
  "Bhadohi",
  "Chandauli",
  "Chitrakoot",
  "Deoria",
  "Etah",
  "Farrukhabad",
  "Firozabad",
  "Gautam Buddha Nagar",
  "Gonda",
  "Hapur",
  "Kannauj",
  "Kasganj",
  "Kaushambi",
  "Kushinagar",
  "Lalitpur",
  "Maharajganj",
  "Mahoba",
  "Mainpuri",
  "Mathura",
  "Mau",
  "Mirzapur",
  "Pilibhit",
  "Rampur",
  "Sambhal",
  "Sant Kabir Nagar",
  "Shahjahanpur",
  "Shamli",
  "Shravasti",
  "Siddharthnagar",
  "Sultanpur",
  "Varanasi",
  "Agra",
  "Aligarh",
  "Allahabad (Prayagraj)",
  "Ambedkar Nagar",
  "Amethi",
  "Amroha",
  "Auraiya",
  "Azamgarh",
  "Baghpat",
  "Bahraich",
  "Ballia",
  "Barabanki",
  "Bareilly",
  "Basti",
  "Bijnor",
  "Budaun",
  "Bulandshahr",
  "Etawah",
  "Fatehpur",
  "Ghaziabad",
  "Ghazipur",
  "Gorakhpur",
  "Hamirpur",
  "Hardoi",
  "Hathras",
  "Jhansi",
  "Jalaun",
  "Jaunpur",
  "Kanpur Nagar",
  "Kanpur Dehat",
  "Lucknow",
  "Meerut",
  "Moradabad",
  "Muzaffarnagar",
  "Pratapgarh",
  "Prayagraj",
  "Raebareli",
  "Saharanpur",
  "Sitapur",
  "Sonbhadra",
  "Lakhimpur Kheri",
  "Almora",
  "Bageshwar",
  "Champawat",
  "Chamoli",
  "Dehradun",
  "Haridwar",
  "Nainital",
  "Pauri Garhwal",
  "Pithoragarh",
  "Rudraprayag",
  "Tehri Garhwal",
  "Udham Singh Nagar",
  "Uttarkashi",
  "Alipurduar",
  "Bankura",
  "Birbhum",
  "Cooch Behar",
  "Dakshin Dinajpur",
  "Darjeeling",
  "Hooghly",
  "Howrah",
  "Jalpaiguri",
  "Jhargram",
  "Kalimpong",
  "Kolkata",
  "Malda",
  "Murshidabad",
  "Nadia",
  "North 24 Parganas",
  "Paschim Bardhaman",
  "Paschim Medinipur",
  "Purba Bardhaman",
  "Purba Medinipur",
  "Purulia",
  "South 24 Parganas",
  "Uttar Dinajpur",
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
  {cityOptions
    .filter(item =>
      item.toLowerCase().includes(city.toLowerCase())
    )
    .sort((a, b) => {
      const input = city.toLowerCase();
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();

      // 1. Exact match first
      if (aLower === input) return -1;
      if (bLower === input) return 1;

      // 2. Starts with input
      if (aLower.startsWith(input) && !bLower.startsWith(input)) return -1;
      if (!aLower.startsWith(input) && bLower.startsWith(input)) return 1;

      // 3. Alphabetical
      return aLower.localeCompare(bLower);
    })
    .map((item) => (
      <div
        key={item}
        onClick={() => {
          setCity(item);
          setShowCityDropdown(false);
        }}
        className="cursor-pointer px-4 py-3 text-sm text-midnight_text hover:bg-secondary/10 dark:text-white dark:hover:bg-white/10"
      >
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