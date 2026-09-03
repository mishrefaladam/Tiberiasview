"use client";

import {useEffect, useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import {reservationStatuses} from "@/lib/site-config";
import type {ReservationRow, ReservationStatus} from "@/types/reservation";
import {normalizePhoneNumber} from "@/lib/utils";

type SessionUser = {
  id: string;
  email: string | undefined;
} | null;

const statusStyles: Record<ReservationStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
  cancelled: "bg-zinc-200 text-zinc-700",
};

type LoginState = {
  email: string;
  password: string;
};

export function AdminDashboard() {
  const t = useTranslations();
  const [sessionUser, setSessionUser] = useState<SessionUser>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [reservations, setReservations] = useState<ReservationRow[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [tableError, setTableError] = useState<string>("");
  const [infoMessage, setInfoMessage] = useState<string>("");
  const [loginData, setLoginData] = useState<LoginState>({email: "", password: ""});
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function run() {
      const response = await fetch("/api/admin/session", {cache: "no-store"});
      if (ignore) {
        return;
      }

      if (!response.ok) {
        setLoadingSession(false);
        return;
      }

      const body = (await response.json()) as {user: SessionUser};
      if (ignore) {
        return;
      }

      setSessionUser(body.user);
      setLoadingSession(false);
    }

    void run();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!sessionUser) {
      return;
    }

    let ignore = false;

    async function run() {
      const params = new URLSearchParams();
      if (statusFilter) {
        params.set("status", statusFilter);
      }
      if (dateFilter) {
        params.set("date", dateFilter);
      }

      const response = await fetch(`/api/admin/reservations?${params.toString()}`, {cache: "no-store"});
      if (ignore) {
        return;
      }

      if (!response.ok) {
        setTableError(t("admin.loadError"));
        return;
      }

      const body = (await response.json()) as {items: ReservationRow[]};
      if (ignore) {
        return;
      }

      setTableError("");
      setReservations(body.items);
    }

    void run();

    return () => {
      ignore = true;
    };
  }, [sessionUser, statusFilter, dateFilter, t]);

  const onLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoggingIn(true);
    setTableError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      setLoggingIn(false);
      setTableError(t("admin.loadError"));
      return;
    }

    const sessionResponse = await fetch("/api/admin/session", {cache: "no-store"});
    if (sessionResponse.ok) {
      const body = (await sessionResponse.json()) as {user: SessionUser};
      setSessionUser(body.user);
    }
    setLoadingSession(false);
    setLoggingIn(false);
  };

  const onLogout = async () => {
    await fetch("/api/admin/logout", {method: "POST"});
    setSessionUser(null);
    setReservations([]);
  };

  const setStatus = async (id: string, status: ReservationStatus) => {
    setInfoMessage("");
    const response = await fetch("/api/admin/reservations", {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id, status}),
    });

    if (!response.ok) {
      setInfoMessage(t("admin.updateFailed"));
      return;
    }

    setInfoMessage(t("admin.updated"));

    const params = new URLSearchParams();
    if (statusFilter) {
      params.set("status", statusFilter);
    }
    if (dateFilter) {
      params.set("date", dateFilter);
    }

    const refreshResponse = await fetch(`/api/admin/reservations?${params.toString()}`, {cache: "no-store"});
    if (refreshResponse.ok) {
      const body = (await refreshResponse.json()) as {items: ReservationRow[]};
      setReservations(body.items);
    }
  };

  const visibleStatuses = useMemo(() => reservationStatuses, []);

  if (loadingSession) {
    return <p className="text-sm text-ink/70">Loading...</p>;
  }

  if (!sessionUser) {
    return (
      <div className="tv-card mx-auto max-w-lg p-6">
        <h2 className="text-2xl font-bold text-deep-green">{t("admin.loginTitle")}</h2>
        <form className="mt-5 space-y-4" onSubmit={onLogin}>
          <div>
            <label className="tv-label" htmlFor="email">{t("admin.email")}</label>
            <input
              id="email"
              type="email"
              className="tv-input"
              value={loginData.email}
              onChange={(event) => setLoginData((prev) => ({...prev, email: event.target.value}))}
            />
          </div>
          <div>
            <label className="tv-label" htmlFor="password">{t("admin.password")}</label>
            <input
              id="password"
              type="password"
              className="tv-input"
              value={loginData.password}
              onChange={(event) => setLoginData((prev) => ({...prev, password: event.target.value}))}
            />
          </div>
          {tableError ? <p className="text-sm text-red-700">{tableError}</p> : null}
          <button type="submit" className="tv-btn-primary w-full" disabled={loggingIn}>
            {loggingIn ? "..." : t("admin.login")}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <div>
            <label className="tv-label" htmlFor="statusFilter">{t("admin.filterStatus")}</label>
            <select
              id="statusFilter"
              className="tv-input min-w-48"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="">{t("admin.allStatuses")}</option>
              {visibleStatuses.map((status) => (
                <option key={status} value={status}>
                  {t(`admin.statuses.${status}`)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="tv-label" htmlFor="dateFilter">{t("admin.filterDate")}</label>
            <input
              id="dateFilter"
              type="date"
              className="tv-input min-w-48"
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
            />
          </div>
        </div>
        <button type="button" onClick={onLogout} className="rounded-full border border-deep-green/20 px-4 py-2 text-sm font-semibold text-deep-green">
          {t("admin.logout")}
        </button>
      </div>

      {infoMessage ? <p className="text-sm text-deep-green">{infoMessage}</p> : null}
      {tableError ? <p className="text-sm text-red-700">{tableError}</p> : null}

      <div className="overflow-x-auto rounded-2xl border border-deep-green/12 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-deep-green/8 text-sm">
          <thead className="bg-cream">
            <tr>
              <th className="px-3 py-3 text-start font-semibold">{t("admin.name")}</th>
              <th className="px-3 py-3 text-start font-semibold">{t("admin.date")}</th>
              <th className="px-3 py-3 text-start font-semibold">{t("admin.time")}</th>
              <th className="px-3 py-3 text-start font-semibold">{t("admin.guestCount")}</th>
              <th className="px-3 py-3 text-start font-semibold">{t("admin.phone")}</th>
              <th className="px-3 py-3 text-start font-semibold">{t("admin.status")}</th>
              <th className="px-3 py-3 text-start font-semibold">{t("admin.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-ink/70">
                  {t("admin.empty")}
                </td>
              </tr>
            ) : (
              reservations.map((row, index) => {
                const contact = row.whatsapp || row.phone;
                const whatsappLink = `https://wa.me/${normalizePhoneNumber(contact)}`;
                return (
                  <tr
                    key={row.id}
                    className={`border-t border-deep-green/8 ${index % 2 === 1 ? "bg-cream/50" : "bg-white"}`}
                  >
                    <td className="px-3 py-3 font-medium text-ink">{row.full_name}</td>
                    <td className="px-3 py-3">{row.reservation_date}</td>
                    <td className="px-3 py-3">{row.reservation_time}</td>
                    <td className="px-3 py-3">{row.guest_count}</td>
                    <td className="px-3 py-3">{row.phone}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[row.status]}`}
                      >
                        {t(`admin.statuses.${row.status}`)}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-2">
                        {row.status !== "confirmed" ? (
                          <button
                            type="button"
                            className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-200"
                            onClick={() => setStatus(row.id, "confirmed")}
                          >
                            {t("admin.setTo.confirmed")}
                          </button>
                        ) : null}
                        {row.status !== "rejected" ? (
                          <button
                            type="button"
                            className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-200"
                            onClick={() => setStatus(row.id, "rejected")}
                          >
                            {t("admin.setTo.rejected")}
                          </button>
                        ) : null}
                        {row.status !== "cancelled" ? (
                          <button
                            type="button"
                            className="rounded-full bg-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-800 transition hover:bg-zinc-300"
                            onClick={() => setStatus(row.id, "cancelled")}
                          >
                            {t("admin.setTo.cancelled")}
                          </button>
                        ) : null}
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-[#25D366]/20 px-3 py-1 text-xs font-semibold text-[#15753a] transition hover:bg-[#25D366]/30"
                        >
                          {t("admin.openWhatsApp")}
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
