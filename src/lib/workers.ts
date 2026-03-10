export type WorkerItem = {
  _id: string;
  name: string;
  role?: string;
  state?: string;
  district?: string;
  gender?: string;
  dob?: string | number;
  workExperience?: number;
  fixedSalary?: number;
  salaryFrom?: number;
  salaryTo?: number;
  workerType?: string;
  areasOfWork?: string[] | string;
  profilePhoto?: string;
  rating?: number;
  veryfiedBage?: boolean;
};

export type WorkersResponse = {
  success: boolean;
  agents: WorkerItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages?: number;
  };
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:5000";

function normalizeBaseUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function buildUrl(baseUrl: string, path: string) {
  const safeBase = normalizeBaseUrl(baseUrl);
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${safeBase}${safePath}`;
}

export async function getWorkers(params: {
  page?: number;
  limit?: number;
  state?: string;
  city?: string;
  block?: string;
  workerType?: string;
  minAge?: number;
  maxAge?: number;
  gender?: string;
  workerGroup?: string;
}): Promise<WorkersResponse> {
  const url = new URL(buildUrl(API_BASE_URL, "/api/v1/user/getAllAgents"));

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString(), {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch workers");
  }

  return res.json();
}

export async function unlockWorkerNumber(agentId: string) {
  const url = buildUrl(API_BASE_URL, `/api/v1/user/unlock-number/${agentId}`);

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to unlock number");
  }

  return data;
}

export async function saveWorkerRemark(workerId: string, status: string) {
  const url = buildUrl(API_BASE_URL, "/api/v1/user/worker-remark");

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ workerId, status }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to save remark");
  }

  return data;
}

export async function getWorkerRemarks() {
  const url = buildUrl(API_BASE_URL, "/api/v1/user/worker-remarks");

  const res = await fetch(url, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch remarks");
  }

  return res.json();
}