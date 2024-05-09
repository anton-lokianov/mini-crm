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
import EditUserDialog from "@/components/dialogs/editUserDialog";
import { useUIOverlayStore } from "@/service/store/UIOverlay-store";

const UserSettings = () => {
  const user = useAuthStore((state) => state.user);
  const openOverlay = useUIOverlayStore((state) => state.openOverlay);

  return (
    <section className="p-4 max-w-3xl w-full mx-auto">
      <Card className="p-3 relative">
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
          <Button
            variant="secondary"
            className="absolute right-0 top-0"
            onClick={() => openOverlay(<EditUserDialog />, "dialog")}>
            Edit account
          </Button>
        </CardContent>
        <Card className="border-red-500 rounded">
          <CardHeader className="text-center">
            <CardTitle>Danger zone</CardTitle>
            <CardDescription>
              Delete your account and all its data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col items-center">
            <Button
              size="sm"
              className="bg-red-500 hover:bg-red-500/90"
              onClick={() => openOverlay(<DeleteUserAlert />, "alertDialog")}>
              Delete account
            </Button>
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
