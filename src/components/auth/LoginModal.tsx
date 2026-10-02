"use client";

import { Dialog } from "@/components/ui/dialog";
import { LoginForm } from "@/components/admin/LoginForm";

type LoginModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} title="Login">
      <p className="mb-4 text-sm text-slate-600">
        Sign in with your credentials to access the lead dashboard.
      </p>
      <LoginForm
        onSuccess={() => onOpenChange(false)}
        redirectTo="/admin"
      />
    </Dialog>
  );
}
