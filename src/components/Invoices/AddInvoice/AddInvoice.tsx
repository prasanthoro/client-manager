"use client";
import { useEffect, useState } from "react";
import {
  addInvoiceAPI,
  clientNameDropDownAPI,
  servicesDropDownAPI,
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
import { useRouter } from "next/navigation";

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

  const clientNameDropDown = async () => {
    setLoading(true);
    try {
      const reponse = await clientNameDropDownAPI();
      if (reponse?.status == 200 || reponse?.status == 201) {
        setClientNameForDropDown(reponse?.data?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const servicesDropDown = async () => {
    setLoading(true);
    try {
      const reponse = await servicesDropDownAPI();
      if (reponse?.status == 200 || reponse?.status == 201) {
        setServicesForDropDown(reponse?.data?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const addInvoice = async () => {
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

      const reponse: any = await addInvoiceAPI(updatatedServices);
      //   console.log(reponse?.data?.errors, "addInvoice errors");
      if (reponse.status == 200 || reponse.status == 201) {
        router.push("/invoices");
        // throw reponse;
      } else if (reponse.status == 422) {
        setErrors(reponse.data?.errors);
        reponse.data?.errors.forEach((error: any) => {
          alert(error.message);
        });
      }
    } catch (error) {
      console.log(error);
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
        invoice_amount: parseInt(e.target.value, 10) || 0,
      };
    } else {
      updatedServices[index].invoice_amount = parseInt(e.target.value, 10) || 0;
    }
    setSelectedServices(updatedServices);
  };

  useEffect(() => {
    clientNameDropDown();
    servicesDropDown();
  }, []);

  //   console.log(errors?, "addInvoice addInvoiceerrorsconsole");
  //   console.log(invoiceDetails, "addInvoice details");
  //   console.log(clientName, "addInvoice clientName");
  //   console.log(InvoiceStatus, "addInvoice invoiceStatus");
  //   console.log(selectedServices, "addInvoice selectedServices");

  return (
    <div>
      {/* <div>
        <Label>Invoice Name</Label>
        <Input name="name" placeholder="Enter Name" onChange={onFieldsChange} />
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
            >
              {clientName
                ? clientNameForDropDown.find(
                    (client: any) => client.id === clientName?.id
                  )?.client_name
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
            handleInvoiceStatusChange(value);
          }}
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
                    value={item.value} // Set value as item.value
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
        />
      </div>
      <Button
        onClick={() => {
          onAddClick();
        }}
      >
        +
      </Button>
      {selectedServices?.map((item: any, index: number) => {
        return (
          <div>
            <div style={{ display: "flex" }}>
              <div>
                <Label>
                  {"Service  " + (index + 1)}
                  <span style={{ color: "red" }}>*</span>
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleServiceNameChange(value, index)
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
                          <SelectItem
                            key={index}
                            value={
                              servicesForDropDown?.find(
                                (serviceId: any) => serviceId.id === element.id
                              )?.name
                            }
                          >
                            {element.name}
                          </SelectItem>
                        )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>
                  Amount <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  type="number"
                  name="amount"
                  placeholder="Enter Amount"
                  onChange={(e) => onServiceDetails(e, index)}
                  onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
                  step="any"
                  pattern="\d*" // Allow only digits
                />
              </div>
              <div>
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
            </div>
          </div>
        );
      })}
      <div>
        <Button
          onClick={() => {
            addInvoice();
          }}
        >
          Add Invoice
        </Button>
      </div>
      <LoadingComponent loading={loading} />
    </div>
  );
};
