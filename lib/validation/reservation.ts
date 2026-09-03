import {z} from "zod";
import {reservationStatuses, reservationTypeOptions} from "@/lib/site-config";

const reservationTypeSchema = z.enum(reservationTypeOptions);
const reservationStatusSchema = z.enum(reservationStatuses);

export const reservationFormSchema = z.object({
  fullName: z.string().trim().min(2, "fullNameMin"),
  phone: z.string().trim().min(8, "phoneMin").max(30, "phoneMax"),
  whatsapp: z.string().trim().max(30, "whatsappMax").optional().or(z.literal("")),
  reservationDate: z.string().min(1, "dateRequired"),
  reservationTime: z.string().min(1, "timeRequired"),
  guestCount: z.number().int().min(1, "guestMin").max(200, "guestMax"),
  reservationType: reservationTypeSchema,
  message: z.string().trim().max(1500, "messageMax").optional().or(z.literal("")),
  language: z.enum(["ar", "en", "de"]),
});

export const adminLoginSchema = z.object({
  email: z.string().email("emailInvalid"),
  password: z.string().min(8, "passwordMin"),
});

export const updateReservationStatusSchema = z.object({
  id: z.string().uuid("idInvalid"),
  status: reservationStatusSchema,
});

export type ReservationFormValues = z.infer<typeof reservationFormSchema>;
export type UpdateReservationStatusInput = z.infer<typeof updateReservationStatusSchema>;
