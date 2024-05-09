import { useGetSubUsersQuery } from "@/service/react-query/queries";
import React from "react";
import SubUserCard from "./subUserCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import LoadingSpinner from "../global/loadingSpinner";

const SubUserList = () => {
  const { data: subUser, isPending, isError } = useGetSubUsersQuery();

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>error</div>;
  }

  return (
    <>
      {!subUser.length ? (
        <div>No sub users</div>
      ) : (
        <Carousel className="max-w-sm w-full">
          <CarouselContent>
            {subUser.map((user) => (
              <CarouselItem key={user?._id}>
                <SubUserCard
                  _id={user?._id || ""}
                  firstName={user?.firstName || ""}
                  lastName={user?.lastName || ""}
                  role={user?.role || ""}
                  email={user?.email || ""}
                  createdAt={user?.createdAt || ""}
                  userName={user?.userName || ""}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </>
  );
};

export default SubUserList;
