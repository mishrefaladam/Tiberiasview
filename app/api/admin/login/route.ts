import {NextResponse} from "next/server";
import {createClient} from "@/lib/supabase/server";
import {adminLoginSchema} from "@/lib/validation/reservation";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = adminLoginSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({error: "Invalid payload"}, {status: 400});
  }

  const supabase = await createClient();
  const {error} = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return NextResponse.json({error: error.message}, {status: 401});
  }

  return NextResponse.json({ok: true});
}
