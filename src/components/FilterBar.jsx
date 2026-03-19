import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const LANGUAGES = ["English", "Italian", "Bilingual"];

function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border",
        active
          ? "bg-brand-500 text-white border-brand-500"
          : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-400"
      )}
    >
      {label}
    </button>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <div className="relative w-9 h-5">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="absolute inset-0 rounded-full bg-slate-200 dark:bg-slate-700 peer-checked:bg-brand-500 transition-colors" />
        <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
      </div>
      <span className="text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">{label}</span>
    </label>
  );
}

export default function FilterBar({ filters, onChange, availableCategories = [] }) {
  const { search, days, categories, languages, showInactive } = filters;

  function toggleFilter(key, value) {
    onChange((prev) => {
      const set = new Set(prev[key]);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      return { ...prev, [key]: set };
    });
  }

  function clearAll() {
    onChange({ search: "", days: new Set(), categories: new Set(), languages: new Set(), showInactive: false });
  }

  const hasFilters = !!(search || days.size || categories.size || languages.size);

  return (
    <div className="space-y-3">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search by name, venue, address…"
          value={search}
          onChange={(e) => onChange((prev) => ({ ...prev, search: e.target.value }))}
          className="pl-10"
        />
        {search && (
          <button
            onClick={() => onChange((prev) => ({ ...prev, search: "" }))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter chips */}
      <div className="space-y-2">
        {/* Days */}
        <div className="filter-chips flex gap-2 pb-1">
          {DAYS.map((d) => (
            <Chip key={d} label={d} active={days.has(d)} onClick={() => toggleFilter("days", d)} />
          ))}
        </div>
        {/* Categories + Languages + Show Inactive toggle */}
        <div className="filter-chips flex gap-2 pb-1 items-center">
          {availableCategories.map((c) => (
            <Chip key={c} label={c} active={categories.has(c)} onClick={() => toggleFilter("categories", c)} />
          ))}
          {LANGUAGES.map((l) => (
            <Chip key={l} label={l} active={languages.has(l)} onClick={() => toggleFilter("languages", l)} />
          ))}
          <div className="ml-2 border-l border-slate-200 dark:border-slate-700 pl-3">
            <Toggle
              checked={showInactive}
              onChange={(val) => onChange((prev) => ({ ...prev, showInactive: val }))}
              label="Show inactive"
            />
          </div>
        </div>
      </div>

      {/* Clear filters */}
      {hasFilters && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={clearAll} className="h-7 text-xs">
            <X className="w-3 h-3 mr-1" /> Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
