"use client";
import { Check, ChevronsUpDown, Key } from "lucide-react";
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
import { CardWithForm } from "./Card";

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
  const [open, setOpen] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [clientNameForDropDown, setClientNameForDropDown] = useState<any>([]);
  const [clientName, setClientName] = useState<any>();
  const [servicesForDropDown, setServicesForDropDown] = useState<any>([]);
  const [serviceName, setServiceName] = useState<any>({});
  const [addCount, setAddCount] = useState(1);
  const [serviceDetails, setServiceDetails] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [selectedClientIndex, setSelectedClientIndex] = useState<number | null>(
    null
  );
  const [selectedInvoiceStatus, setSelectedInvoiceStatus] = useState<any>();

  const [InvoiceStatus, setInvoiceStatus] = useState<any>();
  const [selectedServices, setSelectedServices] = useState<
    Array<{ service: string; amount: number }>
  >([]);

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
          client_id: clientName?.id,
          name: clientName?.client_name,
        },
      ];

      const reponse: any = await addInvoiceAPI(payload);
      if (reponse.status == 200 || reponse.status == 201) {
        throw reponse;
      }
    } catch (error) {
      console.error(error);
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
    setAddCount(addCount + 1);
  };

  const onRemoveCount = () => {
    if (addCount > 1) setAddCount(addCount - 1);
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

  useEffect(() => {
    clientNameDropDown();
    servicesDropDown();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", marginRight: "100px" }}>
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {clientName
                  ? clientNameForDropDown.find(
                      (client: any) => client.id === clientName?.id
                    )?.client_name
                  : "Select Client"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search Client" />
                <CommandList>
                  <CommandEmpty>No Client found.</CommandEmpty>
                  <CommandGroup>
                    {clientNameForDropDown.map((clientName: any) => (
                      <CommandItem
                        key={clientName.id}
                        value={clientName.client_name}
                        onSelect={(currentValue) => {
                          setClientName(clientName);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            clientName === clientName.client_name
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {clientName.client_name}
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
      </div>
      <div>
        <Button onClick={onAddCount}>+</Button>
        {addCount > 1 && <Button onClick={onRemoveCount}>-</Button>}
        {[...Array(addCount)].map((_, index) => {
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
            </div>
          );
        })}
      </div>
      <Button onClick={addInvoice}>Add</Button>
      <LoadingComponent loading={loading} />
    </div>
  );
};
