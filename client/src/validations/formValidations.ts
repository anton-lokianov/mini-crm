import * as z from "zod";

export const editUserFormSchema = z
  .object({
    userName: z
      .string()
      .trim()
      .min(3, { message: "UserName must be at least 3 characters" }),
    firstName: z
      .string()
      .trim()
      .min(2, { message: "First name must be at least 2 characters" }),
    lastName: z
      .string()
      .trim()
      .min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().trim().email({ message: "Invalid email" }),
    phone: z.string().trim().min(10, { message: "Invalid phone number" }),
    company: z
      .string()
      .trim()
      .min(2, { message: "Company name must be at least 2 characters" }),
    oldPassword: z.string().trim().optional(),
    newPassword: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    // Both fields are provided
    const oldPassProvided = data.oldPassword && data.oldPassword.trim();
    const newPassProvided = data.newPassword && data.newPassword.trim();

    // Both or none logic
    if (!oldPassProvided !== !newPassProvided) {
      // XOR logic: if one is provided but not the other
      if (!oldPassProvided) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["oldPassword"],
          message: "Old password is required if new password is provided",
        });
      }
      if (!newPassProvided) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["newPassword"],
          message: "New password is required if old password is provided",
        });
      }
    }
    // Validation for length if both are provided
    else if (oldPassProvided && newPassProvided) {
      if (data.oldPassword!.trim().length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["oldPassword"],
          message: "Old password must be at least 6 characters",
        });
      }
      if (data.newPassword!.trim().length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["newPassword"],
          message: "New password must be at least 6 characters",
        });
      }
    }
  });

export const signInSchema = z.object({
  userName: z.string().trim().min(1, { message: "Username cant be empty" }),
  password: z.string().trim().min(1, { message: "Password cant be empty" }),
});

export const subUserSchema = z.object({
  userName: z
    .string()
    .trim()
    .min(3, { message: "UserName must be at least 3 characters" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),
  firstName: z
    .string()
    .trim()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .trim()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().trim().email({ message: "Invalid email" }),
  phone: z.string().min(10, { message: "Invalid phone number" }),
  role: z.string().min(1, { message: "Must pick a role" }),
});
