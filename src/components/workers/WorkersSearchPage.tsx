"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getWorkers, type WorkerItem } from "@/lib/workers";
import { WorkerCategoryData, indianStates } from "@/app/api/data";
type Props = {
  initialWorkerType?: string;
  initialState?: string;
  initialCity?: string;
  initialPage?: number;
};

const PAGE_LIMIT = 20;

function getAge(dob?: string | number) {
  if (!dob) return "";

  const timestamp = Number(dob);
  if (isNaN(timestamp)) return "";

  if (String(dob).length <= 5) {
    if (timestamp > 1900 && timestamp <= new Date().getFullYear()) {
      return new Date().getFullYear() - timestamp;
    }
    return timestamp;
  }

  let finalTimestamp = timestamp;
  if (timestamp < 10000000000) finalTimestamp *= 1000;

  const birthDate = new Date(finalTimestamp);
  if (isNaN(birthDate.getTime())) return "";

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

function formatName(name = "") {
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatAreas(areas: any) {
  if (!areas) return "";

  let normalized: string[] = [];

  // Case 1: already array
  if (Array.isArray(areas)) {
    normalized = areas.flatMap((item) => {
      if (Array.isArray(item)) return item;

      if (typeof item === "string") {
        const trimmed = item.trim();

        // if item itself is JSON array string
        if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
          try {
            const parsed = JSON.parse(trimmed);
            return Array.isArray(parsed) ? parsed : [trimmed];
          } catch {
            return [trimmed];
          }
        }

        return [trimmed];
      }

      return [String(item)];
    });
  }
  // Case 2: full value is stringified array
  else if (typeof areas === "string") {
    const trimmed = areas.trim();

    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        normalized = Array.isArray(parsed) ? parsed : [trimmed];
      } catch {
        normalized = [trimmed];
      }
    } else {
      normalized = [trimmed];
    }
  }

  const formatted = normalized
    .filter(Boolean)
    .map((a) =>
      String(a)
        .trim()
        .replace(/^"+|"+$/g, "")
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase())
    );

  const visible = formatted.slice(0, 10);
  const remaining = formatted.length - visible.length;

  return remaining > 0
    ? `${visible.join(" • ")} +${remaining} more`
    : visible.join(" • ");
}

