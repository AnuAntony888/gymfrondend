import { API_URL } from "./UserAPI";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

export function useMasterField() {
  const mastForm = async (formData) => {
    const resposnse = await axios.post(
      `${API_URL}/master/createmaster`,
      formData,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    return resposnse.data;
  };

  const {
    mutateAsync: insertmaster,
    error: mastererror,
    isLoading: masterisLoading,
  } = useMutation(mastForm, {
    onSuccess: (data) => {},
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  return { insertmaster, masterisLoading, mastererror };
}


export function GetAllMaster(getuserdata) {
  const  getMasterdata = async () => {
    const response = await axios.get(`${API_URL}/master/getAllMaster`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getuserdata.token}`, // Add the Bearer token here
        },
        }
  
    );
    return response.data;
  
  }
  const {
    data: getmaster ,
    error: getMastererror,
    isLoading: getMasterisLoading,
    refetch: isLoadingrefetch,
  } = useQuery("getMasterdata", getMasterdata);
return{getmaster,getMastererror,isLoadingrefetch}
}