"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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

  if (Array.isArray(areas)) {
    normalized = areas.flatMap((item) => {
      if (Array.isArray(item)) return item;

      if (typeof item === "string") {
        const trimmed = item.trim();

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
  } else if (typeof areas === "string") {
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
  const [visibleWorkerCount, setVisibleWorkerCount] = useState(600000);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [appliedFilters, setAppliedFilters] = useState({
    workerType: initialWorkerType,
    stateValue: initialState,
    city: initialCity,
    gender: "",
    workerGroup: "",
    minAge: "",
    maxAge: "",
  });

  const resultsContainerRef = useRef<HTMLDivElement | null>(null);
  const isAutoFetchingRef = useRef(false);

  const stateOptions = Object.keys(indianStates || {});

  const calculateDisplayTotal = ({
    totalCount,
    filtersUsed,
  }: {
    totalCount: number;
    filtersUsed: boolean;
  }) => {
    if (!filtersUsed) return 600000;
    if (!totalCount) return 0;
    if (totalCount < 100) return totalCount * 100;
    if (totalCount < 500) return totalCount * 200;
    return totalCount * 5;
  };

  const fetchWorkers = async (
    reset = true,
    nextPage = 1,
    overrideFilters?: {
      workerType?: string;
      stateValue?: string;
      city?: string;
      gender?: string;
      workerGroup?: string;
      minAge?: string;
      maxAge?: string;
    }
  ) => {
    try {
      if (reset) setLoading(true);
      else setLoadingMore(true);

      const finalWorkerType = overrideFilters?.workerType ?? workerType;
      const finalStateValue = overrideFilters?.stateValue ?? stateValue;
      const finalCity = overrideFilters?.city ?? city;
      const finalGender = overrideFilters?.gender ?? gender;
      const finalWorkerGroup = overrideFilters?.workerGroup ?? workerGroup;
      const finalMinAge = overrideFilters?.minAge ?? minAge;
      const finalMaxAge = overrideFilters?.maxAge ?? maxAge;

      const currentFiltersApplied = Boolean(
        finalWorkerType?.trim() ||
          finalStateValue?.trim() ||
          finalCity?.trim() ||
          finalGender?.trim() ||
          finalWorkerGroup?.trim() ||
          finalMinAge?.trim() ||
          finalMaxAge?.trim()
      );

      const params: any = {
        page: nextPage,
        limit: PAGE_LIMIT,
      };

      if (finalStateValue) params.state = finalStateValue;

      if (finalCity) params.city = finalCity;
      if (finalWorkerType) params.workerType = finalWorkerType;
      if (finalGender) params.gender = finalGender;
      if (finalWorkerGroup) params.workerGroup = finalWorkerGroup;
      if (finalMinAge) params.minAge = Number(finalMinAge);
      if (finalMaxAge) params.maxAge = Number(finalMaxAge);

      const res = await getWorkers(params);
      const items = res?.agents || [];
      const totalCount = res?.pagination?.total || 0;

      setWorkers((prev) => (reset ? items : [...prev, ...items]));
      setTotal(totalCount);

      if (reset) {
        setVisibleWorkerCount(
          calculateDisplayTotal({
            totalCount,
            filtersUsed: currentFiltersApplied,
          })
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

useEffect(() => {
  fetchWorkers(true, initialPage, {
    workerType: initialWorkerType,
    stateValue: initialState,
    city: initialCity,
    gender: "",
    workerGroup: "",
    minAge: "",
    maxAge: "",
  });

  setAppliedFilters({
    workerType: initialWorkerType,
    stateValue: initialState,
    city: initialCity,
    gender: "",
    workerGroup: "",
    minAge: "",
    maxAge: "",
  });

  setPage(initialPage);
}, [initialWorkerType, initialState, initialCity, initialPage]);

  const applyFilters = async () => {
    const query = new URLSearchParams();

if (workerType) query.set("workerType", workerType);
if (stateValue) query.set("state", stateValue);
if (city) query.set("city", city);
if (gender) query.set("gender", gender);
if (workerGroup) query.set("workerGroup", workerGroup);
if (minAge) query.set("minAge", minAge);
if (maxAge) query.set("maxAge", maxAge);
query.set("page", "1");

    setLoading(true);
    setWorkers([]);
    setPage(1);

const queryString = query.toString();
router.push(queryString ? `/workers?${queryString}` : "/workers");
    setAppliedFilters({
      workerType,
      stateValue,
      city,
      gender,
      workerGroup,
      minAge,
      maxAge,
    });

    await fetchWorkers(true, 1, {
      workerType,
      stateValue,
      city,
      gender,
      workerGroup,
      minAge,
      maxAge,
    });

    setShowMobileFilters(false);
  };

  const clearFilters = async () => {
    const clearedFilters = {
      workerType: "",
      stateValue: "",
      city: "",
      gender: "",
      workerGroup: "",
      minAge: "",
      maxAge: "",
    };

    setWorkerType("");
    setStateValue("");
    setCity("");
    setGender("");
    setWorkerGroup("");
    setMinAge("");
    setMaxAge("");

    setAppliedFilters(clearedFilters);

    setLoading(true);
    setWorkers([]);
    setTotal(0);
    setPage(1);
    setVisibleWorkerCount(600000);

    router.push("/workers");

    await fetchWorkers(true, 1, clearedFilters);
    setShowMobileFilters(false);
  };

  const hasMore = workers.length < total;

  const filtersApplied = Boolean(
    appliedFilters.workerType?.trim() ||
      appliedFilters.stateValue?.trim() ||
      appliedFilters.city?.trim() ||
      appliedFilters.gender?.trim() ||
      appliedFilters.workerGroup?.trim() ||
      appliedFilters.minAge?.trim() ||
      appliedFilters.maxAge?.trim()
  );

  useEffect(() => {
    const container = resultsContainerRef.current;
    if (!container) return;

    const handleScroll = async () => {
      const isNearBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 120;

      if (
        isNearBottom &&
        !loading &&
        !loadingMore &&
        !isAutoFetchingRef.current &&
        hasMore
      ) {
        isAutoFetchingRef.current = true;

        const nextPage = page + 1;
        setPage(nextPage);

        await fetchWorkers(false, nextPage, appliedFilters);

        isAutoFetchingRef.current = false;
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [page, loading, loadingMore, hasMore, appliedFilters]);

  return (
<section className="py-23 sm:py-16 md:py-24 lg:py-40 bg-[#f6f8fc] bg-no-repeat bg-cover mt-1">
        <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Verified Workers & Agents
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Search trusted skilled and unskilled workers across locations.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowMobileFilters(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm lg:hidden"
            >
              <span>⚙️</span>
              Filter
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* Desktop Filters */}
          <aside className="hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:block">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Filters
              </h2>
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400"
              >
                Clear
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Worker Category
                </label>
                <select
                  value={workerType}
                  onChange={(e) => setWorkerType(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400"
                >
                  <option value="">All Categories</option>
                  {WorkerCategoryData.map((item) => (
                    <option
                      key={item.slug}
                      value={item.title}
                      className="bg-white text-slate-900 dark:bg-slate-950 dark:text-white"
                    >
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  State
                </label>
                <select
                  value={stateValue}
                  onChange={(e) => {
                    setStateValue(e.target.value);
                    setCity("");
                  }}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400"
                >
                  <option value="">Select State</option>
                  {stateOptions.map((state) => (
                    <option
                      key={state}
                      value={state}
                      className="bg-white text-slate-900 dark:bg-slate-950 dark:text-white"
                    >
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400"
                >
                  <option value="">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
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
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      workerGroup === "individual"
                        ? "bg-indigo-600 text-white dark:bg-indigo-500"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    }`}
                  >
                    Individual
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setWorkerGroup(workerGroup === "group" ? "" : "group")
                    }
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      workerGroup === "group"
                        ? "bg-indigo-600 text-white dark:bg-indigo-500"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    }`}
                  >
                    Group / Agent
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Age Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={minAge}
                    onChange={(e) => setMinAge(e.target.value)}
                    placeholder="Min"
                    className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
                  />
                  <input
                    type="number"
                    value={maxAge}
                    onChange={(e) => setMaxAge(e.target.value)}
                    placeholder="Max"
                    className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
                  />
                </div>
              </div>

              <button
                onClick={applyFilters}
                className="h-11 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/40 dark:bg-black/60"
                onClick={() => setShowMobileFilters(false)}
              />
              <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm overflow-y-auto border-l border-slate-200 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Filters
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowMobileFilters(false)}
                    className="rounded-lg px-3 py-1 text-sm text-slate-600 dark:text-slate-300"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                      Worker Category
                    </label>
                    <select
                      value={workerType}
                      onChange={(e) => setWorkerType(e.target.value)}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400"
                    >
                      <option value="">All Categories</option>
                      {WorkerCategoryData.map((item) => (
                        <option
                          key={item.slug}
                          value={item.title}
                          className="bg-white text-slate-900 dark:bg-slate-950 dark:text-white"
                        >
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                      State
                    </label>
                    <select
                      value={stateValue}
                      onChange={(e) => {
                        setStateValue(e.target.value);
                        setCity("");
                      }}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400"
                    >
                      <option value="">Select State</option>
                      {stateOptions.map((state) => (
                        <option
                          key={state}
                          value={state}
                          className="bg-white text-slate-900 dark:bg-slate-950 dark:text-white"
                        >
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400"
                    >
                      <option value="">All</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
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
                        className={`rounded-full px-4 py-2 text-sm transition ${
                          workerGroup === "individual"
                            ? "bg-indigo-600 text-white dark:bg-indigo-500"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        }`}
                      >
                        Individual
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setWorkerGroup(workerGroup === "group" ? "" : "group")
                        }
                        className={`rounded-full px-4 py-2 text-sm transition ${
                          workerGroup === "group"
                            ? "bg-indigo-600 text-white dark:bg-indigo-500"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        }`}
                      >
                        Group / Agent
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                      Age Range
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        value={minAge}
                        onChange={(e) => setMinAge(e.target.value)}
                        placeholder="Min"
                        className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
                      />
                      <input
                        type="number"
                        value={maxAge}
                        onChange={(e) => setMaxAge(e.target.value)}
                        placeholder="Max"
                        className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={clearFilters}
                      className="h-11 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      Clear
                    </button>
                    <button
                      onClick={applyFilters}
                      className="h-11 rounded-xl bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div>
            {loading ? (
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm flex flex-col items-center gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
                <p className="text-sm text-slate-500">
                  Fetching best matches for you...
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 rounded-2xl bg-white px-4 py-3 shadow-sm">
                  {filtersApplied && workers.length === 0 ? (
                    <div className="text-center">
                      <p className="text-sm font-semibold text-indigo-600">
                        All our agents and workers are currently busy 👷‍♂️
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        For this filter combination, workers are currently engaged in other work.
                      </p>

                      <p className="text-sm text-slate-500">
                        Try adjusting your filters to discover more available workers near you.
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-slate-700">
                      {visibleWorkerCount.toLocaleString("en-IN")}+ workers available
                    </p>
                  )}
                </div>

                {workers.length === 0 ? (
                  <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                    <p className="text-base font-semibold text-slate-700">
                      No workers or agents found.
                    </p>
                  </div>
                ) : (
                  <>
                    <div
                      ref={resultsContainerRef}
                      className="max-h-[70vh] overflow-y-auto pr-2"
                    >
                      {workers.map((agent) => (
  <div
    key={agent._id}
    className="mb-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
  >
    <div className="flex flex-col gap-3 md:flex-row">
      
      {/* Image Section */}
      <div className="flex items-center gap-3 md:min-w-[110px] md:flex-col md:items-center">
        <img
          src={
            agent.profilePhoto
              ? `https://bookmyworker.s3.eu-north-1.amazonaws.com/${agent.profilePhoto}`
              : "/usericon.png"
          }
          alt={agent.name || "Agent Profile"}
          className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover ring-2 ring-indigo-500"
        />

        <div className="text-left md:text-center">
          <p className="text-sm font-semibold text-slate-800 md:hidden">
            {formatName(agent.name)}
          </p>

          <p className="text-xs text-slate-500">
            {agent.dob ? `${getAge(agent.dob)} yrs` : ""}
            {agent.gender ? ` • ${agent.gender}` : ""}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1">
        
        {/* Desktop Name */}
        <h3 className="hidden md:block text-lg font-bold text-slate-900">
          {formatName(agent.name)}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          📍 {agent.district}, {agent.state}
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {agent.role === "Agent" ? "Agent Managed" : "Worker"}
          </span>

          <span className="rounded-full bg-gradient-to-r from-slate-100 to-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
            {formatAreas(agent.areasOfWork) || "Any Work"}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              window.location.href =
                "https://www.bookmyworkers.com/app/register";
            }}
            className="w-full sm:w-auto rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
          >
            View Contact
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href =
                "https://www.bookmyworkers.com/app/register";
            }}
            className="w-full sm:w-auto rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white"
          >
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  </div>
))}

                      {loadingMore && (
                        <div className="py-4 text-center">
                          <div className="inline-block h-7 w-7 animate-spin rounded-full border-4 border-slate-700 border-t-transparent"></div>
                          <p className="mt-2 text-sm text-slate-500">
                            Loading more workers...
                          </p>
                        </div>
                      )}
                    </div>

                    {hasMore && (
                      <div className="mt-6 text-center">
                        <button
                          onClick={async () => {
                            if (loadingMore) return;
                            const nextPage = page + 1;
                            setPage(nextPage);
                            await fetchWorkers(false, nextPage, appliedFilters);
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
