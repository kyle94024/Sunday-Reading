"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";

const initial: LoginState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    loginAction,
    initial
  );
  return (
    <form action={action} className="space-y-4 text-left">
      <label className="field">
        <span className="label">password</span>
        <input
          type="password"
          name="password"
          autoFocus
          autoComplete="current-password"
          required
        />
      </label>
      {state.error && <div className="toast toast-err">{state.error}</div>}
      <button type="submit" className="btn btn-primary w-full justify-center" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
