"use client";
import DatePickerWithRange from "@/components/core/DatePickerWithRange";
import { LoadingComponent } from "@/components/core/LoadingComponent";
import SelectServiceDropDown from "@/components/core/SelectServiceDropDown";
import { DownloadButton } from "@/components/Invoices/DownloadButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatInvoiceDate } from "@/lib/helpers/constants";
import { changeInputFormats } from "@/lib/helpers/core/changeFirstLetterToCap";
import { invoicesListPropTypes } from "@/lib/interfaces/invoicesInterfaces";
import { prepareURLEncodedParams } from "@/lib/prepareUrlEncodedParams";
import { viewClientAPI, viewInvoiceAPI } from "@/services/clients";
import { selectServiceDropDownAPI } from "@/services/invoices";
import dayjs from "dayjs";
import Image from "next/image";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { selectTypes } from "@/lib/constants/selectType";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { status } from "@/lib/constants/selectStatus";

const ViewClient = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { client_Id } = useParams();
  const [clientData, setClientData] = useState<any>();
  const [invoiceData, setInvoiceData] = useState<any>([]);
  const [servicesForDropDown, setServicesForDropDown] = useState<any>([]);
  const [serviceName, setServiceName] = useState<any>({});
  const [openService, setOpenService] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typeopen, setTypeOpen] = useState(false);
  const [statusopen, setStatusOpen] = useState(false);
  const [selectStatus, setSelectStatus] = useState<any>(
    params.get("status") ? params.get("status") : ""
  );
  const [selectType, setSelectType] = useState<any>(
    params.get("type") ? params.get("type") : ""
  );

  const getSingleClientView = async () => {
    try {
      setLoading(true);
      const response = await viewClientAPI(client_Id);
      if (response?.status == 200 || response?.status == 201) {
        let { data } = response?.data;
        setClientData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const ViewInvoiceList = async ({
    from_date = params.get("from_date") as string,
    to_date = params.get("to_date") as string,
    status = params.get("status") as string,
    service_id = params.get("service_id") as string,
    type = params.get("type") as string,
  }: Partial<invoicesListPropTypes>) => {
    try {
      let queryParams: any = {
        from_date: from_date,
        to_date: to_date,
        status: status,
        service_id: service_id,
        type: type,
      };
      setLoading(true);
      let queryString: any = prepareURLEncodedParams("", queryParams);

      router.push(`${pathname}${queryString}`);
      const response = await viewInvoiceAPI(client_Id, queryParams);
      if (response?.status == 200 || response?.status == 201) {
        let { data } = response?.data;
        setInvoiceData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const servicesDropDown = async () => {
    // setLoading(true);
    try {
      const reponse = await selectServiceDropDownAPI(client_Id as string);
      if (reponse?.status == 200 || reponse?.status == 201) {
        setServicesForDropDown(reponse?.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  const onDataChange = (date: any) => {
    if (date) {
      let fromDate = dayjs(date[0]).format("YYYY-MM-DD");
      let toDate = dayjs(date[1]).format("YYYY-MM-DD");

      ViewInvoiceList({ from_date: fromDate, to_date: toDate });
    } else {
      ViewInvoiceList({ from_date: "", to_date: "" });
    }
  };

  const onChangeStatus = (value: string) => {
    setSelectStatus(value);
    if (value) {
      ViewInvoiceList({ status: value });
    } else {
      ViewInvoiceList({ status: "" });
    }
  };

  const onChangeType = (value: string) => {
    setSelectType(value);
    if (value) {
      ViewInvoiceList({ type: value });
    } else {
      ViewInvoiceList({ type: "" });
    }
  };

  const onSelectService = (value: any) => {
    if (value) {
      ViewInvoiceList({ service_id: value?.id });
    } else {
      ViewInvoiceList({ service_id: "" });
      setServiceName(null);
    }
  };

  useEffect(() => {
    const serviceId = params.get("service_id");
    if (serviceId) {
      const matchedService = servicesForDropDown.find(
        (service: any) => service.id == serviceId
      );
      if (matchedService) {
        setServiceName(matchedService);
      }
    }
  }, [params, servicesForDropDown, setServiceName]);
  const formattedAddress =
    changeInputFormats(
      [
        clientData?.address,
        clientData?.city,
        clientData?.state,
        clientData?.country,
      ]
        .filter(Boolean)
        .join(", ")
    ) || "--";

  useEffect(() => {
    getSingleClientView();
    ViewInvoiceList({});
    servicesDropDown();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={() => router.push('/clients')}
            className="p-2 -full hover:bg-pink-200"
          >
            <Image alt="image" width={24} height={24} src="/back-button.svg" />
          </button>
          <h1 className="text-2xl font-bold text-red-600 ml-2">
            Client Information
          </h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-blue-800"></CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-4 text-gray-600">
          <div className="grid grid-cols-4 gap-4 text-gray-600">
            <div className="flex flex-col">
              <span className="font-bold">Company Name </span>
              <span>
                {changeInputFormats(clientData?.company_name)
                  ? changeInputFormats(clientData?.company_name)
                  : "--"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Name </span>
              <span>
                {changeInputFormats(clientData?.client_name)
                  ? changeInputFormats(clientData?.client_name)
                  : "--"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold"> Poc </span>
              <span>
                {changeInputFormats(clientData?.poc)
                  ? changeInputFormats(clientData?.poc)
                  : "--"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Email </span>
              <span>
                {changeInputFormats(clientData?.email)
                  ? changeInputFormats(clientData?.email)
                  : "--"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Phone </span>
              <span>{clientData?.phone ? clientData?.phone : "--"}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Address</span>

              <span>{formattedAddress}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4">
        <Card>
          <CardHeader></CardHeader>
          <CardContent className="grid grid-cols-3 gap-4 text-gray-600">
            <div className="grid grid-cols-3 gap-4 text-gray-600">
              <div className="flex flex-col">
                <span className="font-bold">Remarks</span>
                <span>
                  {changeInputFormats(clientData?.remarks)
                    ? changeInputFormats(clientData?.remarks)
                    : "--"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <div className="flex justify-between my-4">
          <h5>Client Invoices</h5>
          <div className="grid grid-cols-4 gap-2 w-[70%] ">
            <div className="w-full">
              <DatePickerWithRange onDataChange={onDataChange} />
            </div>
            <div className="w-full">
              <SelectServiceDropDown
                open={openService}
                setOpen={setOpenService}
                servicesForDropDown={servicesForDropDown}
                serviceName={serviceName}
                setServiceName={setServiceName}
                onSelectService={onSelectService}
              />
            </div>
            <div>
              <Popover open={typeopen} onOpenChange={setTypeOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={typeopen}
                    className="w-[200px] justify-between bg-white-700"
                  >
                    {selectType
                      ? selectTypes.find((type) => type.value === selectType)
                          ?.label
                      : "Select Type"}
                    <div className="flex">
                      {selectType && (
                        <X
                          className="mr-2 h-4 w-4 shrink-0 opacity-50"
                          onClick={(e: any) => {
                            e.stopPropagation();
                            onChangeType("");
                            setTypeOpen(false);
                          }}
                        />
                      )}
                      <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <div className="max-h-[300px] overflow-y-auto">
                    {selectTypes?.map((type) => (
                      <Button
                        key={type.value}
                        onClick={() => {
                          onChangeType(type.value);
                          setTypeOpen(false);
                        }}
                        className="w-full justify-start font-normal bg-white text-violet-600 border border-indigo-600 capitalize mb-2 hover:bg-violet-600  hover:text-white "
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectType === type.value
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
            <div>
              <Popover open={statusopen} onOpenChange={setStatusOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={statusopen}
                    className="w-[200px] justify-between bg-white-700"
                  >
                    {selectStatus
                      ? status.find((type) => type.value === selectStatus)
                          ?.label
                      : "Select Status"}
                    <div className="flex">
                      {selectStatus && (
                        <X
                          className="mr-2 h-4 w-4 shrink-0 opacity-50"
                          onClick={(e: any) => {
                            e.stopPropagation();
                            onChangeStatus("");
                            setStatusOpen(false);
                          }}
                        />
                      )}
                      <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <div className="max-h-[300px] overflow-y-auto">
                    {status?.map((type) => (
                      <Button
                        key={type.value}
                        onClick={() => {
                          onChangeStatus(type.value);
                          setStatusOpen(false);
                        }}
                        className="w-full justify-start font-normal bg-white text-violet-600 border border-indigo-600 capitalize mb-2 hover:bg-violet-600  hover:text-white "
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectStatus === type.value
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
          </div>
        </div>
        <div id="clientWiseTable" className="relative">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Invoice Date</TableCell>
                <TableCell>Service Name</TableCell>
                <TableCell>Service Type</TableCell>
                <TableCell>Invoice Status</TableCell>
                <TableCell>Invoice Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceData.length > 0 ? (
                invoiceData.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {formatInvoiceDate(item.invoice_date)
                        ? formatInvoiceDate(item.invoice_date)
                        : "--"}
                    </TableCell>
                    <TableCell>
                      {item.service_name ? item.service_name : "--"}
                    </TableCell>
                    <TableCell>{item.type ? item.type : "--"}</TableCell>

                    <TableCell>
                      {item.invoice_status ? item.invoice_status : "--"}
                    </TableCell>
                    <TableCell>
                      {item.invoice_amount
                        ? `₹ ${Number(item.invoice_amount).toLocaleString(
                            "en-IN"
                          )}`
                        : "--"}
                    </TableCell>
                    <TableCell>
                      {item?.url ? (
                        <li
                          className="eachList"
                          style={{ marginRight: "10px", cursor: "pointer" }}
                        >
                          <DownloadButton download={item?.url} />
                        </li>
                      ) : (
                        "--"
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} style={{ textAlign: "center" }}>
                    No Invoices
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <LoadingComponent loading={loading} label={""} />
    </div>
  );
};
export default ViewClient;
