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

// SCHEMA FOR BILLBOARDS

const MEGABYTE_SIZE = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MEGABYTE_SIZE;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const billboardFormSchema = z.object({
  label: z.string().min(1, "Label is required"),
  imageUrl: typeof window === "undefined"
  ? z.string().optional().nullable()
  : z.instanceof(FileList).optional()
      .refine((file) => {
        if (file?.item?.(0)?.type === undefined) return true;
        const fileType = file.item?.(0)?.type || "";
        return ACCEPTED_FILE_TYPES.includes(fileType);
      }, "File must be .jpg, .jpeg, .png or .webp format")
      .refine((file) => {
        if (file?.item?.(0)?.type === undefined) return true;
        const fileSize = file.item?.(0)?.size || 0;
        return fileSize < MAX_UPLOAD_SIZE;
      }, `File size must be less than ${MEGABYTE_SIZE}MB`)
/*   imageUrl: typeof window === "undefined"
    ? z.string().min(1, "Image URL is required")
    : z.instanceof(FileList)
        .refine((file) => file?.length !== 0, "Image is required")
        .refine((file) => {
          const fileType = file.item?.(0)?.type || "";
          return ACCEPTED_FILE_TYPES.includes(fileType);
        }, "File must be .jpg, .jpeg, .png or .webp format")
        .refine((file) => {
          const fileSize = file.item?.(0)?.size || 0;
          return fileSize < MAX_UPLOAD_SIZE;
        }, `File size must be less than ${MEGABYTE_SIZE}MB`) */
});

export type BillboardFormFields = z.infer<typeof billboardFormSchema>;

// SCHEMA FOR CATEGORIES

export const categoriesFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  billboardId: z.string().min(1, "Billboard is required"),
  parentCategoryId: z.string().optional().nullable(),
});

export type CategoryFormFields = z.infer<typeof categoriesFormSchema>;

// SCHEMA FOR SIZES

export const sizesFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  value: z.string().min(1, "Value is required"),
});

export type SizeFormFields = z.infer<typeof sizesFormSchema>;

// SCHEMA FOR COLORS

export const colorsFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  value: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Value should be a valid hex color"),
});

export type ColorFormFields = z.infer<typeof colorsFormSchema>;

// SCHEMA FOR BRANDS

export const brandsFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: typeof window === "undefined"
  ? z.string().optional().nullable()
  : z.instanceof(FileList).optional()
      .refine((file) => {
        if (file?.item?.(0)?.type === undefined) return true;
        const fileType = file.item?.(0)?.type || "";
        return ACCEPTED_FILE_TYPES.includes(fileType);
      }, "File must be .jpg, .jpeg, .png or .webp format")
      .refine((file) => {
        if (file?.item?.(0)?.type === undefined) return true;
        const fileSize = file.item?.(0)?.size || 0;
        return fileSize < MAX_UPLOAD_SIZE;
      }, `File size must be less than ${MEGABYTE_SIZE}MB`)
});

export type BrandFormFields = z.infer<typeof brandsFormSchema>;