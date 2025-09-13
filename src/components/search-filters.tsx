"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedPriceFilter: string;
  onPriceFilterChange: (filter: string) => void;
  selectedPlatformFilter: string;
  onPlatformFilterChange: (filter: string) => void;
  selectedBackendFilter: string;
  onBackendFilterChange: (filter: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedPriceFilter,
  onPriceFilterChange,
  selectedPlatformFilter,
  onPlatformFilterChange,
  selectedBackendFilter,
  onBackendFilterChange,
}) => {
  const priceFilters: FilterOption[] = [
    { id: "all", label: "All Prices" },
    { id: "free", label: "Free" },
    { id: "premium", label: "Premium" },
  ];

  const platformFilters: FilterOption[] = [
    { id: "all", label: "All Products" },
    { id: "google-ads", label: "Google Ads" },
    { id: "ga4", label: "GA 4" },
    { id: "meta", label: "Meta (soon)" },
  ];

  const backendFilters: FilterOption[] = [
    { id: "all", label: "All Backends" },
    { id: "looker", label: "Looker Studio" },
    { id: "script", label: "Script" },
    { id: "make", label: "Make.com" },
    { id: "n8n", label: "N8n" },
  ];

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search for Products"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-slate-800/50 border-slate-700/50 text-white placeholder-gray-400 focus:border-purple-500"
        />
      </div>

      {/* Filter Sections */}
      <div className="space-y-4">
        {/* Price Filter */}
        <div>
          <h3 className="text-white font-medium mb-3">Price</h3>
          <div className="flex flex-wrap gap-2">
            {priceFilters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedPriceFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => onPriceFilterChange(filter.id)}
                className={
                  selectedPriceFilter === filter.id
                    ? "bg-purple-600 hover:bg-purple-700 text-white border-0"
                    : "border-slate-600 text-slate-300 hover:bg-slate-700/50"
                }
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Platform Filter */}
        <div>
          <h3 className="text-white font-medium mb-3">Platforms</h3>
          <div className="flex flex-wrap gap-2">
            {platformFilters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedPlatformFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => onPlatformFilterChange(filter.id)}
                className={
                  selectedPlatformFilter === filter.id
                    ? "bg-purple-600 hover:bg-purple-700 text-white border-0"
                    : "border-slate-600 text-slate-300 hover:bg-slate-700/50"
                }
              >
                {filter.icon && <span className="mr-2">{filter.icon}</span>}
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Backend Filter */}
        <div>
          <h3 className="text-white font-medium mb-3">Back-end</h3>
          <div className="flex flex-wrap gap-2">
            {backendFilters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedBackendFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => onBackendFilterChange(filter.id)}
                className={
                  selectedBackendFilter === filter.id
                    ? "bg-purple-600 hover:bg-purple-700 text-white border-0"
                    : "border-slate-600 text-slate-300 hover:bg-slate-700/50"
                }
              >
                {filter.icon && <span className="mr-2">{filter.icon}</span>}
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
