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
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, X } from "lucide-react"; // Import the X icon

const ServiceDropDown = ({
  open,
  setOpen,
  servicesForDropDown,
  serviceName,
  setServiceName,
  onSelectService,
}: any) => {
  const handleClearService = (e: any) => {
    e.stopPropagation();
    setServiceName(null);
    onSelectService(null);
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
              className="w-full justify-between"
            >
              {serviceName?.name
                ? servicesForDropDown?.find(
                    (service: any) => service?.id === serviceName?.id
                  )?.name
                : "Select Service Name"}
              {serviceName?.name ? (
                <X
                  className="ml-2 h-4 w-4 cursor-pointer"
                  onClick={handleClearService}
                />
              ) : (
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search service Type" />
              <CommandList>
                <CommandEmpty>No services found.</CommandEmpty>
                <CommandGroup>
                  {servicesForDropDown?.map((serivce: any) => (
                    <CommandItem
                      key={serivce?.id}
                      value={serivce?.name}
                      onSelect={() => {
                        setServiceName(serivce);
                        onSelectService(serivce);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          serviceName === serivce?.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {serivce?.name}
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
export default ServiceDropDown;
