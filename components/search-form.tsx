'use client';

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function SearchForm({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('q')?.toString().trim();
    
    if (query) {
      // Redirect directly without a page navigation
      router.push(`/?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          name="q"
          placeholder="!gh nextjs"
          defaultValue={defaultValue}
          className="w-full rounded-lg border bg-background pl-9 pr-4 py-3 text-foreground placeholder:text-muted-foreground/70"
          autoFocus
        />
      </div>
    </form>
  );
} 