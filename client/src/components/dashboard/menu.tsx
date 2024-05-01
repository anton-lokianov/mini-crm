import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const Menu = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-3">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>search call by car number</AccordionTrigger>
          <AccordionContent className="w-56">
            <Input placeholder="47983112" className="w-56" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>search call by service call</AccordionTrigger>
          <AccordionContent className="w-56">
            <Input placeholder="123455" className="w-56" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>create call</AccordionTrigger>
          <AccordionContent className="w-56">
            <Input placeholder="enter client id or car number" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button size="sm" className="text-white w-56">
        create client
      </Button>
    </div>
  );
};

export default Menu;
