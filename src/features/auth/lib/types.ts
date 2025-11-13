import z from "zod";

export const sinupSchema = z
  .object({
    name: z
      .string()
      .min(4, "Username must be at least 4 characters.")
      .max(20, "Full Name is too long"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof sinupSchema>;

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().nonempty("Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
