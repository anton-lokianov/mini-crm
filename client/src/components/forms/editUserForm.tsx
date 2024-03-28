import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useGetAuthUserQuery } from "@/service/react-query/queries";
import { useUpdateUserDetailsMutation } from "@/service/react-query/mutations";

const formSchema = z
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

type Props = {
  toggleDialog: () => void;
};

const EditUserForm = ({ toggleDialog }: Props) => {
  const { data: getUserDetails } = useGetAuthUserQuery();
  const { mutateAsync: updateUserDetails, isPending } =
    useUpdateUserDetailsMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (getUserDetails) {
      form.reset({
        firstName: getUserDetails.firstName,
        lastName: getUserDetails.lastName,
        userName: getUserDetails.userName,
        email: getUserDetails.email,
        phone: getUserDetails.phone,
        company: getUserDetails.company,
        oldPassword: "",
        newPassword: "",
      });
    }
  }, [getUserDetails, form.reset]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await updateUserDetails(data);
      if (response) {
        toggleDialog();
      }
    } catch (error) {}
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-2 gap-3"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Edit your first name here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Edit your last name here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>User name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Edit your user name here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Edit your email here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Old password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormDescription>Enter your old password here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormDescription>Enter your new password here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Edit your company name here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Edit your phone number here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-3" size="sm">
          {isPending ? "saving..." : "save"}
        </Button>
      </form>
    </Form>
  );
};

export default EditUserForm;
