"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { signOutAction } from "@/lib/auth/actions";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { LoginModal } from "./LoginModal";

type MeResponse = {
  email: string;
  permissions: string[];
};

type HeaderSession = {
  loading: boolean;
  signedIn: boolean;
  canAccessAdmin: boolean;
};

export function useHeaderSession(): HeaderSession {
  const [canAccessAdmin, setCanAccessAdmin] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;

    async function syncAccess() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (!user) {
        setSignedIn(false);
        setCanAccessAdmin(false);
        setLoading(false);
        return;
      }

      setSignedIn(true);

      try {
        const response = await fetch("/api/auth/me");
        if (cancelled) return;

        if (!response.ok) {
          setCanAccessAdmin(false);
          setLoading(false);
          return;
        }

        const data = (await response.json()) as MeResponse;
        setCanAccessAdmin(data.permissions.includes("leads:read"));
      } catch {
        if (!cancelled) setCanAccessAdmin(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void syncAccess();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  return { loading, signedIn, canAccessAdmin };
}

export function HeaderAuth({ loading, signedIn, canAccessAdmin }: HeaderSession) {
  const [loginOpen, setLoginOpen] = useState(false);

  if (loading) {
    return (
      <span className="hidden h-9 w-16 animate-pulse rounded-md bg-slate-100 md:inline-block" />
    );
  }

  return (
    <>
      {canAccessAdmin ? (
        <Link
          href="/admin"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          Dashboard
        </Link>
      ) : signedIn ? null : (
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          onClick={() => setLoginOpen(true)}
        >
          Login
        </button>
      )}
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}

export function HeaderSignOut() {
  return (
    <form action={signOutAction} className="inline-flex">
      <Button type="submit" variant="outline" size="sm">
        Sign Out
      </Button>
    </form>
  );
}
