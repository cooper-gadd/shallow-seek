import SearchForm from "@/components/search-form";
import { bangs } from "@/lib/bangs";
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

  return (
    <div className="min-h-screen flex flex-col flex-1 items-center justify-center">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold">Shallow Seek</h1>
          <p className="text-sm text-muted-foreground">
            Why go deep when you can stay shallow? 🦦
          </p>
        </div>

        <SearchForm defaultValue={q} />
      </div>
    </div>
  );
}
