"use client";

import { register } from "@/action/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function RegisterPage() {
  const [state, action, isPending] = useActionState(register, undefined);

  return (
    <div className="container w-1/2">
      <h1 className="title">Register</h1>
      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="username">Username:</label>
          <input placeholder="John" type="text" name="username" defaultValue={state?.username}/>
          {state?.errors?.username && (
            <p className="error">{state.errors.username}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input placeholder="example@gmail.com" type="email" name="email" defaultValue={state?.email}/>
          {state?.errors?.email && (
            <p className="error">{state.errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input placeholder="******" type="password" name="password" />
          {state?.errors?.password && (
            <div>
              <p className="error">Password must:</p>
              <ul className="error list-disc list-inside ml-4">
                {state.errors.password.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input placeholder="******" type="password" name="confirmpassword" />
          {state?.errors?.confirmPassword && (
            <p className="error">{state.errors.confirmPassword}</p>
          )}
        </div>
        <div className="flex items-end gap-4">
          <button disabled={isPending} className="btn-primary">
            {isPending ? "Loading..." : "Register"}
          </button>
          <Link href="/login" className="text-link">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}
