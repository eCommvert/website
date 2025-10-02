import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/server-supabase";

// GET /api/public/settings - Get public settings (no auth required)
export async function GET() {
  try {
    const supabase = getServerSupabase();

    const { data, error } = await supabase
      .from("settings")
      .select("gtm_container")
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error("Supabase error:", error);
      return NextResponse.json({ gtmContainer: '' });
    }

    // Return GTM container ID if available
    const gtmContainer = data?.gtm_container || '';

    return NextResponse.json({ gtmContainer });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ gtmContainer: '' });
  }
}

