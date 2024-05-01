import Menu from "@/components/dashboard/menu";
import Notif from "@/components/dashboard/notif";
import { RoadCallTable } from "@/components/dashboard/roadCallsTable";

const Dashboard = () => {
  return (
    <section className="p-10">
      <div className="flex gap-2 container justify-around">
        <Menu />
        <Notif />
      </div>
      <RoadCallTable />
    </section>
  );
};

export default Dashboard;
