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
