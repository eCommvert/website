"use client";

import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover" as any;
// Using Radix directly to avoid adding another wrapper; site already uses shadcn primitives
import * as Pop from "@radix-ui/react-popover";
import { Input } from "@/components/ui/input";

type Option = { id: string; label: string };

interface MultiSelectPopoverProps {
  label: string;
  options: Option[];
  selected: string[] | undefined;
  onChange: (next: string[]) => void;
  placeholder?: string;
  defaultAllHint?: string; // shown when selected is empty
}

export function MultiSelectPopover({ label, options, selected, onChange, placeholder = "Select...", defaultAllHint = "All (default)" }: MultiSelectPopoverProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [local, setLocal] = useState<string[]>(selected || []);

  useEffect(() => {
    setLocal(selected || []);
  }, [selected]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return options.filter(o => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const apply = () => {
    onChange(local);
    setOpen(false);
  };

  const clear = () => {
    setLocal([]);
  };

  const selectAll = () => {
    setLocal(options.map(o => o.id));
  };

  const countText = (selected && selected.length > 0) ? `${selected.length} selected` : defaultAllHint;

  return (
    <Pop.Root open={open} onOpenChange={setOpen}>
      <Pop.Trigger asChild>
        <Button variant="outline" size="sm" className="justify-between w-full">
          <span className="truncate text-left">{label}: {countText}</span>
          <span className="opacity-60 ml-2">▾</span>
        </Button>
      </Pop.Trigger>
      <Pop.Content sideOffset={6} className="z-50 rounded-md border bg-popover p-3 text-popover-foreground shadow-md w-64">
        <div className="space-y-2">
          <Input placeholder={placeholder} value={query} onChange={(e) => setQuery(e.target.value)} className="h-8" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <button onClick={selectAll} className="hover:text-foreground">Select all</button>
            <button onClick={clear} className="hover:text-foreground">Clear</button>
          </div>
          <div className="max-h-56 overflow-auto rounded-md border">
            {filtered.length === 0 ? (
              <div className="p-3 text-sm text-muted-foreground">No options</div>
            ) : (
              filtered.map(opt => {
                const checked = local.includes(opt.id);
                return (
                  <label key={opt.id} className="flex items-center gap-2 px-3 py-2 text-sm border-b last:border-b-0 cursor-pointer hover:bg-accent/40">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={checked}
                      onChange={(e) => {
                        setLocal(prev => {
                          const set = new Set(prev);
                          if (e.target.checked) set.add(opt.id); else set.delete(opt.id);
                          return Array.from(set);
                        });
                      }}
                    />
                    <span>{opt.label}</span>
                  </label>
                );
              })
            )}
          </div>
          <div className="flex items-center justify-end gap-2 pt-1">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={apply}>Apply</Button>
          </div>
        </div>
      </Pop.Content>
    </Pop.Root>
  );
}


