import { useState } from "react";
import { APPS_SCRIPT_URL } from "../constants";

export function useSubmitEvent() {
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  async function submitEvent(data) {
    setSubmitting(true);
    setSubmitResult(null);
    try {
      if (!APPS_SCRIPT_URL) {
        // Simulate success in development when no URL is set
        await new Promise((r) => setTimeout(r, 1000));
        setSubmitResult({ success: true });
        return { success: true };
      }
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        mode: "no-cors", // Apps Script requires no-cors
      });
      // no-cors means we can't read the response body, assume success
      setSubmitResult({ success: true });
      return { success: true };
    } catch (err) {
      setSubmitResult({ success: false, error: err.message });
      return { success: false, error: err.message };
    } finally {
      setSubmitting(false);
    }
  }

  return { submitEvent, submitting, submitResult };
}
