import React, { useState } from "react";
import { Mic, Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useDarkMode } from "../hooks/useDarkMode";

export default function NavigationBar({ onSubmitClick }) {
  const [dark, setDark] = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <img src="/milano-2.png" alt="Open Mic Milano" className="h-9 w-auto dark:drop-shadow-[0_0_6px_rgba(255,255,255,0.95)]" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg">
                <span className="text-slate-900 dark:text-white dark:drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]">Open Mic </span>
                <span className="text-brand-500">Milano</span>
              </span>
              <span className="text-xs font-light text-slate-900 dark:text-white tracking-widest uppercase">Milano's stand-up comedy</span>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setDark(!dark)}>
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button size="sm" onClick={onSubmitClick}>
              <Mic className="w-4 h-4 mr-2" />
              Submit an open mic
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setDark(!dark)}>
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden pb-4 border-t border-slate-200 dark:border-slate-800 pt-3">
            <Button className="w-full" onClick={() => { onSubmitClick(); setMenuOpen(false); }}>
              <Mic className="w-4 h-4 mr-2" />
              Submit an open mic night
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
