import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const Notif = () => {
  return (
    <Card className="w-[55rem] max-h-56 h-full overflow-auto">
      <CardHeader>
        <CardTitle className="text-center border-b-2">Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <span className="font-semibold">Anton:</span>
              <p className="">
                Create call for 4214125 form rishon to tel aviv
              </p>
            </div>
            <span>10:25</span>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-3">
              <span className="font-semibold">Yossi:</span>
              <p className="">Create call for 4214125 form heifa to malot</p>
            </div>
            <span>10:25</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Notif;
