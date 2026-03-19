import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown, Globe, Instagram, Facebook, Mail } from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";

const columnHelper = createColumnHelper();

function SocialLinks({ event }) {
  return (
    <div className="flex items-center gap-1">
      {event.Instagram && <a href={event.Instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-500"><Instagram className="w-3.5 h-3.5" /></a>}
      {event.FacebookPage && <a href={event.FacebookPage} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600"><Facebook className="w-3.5 h-3.5" /></a>}
      {event.Website && <a href={event.Website} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-500"><Globe className="w-3.5 h-3.5" /></a>}
      {event.Email && <a href={`mailto:${event.Email}`} className="text-slate-400 hover:text-brand-500"><Mail className="w-3.5 h-3.5" /></a>}
    </div>
  );
}

const columns = [
  columnHelper.accessor("Name", {
    header: "Name",
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),
  columnHelper.accessor("Venue", { header: "Venue" }),
  columnHelper.accessor("Weekday", { header: "Day" }),
  columnHelper.accessor("Time", { header: "Time" }),
  columnHelper.accessor("Category", {
    header: "Category",
    cell: (info) => info.getValue() ? <Badge variant="secondary">{info.getValue()}</Badge> : null,
  }),
  columnHelper.accessor("Language", { header: "Language" }),
  columnHelper.accessor("AudienceEntryFee", { header: "Entry" }),
  columnHelper.accessor("Status", {
    header: "Status",
    cell: (info) => <Badge variant={info.getValue() === "Active" ? "active" : "inactive"}>{info.getValue()}</Badge>,
  }),
  columnHelper.display({
    id: "links",
    header: "Links",
    cell: (info) => <SocialLinks event={info.row.original} />,
  }),
];

export default function EventTable({ data, onRowClick }) {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-900">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap",
                    header.column.getCanSort() && "cursor-pointer hover:text-slate-900 dark:hover:text-white select-none"
                  )}
                >
                  <div className="flex items-center gap-1">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "asc" && <ArrowUp className="w-3 h-3" />}
                    {header.column.getIsSorted() === "desc" && <ArrowDown className="w-3 h-3" />}
                    {header.column.getCanSort() && !header.column.getIsSorted() && <ArrowUpDown className="w-3 h-3 opacity-30" />}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => onRowClick(row.original)}
              className="bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="py-12 text-center text-slate-500 dark:text-slate-400">
          No events match your filters.
        </div>
      )}
    </div>
  );
}
