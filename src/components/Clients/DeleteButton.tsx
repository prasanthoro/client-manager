import Image from "next/image";
import { useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

export const DeleteButton = ({
  getAllInsurances,
  lab_id,
  insurance_id,
  getAllLabs,
}: any) => {
  const [open, setOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  //   const insuranceDelete = async () => {
  //     try {
  //       setDeleteLoading(true);
  //       const response = await deleteInsuranceAPI(lab_id, insurance_id);
  //       if (response?.status == 200 || response?.status == 201) {
  //         toast.success(response?.message || "Insurance Deleted Successfully");
  //         getAllLabs({});
  //         setTimeout(() => {
  //           getAllInsurances({});
  //         }, 50);

  //         handleClose();
  //       }
  //     } catch (err: any) {
  //       toast.error(err?.message || "Something went wrong");
  //       console.log(err);
  //     } finally {
  //       setDeleteLoading(false);
  //     }
  //   };
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
        src={"/icons/listing_Actions/trash.svg"}
        height={16}
        width={16}
        alt="Image"
      ></Image>
      <div>
        <Dialog
          className="defaultPopup deletePopup"
          open={open}
          onClose={handleClose}
        >
          <DialogTitle className="popupHeader">
            <h3 className="heading">Warning</h3>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                padding: "0",
                ":hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Image
                alt="image"
                width={24}
                height={24}
                src="/actions/close-icon.svg"
              />
            </IconButton>
          </DialogTitle>
          <DialogContent className="popupBody">
            <p style={{ margin: "0", fontSize: "14px" }}>
              Are you sure? you want to delete Insurance?
            </p>
          </DialogContent>
          <DialogActions className="popupFooter">
            <Button className="defaultBtn " onClick={handleClose}>
              NO
            </Button>
            <Button
              className="defaultBtn addPlayor"
              onClick={() => {
                if (!deleteLoading) {
                  //   insuranceDelete();
                }
              }}
              autoFocus
            >
              {deleteLoading
                ? deleteLoading && (
                    <CircularProgress size={"1.5rem"} sx={{ color: "#fff" }} />
                  )
                : "YES"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
