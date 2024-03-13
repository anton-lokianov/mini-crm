import React from "react";
import { LogIn } from "lucide-react";

import SignInForm from "@/components/forms/signIn";

export const Login = () => {
  return (
    <section className="py-4 px-3 flex flex-1 h-full gap-4 items-center dotPattern">
      <div className="w-2/4 flex flex-col gap-5 flex-1 p-5 items-center">
        <p className="text-center text-xl">Login to enjoy our CRM</p>
        <LogIn className="mx-auto text-primary animate-pulse" size={48} />
        <SignInForm />
      </div>
      <img
        src="/loginBG.webp"
        className="hidden md:block h-full w-2/4 rounded rounded-tl-[9rem] shadow-md shadow-foreground"
        alt=""
      />
    </section>
  );
};
