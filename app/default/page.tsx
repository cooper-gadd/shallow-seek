import CopyButton from "@/components/copy-button";

export default function DefaultSearchPage() {
  const searchUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "https://shallow-seek.vercel.app"}/search?q=%s`;

  return (
    <div className="min-h-screen flex flex-col flex-1 items-center justify-center">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold">
            Make it your default search engine
          </h1>
          <p className="text-sm text-muted-foreground">
            Set this link to a custom search engine.
          </p>
        </div>

        <div className="flex gap-2 justify-center">
          <code className="relative rounded bg-muted px-3 py-1.5 font-mono text-sm font-semibold overflow-x-auto">
            {searchUrl}
          </code>
          <CopyButton textToCopy={searchUrl} />
        </div>
      </div>
    </div>
  );
}
