import React, { useState } from "react";
import { Heart, MapPin, Clock, Globe, Instagram, Facebook, Mail, Copy, Check } from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";

const CATEGORY_COLORS = {
  "Stand-up Comedy": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "Music": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Poetry / Spoken Word": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "Mixed / Various": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  "Storytelling": "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
  "Improv": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "Other": "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
};

export default function EventCard({ event, isFavorite, onToggleFavorite, onClick }) {
  const [copied, setCopied] = useState(false);

  function handleCopy(e) {
    e.stopPropagation();
    const url = `${window.location.origin}?q=${encodeURIComponent(event.Name)}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const categoryColor = CATEGORY_COLORS[event.Category] || CATEGORY_COLORS["Other"];

  return (
    <div
      onClick={onClick}
      className="group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:border-brand-400 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-brand-600 transition-colors">
            {event.Name}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{event.Venue}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(event.Name); }}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle favorite"
          >
            <Heart className={cn("w-4 h-4", isFavorite ? "fill-brand-500 text-brand-500" : "text-slate-400")} />
          </button>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {event.Category && (
          <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", categoryColor)}>
            {event.Category}
          </span>
        )}
        <Badge variant={event.Status === "Active" ? "active" : "inactive"}>
          {event.Status}
        </Badge>
        {event.Language && (
          <Badge variant="secondary">{event.Language}</Badge>
        )}
        {event.AudienceEntryFee && (
          <Badge variant="secondary">
            {event.AudienceEntryFee === "Free" ? "Free" : event.AudienceEntryFee}
          </Badge>
        )}
      </div>

      {/* Info rows */}
      <div className="space-y-1.5 mb-4">
        {(event.Weekday || event.Time) && (
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{[event.Weekday, event.Time, event.Frequency].filter(Boolean).join(" · ")}</span>
          </div>
        )}
        {event.Address && (
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{event.Address}</span>
          </div>
        )}
      </div>

      {/* Social links */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
        {event.Instagram && (
          <a href={event.Instagram} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 text-slate-400 hover:text-pink-500 transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
        )}
        {event.FacebookPage && (
          <a href={event.FacebookPage} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors">
            <Facebook className="w-4 h-4" />
          </a>
        )}
        {event.Website && (
          <a href={event.Website} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 text-slate-400 hover:text-brand-500 transition-colors">
            <Globe className="w-4 h-4" />
          </a>
        )}
        {event.Email && (
          <a href={`mailto:${event.Email}`}
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 text-slate-400 hover:text-brand-500 transition-colors">
            <Mail className="w-4 h-4" />
          </a>
        )}
        <div className="ml-auto">
          <button onClick={handleCopy}
            className="p-1.5 text-slate-400 hover:text-brand-500 transition-colors">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
