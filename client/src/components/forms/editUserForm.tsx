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
import { editUserFormSchema } from "@/validations/formValidations";
import { useUIOverlayStore } from "@/service/store/UIOverlay-store";

const EditUserForm = () => {
  const { data: getUserDetails } = useGetAuthUserQuery();
  const { mutateAsync: updateUserDetails, isPending } =
    useUpdateUserDetailsMutation();
  const closeOverlay = useUIOverlayStore((state) => state.closeOverlay);

  const defaultValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    company: "",
    oldPassword: "",
    newPassword: "",
  };

  const form = useForm<z.infer<typeof editUserFormSchema>>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues,
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

  const handleSubmit = async (data: z.infer<typeof editUserFormSchema>) => {
    const response = await updateUserDetails(data);
    if (response) {
      closeOverlay();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-2 gap-3">
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
        <Button type="submit" className="mt-3" size="sm" disabled={isPending}>
          {isPending ? "saving..." : "save"}
        </Button>
      </form>
    </Form>
  );
};

export default EditUserForm;
