import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/server-supabase";
import { auth } from "@clerk/nextjs/server";

// GET /api/admin/settings - Get all settings
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createClient();

    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }

    // Return default settings if no record exists
    const settings = data || {
      autosave: true,
      showInactive: true,
      enableAnalytics: false,
      gtmContainer: ''
    };

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/settings - Save settings
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { autosave, showInactive, enableAnalytics, gtmContainer } = body;

    const supabase = createClient();

    // Upsert the settings (insert or update)
    const { data, error } = await supabase
      .from("settings")
      .upsert({
        id: 1, // Single row for global settings
        autosave: !!autosave,
        show_inactive: !!showInactive,
        enable_analytics: !!enableAnalytics,
        gtm_container: gtmContainer || '',
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Settings save error:", error);
      return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
    }

    return NextResponse.json({ 
      settings: {
        autosave: data.autosave,
        showInactive: data.show_inactive,
        enableAnalytics: data.enable_analytics,
        gtmContainer: data.gtm_container
      }
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
