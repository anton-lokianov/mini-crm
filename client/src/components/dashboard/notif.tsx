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
            <span className="font-semibold">Anton:</span>
            <p className="">
              Create call for 1231456 form Tel aviv to Jerusalem
            </p>
            <span>10:26</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Yossi:</span>
            <p className="">Create call for 4214125 form heifa to malot</p>
            <span>10:25</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Notif;