export default function WorkersSearchPage({
  initialWorkerType = "",
  initialState = "",
  initialCity = "",
  initialPage = 1,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [workers, setWorkers] = useState<WorkerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(initialPage);
const [workerType, setWorkerType] = useState(initialWorkerType);
const [stateValue, setStateValue] = useState(initialState);
const [city, setCity] = useState(initialCity);
  const [gender, setGender] = useState("");
  const [workerGroup, setWorkerGroup] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
const stateOptions = Object.keys(indianStates || {});
// const cityOptions = stateValue ? Object.keys(indianStates[stateValue] || {}) : [];
const fetchWorkers = async (reset = true, nextPage = 1) => {
  try {
    if (reset) setLoading(true);
    else setLoadingMore(true);

    // BASE PARAMS
    const params: any = {
      page: nextPage,
      limit: PAGE_LIMIT,
      state: stateValue,
    };

    // Apply full filters ONLY on first search
    if (reset) {
      if (city) params.city = city;
      if (workerType) params.workerType = workerType;
      if (gender) params.gender = gender;
      if (workerGroup) params.workerGroup = workerGroup;
      if (minAge) params.minAge = Number(minAge);
      if (maxAge) params.maxAge = Number(maxAge);
    }

    const res = await getWorkers(params);

    const items = res?.agents || [];

    setWorkers((prev) => (reset ? items : [...prev, ...items]));
    setTotal(res?.pagination?.total || 0);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
    setLoadingMore(false);
  }
};

useEffect(() => {
  fetchWorkers(true, 1);
}, []);

const applyFilters = () => {
  const query = new URLSearchParams();

  if (workerType) query.set("workerType", workerType);
  if (stateValue) query.set("state", stateValue);
  if (city) query.set("city", city);

  router.push(`/workers?${query.toString()}`);

  setWorkers([]);
  setPage(1);

  fetchWorkers(true, 1);
};

  const clearFilters = async () => {
setWorkerType("");
setStateValue("");
setCity("");
setGender("");
setWorkerGroup("");
setMinAge("");
setMaxAge("");
    router.push("/workers");
    setPage(1);
    fetchWorkers(true, 1);
  };

  const hasMore = workers.length < total;

  return (
            <section className="py-40 bg-[#f6f8fc] bg-no-repeat bg-cover lg:mt-1 sm:mt-1 mt-1">

      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Verified Workers & Agents
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Search trusted skilled and unskilled workers across locations.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* Filters */}
          <aside className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-indigo-600"
              >
                Clear
              </button>
            </div>

            <div className="space-y-4">
            <div>
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Worker Category
  </label>
  <select
    value={workerType}
    onChange={(e) => setWorkerType(e.target.value)}
    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-indigo-500"
  >
    <option value="">All Categories</option>
    {WorkerCategoryData.map((item) => (
      <option key={item.slug} value={item.title}>
        {item.title}
      </option>
    ))}
  </select>
</div>

           <div>
  <label className="mb-2 block text-sm font-medium text-slate-700">
    State
  </label>
  <select
    value={stateValue}
    onChange={(e) => {
      setStateValue(e.target.value);
      setCity("");
    }}
    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-indigo-500"
  >
    <option value="">Select State</option>
    {stateOptions.map((state) => (
      <option key={state} value={state}>
        {state}
      </option>
    ))}
  </select>
</div>

{/* <div>
  <label className="mb-2 block text-sm font-medium text-slate-700">
    City
  </label>
  <select
    value={city}
    onChange={(e) => setCity(e.target.value)}
    disabled={!stateValue}
    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-100"
  >
    <option value="">
      {stateValue ? "Select City" : "Select State First"}
    </option>
    {cityOptions.map((cityName) => (
      <option key={cityName} value={cityName}>
        {cityName}
      </option>
    ))}
  </select>
</div> */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-indigo-500"
                >
                  <option value="">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Worker Type
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setWorkerGroup(
                        workerGroup === "individual" ? "" : "individual"
                      )
                    }
                    className={`rounded-full px-4 py-2 text-sm ${
                      workerGroup === "individual"
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    Individual
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setWorkerGroup(workerGroup === "group" ? "" : "group")
                    }
                    className={`rounded-full px-4 py-2 text-sm ${
                      workerGroup === "group"
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    Group / Agent
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Age Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={minAge}
                    onChange={(e) => setMinAge(e.target.value)}
                    placeholder="Min"
                    className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-indigo-500"
                  />
                  <input
                    type="number"
                    value={maxAge}
                    onChange={(e) => setMaxAge(e.target.value)}
                    placeholder="Max"
                    className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                onClick={applyFilters}
                className="h-11 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <div>
            {loading ? (
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                <p className="text-sm text-slate-500">
                  Fetching best matches for you...
                </p>
              </div>
            ) : workers.length === 0 ? (
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                <p className="text-base font-semibold text-slate-700">
                  No workers or agents found.
                </p>
              </div>
            ) : (
              <>
              <div className="max-h-[70vh] overflow-y-auto pr-2">
                  {workers.map((agent) => (
                    <div
                      key={agent._id}
className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm mb-2"                    >
                      <div className="flex flex-col gap-4 md:flex-row">
                        <div className="flex min-w-[110px] flex-col items-center">
                         <img
  src={
    agent.profilePhoto 
      ? `https://bookmyworker.s3.eu-north-1.amazonaws.com/${agent.profilePhoto}` 
      : "/usericon.png"
  }
  alt={agent.name || "Agent Profile"}
  className="h-20 w-20 rounded-full object-cover ring-2 ring-indigo-500"
/>
                          <p className="mt-2 text-xs text-slate-500">
                            {agent.dob ? `${getAge(agent.dob)} yrs` : ""}
                            {agent.gender ? ` • ${agent.gender}` : ""}
                          </p>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900">
                            {formatName(agent.name)}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            📍 {agent.district}, {agent.state}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                              {agent.role === "Agent"
                                ? "Agent Managed"
                                : "Worker"}
                            </span>

                           <span className="rounded-full bg-gradient-to-r from-slate-100 to-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
  {formatAreas(agent.areasOfWork) || "Any Work"}
</span>
                          </div>

                        <div className="mt-4 flex flex-wrap gap-2">
  <button
    type="button"
    onClick={() => {
      window.location.href = "https://www.bookmyworkers.com/app/register";
    }}
    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
  >
    View Contact
  </button>

  <button
    type="button"
    onClick={() => {
      window.location.href = "https://www.bookmyworkers.com/app/register";
    }}
    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white"
  >
    WhatsApp
  </button>
</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-6 text-center">
                   <button
  onClick={() => {
    const nextPage = page + 1;

    setPage(nextPage);

    // load more only using state
    fetchWorkers(false, nextPage);
  }}
  disabled={loadingMore}
  className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
>
  {loadingMore ? "Loading..." : "Load More"}
</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}