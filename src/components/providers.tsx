"use client";

import { setSupabaseBrowserConfig } from "@/lib/supabase/client";

type ProvidersProps = {
  supabaseUrl: string;
  supabaseAnonKey: string;
  children: React.ReactNode;
};

export function Providers({ supabaseUrl, supabaseAnonKey, children }: ProvidersProps) {
  setSupabaseBrowserConfig({ url: supabaseUrl, anonKey: supabaseAnonKey });
  return children;
}
