import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "../ui/card";
import { useSignInMutation } from "@/service/react-query/mutations";

const formSchema = z.object({
  userName: z
    .string()
    .min(3, { message: "UserName must be at least 3 characters" }),
  password: z.string().min(1, { message: "Password cant be empty" }),
});

const SignIn = () => {
  const { mutate: signIn, isPending } = useSignInMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    await signIn({
      userName: data.userName,
      password: data.password,
    });
  };

  return (
    <Form {...form}>
      <Card className="flex p-6 justify-center max-w-xl w-full">
        <form
          className="space-y-4 w-full"
          onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="username"
                    autoComplete="username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    type="password"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full space-y-2 mt-3">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Loading..." : "Sign In"}
            </Button>
            <FormDescription>
              Don't have an account? Contact Us to create one.
            </FormDescription>
          </div>
        </form>
      </Card>
    </Form>
  );
};

export default SignIn;
