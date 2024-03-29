import { z } from "zod";

// SCHEMA FOR USER LOGIN

export const signInFormSchema = z.object({
    email: z
      .string()
      .min(1, "Please provide your email address")
      .email("Please provide a valid email address"),
    password: z.string().min(1, "Please provide your password"),
 });
  
export type SignInFormFields = z.infer<typeof signInFormSchema>;


// SCHEMA FOR USER REGISTRATION

export const signUpFormSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please provide a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type SignUpFormFields = z.infer<typeof signUpFormSchema>;
