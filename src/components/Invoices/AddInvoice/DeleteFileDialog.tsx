import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

export const DeleteFileDialog = ({
  opendeleteDialog,
  handleCloseDialog,
  setOpenDeleteDialog,
  deleteUploadFile,
  deleteLoading,
}: any) => {
  return (
    <div className="eachAction">
      <div className="bg-white">
        <div id="dialogDelete">
          <AlertDialog
            open={opendeleteDialog}
            // onOpenChange={setOpenDeleteDialog}
          >
            <AlertDialogContent id="alert-dialog-content">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete File</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="px-4">
                Are you sure you want to delete this File?
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCloseDialog}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 text-white"
                  onClick={() => {
                    deleteUploadFile();
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
