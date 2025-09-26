"use client";

import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="justify-between w-full">
          <span className="truncate text-left">{label}: {countText}</span>
          <span className="opacity-60 ml-2">▾</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Select {label}</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          <Input placeholder={placeholder} value={query} onChange={(e) => setQuery(e.target.value)} className="h-10" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <button onClick={selectAll} className="hover:text-foreground font-medium">Select all</button>
            <button onClick={clear} className="hover:text-foreground font-medium">Clear</button>
          </div>
          <div className="flex-1 overflow-auto rounded-md border max-h-[50vh]">
            {filtered.length === 0 ? (
              <div className="p-4 text-sm text-muted-foreground text-center">No options found</div>
            ) : (
              filtered.map(opt => {
                const checked = local.includes(opt.id);
                return (
                  <label key={opt.id} className="flex items-center gap-3 px-4 py-3 text-sm border-b last:border-b-0 cursor-pointer hover:bg-accent/40">
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
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={apply}>Apply</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}


