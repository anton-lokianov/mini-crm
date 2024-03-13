import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useDeleteSubUserMutation } from "@/service/react-query/mutations";

type Props = {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  createdAt: string;
  userName: string;
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const SubUserCard = ({
  _id,
  firstName,
  lastName,
  role,
  email,
  createdAt,
  userName,
}: Props) => {
  const { mutateAsync: deleteSubUser } = useDeleteSubUserMutation();

  return (
    <div className="p-1">
      <Card className="">
        <CardContent className="flex flex-col items-start justify-start p-4 space-y-2">
          <h2 className="text-xl font-bold">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-gray-500">Username: {userName}</p>
          <p className="text-sm text-gray-500">Role: {role}</p>
          <p className="text-sm text-gray-500">Email: {email}</p>
          <p className="text-sm text-gray-500">
            Created At: {formatDate(createdAt)}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={async () => await deleteSubUser(_id)}>
                <Trash2 className="w-8 h-8 text-red-400 cursor-pointer transform hover:-translate-y-[1px] transition-all ease-in active:translate-y-[2px]" />
              </TooltipTrigger>
              <TooltipContent>
                <p>delete this sub user</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubUserCard;
