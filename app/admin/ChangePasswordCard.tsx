"use client";

import { useActionState, useRef, useState } from "react";
import {
  changePasswordAction,
  type ChangePasswordState,
} from "./actions";

const initial: ChangePasswordState = {};

export function ChangePasswordCard() {
  const [state, action, pending] = useActionState<ChangePasswordState, FormData>(
    changePasswordAction,
    initial
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);

  // Reset form on success
  if (state.ok && formRef.current) {
    setTimeout(() => formRef.current?.reset(), 50);
  }

  return (
    <div className="panel">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-xl text-ink">Change password</h2>
          <p className="mt-1 text-sm text-ink-muted/80">
            Update the password used to sign into this admin.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="btn btn-ghost text-[12px]"
        >
          {open ? "Cancel" : "Open"}
        </button>
      </div>

      {open && (
        <form
          ref={formRef}
          action={action}
          className="mt-5 grid gap-4 sm:grid-cols-3"
        >
          <label className="field">
            <span className="label">current</span>
            <input
              type="password"
              name="current"
              autoComplete="current-password"
              required
            />
          </label>
          <label className="field">
            <span className="label">new</span>
            <input
              type="password"
              name="next"
              autoComplete="new-password"
              minLength={6}
              required
            />
          </label>
          <label className="field">
            <span className="label">confirm new</span>
            <input
              type="password"
              name="confirm"
              autoComplete="new-password"
              minLength={6}
              required
            />
          </label>
          {state.error && (
            <div className="toast toast-err sm:col-span-3">{state.error}</div>
          )}
          {state.ok && (
            <div className="toast toast-ok sm:col-span-3">
              Password updated. You can sign in with the new password from now on.
            </div>
          )}
          <div className="sm:col-span-3 flex justify-end">
            <button type="submit" className="btn btn-primary" disabled={pending}>
              {pending ? "Updating…" : "Update password"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
