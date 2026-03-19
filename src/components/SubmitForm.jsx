import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useSubmitEvent } from "../hooks/useSubmitEvent";
import { toast } from "sonner";
import { WEEKDAYS, FREQUENCIES, LANGUAGES, LEVELS } from "../constants";
import { Loader2 } from "lucide-react";

const schema = z.object({
  Name: z.string().min(2, "Name is required"),
  Venue: z.string().min(2, "Venue is required"),
  Address: z.string().min(5, "Address is required"),
  Weekday: z.string().min(1, "Please select a day"),
  Time: z.string().optional(),
  Frequency: z.string().optional(),
  Category: z.string().optional(),
  Language: z.string().optional(),
  Level: z.string().optional(),
  AudienceEntryFee: z.string().optional(),
  WheelchairAccess: z.string().optional(),
  Instagram: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  FacebookPage: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  Email: z.string().email("Must be a valid email").or(z.literal("")).optional(),
  Website: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  WhatsApp: z.string().optional(),
  Description: z.string().max(500).optional(),
  OrganizerName: z.string().optional(),
});

function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}

export default function SubmitForm({ open, onClose, availableCategories = [] }) {
  const { submitEvent, submitting } = useSubmitEvent();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit(data) {
    const result = await submitEvent(data);
    if (result.success) {
      toast.success("Thank you! Your submission will be reviewed and added soon.");
      reset();
      onClose();
    } else {
      toast.error("Something went wrong. Please try again or contact us directly.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Submit an open mic night</DialogTitle>
          <DialogDescription>
            Fill in the details below. Your submission will be reviewed and added to the map within a few days.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          {/* Required fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Event name *" error={errors.Name}>
              <Input {...register("Name")} placeholder="e.g. Milano Comedy Night" />
            </Field>
            <Field label="Venue *" error={errors.Venue}>
              <Input {...register("Venue")} placeholder="e.g. Bar Bello" />
            </Field>
          </div>

          <Field label="Full address *" error={errors.Address}>
            <Input {...register("Address")} placeholder="Via Roma, 12, 20100 Milano MI" />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Day *" error={errors.Weekday}>
              <Select {...register("Weekday")}>
                <option value="">Select day…</option>
                {WEEKDAYS.map((d) => <option key={d} value={d}>{d}</option>)}
              </Select>
            </Field>
            <Field label="Start time" error={errors.Time}>
              <Input {...register("Time")} type="time" />
            </Field>
            <Field label="Frequency" error={errors.Frequency}>
              <Select {...register("Frequency")}>
                <option value="">Select…</option>
                {FREQUENCIES.map((f) => <option key={f} value={f}>{f}</option>)}
              </Select>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Category" error={errors.Category}>
              <Select {...register("Category")}>
                <option value="">Select…</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </Select>
            </Field>
            <Field label="Language" error={errors.Language}>
              <Select {...register("Language")}>
                <option value="">Select…</option>
                {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
              </Select>
            </Field>
            <Field label="Level" error={errors.Level}>
              <Select {...register("Level")}>
                <option value="">Select…</option>
                {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </Select>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Audience entry fee" error={errors.AudienceEntryFee}>
              <Input {...register("AudienceEntryFee")} placeholder="Free / €5 / Donation" />
            </Field>
            <Field label="Wheelchair accessible?" error={errors.WheelchairAccess}>
              <Select {...register("WheelchairAccess")}>
                <option value="">Unknown</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Partial">Partial</option>
              </Select>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Instagram URL" error={errors.Instagram}>
              <Input {...register("Instagram")} placeholder="https://instagram.com/…" />
            </Field>
            <Field label="Facebook Page URL" error={errors.FacebookPage}>
              <Input {...register("FacebookPage")} placeholder="https://facebook.com/…" />
            </Field>
            <Field label="Email" error={errors.Email}>
              <Input {...register("Email")} type="email" placeholder="contact@example.com" />
            </Field>
            <Field label="Website" error={errors.Website}>
              <Input {...register("Website")} placeholder="https://…" />
            </Field>
          </div>

          <Field label="WhatsApp (number or group link)" error={errors.WhatsApp}>
            <Input {...register("WhatsApp")} placeholder="+39 333 1234567 or https://chat.whatsapp.com/…" />
          </Field>

          <Field label="Description (max 500 chars)" error={errors.Description}>
            <Textarea {...register("Description")} placeholder="Briefly describe the event…" rows={3} />
          </Field>

          <Field label="Your name (organizer)" error={errors.OrganizerName}>
            <Input {...register("OrganizerName")} placeholder="Optional" />
          </Field>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting…</> : "Submit event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
