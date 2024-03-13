import React from "react";
import UserSettingsForm from "@/components/forms/userSettings";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/service/store/auth-store";

const UserSettings = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <section className="p-4 max-w-3xl w-full mx-auto">
      <Card className="p-3">
        <CardHeader className="text-center">
          <CardTitle className="text-primary">User Settings</CardTitle>
          <CardDescription>
            create sub account and update your user settings
          </CardDescription>
        </CardHeader>
        <div className="flex justify-evenly gap-6 mb-3">
          <CardDescription className="flex text-md justify-center font-medium gap-2">
            <span className="">Name:</span>
            <span className="font-thin font-serif text-foreground underline">
              {user?.fullName}
            </span>
          </CardDescription>
          <CardDescription className="flex text-md justify-center font-medium gap-2">
            <span>Email:</span>
            <span className="font-thin font-serif text-foreground underline">
              {user?.email}
            </span>
          </CardDescription>
        </div>
        <CardContent>
          <UserSettingsForm />
        </CardContent>
      </Card>
      
    </section>
  );
};

export default UserSettings;
