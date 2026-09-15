// Supabase Configuration
const SUPABASE_URL = "https://itesblkjljdsulbtdeon.supabase.co";
const SUPABASE_KEY = "sb_publishable_1_H1UhBzb-IvEsTOkMuXCw_C9E7l0vG";

// Initialize the Supabase client
try {
    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    window.supabaseClient = client;
    window.supabase = client;
    console.log("Supabase client initialized successfully with https://itesblkjljdsulbtdeon.supabase.co");
} catch (e) {
    console.error("CRITICAL: Failed to initialize Supabase client:", e);
}

