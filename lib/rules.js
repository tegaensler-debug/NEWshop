import z from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: "Please enter a valid email" })
    .trim(),
  password: z.string().min(1, { message: "Password is required" }).trim(),
});

export const RegisterFormSchema = z
  .object({
    username: z.string().min(3, { message: "Be at least 3 characters long" }),
    email: z.string().email({ message: "Please enter a valid email" }).trim(),
    password: z
      .string()
      .min(5, { message: "Be at least 5 characters long" }) // Increased for security
      .max(10, { message: "Be at most 10 characters long" })
      .regex(/[A-Z]/, { message: "Contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Contain at least one number" })
      .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
        // More specific special chars
        message: "Contain at least one special character",
      })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });


export const BlogFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title field is required" })
    .max(100, { message: "Title must be at most 100 characters long" })
    .trim(),
  content: z
    .string()
    .min(1, { message: "Content field is required" })
    .trim(),
});