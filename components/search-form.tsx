"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  q: z.string().min(1, "Please enter a search query"),
});

type SearchFormValues = z.infer<typeof formSchema>;

export default function SearchForm({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  const router = useRouter();

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      q: defaultValue || "",
    },
  });

  const onSubmit = (data: SearchFormValues) => {
    if (data.q.trim()) {
      router.push(`/?q=${encodeURIComponent(data.q.trim())}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6">
        <FormField
          control={form.control}
          name="q"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <FormControl>
                  <Input
                    {...field}
                    placeholder="!gi otters"
                    className="w-full rounded-lg border bg-background pl-9 pr-4 py-3 text-foreground placeholder:text-muted-foreground/70"
                    autoFocus
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
