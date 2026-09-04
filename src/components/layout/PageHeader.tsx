export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold text-navy-900 md:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-3xl text-slate-600">{description}</p>
        )}
      </div>
    </section>
  );
}
