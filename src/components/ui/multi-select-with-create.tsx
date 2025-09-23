"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";
import { Button } from "./button";
import { Input } from "./input";

interface Option {
  id: string;
  name: string;
  slug?: string;
}

interface MultiSelectWithCreateProps {
  options: Option[];
  selectedIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  onCreateNew: (name: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function MultiSelectWithCreate({
  options,
  selectedIds,
  onSelectionChange,
  onCreateNew,
  placeholder = "Select options...",
  className,
  disabled = false,
}: MultiSelectWithCreateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOptions = options.filter(option => selectedIds.includes(option.id));
  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showCreateOption = searchTerm.length > 0 && 
    !filteredOptions.some(option => option.name.toLowerCase() === searchTerm.toLowerCase());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsCreating(false);
        setNewItemName("");
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleOption = (optionId: string) => {
    if (selectedIds.includes(optionId)) {
      onSelectionChange(selectedIds.filter(id => id !== optionId));
    } else {
      onSelectionChange([...selectedIds, optionId]);
    }
  };

  const handleRemoveSelected = (optionId: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    onSelectionChange(selectedIds.filter(id => id !== optionId));
  };

  const handleCreateNew = () => {
    if (isCreating && newItemName.trim()) {
      onCreateNew(newItemName.trim());
      setNewItemName("");
      setIsCreating(false);
      setSearchTerm("");
    } else if (showCreateOption && searchTerm.trim()) {
      onCreateNew(searchTerm.trim());
      setSearchTerm("");
    } else {
      setIsCreating(true);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && (newItemName.trim() || searchTerm.trim())) {
      event.preventDefault();
      handleCreateNew();
    } else if (event.key === "Escape") {
      setIsCreating(false);
      setNewItemName("");
      setSearchTerm("");
    }
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div
        className={cn(
          "flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer",
          "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          disabled && "cursor-not-allowed opacity-50",
          isOpen && "ring-2 ring-ring ring-offset-2"
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 flex-1">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <Badge key={option.id} variant="secondary" className="text-xs">
                {option.name}
                {!disabled && (
                  <button
                    type="button"
                    className="ml-1 hover:text-destructive"
                    onClick={(e) => handleRemoveSelected(option.id, e)}
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        {!disabled && (
          <ChevronDown
            className={cn(
              "w-4 h-4 opacity-50 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        )}
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-md max-h-60 overflow-auto">
          <div className="p-2 border-b">
            <Input
              placeholder="Search or create new..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-8"
            />
          </div>
          
          <div className="max-h-48 overflow-auto">
            {filteredOptions.map((option) => (
              <div
                key={option.id}
                className={cn(
                  "flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-accent",
                  selectedIds.includes(option.id) && "bg-accent"
                )}
                onClick={() => handleToggleOption(option.id)}
              >
                <Check
                  className={cn(
                    "w-4 h-4 mr-2",
                    selectedIds.includes(option.id) ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.name}
              </div>
            ))}
            
            {showCreateOption && (
              <div
                className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-accent text-primary"
                onClick={handleCreateNew}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create "{searchTerm}"
              </div>
            )}
            
            {isCreating && (
              <div className="p-2 border-t">
                <div className="flex items-center space-x-2">
                  <Input
                    ref={inputRef}
                    placeholder="Enter new category name..."
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="h-8 flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={handleCreateNew}
                    disabled={!newItemName.trim()}
                  >
                    Add
                  </Button>
                </div>
              </div>
            )}
            
            {!isCreating && filteredOptions.length === 0 && !showCreateOption && (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
