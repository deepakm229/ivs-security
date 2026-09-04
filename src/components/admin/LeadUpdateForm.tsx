"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LEAD_STATUSES, getStatusLabel } from "@/lib/constants";

type LeadDetail = {
  id: string;
  status: string;
  notes: string | null;
};

export function LeadUpdateForm({ lead }: { lead: LeadDetail }) {
  const router = useRouter();
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const response = await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes }),
    });

    setLoading(false);

    if (!response.ok) {
      setMessage("Failed to update lead.");
      return;
    }

    setMessage("Lead updated successfully.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-navy-900">Update Lead</h2>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          id="status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          {LEAD_STATUSES.map((item) => (
            <option key={item} value={item}>
              {getStatusLabel(item)}
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Internal Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Call back details, quote amount, follow-up notes..."
        />
      </div>

      {message && <p className="text-sm text-slate-600">{message}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
