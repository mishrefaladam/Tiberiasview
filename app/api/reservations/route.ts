import {NextResponse} from "next/server";
import {createClient} from "@/lib/supabase/server";
import {reservationFormSchema} from "@/lib/validation/reservation";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = reservationFormSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({error: "Invalid payload"}, {status: 400});
  }

  const values = parsed.data;

  const supabase = await createClient();
  const {error} = await supabase.from("reservations").insert({
    full_name: values.fullName,
    phone: values.phone,
    whatsapp: values.whatsapp || null,
    reservation_date: values.reservationDate,
    reservation_time: values.reservationTime,
    guest_count: values.guestCount,
    reservation_type: values.reservationType,
    message: values.message || null,
    language: values.language,
    status: "pending",
  });

  if (error) {
    return NextResponse.json({error: error.message}, {status: 500});
  }

  return NextResponse.json({ok: true}, {status: 201});
}
