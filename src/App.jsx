import React, { useState, useMemo } from "react";
import { Toaster } from "sonner";
import NavigationBar from "./components/NavigationBar";
import FilterBar from "./components/FilterBar";
import EventTable from "./components/EventTable";
import EventDetailSheet from "./components/EventDetailSheet";
import MapView from "./components/MapView";
import SubmitForm from "./components/SubmitForm";
import SkeletonCards from "./components/SkeletonCards";
import { useFetchData } from "./hooks/useFetchData";
import { useFavorites } from "./hooks/useFavorites";

export default function App() {
  const { events, loading } = useFetchData();
  const { favorites, toggleFavorite } = useFavorites();

  const [filters, setFilters] = useState({
    search: "",
    days: new Set(),
    categories: new Set(),
    languages: new Set(),
    statuses: new Set(),
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const s = filters.search.toLowerCase();
      if (s && !`${e.Name} ${e.Venue} ${e.Address}`.toLowerCase().includes(s)) return false;
      if (filters.days.size && !filters.days.has(e.Weekday)) return false;
      if (filters.categories.size && !filters.categories.has(e.Category)) return false;
      if (filters.languages.size && !filters.languages.has(e.Language)) return false;
      if (filters.statuses.size && !filters.statuses.has(e.Status)) return false;
      return true;
    });
  }, [events, filters]);

  function openDetail(event) {
    setSelectedEvent(event);
    setDetailOpen(true);
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-950">
      <Toaster richColors position="top-center" />

      {/* Sticky: Navbar */}
      <NavigationBar onSubmitClick={() => setSubmitOpen(true)} />

      {/* Sticky: Filters + Map panel */}
      <div className="flex-shrink-0 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 pt-4 pb-3 space-y-3">
        <FilterBar filters={filters} onChange={setFilters} resultCount={filtered.length} />
        <MapView events={filtered} onMarkerClick={openDetail} />
      </div>

      {/* Scrollable: Table */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4">
        {loading ? (
          <SkeletonCards count={3} />
        ) : (
          <EventTable data={filtered} onRowClick={openDetail} />
        )}
        <p className="text-center text-xs text-slate-400 dark:text-slate-600 py-6">
          Open Mic Milano — data stored in{" "}
          <a href="https://docs.google.com/spreadsheets/d/1_X_znvg8kGbFMXoys011182T5ZTGONCsveY9uLEWsr8"
            target="_blank" rel="noopener noreferrer"
            className="text-brand-500 hover:underline">
            Google Sheets
          </a>
        </p>
      </div>

      {/* Modals */}
      <EventDetailSheet
        event={selectedEvent}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        isFavorite={selectedEvent ? favorites.has(selectedEvent.Name) : false}
        onToggleFavorite={toggleFavorite}
      />
      <SubmitForm open={submitOpen} onClose={() => setSubmitOpen(false)} />
    </div>
  );
}
