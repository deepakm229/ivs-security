import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { PERMISSIONS } from "@/lib/auth/permissions";

const ADMIN_LOGIN = "/admin/login";
const ADMIN_FORBIDDEN = "/admin/forbidden";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAdminUi = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isLoginPage = pathname === ADMIN_LOGIN;
  const isForbiddenPage = pathname === ADMIN_FORBIDDEN;

  if (isAdminUi || isAdminApi) {
    if (!user) {
      if (isAdminApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      if (!isLoginPage) {
        const url = request.nextUrl.clone();
        url.pathname = ADMIN_LOGIN;
        url.searchParams.set("next", pathname);
        return NextResponse.redirect(url);
      }
    } else if (user && !isForbiddenPage) {
      const { data: hasAccess, error } = await supabase.rpc(
        "user_has_permission",
        { permission_slug: PERMISSIONS.LEADS_READ },
      );

      if (error) {
        console.error("user_has_permission RPC failed:", error.message);
      }

      const allowed = hasAccess === true;

      if (!allowed) {
        if (isAdminApi) {
          return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
        if (!isForbiddenPage) {
          const url = request.nextUrl.clone();
          url.pathname = ADMIN_FORBIDDEN;
          return NextResponse.redirect(url);
        }
      } else if (isLoginPage) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin";
        url.search = "";
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}
