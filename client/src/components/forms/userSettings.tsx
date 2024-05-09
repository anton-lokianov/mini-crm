import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Key, PhoneCall, Wrench } from "lucide-react";

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "../ui/button";
import { useCreateSubUserMutation } from "@/service/react-query/mutations";
import { subUserSchema } from "@/validations/formValidations";

const UserSettingsForm = () => {
  const { mutateAsync: createSubUser, isPending } = useCreateSubUserMutation();
  const form = useForm<z.infer<typeof subUserSchema>>({
    resolver: zodResolver(subUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      role: "",
      phone: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof subUserSchema>) => {
    await createSubUser(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-2 gap-4 w-full"
        onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="john" autoComplete="firstName" {...field} />
              </FormControl>
              <FormDescription>
                Enter a first name, of your sub user
              </FormDescription>
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
                <Input placeholder="doe" autoComplete="lastName" {...field} />
              </FormControl>
              <FormDescription>
                Enter a last name, of your sub user
              </FormDescription>
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
                <Input
                  placeholder="name@mail.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter a email, of your sub user</FormDescription>
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
                <Input
                  placeholder="john123"
                  autoComplete="userName"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter a user name, of your sub user
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="**********"
                  autoComplete="password"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter a password, of your sub user
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={10}
                  render={({ slots }) => (
                    <>
                      <InputOTPGroup>
                        {slots.slice(0, 3).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        {slots.slice(3, 6).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        {slots.slice(6, 10).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}{" "}
                      </InputOTPGroup>
                    </>
                  )}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter a phone number, of your sub user
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={() => (
            <FormItem className="col-span-1">
              <FormLabel>Role</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="single"
                  className="gap-4"
                  onValueChange={(value: string) =>
                    form.setValue("role", value)
                  }>
                  <ToggleGroupItem
                    value="operator"
                    size="xl"
                    className="flex flex-col gap-1">
                    <Wrench className="text-primary h-8 w-8" />
                    Operator
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="manager"
                    size="xl"
                    className="flex flex-col gap-1">
                    <Key className="text-primary h-8 w-8" />
                    Manager
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="service"
                    size="xl"
                    className="flex flex-col gap-1">
                    <PhoneCall className="text-primary h-8 w-8" /> Service
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
              <FormDescription>
                Select a role, for your sub user
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="col-span-2 uppercase"
          disabled={isPending}>
          {isPending ? "Loading..." : "Create Sub User"}
        </Button>
      </form>
    </Form>
  );
};

export default UserSettingsForm;
