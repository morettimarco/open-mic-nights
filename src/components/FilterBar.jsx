import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const CATEGORIES = ["Stand-up Comedy", "Music", "Poetry / Spoken Word", "Mixed / Various", "Storytelling", "Improv", "Other"];
const LANGUAGES = ["English", "Italian", "Bilingual"];
const STATUSES = ["Active", "Inactive"];

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

export default function FilterBar({ filters, onChange, resultCount }) {
  const { search, days, categories, languages, statuses } = filters;

  function toggleFilter(key, value) {
    onChange((prev) => {
      const set = new Set(prev[key]);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      return { ...prev, [key]: set };
    });
  }

  function clearAll() {
    onChange({ search: "", days: new Set(), categories: new Set(), languages: new Set(), statuses: new Set() });
  }

  const hasFilters = !!(search || days.size || categories.size || languages.size || statuses.size);

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
        {/* Categories */}
        <div className="filter-chips flex gap-2 pb-1">
          {CATEGORIES.map((c) => (
            <Chip key={c} label={c} active={categories.has(c)} onClick={() => toggleFilter("categories", c)} />
          ))}
          {STATUSES.map((s) => (
            <Chip key={s} label={s} active={statuses.has(s)} onClick={() => toggleFilter("statuses", s)} />
          ))}
          {LANGUAGES.map((l) => (
            <Chip key={l} label={l} active={languages.has(l)} onClick={() => toggleFilter("languages", l)} />
          ))}
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
