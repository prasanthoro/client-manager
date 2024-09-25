import { useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react"; // Import the X icon
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const ClientDropDown = ({
  open,
  setOpen,
  clientNameForDropDown,
  clientName,
  setClientName,
  onSelectClient
}: any) => {

  const handleClearClient = (e: any) => {
    e.stopPropagation();
    setClientName(null);
    onSelectClient(null);
  };

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
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
                        onSelectClient(client);
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
    </div>
  );
};
export default ClientDropDown;
