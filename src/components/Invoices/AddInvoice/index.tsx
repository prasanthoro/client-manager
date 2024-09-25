"use client";
import { Check, ChevronsUpDown, Key, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  addInvoiceAPI,
  clientNameDropDownAPI,
  servicesDropDownAPI,
} from "@/services/invoices";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { LoadingComponent } from "@/components/core/LoadingComponent";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { checkAllowedValidText } from "@/lib/helpers/constants";
import { DatePicker } from "rsuite";
import "rsuite/DatePicker/styles/index.css";
import { Textarea } from "@/components/ui/textarea";

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
  const [openService, setOpenService] = useState(false);
  const [clientNameForDropDown, setClientNameForDropDown] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [clientName, setClientName] = useState<any>();
  const [servicesForDropDown, setServicesForDropDown] = useState<any>([]);
  const [serviceName, setServiceName] = useState<any>({});
  const [addCount, setAddCount] = useState(1);
  const [serviceDetails, setServiceDetails] = useState<any>({});
  const [selectedClientIndex, setSelectedClientIndex] = useState<number | null>(
    null
  );
  const [selectedInvoiceStatus, setSelectedInvoiceStatus] = useState<any>();

  const [InvoiceStatus, setInvoiceStatus] = useState<any>();
  const [selectedServices, setSelectedServices] = useState<
    Array<{ service: string; amount: number }>
  >([]);
  const [payer, setPayer] = useState<any | null>({});

  const [date, setDate] = useState<Date>();
  const [invoiceDetails, setInvoiceDetails] = useState<any>({});

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
    try {
      let payload = [
        {
          ...selectedServices,
        },
      ];

      const reponse: any = await addInvoiceAPI(payload);
      if (reponse.status == 200 || reponse.status == 201) {
        throw reponse;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onServiceDetails = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedServices = [...selectedServices];
    if (!updatedServices[index]) {
      updatedServices[index] = {
        service: "",
        amount: parseInt(e.target.value, 10) || 0,
      };
    } else {
      updatedServices[index].amount = parseInt(e.target.value, 10) || 0;
    }
    setSelectedServices(updatedServices);
  };

  const onAddCount = () => {
    selectedServices.push({ service: "", amount: 0 });
  };

  const onRemoveCount = (index: number) => {
    selectedServices.splice(index, 1);
    setSelectedServices([...selectedServices]);
  };

  const handleServiceNameChange = (value: string, index: number) => {
    const updatedServices = [...selectedServices];
    if (!updatedServices[index]) {
      updatedServices[index] = { service: value, amount: 0 }; // Default amount 0
    } else {
      updatedServices[index].service = value;
    }
    setSelectedServices(updatedServices);
  };

  const handleInvoiceStatusChange = (value: string) => {
    setInvoiceStatus(value);
  };

  useEffect(() => {
    clientNameDropDown();
    servicesDropDown();
  }, []);

  const handleClearClient = (e: any) => {
    e.stopPropagation();
    setClientName(null);
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

  console.log(selectedServices, "selectedServices");

  return (
    <div>
      <div style={{ marginRight: "100px" }}>
        <div>
          <Input
            name="name"
            placeholder="Enter Name"
            onChange={onFieldsChange}
          />
        </div>
        <div>
          <DatePicker
            className="defaultTextField"
            placeholder="Select Contract Submission Date"
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
        <div>
          <Select
            onValueChange={(value) => {
              handleInvoiceStatusChange(value);
              const selectedStatus = invoiceStatus.find(
                (status) => status.value === value
              );
              setSelectedInvoiceStatus(selectedStatus); // Store the selected item in state
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
        <div>
          <Textarea
            name="remarks"
            placeholder="Enter remarks"
            onChange={onFieldsChange}
          />
        </div>
      </div>
      <div>
        <Button onClick={onAddCount}>+</Button>

        {[...Array(selectedServices.length)].map((_, index) => {
          return (
            <div key={index} style={{ display: "flex", marginBottom: "10px" }}>
              <div>
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
                      {servicesForDropDown.map((item: any) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div
                className="flex items-center space-x-2"
                style={{ marginLeft: "10px" }}
              >
                <Input
                  onChange={(e) => onServiceDetails(e, index)}
                  type="number"
                  name={`services_amount${index}`}
                  placeholder="Amount"
                />
              </div>
              <div>
                <Button
                  variant="outline"
                  color="red"
                  onClick={() => onRemoveCount(index)}
                >
                  <X />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <Button onClick={addInvoice}>Add</Button>
      <LoadingComponent loading={loading} />
    </div>
  );
};
