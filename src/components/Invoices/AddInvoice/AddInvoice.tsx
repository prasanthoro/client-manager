"use client";
import { LoadingComponent } from "@/components/core/LoadingComponent";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  checkAllowedValidText,
  checkAmountInput,
} from "@/lib/helpers/constants";
import { changeOnlyFirstLetterToCap } from "@/lib/helpers/core/changeFirstLetterToCap";
import { cn } from "@/lib/utils";
import {
  addInvoiceAPI,
  clientNameDropDownAPI,
  deleteUploadedFileAPI,
  getSingleInvoicePI,
  servicesDropDownAPI,
  updateInvoiceAPI,
  uploadFileToS3,
  uploadInvoiceAPI,
} from "@/services/invoices";
import { Label } from "@radix-ui/react-label";
import { Check, ChevronDown, ChevronsUpDown, ChevronUp, X } from "lucide-react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DatePicker } from "rsuite";
import "rsuite/DatePicker/styles/index.css";
import { toast } from "sonner";
import { DeleteFileDialog } from "./DeleteFileDialog";
import ErrorComponent from "./ErrorMessage";
import { status } from "@/lib/constants/selectStatus";

const invoiceStatus = [
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Completed",
    value: "COMPLETED",
  },
];
export const AddInvoice = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { invoice_id } = useParams();
  const [clientNameForDropDown, setClientNameForDropDown] = useState<any>([]);
  const [servicesForDropDown, setServicesForDropDown] = useState<any>([]);
  const [invoiceDetails, setInvoiceDetails] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [clientName, setClientName] = useState<any>();
  const [InvoiceStatus, setInvoiceStatus] = useState<any>();
  const [selectedServices, setSelectedServices] = useState<
    Array<{ service_id: string; invoice_amount: number | null }>
  >([{ service_id: "", invoice_amount: null }]);
  const [errors, setErrors] = useState<any>();
  const [isRendered, setIsRendered] = useState(false);
  const [uploadFile, setUploadFile] = useState<any>();
  const [multipleFilesData, setMultipleFilesData] = useState<any>();
  const [opendeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [statusopen, setStatusOpen] = useState(false);

  const clientNameDropDown = async () => {
    setLoading(true);
    try {
      const response = await clientNameDropDownAPI();
      if (response?.status == 200 || response?.status == 201) {
        setClientNameForDropDown(response?.data?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const servicesDropDown = async () => {
    setLoading(true);
    try {
      const response = await servicesDropDownAPI();
      if (response?.status == 200 || response?.status == 201) {
        setServicesForDropDown(response?.data?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const addInvoice = async () => {
    setErrors([]);
    setLoading(true);
    try {
      const updatatedServices = selectedServices.map((item: any) => {
        return {
          service_id: item.service_id,
          invoice_amount: item.invoice_amount,
          ...invoiceDetails,
          status: InvoiceStatus,
          client_id: clientName?.id,
        };
      });

      const response: any = await addInvoiceAPI(updatatedServices);
      if (response.status == 200 || response.status == 201) {
        const { data } = response?.data;
        if (uploadFile) {
          await uploadInvoice(data);
        } else {
          toast.success("Invoice Added Successfully");
          setTimeout(() => {
            router.push("/invoices");
          }, 1000);
        }
      } else if (response.status == 422) {
        setErrors(response.data?.errors);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const uploadInvoice = async (data: any) => {
    setLoading(true);
    try {
      const payload = pathname?.includes("add-invoice")
        ? data?.map((item: any) => {
            return {
              client_id: clientName?.id,
              file_name: uploadFile?.name,
              size: uploadFile?.size,
              invoice_id: item?.id,
            };
          })
        : [];

      const payloadData = pathname?.includes("edit")
        ? [
            {
              client_id: data?.client_id,
              file_name: uploadFile?.name,
              size: uploadFile?.size,
              invoice_id: data?.id,
            },
          ]
        : payload;

      const response: any = await uploadInvoiceAPI(payloadData);
      if (response.status == 200 || response.status == 201) {
        const { upload_url } = response?.data?.data;
        await uploadToS3(uploadFile, upload_url);
      } else if (response.status == 422) {
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadToS3 = async (file: any, url: string) => {
    try {
      const response = await uploadFileToS3(file, url);
      if (response?.status == 200 || response.status == 201) {
        // toast.success("Invoice Uploaded Successfully");
        setTimeout(() => {
          router.push("/invoices");
        }, 1000);
      } else {
        throw response;
      }
    } catch (err) {
      throw err;
    }
  };

  const getSingleInvoice = async () => {
    setLoading(true);
    try {
      const response: any = await getSingleInvoicePI(invoice_id);
      if (response.status == 200 || response.status == 201) {
        setInvoiceDetails(response?.data?.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const updateInvoice = async () => {
    setLoading(true);
    try {
      let payload = {
        client_id: invoiceDetails?.client_id,
        service_id: invoiceDetails?.service_id,
        invoice_status: invoiceDetails?.invoice_status
          ? invoiceDetails?.invoice_status
          : "",
        invoice_amount: invoiceDetails?.invoice_amount
          ? +invoiceDetails?.invoice_amount
          : null,
        remarks: invoiceDetails?.remarks ? invoiceDetails?.remarks : "",
        payment_date: invoiceDetails?.payment_date
          ? invoiceDetails?.payment_date
          : null,
        invoice_date: invoiceDetails?.invoice_date,
      };

      const response: any = await updateInvoiceAPI(invoice_id, payload);
      if (response.status == 200 || response.status == 201) {
        const { data } = response?.data;
        if (uploadFile) {
          await uploadInvoice(data);
          toast.success("Invoice Updated Successfully");
        } else {
          toast.success("Invoice Updated Successfully");
          setTimeout(() => {
            router.back();
          }, 500);
        }
      } else {
        if (response.status == 422) {
          setErrors(response?.data?.errors);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const deleteUploadFile = async () => {
    setDeleteLoading(true);
    try {
      const response: any = await deleteUploadedFileAPI(
        invoiceDetails?.file_id
      );
      if (response.status == 200 || response.status == 201) {
        toast.success(response?.data?.message);
        handleCloseDialog();
        await getSingleInvoice();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const onFieldsChange = (event?: any) => {
    const { name, value } = event.target;
    if (value && checkAllowedValidText(value)) {
      setInvoiceDetails((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      let temp = { ...invoiceDetails };
      delete temp[name];
      setInvoiceDetails(temp);
    }
  };

  const handleClearClient = (e: any) => {
    e.stopPropagation();
    setClientName(null);
  };
  const handleInvoiceStatusChange = (value: string) => {
    setInvoiceStatus(value);
  };

  const onAddClick = () => {
    const newService = {
      service_id: "",
      invoice_amount: null,
    };
    setSelectedServices([...selectedServices, newService]);
  };

  const onRemoveClick = (index: number) => {
    selectedServices.splice(index, 1);
    setSelectedServices([...selectedServices]);
  };

  const handleServiceNameChange = (value: string, index: number) => {
    const updatedServices = [...selectedServices];
    if (!updatedServices[index]) {
      updatedServices[index] = { service_id: value, invoice_amount: null }; // Default amount 0
    } else {
      updatedServices[index].service_id = value;
    }
    setSelectedServices(updatedServices);
  };

  const onServiceDetails = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedServices = [...selectedServices];
    if (!updatedServices[index]) {
      updatedServices[index] = {
        service_id: "",
        invoice_amount: parseInt(e.target.value) || null,
      };
    } else {
      updatedServices[index].invoice_amount =
        parseInt(e.target.value, 10) || null;
    }
    setSelectedServices(updatedServices);
  };

  const handleUploadFile = (event: any) => {
    renderInput();
    let file = event.target.files[0];
    setUploadFile(file);
  };

  const renderInput = () => {
    setIsRendered(true);
    setTimeout(() => {
      setIsRendered(false);
    }, 1);
  };

  const handleEditInvoice: any = (name: any, value: any) => {
    setInvoiceDetails((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (pathname?.includes("/edit-invoice")) {
      getSingleInvoice();
    }
    clientNameDropDown();
    servicesDropDown();
  }, []);

  const handleOpen = () => {
    setOpenDeleteDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
  };

  const editClientName = clientNameForDropDown?.find(
    (item: any) => item.id == invoiceDetails?.client_id
  )?.client_name;
  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      {/* <div>
        <Label>Invoice Name</Label>
        <Input name="name" placeholder="Enter Name" onChange={onFieldsChange} />
      </div> */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 -full hover:bg-pink-200"
          >
            <Image alt="image" width={24} height={24} src="/back-button.svg" />
          </button>
          <h1 className="text-2xl font-bold text-red-600 ml-2">
            {pathname?.includes("/edit-invoice")
              ? "Update Invoice"
              : "Add Invoice"}
          </h1>
        </div>
      </div>
      {/* <div>
        <button
          onClick={() => router.back()}
          className="p-2 -full hover:bg-pink-200"
        >
          <Image alt="image" width={24} height={24} src="/back-button.svg" />
        </button>
        <h1 className="text-3xl font-bold">
          {pathname?.includes("/edit-invoice") ? "Edit Invoice" : "Add Invoice"}
        </h1>
      </div> */}
      <Label>
        Client Name <span style={{ color: "red" }}>*</span>
      </Label>
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
              style={{ width: "300px" }}
              disabled={pathname?.includes("/edit-invoice") ? true : false}
            >
              {clientName
                ? clientNameForDropDown.find(
                    (client: any) => client.id === clientName?.id
                  )?.client_name
                : pathname?.includes("/edit-invoice")
                ? editClientName
                : "Select Client"}
              {clientName ? (
                <X
                  className="ml-2 h-4 w-4 cursor-pointer"
                  onClick={handleClearClient}
                />
              ) : (
                ""
              )}
              {open ? (
                <ChevronUp className="h-4 w-4 shrink-0 opacity-50" />
              ) : (
                <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Client" />
              <CommandList>
                <CommandEmpty>No Client found.</CommandEmpty>
                <CommandGroup>
                  {clientNameForDropDown.map((client: any) => (
                    <CommandItem
                      key={client.id}
                      value={changeOnlyFirstLetterToCap(client.client_name)}
                      onSelect={() => {
                        setClientName(client);
                        handleEditInvoice("client_id", client?.id);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          clientName === client.client_name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {changeOnlyFirstLetterToCap(client.client_name)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {errors ? (
          <ErrorComponent errors={errors} index={`${0}.client_id`} />
        ) : (
          ""
        )}
      </div>
      <Label>
        Invoice Date <span style={{ color: "red" }}>*</span>
      </Label>
      <div>
        <DatePicker
          className="defaultTextField"
          placeholder="Select Invoice Date"
          value={
            invoiceDetails?.invoice_date
              ? new Date(invoiceDetails?.invoice_date)
              : null
          }
          onChange={(value: any) =>
            onFieldsChange({
              target: {
                name: "invoice_date",
                value,
              },
            })
          }
          editable={false}
          format="MM/dd/yyyy"
        />
        {errors ? (
          <ErrorComponent errors={errors} index={`${0}.invoice_date`} />
        ) : (
          ""
        )}
        {errors ? <p style={{ color: "red" }}>{errors?.invoice_date}</p> : ""}
      </div>
      <Label>Payment Date</Label>
      <div>
        <DatePicker
          className="defaultTextField"
          placeholder="Select Payment Date"
          value={
            invoiceDetails?.payment_date
              ? new Date(invoiceDetails?.payment_date)
              : null
          }
          onChange={(value: any) =>
            onFieldsChange({
              target: {
                name: "payment_date",
                value,
              },
            })
          }
          editable={false}
          format="MM/dd/yyyy"
        />
      </div>
      <Label>Invoice Status</Label>
      {/* <div> */}
      <div>
        <Popover open={statusopen} onOpenChange={setStatusOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={statusopen}
              className="w-[200px] justify-between bg-white-700"
            >
              {invoiceDetails?.invoice_status
                ? invoiceStatus.find(
                    (type) => type.value === invoiceDetails?.invoice_status
                  )?.label
                : "Select Status"}
              <div className="flex">
                {invoiceDetails?.invoice_status && (
                  <X
                    className="mr-2 h-4 w-4 shrink-0 opacity-50"
                    onClick={(e: any) => {
                      e.stopPropagation();
                      handleInvoiceStatusChange("");
                      handleEditInvoice("invoice_status", "");
                      setStatusOpen(false);
                    }}
                  />
                )}
                {statusopen ? (
                  <ChevronUp className="h-4 w-4 shrink-0 opacity-50" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <div className="max-h-[300px] overflow-y-auto">
              {invoiceStatus?.map((type) => (
                <Button
                  key={type.value}
                  onClick={() => {
                    handleInvoiceStatusChange(type.value);
                    handleEditInvoice("invoice_status", type.value);
                    setStatusOpen(false);
                  }}
                  className="w-full justify-start font-normal bg-white text-violet-600 border border-indigo-600 capitalize mb-2 hover:bg-violet-600  hover:text-white "
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      invoiceDetails?.invoice_status === type.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {type.label}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Label>Remarks</Label>
      <div>
        <Textarea
          name="remarks"
          placeholder="Enter remarks"
          onChange={onFieldsChange}
          value={invoiceDetails?.remarks}
        />
      </div>
      {pathname?.includes("/add-invoice") ? (
        <Button
          onClick={() => {
            onAddClick();
          }}
        >
          +
        </Button>
      ) : (
        ""
      )}
      {selectedServices?.map((item: any, index: number) => {
        return (
          <div>
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "100px" }}>
                <Label>
                  {"Service  " + (index + 1)}
                  <span style={{ color: "red" }}>*</span>
                </Label>
                <Select
                  disabled={pathname?.includes("/edit-invoice") ? true : false}
                  onValueChange={(value) => {
                    if (pathname?.includes("/edit-invoice")) {
                      handleEditInvoice("service_id", value);
                    } else {
                      handleServiceNameChange(value, index);
                    }
                  }}
                  value={
                    item?.service_id
                      ? item?.service_id
                      : invoiceDetails?.service_id
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Service Type</SelectLabel>
                      {servicesForDropDown.map(
                        (element: any, index: number) => (
                          <SelectItem key={index} value={element.id}>
                            {element.name}
                          </SelectItem>
                        )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors ? (
                  <ErrorComponent
                    errors={errors}
                    index={`${index}.service_id`}
                  />
                ) : (
                  ""
                )}
              </div>
              <div>
                <Label>
                  Amount <span style={{ color: "red" }}>*</span>
                </Label>
                <div style={{ display: "flex" }}>
                  <Input
                    name="amount"
                    placeholder="Enter Amount"
                    onInput={(e) => {
                      checkAmountInput(e);
                    }}
                    onChange={(e) => {
                      if (pathname?.includes("/edit-invoice")) {
                        handleEditInvoice("invoice_amount", e.target.value);
                      } else {
                        onServiceDetails(e, index);
                      }
                    }}
                    autoFocus={
                      selectedServices[index]?.invoice_amount ? true : false
                    }
                    value={
                      pathname?.includes("/add-invoice")
                        ? selectedServices[index]?.invoice_amount
                        : invoiceDetails?.invoice_amount
                    }
                  />
                  {selectedServices?.length > 1 ? (
                    <Button
                      onClick={() => {
                        onRemoveClick(index);
                      }}
                    >
                      -
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
                {errors ? (
                  <ErrorComponent
                    errors={errors}
                    index={`${index}.invoice_amount`}
                  />
                ) : (
                  ""
                )}
                {errors ? (
                  <p style={{ color: "red" }}>{errors?.invoice_amount}</p>
                ) : (
                  ""
                )}
              </div>
              <div></div>
            </div>
          </div>
        );
      })}

      {(pathname?.includes("/edit-invoice") && invoiceDetails?.url === null) ||
      pathname?.includes("/add-invoice") ? (
        <div
          style={{
            marginTop: "50px",
            textAlign: "center",
            backgroundColor: "black",
            color: "white",
            padding: "10px",
            borderRadius: "10px",
            cursor: "pointer",
            height: "45px",
            width: "150px",
            marginBottom: uploadFile ? "0px" : "50px",
          }}
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          {!isRendered && (
            <>
              <input
                disabled={loading}
                onChange={handleUploadFile}
                type="file"
                id="file-upload"
                style={{ display: "none" }}
              />
              <label
                style={{ cursor: loading ? "not-allowed" : "pointer" }}
                htmlFor="file"
              >
                {" "}
                Upload a file
              </label>
            </>
          )}
        </div>
      ) : (
        ""
      )}
      <div>
        {uploadFile ? (
          <div style={{ display: "flex", marginBottom: "50px" }}>
            <Image
              alt="Image"
              src={"/attachment.svg"}
              height={20}
              width={20}
              style={{ marginRight: "10px" }}
            />
            <p>{uploadFile.name}</p>

            <X size={16} onClick={() => setUploadFile(null)} />
          </div>
        ) : pathname?.includes("/edit-invoice") && invoiceDetails?.key ? (
          <div
            style={{ display: "flex", marginBottom: "50px", marginTop: "10px" }}
          >
            <p style={{ marginTop: "10px", marginRight: "10px" }}>
              {invoiceDetails?.key}
            </p>
            <Button
              onClick={() => {
                handleOpen();
              }}
            >
              Delete File
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>

      <div
        className="flex justify-end space-x-4 mt-6"
        style={{
          cursor: !uploadFile ? "not-allowed" : "pointer",
        }}
      >
        <Button
          className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          className="px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600"
          type="submit"
          onClick={() => {
            if (pathname?.includes("/edit-invoice")) {
              updateInvoice();
            } else {
              addInvoice();
            }
          }}
        >
          {pathname?.includes("/edit-invoice") ? "Update" : "Add"}
        </Button>
      </div>
      <p>{multipleFilesData ? multipleFilesData[0]?.name : ""}</p>
      <DeleteFileDialog
        opendeleteDialog={opendeleteDialog}
        handleCloseDialog={handleCloseDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        deleteUploadFile={deleteUploadFile}
        deleteLoading={deleteLoading}
      />
      <LoadingComponent loading={loading} />
    </div>
  );
};
