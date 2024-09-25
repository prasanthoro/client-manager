import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "vamai",
  },
];

export const CardWithForm = ({ onServiceNameChange, index }: any) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Add Service</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                onChange={onServiceNameChange}
                id="name"
                name={`services_name${index}`}
                placeholder="Name of your Service"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Service Type</Label>
              <Select>
                <SelectTrigger
                  id="framework"
                  name={`services_framework${index}`}
                  onChange={() => {
                    console.log("triggered");
                  }}
                  value={"next"}
                  defaultValue={"next"}
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper" defaultValue={"next"}>
                  {frameworks.map((framework) => {
                    return (
                      <SelectItem key={framework.value} value={framework.value}>
                        {framework.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  );
};

{
  /* <div>
                <Popover open={openService} onOpenChange={setOpenService}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openService}
                      className="w-[200px] justify-between"
                    >
                      {selectedClientIndex !== null
                        ? servicesForDropDown[selectedClientIndex]?.name
                        : "Select Service"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search Client" />
                      <CommandList>
                        <CommandEmpty>No Service found.</CommandEmpty>
                        <CommandGroup>
                          {servicesForDropDown.map(
                            (service: any, index: number) => (
                              <CommandItem
                                key={index}
                                value={service.name}
                                onSelect={() => {
                                  setServiceName(service);
                                  setSelectedClientIndex(index);
                                  setOpenService(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedClientIndex === index
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {service.name}
                              </CommandItem>
                            )
                          )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Input
                  onChange={onServiceDetails}
                  type="text"
                  name={`services_name${index}`}
                  placeholder="service name"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  onChange={onServiceDetails}
                  type="number"
                  name={`services_amount${index}`}
                  placeholder="Amount"
                />
              </div> */
}

// previous component

// "use client";
// import { Check, ChevronsUpDown, Key, X } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   addInvoiceAPI,
//   clientNameDropDownAPI,
//   servicesDropDownAPI,
// } from "@/services/invoices";
// import { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { LoadingComponent } from "@/components/core/LoadingComponent";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { CardWithForm } from "./Card";

// const invoiceStatus = [
//   {
//     label: "Pending",
//     value: "PENDING",
//   },
//   {
//     label: "Completed",
//     value: "COMPLETED",
//   },
// ];

// export const AddInvoice = () => {
//   const [open, setOpen] = useState(false);
//   const [openService, setOpenService] = useState(false);
//   const [clientNameForDropDown, setClientNameForDropDown] = useState<any>([]);
//   const [clientName, setClientName] = useState<any>();
//   const [servicesForDropDown, setServicesForDropDown] = useState<any>([]);
//   const [serviceName, setServiceName] = useState<any>({});
//   const [addCount, setAddCount] = useState(1);
//   const [serviceDetails, setServiceDetails] = useState<any>({});
//   const [loading, setLoading] = useState(false);
//   const [selectedClientIndex, setSelectedClientIndex] = useState<number | null>(
//     null
//   );
//   const [selectedInvoiceStatus, setSelectedInvoiceStatus] = useState<any>();

//   const [InvoiceStatus, setInvoiceStatus] = useState<any>();
//   const [selectedServices, setSelectedServices] = useState<
//     Array<{
//       service_id: string;
//       invoice_amount: number;
//       invoice_status: string;
//       client_id: string;
//     }>
//   >([]);

//   const clientNameDropDown = async () => {
//     setLoading(true);
//     try {
//       const reponse = await clientNameDropDownAPI();
//       if (reponse?.status == 200 || reponse?.status == 201) {
//         setClientNameForDropDown(reponse?.data?.data);
//       }
//     } catch (error) {
//     } finally {
//       setLoading(false);
//     }
//   };
//   const servicesDropDown = async () => {
//     setLoading(true);
//     try {
//       const reponse = await servicesDropDownAPI();
//       if (reponse?.status == 200 || reponse?.status == 201) {
//         setServicesForDropDown(reponse?.data?.data);
//       }
//     } catch (error) {
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addInvoice = async () => {
//     try {
//       let payload = [
//         {
//           client_id: clientName?.id,
//           name: clientName?.client_name,
//         },
//       ];

//       const reponse: any = await addInvoiceAPI(payload);
//       if (reponse.status == 200 || reponse.status == 201) {
//         throw reponse;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleClearClient = (e: any) => {
//     e.stopPropagation();
//     setClientName(null);
//   };

//   const onServiceDetails = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const updatedServices = [...selectedServices];
//     if (!updatedServices[index]) {
//       updatedServices[index] = {
//         service_id: "",
//         client_id: "",
//         invoice_status: "",
//         invoice_amount: parseInt(e.target.value, 10) || 0,
//       };
//     } else {
//       updatedServices[index].invoice_amount = parseInt(e.target.value, 10) || 0;
//     }
//     setSelectedServices(updatedServices);
//   };

//   const onAddCount = () => {
//     setAddCount(addCount + 1);
//   };

//   const onRemoveCount = () => {
//     if (addCount > 1) setAddCount(addCount - 1);
//   };

//   const handleServiceNameChange = (value: string, index: number) => {
//     const updatedServices = [...selectedServices];
//     if (!updatedServices[index]) {
//       updatedServices[index] = {
//         service_id: value,
//         invoice_amount: 0,
//         invoice_status: "",
//         client_id: "",
//       }; // Default amount 0
//     } else {
//       updatedServices[index].service_id = value;
//     }
//     setSelectedServices(updatedServices);
//   };

//   useEffect(() => {
//     clientNameDropDown();
//     servicesDropDown();
//   }, []);

//   console.log(selectedServices, "selectedServices");

//   return (
//     <div>
//       <div style={{ display: "flex", marginRight: "100px" }}>
//         <div>
//           <Popover open={open} onOpenChange={setOpen}>
//             <PopoverTrigger asChild>
//               <Button
//                 variant="outline"
//                 role="combobox"
//                 aria-expanded={open}
//                 className="w-[200px] justify-between"
//                 style={{ width: "300px" }}
//               >
//                 {clientName
//                   ? clientNameForDropDown.find(
//                       (client: any) => client.id === clientName?.id
//                     )?.client_name
//                   : "Select Client"}
//                 {clientName ? (
//                   <X
//                     className="ml-2 h-4 w-4 cursor-pointer"
//                     onClick={handleClearClient}
//                   />
//                 ) : (
//                   <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                 )}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-[200px] p-0">
//               <Command>
//                 <CommandInput placeholder="Search Client" />
//                 <CommandList>
//                   <CommandEmpty>No Client found.</CommandEmpty>
//                   <CommandGroup>
//                     {clientNameForDropDown.map((client: any) => (
//                       <CommandItem
//                         key={client.id}
//                         value={client.client_name}
//                         onSelect={() => {
//                           setClientName(client);
//                           setOpen(false);
//                         }}
//                       >
//                         <Check
//                           className={cn(
//                             "mr-2 h-4 w-4",
//                             clientName === client.client_name
//                               ? "opacity-100"
//                               : "opacity-0"
//                           )}
//                         />
//                         {client.client_name}
//                       </CommandItem>
//                     ))}
//                   </CommandGroup>
//                 </CommandList>
//               </Command>
//             </PopoverContent>
//           </Popover>
//         </div>
//         <div>
//           <Select
//             // onValueChange={(value) => handleServiceNameChange(value, index)}
//             onValueChange={(value) => {
//               const selectedStatus = invoiceStatus.find(
//                 (status) => status.value === value
//               );
//               setSelectedInvoiceStatus(selectedStatus); // Store the selected item in state
//             }}
//           >
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 {invoiceStatus?.map((item, index) => {
//                   return (
//                     <SelectItem
//                       key={index}
//                       value={item.value} // Set value as item.value
//                     >
//                       {item.label}
//                     </SelectItem>
//                   );
//                 })}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>
//       <div>
//         <Button onClick={onAddCount}>+</Button>
//         {addCount > 1 && <Button onClick={onRemoveCount}>-</Button>}
//         {[...Array(addCount)].map((_, index) => {
//           return (
//             <div key={index} style={{ display: "flex", marginBottom: "10px" }}>
//               <div>
//                 <Select
//                   onValueChange={(value) =>
//                     handleServiceNameChange(value, index)
//                   }
//                 >
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue placeholder="Select a service" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       <SelectLabel>Service Type</SelectLabel>
//                       {servicesForDropDown.map((item: any) => (
//                         <SelectItem key={item.id} value={item.id}>
//                           {item.name}
//                         </SelectItem>
//                       ))}
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div
//                 className="flex items-center space-x-2"
//                 style={{ marginLeft: "10px" }}
//               >
//                 <Input
//                   onChange={(e) => onServiceDetails(e, index)}
//                   type="number"
//                   name={`services_amount${index}`}
//                   placeholder="Amount"
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <Button onClick={addInvoice}>Add</Button>
//       <LoadingComponent loading={loading} />
//     </div>
//   );
// };
