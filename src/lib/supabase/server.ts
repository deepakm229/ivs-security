import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient(options?: { readOnly?: boolean }) {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          if (options?.readOnly) return;

          try {
            cookiesToSet.forEach(({ name, value, options: cookieOptions }) =>
              cookieStore.set(name, value, cookieOptions),
            );
          } catch {
            // Called from a Server Component — ignore if cookies are read-only.
          }
        },
      },
    },
  );
}
