import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Clock, Globe, Instagram, Facebook, Mail, Phone, ExternalLink, Mic, Users, Accessibility, Heart, User, CalendarCheck } from "lucide-react";
import { cn } from "../lib/utils";

/** Resolves the URL to open when "Book a spot" is clicked.
 *  Returns null when the button should be hidden. */
function resolveBookingUrl(event) {
  const method = (event.ContactBooking || "").toLowerCase();
  if (!method) return null;

  if (method.includes("instagram")) return event.Instagram || null;
  if (method.includes("form"))      return event.GForm     || null;
  if (method.includes("whatsapp") || method.includes("telegram")) return event.WhatsApp || null;
  if (method.includes("email"))     return event.Email ? `mailto:${event.Email}` : null;

  return null;
}

function InfoRow({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-start gap-3 py-2">
      <Icon className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer"
            className="text-sm text-brand-500 hover:underline break-all">{value}</a>
        ) : (
          <p className="text-sm text-slate-900 dark:text-white">{value}</p>
        )}
      </div>
    </div>
  );
  return value ? content : null;
}

export default function EventDetailSheet({ event, open, onClose, isFavorite, onToggleFavorite }) {
  if (!event) return null;

  const bookingUrl = resolveBookingUrl(event);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-2xl">
        <SheetHeader className="mb-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <SheetTitle className="text-xl">{event.Name}</SheetTitle>
              <p className="text-slate-500 dark:text-slate-400 mt-1">{event.Venue}</p>
            </div>
            <button
              onClick={() => onToggleFavorite(event.Name)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mt-1"
            >
              <Heart className={cn("w-5 h-5", isFavorite ? "fill-brand-500 text-brand-500" : "text-slate-400")} />
            </button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {event.Category && <Badge variant="default">{event.Category}</Badge>}
            <Badge variant={event.Status === "Active" ? "active" : "inactive"}>{event.Status}</Badge>
            {event.Language && <Badge variant="secondary">{event.Language}</Badge>}
            {event.Level && <Badge variant="secondary">{event.Level}</Badge>}
          </div>

          {/* Book a spot */}
          {bookingUrl && (
            <div className="mt-4">
              <Button asChild className="w-full sm:w-auto gap-2">
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  <CalendarCheck className="w-4 h-4" />
                  Book a spot
                </a>
              </Button>
            </div>
          )}
        </SheetHeader>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <InfoRow icon={Clock} label="When" value={[event.Weekday, event.Time, event.Frequency].filter(Boolean).join(" · ")} />
          <InfoRow icon={MapPin} label="Address" value={event.Address} href={event.Address ? `https://maps.google.com/?q=${encodeURIComponent(event.Address)}` : null} />
          {event.AudienceEntryFee && <InfoRow icon={Users} label="Entry fee" value={event.AudienceEntryFee} />}
          {event.WheelchairAccess && <InfoRow icon={Accessibility} label="Wheelchair access" value={event.WheelchairAccess} />}
          {event.Description && (
            <div className="py-3">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">About</p>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{event.Description}</p>
            </div>
          )}
          <InfoRow icon={Globe} label="Website" value={event.Website} href={event.Website} />
          <InfoRow icon={Instagram} label="Instagram" value={event.Instagram} href={event.Instagram} />
          <InfoRow icon={Facebook} label="Facebook" value={event.FacebookPage || event.FacebookGroup} href={event.FacebookPage || event.FacebookGroup} />
          <InfoRow icon={Mail} label="Email" value={event.Email} href={event.Email ? `mailto:${event.Email}` : null} />
          <InfoRow icon={Phone} label="WhatsApp" value={event.WhatsApp} href={event.WhatsApp ? `https://wa.me/${event.WhatsApp.replace(/\D/g, "")}` : null} />
          {event.OrganizerName && <InfoRow icon={User} label="Organizer" value={event.OrganizerName} />}
          {event.HowToBook && <InfoRow icon={Mic} label="How to book a spot" value={event.HowToBook} />}
          {event.UpdateInfoFormLink && (
            <div className="py-3">
              <a href={event.UpdateInfoFormLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-brand-500 hover:underline">
                <ExternalLink className="w-3.5 h-3.5" />
                Update event info
              </a>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
