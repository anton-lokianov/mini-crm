import { useGetSubUsersQuery } from "@/service/react-query/querys";
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
  const { data, isPending, isError } = useGetSubUsersQuery();

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>error</div>;
  }

  return (
    <>
      {!data.length ? (
        <div>No sub users</div>
      ) : (
        <Carousel className="max-w-sm w-full">
          <CarouselContent>
            {data?.map((user) => (
              <CarouselItem key={user._id}>
                <SubUserCard {...user} />
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
