import { useMutation,useQuery} from "react-query";
import { API_URL } from "./UserAPI";
import axios from "axios";

export function useCustomerField(getuserdata) {
  const customerForm = async (formData) => {
    const res = await axios.post(
      `${API_URL}/customer/createCustomer`,
      formData,
      {
        method: "POST",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
          //   Authorization: `Bearer ${getuserdata.token}`,
        },
      }
    );
    // console.log(res, "response of profile");
    return res.data;
  };

  const {
    mutateAsync: InserCustomer,
    error: InserCustomererror,
    isLoading: InserCustomerisLoading,
  } = useMutation(customerForm, {
    onSuccess: (data) => {},
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { InserCustomer, InserCustomererror, InserCustomerisLoading };
}

export function GetAllCustomer(getuserdata) {
  const getcustomerdata = async () => {
    // console.log(getuserdata, "getuserdata");
    const res = await axios.get(`${API_URL}/customer/getCustomer`, {
      headers: {
        Authorization: `Bearer ${getuserdata.token}`, // Add the Bearer token here
      },
    });
    return res.data;
  };
  const {
    data: getcustomer,
    error: getcustomerererror,
    isLoading: getcustomerisLoading,
    refetch: isLoadingrefetch,
  } = useQuery("getcustomerdata", getcustomerdata);
  return {
    getcustomer,
    getcustomerererror,
    getcustomerisLoading,
    isLoadingrefetch,
  };
}
