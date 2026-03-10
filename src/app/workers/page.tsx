import WorkersSearchPage from "@/components/workers/WorkersSearchPage";

type Props = {
  searchParams: Promise<{
    workerType?: string;
    state?: string;
    city?: string;
    page?: string;
  }>;
};

export default async function WorkersPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <WorkersSearchPage
      initialWorkerType={params.workerType || ""}
      initialState={params.state || ""}
      initialCity={params.city || ""}
      initialPage={Number(params.page || 1)}
    />
  );
}