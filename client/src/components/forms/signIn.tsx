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
import { useSignInMutation } from "@/service/react-query/mutations";
import { signInSchema } from "@/validations/formValidations";

const SignIn = () => {
  const { mutate: signIn, isPending } = useSignInMutation();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof signInSchema>) => {
    await signIn({
      userName: data.userName,
      password: data.password,
    });
  };

  return (
    <Form {...form}>
      <div className="flex p-6 justify-center max-w-xl w-full">
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
                    placeholder="username1245"
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
                    placeholder="*********"
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
            <Button
              type="submit"
              className="w-1/2"
              disabled={isPending || !form.formState.isValid}>
              {isPending ? "Loading..." : "Sign In"}
            </Button>
            <FormDescription>
              Don't have an account? Contact Us to create one.
            </FormDescription>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default SignIn;
