"use client";

import {useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";
import {ChevronDown, MessageCircle} from "lucide-react";
import {reservationTypeOptions, siteConfig} from "@/lib/site-config";
import {reservationFormSchema, type ReservationFormValues} from "@/lib/validation/reservation";

type TFunction = ReturnType<typeof useTranslations>;

function buildWhatsAppMessage(values: ReservationFormValues, t: TFunction): string {
  const lines = [
    t("booking.whatsappMessage.greeting"),
    "",
    t("booking.whatsappMessage.intro"),
    "",
    `${t("booking.whatsappMessage.name")}: ${values.fullName}`,
    `${t("booking.whatsappMessage.date")}: ${values.reservationDate}`,
    `${t("booking.whatsappMessage.time")}: ${values.reservationTime}`,
    `${t("booking.whatsappMessage.guests")}: ${values.guestCount}`,
    `${t("booking.whatsappMessage.type")}: ${t(`booking.types.${values.reservationType}`)}`,
  ];

  if (values.whatsapp) {
    lines.push(`${t("booking.whatsappMessage.whatsapp")}: ${values.whatsapp}`);
  }

  if (values.message) {
    lines.push(`${t("booking.whatsappMessage.notes")}: ${values.message}`);
  }

  lines.push("", t("booking.whatsappMessage.disclaimer"), "", t("booking.whatsappMessage.closing"));

  return lines.join("\n");
}

export function BookingForm() {
  const t = useTranslations();
  const [requestSent, setRequestSent] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      reservationType: "family_visit",
      guestCount: 1,
    },
  });

  const formError = (key: keyof ReservationFormValues) => {
    const err = errors[key]?.message;
    return err ? t(`validation.${err}`) : null;
  };

  const reservationTypeLabels = useMemo(
    () =>
      reservationTypeOptions.map((item) => ({
        value: item,
        label: t(`booking.types.${item}`),
      })),
    [t],
  );

  const onSubmit = (values: ReservationFormValues) => {
    const text = buildWhatsAppMessage(values, t);
    const url = `${siteConfig.whatsappHref}?text=${encodeURIComponent(text)}`;

    setWhatsAppUrl(url);
    setRequestSent(true);
    window.open(url, "_blank", "noopener,noreferrer");

    reset({
      reservationType: "family_visit",
      guestCount: 1,
      fullName: "",
      phone: "",
      whatsapp: "",
      reservationDate: "",
      reservationTime: "",
      message: "",
    });
  };

  return (
    <form className="tv-card p-6 md:p-8" onSubmit={handleSubmit(onSubmit)} noValidate>
      <p className="rounded-xl bg-cream px-4 py-3 text-sm font-medium text-ink/85">{t("booking.disclaimer")}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="tv-label" htmlFor="fullName">
            {t("booking.fields.fullName")} *
          </label>
          <input id="fullName" className="tv-input" {...register("fullName")} />
          {formError("fullName") ? <p className="mt-1 text-xs text-red-700">{formError("fullName")}</p> : null}
        </div>

        <div>
          <label className="tv-label" htmlFor="phone">
            {t("booking.fields.phone")} *
          </label>
          <input id="phone" className="tv-input" {...register("phone")} />
          {formError("phone") ? <p className="mt-1 text-xs text-red-700">{formError("phone")}</p> : null}
        </div>

        <div>
          <label className="tv-label" htmlFor="whatsapp">
            {t("booking.fields.whatsapp")}
          </label>
          <input id="whatsapp" className="tv-input" {...register("whatsapp")} />
          {formError("whatsapp") ? <p className="mt-1 text-xs text-red-700">{formError("whatsapp")}</p> : null}
        </div>

        <div>
          <label className="tv-label" htmlFor="reservationDate">
            {t("booking.fields.date")} *
          </label>
          <input id="reservationDate" type="date" className="tv-input" {...register("reservationDate")} />
          {formError("reservationDate") ? (
            <p className="mt-1 text-xs text-red-700">{formError("reservationDate")}</p>
          ) : null}
        </div>

        <div>
          <label className="tv-label" htmlFor="reservationTime">
            {t("booking.fields.time")} *
          </label>
          <input id="reservationTime" type="time" className="tv-input" {...register("reservationTime")} />
          {formError("reservationTime") ? (
            <p className="mt-1 text-xs text-red-700">{formError("reservationTime")}</p>
          ) : null}
        </div>

        <div>
          <label className="tv-label" htmlFor="guestCount">
            {t("booking.fields.guestCount")} *
          </label>
          <input
            id="guestCount"
            type="number"
            min={1}
            className="tv-input"
            {...register("guestCount", {valueAsNumber: true})}
          />
          {formError("guestCount") ? <p className="mt-1 text-xs text-red-700">{formError("guestCount")}</p> : null}
        </div>

        <div className="md:col-span-2">
          <label className="tv-label" htmlFor="reservationType">
            {t("booking.fields.reservationType")}
          </label>
          <div className="relative">
            <select
              id="reservationType"
              className="tv-input appearance-none pe-10"
              {...register("reservationType")}
            >
              {reservationTypeLabels.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-deep-green/60"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="tv-label" htmlFor="message">
            {t("booking.fields.message")}
          </label>
          <textarea id="message" rows={5} className="tv-input" {...register("message")} />
          {formError("message") ? <p className="mt-1 text-xs text-red-700">{formError("message")}</p> : null}
        </div>
      </div>

      {requestSent && whatsAppUrl ? (
        <div className="mt-4 rounded-xl border border-deep-green/12 bg-white p-4">
          <p className="text-sm font-semibold text-deep-green">{t("booking.success")}</p>
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white"
          >
            <MessageCircle size={18} />
            {t("booking.openWhatsApp")}
          </a>
          <p className="mt-2 text-xs text-ink/72">{t("booking.whatsappNote")}</p>
        </div>
      ) : null}

      <button type="submit" className="tv-btn-primary mt-6 min-w-60" disabled={isSubmitting}>
        {isSubmitting ? t("booking.submitting") : t("booking.submit")}
      </button>
    </form>
  );
}
