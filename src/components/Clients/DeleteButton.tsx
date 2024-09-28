import { deleteClientAPI } from "@/services/clients";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
export const DeleteButton = ({ getAllClients, clientId }: any) => {
  const [open, setOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const clientDelete = async () => {
    try {
      setDeleteLoading(true);
      const response = await deleteClientAPI(clientId);
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Client Deleted Successfully");
        getAllClients({});
        handleClose();
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
      console.error(err);
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
      <Image
        title="Delete"
        onClick={handleOpen}
        src={"/delete.svg"}
        height={70}
        width={70}
        alt="Delete Icon"
      />
      <div className="bg-white">
        <div id="dialogDelete">
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent id="alert-dialog-content">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Client</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="px-4">
                Are you sure you want to delete this client?
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleClose}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 text-white"
                  onClick={() => {
                    if (!deleteLoading) {
                      clientDelete();
                    }
                  }}
                >
                  {deleteLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    "Yes! Delete"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};
