import React from "react";
import { LogIn } from "lucide-react";

import SignInForm from "@/components/forms/signIn";
import { Card } from "@/components/ui/card";

export const Login = () => {
  return (
    <section className="container py-16 h-full gap-4">
      <Card className="flex flex-1 h-full items-center p-3 divide-x-2">
        <div className="w-2/4 flex flex-col gap-5 flex-1 p-6 items-center">
          <p className="text-center text-xl">Login to enjoy our CRM</p>
          <LogIn className="mx-auto text-primary animate-pulse" size={48} />
          <SignInForm />
        </div>
        <img
          src="/loginBG.webp"
          className="hidden md:block h-full w-2/4 rounded rounded-tl-[9rem] shadow-sm shadow-foreground"
          alt="some image"
          loading="lazy"
        />
      </Card>
    </section>
  );
};
