"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";

type Option = { value: string; label: string };

interface CheckboxDropdownProps {
  label: string;
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function CheckboxDropdown({ 
  label, 
  options, 
  selected, 
  onChange, 
  placeholder = "Select...",
  className = ""
}: CheckboxDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(item => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const handleClear = () => {
    onChange([]);
  };

  const handleSelectAll = () => {
    onChange(options.map(opt => opt.value));
  };

  const displayText = selected.length === 0 
    ? placeholder 
    : selected.length === 1 
      ? options.find(opt => opt.value === selected[0])?.label || selected[0]
      : `${selected.length} selected`;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between h-10 px-3 py-2 text-left"
      >
        <span className="truncate">{displayText}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-md shadow-lg">
          <div className="p-2">
            {/* Header with Clear and Select All */}
            <div className="flex justify-between items-center mb-2 pb-2 border-b border-border">
              <button
                onClick={handleClear}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleSelectAll}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Select All
              </button>
            </div>

            {/* Options */}
            <div className="max-h-60 overflow-y-auto">
              {options.map((option) => {
                const isSelected = selected.includes(option.value);
                return (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 px-2 py-2 text-sm cursor-pointer hover:bg-accent/50 rounded-sm transition-colors"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggle(option.value)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center transition-colors ${
                        isSelected 
                          ? 'bg-primary border-primary' 
                          : 'border-border hover:border-primary/50'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                    </div>
                    <span className="flex-1">{option.label}</span>
                  </label>
                );
              })}
            </div>

            {/* Footer with Done button */}
            <div className="flex justify-end pt-2 mt-2 border-t border-border">
              <Button
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 px-4"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
