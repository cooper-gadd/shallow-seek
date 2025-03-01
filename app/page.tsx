import CopyButton from "@/components/copy-button";
import SearchForm from "@/components/search-form";
import { bangs } from "@/lib/bang";
import { redirect } from "next/navigation";

function getBangRedirectUrl(query: string) {
  const LS_DEFAULT_BANG = "g"; // We&apos;ll handle localStorage differently in Next.js
  const defaultBang = bangs.find((b) => b.t === LS_DEFAULT_BANG);

  if (!query) return null;

  const match = query.match(/!(\S+)/i);
  const bangCandidate = match?.[1]?.toLowerCase();
  const selectedBang = bangs.find((b) => b.t === bangCandidate) ?? defaultBang;

  // Remove the first bang from the query
  const cleanQuery = query.replace(/!\S+\s*/i, "").trim();

  // Format of the url is:
  // https://www.google.com/search?q={{{s}}}
  const searchUrl = selectedBang?.u.replace(
    "{{{s}}}",
    // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
    encodeURIComponent(cleanQuery).replace(/%2F/g, "/"),
  );

  return searchUrl;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim();

  if (query) {
    const redirectUrl = getBangRedirectUrl(query);
    if (redirectUrl) {
      redirect(redirectUrl);
    }
  }

  const searchUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "https://shallow-seek.vercel.app"}/search?q=%s`;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold">Shallow Seek</h1>
            <p className="text-sm text-muted-foreground">
              Why go deep when you can stay shallow? 🦦
            </p>
          </div>

          <SearchForm defaultValue={q} />

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Make it your default search engine
            </p>
            <div className="flex gap-2 max-w-lg mx-auto justify-center">
              <code className="relative rounded bg-muted px-3 py-1.5 font-mono text-sm font-semibold overflow-x-auto">
                {searchUrl}
              </code>
              <CopyButton textToCopy={searchUrl} />
            </div>
          </div>
        </div>
      </main>

      <footer className="p-4 flex gap-4 text-sm text-muted-foreground justify-center">
        <a
          href="https://github.com/cooper-gadd/shallow-seek"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground"
        >
          GitHub
        </a>
        <span>•</span>
        <a
          href="https://duckduckgo.com/bang.html"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground"
        >
          !Bangs
        </a>
      </footer>
    </div>
  );
}
