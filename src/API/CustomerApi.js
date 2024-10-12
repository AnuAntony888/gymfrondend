import { useMutation } from "react-query";
import { API_URL } from "./UserAPI";
import axios from "axios";

export function useCustomerField( getuserdata) {
    const customerForm = async (formData) => {
      const res = await axios.post(`${API_URL}/customer/createCustomer`, formData, {
        method: "POST",
  
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        //   Authorization: `Bearer ${getuserdata.token}`,
        },
      });
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
    return {     InserCustomer,
      InserCustomererror,
   InserCustomerisLoading, };
  }
  