"use client";

import { createBrowserClient } from "@supabase/ssr";

type SupabaseBrowserConfig = {
  url: string;
  anonKey: string;
};

let browserConfig: SupabaseBrowserConfig | null = null;

export function setSupabaseBrowserConfig(config: SupabaseBrowserConfig) {
  browserConfig = config;
}

export function createClient() {
  const url = browserConfig?.url;
  const anonKey = browserConfig?.anonKey;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase URL and anon key are missing. Set SUPABASE_URL and SUPABASE_ANON_KEY.",
    );
  }

  return createBrowserClient(url, anonKey);
}
