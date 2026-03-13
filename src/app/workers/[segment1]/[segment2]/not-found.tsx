// app/workers/[segment1]/[category]/not-found.tsx

export default function NotFoundPage() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-4 text-slate-600">
        The worker category page you are looking for does not exist.
      </p>
    </div>
  );
}