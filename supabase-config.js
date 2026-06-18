// Supabase Configuration
const SUPABASE_URL = "https://gwedrqphjpvyrbdeqakr.supabase.co";
const SUPABASE_KEY = "sb_publishable_uGnp6FKnZN80VJHN13-hvA_6al97gkG";

// Initialize the Supabase client
try {
    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    window.supabaseClient = client;
    window.supabase = client;
    console.log("Supabase client initialized successfully.");
} catch (e) {
    console.error("CRITICAL: Failed to initialize Supabase client:", e);
}

