import { use } from "react";
import z from "zod";

export const RegisterFormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Be at least 3 characters long" }),
    email: z.email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(6, { message: "Be at least 6 characters long" })
      .max(100, { message: "Be at most 100 characters long" })
      .regex(/[A-Z]/, {
        message: "Contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Contain at least one special character",
      }),
    confirmPassword: z.string().trim(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.readonly.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
