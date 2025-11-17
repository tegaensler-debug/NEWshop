import z from "zod";

export const LoginFormSchema = z.object({
  email: z.email().string()({ message: "Please enter a valid email" }).trim(),
  password: z.string().min(1, { message: "Password is required" }).trim()
});

export const RegisterFormSchema = z
  .object({
    username: z.email().string().min(3, { message: "Be at least 3 characters long" }),
    email: z.email({ message: "Please enter a valid email" }).trim(),
    password: z
      .string()
      .min(3, { message: "Be at least 3 characters long" })
      .max(10, { message: "Be at most 100 characters long" })
      .regex(/[A-Z]/, {
        message: "Contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Contain at least one special character",
      })
      .trim(),
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
