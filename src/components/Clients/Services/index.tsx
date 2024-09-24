"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import AddService from "./AddService";

const ServicesList = ({ clientServices }: any) => {
  const [open, setOpen] = useState(false);

  const onClickOpen = () => {
    setOpen(true);
  };

  const onClickClose = () => {
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader className="px-7">
        <div className="flex justify-between items-center">
          <CardTitle>Client Wise Services</CardTitle>
          <Button className="mr-4">
            Add Service
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientServices?.length > 0 &&
              clientServices.map((item: any, index: number) => {
                console.log(item);
                return (
                  <TableRow className="bg-accent" key={index}>
                    <TableCell>{item?.title}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {item?.type}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </CardContent>
      <AddService open={open} onClickClose={onClickClose} />
    </Card>
  );
};
export default ServicesList;
