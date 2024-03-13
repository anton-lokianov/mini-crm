import React, { useState } from "react";
import UserSettingsForm from "@/components/forms/userSettings";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/service/store/auth-store";
import { Button } from "@/components/ui/button";
import SubUserList from "@/components/subUser/subUserList";
import DeleteUserAlert from "@/components/dialogs/deleteUserAlert";

const UserSettings = () => {
  const user = useAuthStore((state) => state.user);
  const [dangerZone, setDangerZone] = useState(false);

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
        <Card className="border-red-500 rounded">
          <CardHeader className="text-center">
            <CardTitle>Danger zone</CardTitle>
            <CardDescription>
              Delete your account and all its data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col items-center">
            <DeleteUserAlert />
            <CardDescription className="font-semibold text-lg">
              sub users
            </CardDescription>
            <SubUserList />
          </CardContent>
        </Card>
      </Card>
    </section>
  );
};

export default UserSettings;
