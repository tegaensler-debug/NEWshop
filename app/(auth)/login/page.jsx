"use client";

import { login } from "@/action/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function RegisterPage() {
  const [state, action, isPending] = useActionState(login, undefined);

  return (
    <div className="container w-1/2">
      <h1 className="title">Login</h1>
      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            placeholder="example@gmail.com"
            type="text"
            name="email"
            defaultValue={state?.email}
          />
          {state?.errors?.email && (
            <p className="error">{state.errors.email}</p>
          )}
        </div>
   
        <div>
          <label htmlFor="password">Password:</label>
          <input placeholder="******" type="password" name="password" />
          {state?.errors?.email && (
            <p className="error">{state.errors.email}</p>
          )}   
        </div>

        <div className="flex items-end gap-4">
          <button disabled={isPending} className="btn-primary">
            {isPending ? "Loading..." : "Login"}
          </button>
          <Link href="/register" className="text-link">
            create an account
          </Link>
        </div>
      </form>
    </div>
  );
}
