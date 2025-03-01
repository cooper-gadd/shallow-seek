import CopyButton from "@/components/copy-button";
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center max-w-2xl w-full">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
            Shallow Seek
          </h1>
          <p className="text-lg text-muted-foreground">
            Why go deep when you can stay shallow? 🦦
          </p>
        </div>

        <div className="content-container text-center w-full">
          <p className="mb-6 text-lg">
            Just a shallow wrapper for DuckDuckGo&apos;s bangs. Add this URL to
            your browser&apos;s search engines to get{" "}
            <a
              href="https://duckduckgo.com/bang.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline font-medium"
            >
              all the !bangs
            </a>
            , but faster. Like an otter, we prefer to float on the surface.
          </p>

          <div className="url-container flex gap-2 w-full max-w-xl mx-auto">
            <input
              type="text"
              className="url-input flex-1 px-4 py-2 rounded-md border bg-background text-foreground"
              value={searchUrl}
              readOnly
            />
            <CopyButton textToCopy={searchUrl} />
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 items-center justify-center text-sm text-muted-foreground">
        <a
          href="https://github.com/cooper-gadd/shallow-seek"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:underline-offset-4 hover:text-foreground transition-colors"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
