import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const Notif = () => {
  return (
    <Card className="w-[50rem] max-h-full overflow-auto">
      <CardHeader>
        <CardTitle className="text-center border-b-2">Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="font-semibold">Anton:</span>
            <p>Create call for 1231456 form Tel aviv to Jerusalem</p>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Anton:</span>
            <p>Create call for 4214125 form heifa to malot</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Notif;
