import {reservationStatuses, reservationTypeOptions} from "@/lib/site-config";

export type ReservationStatus = (typeof reservationStatuses)[number];
export type ReservationType = (typeof reservationTypeOptions)[number];

export type ReservationRow = {
  id: string;
  full_name: string;
  phone: string;
  whatsapp: string | null;
  reservation_date: string;
  reservation_time: string;
  guest_count: number;
  reservation_type: ReservationType | null;
  message: string | null;
  language: "ar" | "en" | "de";
  status: ReservationStatus;
  created_at: string;
  updated_at: string;
};
