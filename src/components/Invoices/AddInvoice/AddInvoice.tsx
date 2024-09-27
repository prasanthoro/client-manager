"use client";
import { useEffect, useState } from "react";
import {
  addInvoiceAPI,
  clientNameDropDownAPI,
  getSingleInvoicePI,
  servicesDropDownAPI,
  updateInvoiceAPI,
  uploadFileToS3,
  uploadInvoiceAPI,
} from "@/services/invoices";
import { Input } from "@/components/ui/input";
import { checkAllowedValidText } from "@/lib/helpers/constants";
import { DatePicker } from "rsuite";
import "rsuite/DatePicker/styles/index.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Key, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
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
import { LoadingComponent } from "@/components/core/LoadingComponent";
import { Label } from "@radix-ui/react-label";
import { set } from "date-fns";
import { useParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import ErrorComponent from "./ErrorMessage";
import { toast, Toaster } from "sonner";
import path from "path";
import { fi } from "date-fns/locale";

const invoiceStatus = [
  // {
  //   label: "",
  //   value: "Clear",
  // },
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
  const [invoiceDetails, setInvoiceDetails] = useState<any>({});
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
  const [editInvoiceData, setEditInvoiceData] = useState<any>();

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
        toast.success("Invoice Uploaded Successfully");
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
        // ...invoiceDetails,
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
          : "",
        invoice_date: invoiceDetails?.invoice_date,
        // created_at: null,
      };

      const response: any = await updateInvoiceAPI(invoice_id, payload);
      if (response.status == 200 || response.status == 201) {
        // toast.success("Invoice Updated Successfully");
        const { data } = response?.data;
        if (uploadFile) {
          await uploadInvoice(data);
        } else {
          toast.success("Invoice Updated Successfully");
          setTimeout(() => {
            router.push("/invoices");
          }, 1000);
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
        invoice_amount: parseInt(e.target.value, 10) || null,
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
  console.log(selectedServices, "invoiceDetails");
  console.log(invoiceDetails, "invoiceDetails");

  const editClientName = clientNameForDropDown?.find(
    (item: any) => item.id == invoiceDetails?.client_id
  )?.client_name;
  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      {/* <div>
        <Label>Invoice Name</Label>
        <Input name="name" placeholder="Enter Name" onChange={onFieldsChange} />
      </div> */}
      <div>
        <button
          onClick={() => router.back()}
          className="p-2 -full hover:bg-pink-200"
        >
          <Image alt="image" width={24} height={24} src="/back-button.svg" />
        </button>
        <h1 className="text-3xl font-bold">
          {pathname?.includes("/edit-invoice") ? "Edit Invoice" : "Add Invoice"}
        </h1>
      </div>
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
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                      value={client.client_name}
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
                      {client.client_name}
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
      <div>
        <Select
          onValueChange={(value) => {
            {
              handleInvoiceStatusChange(value);
              handleEditInvoice("invoice_status", value);
            }
          }}
          value={
            invoiceStatus?.find(
              (item: any) => item?.value == invoiceDetails?.invoice_status
            )?.value
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {invoiceStatus?.map((item, index) => {
                return (
                  <SelectItem
                    key={index}
                    value={item.value ? item.value : ""} // Set value as item.value
                  >
                    {item.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
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
                    type="number"
                    name="amount"
                    placeholder="Enter Amount"
                    onChange={(e) => {
                      if (pathname?.includes("/edit-invoice")) {
                        handleEditInvoice("invoice_amount", e.target.value);
                      } else {
                        onServiceDetails(e, index);
                      }
                    }}
                    onWheel={(e) =>
                      (e.currentTarget as HTMLInputElement).blur()
                    }
                    step="any"
                    pattern="\d*" // Allow only digits
                    value={
                      pathname?.includes("/add-invoice")
                        ? String(selectedServices[index]?.invoice_amount)
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
              <div>
                {/* {selectedServices?.length > 1 ? (
                  <Button
                    onClick={() => {
                      onRemoveClick(index);
                    }}
                  >
                    -
                  </Button>
                ) : (
                  ""
                )} */}
              </div>
            </div>
          </div>
        );
      })}

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
      >
        {!isRendered && (
          <>
            <input
              disabled={loading}
              onChange={handleUploadFile}
              type="file"
              id="file"
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
      <div>
        {uploadFile ? (
          <div style={{ display: "flex", marginBottom: "50px" }}>
            <p>{uploadFile.name}</p>

            <X size={16} onClick={() => setUploadFile(null)} />
          </div>
        ) : (
          invoiceDetails?.key && (
            <div style={{ display: "flex", marginBottom: "50px" }}>
              <p>{invoiceDetails?.key}</p>
              <X
                size={16}
                onClick={() => {
                  setInvoiceDetails({
                    ...invoiceDetails,
                    key: null,
                    url: null,
                  });
                }}
              />
            </div>
          )
        )}
      </div>
      <div
        style={{
          cursor: !uploadFile ? "not-allowed" : "pointer",
          width: "105px",
        }}
      >
        <Button
          onClick={() => {
            if (pathname?.includes("/edit-invoice")) {
              updateInvoice();
            } else {
              addInvoice();
            }
          }}
        >
          {pathname?.includes("/edit-invoice")
            ? "Update Invoice"
            : "Add Invoice"}
        </Button>
      </div>
      <LoadingComponent loading={loading} />
    </div>
  );
};
