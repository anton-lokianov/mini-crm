import React from "react";
import { LogIn } from "lucide-react";

import SignInForm from "@/components/forms/signIn";
import { Card } from "@/components/ui/card";

export const Login = () => {
  return (
    <section className="dotPattern h-full">
      <div className="h-full container py-14">
        <Card className="flex flex-1 h-full items-center p-2 divide-x-2">
          <div className="w-2/4 flex flex-col gap-5 flex-1 p-4 items-center">
            <p className="text-center text-xl">Login to enjoy our CRM</p>
            <LogIn className="mx-auto text-primary animate-pulse" size={48} />
            <SignInForm />
          </div>
          <img
            src="/crm.jpg"
            className="hidden md:block h-full w-2/4 rounded rounded-tl-[5rem] shadow-sm shadow-foreground"
            alt="some image"
            loading="lazy"
          />
        </Card>
      </div>
    </section>
  );
};
