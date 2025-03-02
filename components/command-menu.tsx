"use client";

import { Github, Globe, Home, Info } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigationItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/default", label: "Default Search", icon: Globe },
  ];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Links">
          {navigationItems.map(
            ({ path, label, icon: Icon }) =>
              pathname !== path && (
                <CommandItem
                  key={path}
                  onSelect={() => {
                    setOpen(false);
                    router.push(path);
                  }}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                </CommandItem>
              ),
          )}
          <CommandItem
            onSelect={() => {
              setOpen(false);
              window.open(
                "https://github.com/cooper-gadd/shallow-seek",
                "_blank",
              );
            }}
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setOpen(false);
              window.open("https://duckduckgo.com/bang.html", "_blank");
            }}
          >
            <Info className="mr-2 h-4 w-4" />
            About !Bangs
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
