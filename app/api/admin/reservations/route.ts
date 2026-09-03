import {NextResponse} from "next/server";
import {createClient} from "@/lib/supabase/server";
import {reservationStatuses} from "@/lib/site-config";
import {updateReservationStatusSchema} from "@/lib/validation/reservation";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    return {supabase: null, user: null};
  }

  return {supabase, user};
}

export async function GET(request: Request) {
  const {supabase, user} = await requireUser();
  if (!supabase || !user) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const {searchParams} = new URL(request.url);
  const status = searchParams.get("status");
  const date = searchParams.get("date");

  let query = supabase
    .from("reservations")
    .select("*")
    .order("reservation_date", {ascending: true})
    .order("reservation_time", {ascending: true});

  if (status && reservationStatuses.includes(status as (typeof reservationStatuses)[number])) {
    query = query.eq("status", status);
  }

  if (date) {
    query = query.eq("reservation_date", date);
  }

  const {data, error} = await query;

  if (error) {
    return NextResponse.json({error: error.message}, {status: 500});
  }

  return NextResponse.json({items: data ?? []});
}

export async function PATCH(request: Request) {
  const {supabase, user} = await requireUser();
  if (!supabase || !user) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const payload = await request.json();
  const parsed = updateReservationStatusSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({error: "Invalid payload"}, {status: 400});
  }

  const values = parsed.data;

  const {error} = await supabase
    .from("reservations")
    .update({status: values.status, updated_at: new Date().toISOString()})
    .eq("id", values.id);

  if (error) {
    return NextResponse.json({error: error.message}, {status: 500});
  }

  return NextResponse.json({ok: true});
}
