"use client";

import Link from "next/link";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { LEAD_STATUSES, SERVICE_TYPES, getServiceLabel, getStatusLabel } from "@/lib/constants";

export type LeadListItem = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  serviceType: string;
  location: string | null;
  status: string;
  source: string;
  createdAt: string;
};

export function LeadTable({ leads }: { leads: LeadListItem[] }) {
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const statusMatch = statusFilter ? lead.status === statusFilter : true;
      const serviceMatch = serviceFilter
        ? lead.serviceType === serviceFilter
        : true;
      return statusMatch && serviceMatch;
    });
  }, [leads, serviceFilter, statusFilter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="w-44"
        >
          <option value="">All statuses</option>
          {LEAD_STATUSES.map((status) => (
            <option key={status} value={status}>
              {getStatusLabel(status)}
            </option>
          ))}
        </Select>

        <Select
          value={serviceFilter}
          onChange={(event) => setServiceFilter(event.target.value)}
          className="w-52"
        >
          <option value="">All services</option>
          {SERVICE_TYPES.map((service) => (
            <option key={service.value} value={service.value}>
              {service.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  No leads found.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {format(new Date(lead.createdAt), "dd MMM yyyy")}
                  </td>
                  <td className="px-4 py-3">{lead.name}</td>
                  <td className="px-4 py-3">{lead.phone}</td>
                  <td className="px-4 py-3">{getServiceLabel(lead.serviceType)}</td>
                  <td className="px-4 py-3">
                    <Badge status={lead.status}>{getStatusLabel(lead.status)}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="font-medium text-navy-700 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
