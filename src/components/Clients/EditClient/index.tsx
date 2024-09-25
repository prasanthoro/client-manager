"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddClient from "../AddClient";
import { viewClientAPI } from "@/services/clients";

const EditClient = () => {
  const { client_id } = useParams();
  const [editClientData, setEditClientData] = useState<any>({});

  const getClientById = async () => {
    try {
      const response = await viewClientAPI(client_id as string);
      if (response?.status == 200 || response?.status == 201) {
        setEditClientData(response?.data);
      } else {
        throw response;
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
      console.error(err);
    }
  };
  useEffect(() => {
    getClientById();
  }, []);
  //   return <AddClient clientEditData={clientData} />;
};

export default EditClient;
