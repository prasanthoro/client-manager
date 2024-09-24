import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteClientAPI } from "@/services/clients";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export const DeleteButton = ({ getAllClients, clientId }: any) => {
  const [open, setOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const clientDelete = async () => {
    try {
      setDeleteLoading(true);
      const response = await deleteClientAPI(clientId);
      if (response?.status == 200 || response?.status == 201) {
        toast.success("Client Deleted Successfully");
        getAllClients();
        handleClose();
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
      console.log(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="eachAction">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Image
            title="Delete"
            onClick={handleOpen}
            src={"/delete.svg"}
            height={40}
            width={40}
            alt="Delete Icon"
          />
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Client</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this client?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                if (!deleteLoading) {
                  clientDelete();
                }
              }}
            >
              {deleteLoading ? <Spinner /> : "YES"}
            </Button>

            <Button variant="outline" onClick={handleClose}>
              No
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
