// import React from 'react'

// export const EmployeeData = () => {
//   return (
//     <div>EmployeeData</div>
//   )
// }
// import React from 'react'


import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Toastsucess, TypographyText } from "../Reuse/Reuse";
import { GetAllCustomer, useCustomerField } from "../API/CustomerApi";
import { useAuthContext } from "../Context/AuthContext";
import ThemeProvider, { useThemeContext } from "../Reuse/ThemeProvider";
import Box from "@mui/material/Box";
import { GetAllMaster, useMasterField } from "../API/MasterApi";

export const EmployeeData = () => {

  const [errors, setErrors] = useState({});

  const [employeeName, setEmployeeName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeePhone, setEmployeePhone] = useState('');
  const [employeeAddress, setEmployeeAddress] = useState('');
  const [rolles, setRolles] = useState('');
  const [monthsalary, setmonthsalary] = useState('');
  
 

  const { getuserdata } = useAuthContext();
  const { insertmaster } = useMasterField();
  const{  getmaster ,
  getMastererror,
    getMasterisLoading,
    isLoadingrefetch, } = GetAllMaster(getuserdata)
  useEffect(() => { isLoadingrefetch();}, [isLoadingrefetch])
console.log(getmaster,"isLoadingrefetch();")
  const handleentityaddress = (e) => {
    if (!e.target.value) {
      setErrors((errors) => ({
        ...errors,
        entityaddress: "Address is required",
      }));
    } else {
      setErrors((errors) => ({ ...errors, entityaddress: "" }));
    }
    setEntityaddress(e.target.value);
  };
  const handleentityname = (e) => {
    if (!e.target.value) {
      setErrors((errors) => ({ ...errors, entityName: "Name is required" }));
    } else {
      setErrors((errors) => ({ ...errors, entityName: "" }));
    }
    setEntityName(e.target.value);
  };

  const handleenityphone = (e) => {
    if (!e.target.value) {
      setErrors((errors) => ({
        ...errors,
        entityPhone: "Phone number is required",
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        entityPhone: "",
      }));
    }
    setEntityPhone(e.target.value);
  };

  const handleinsertcustomer = async () => {
    if (!entityName || !entityPhone || !entityaddress) {
      Toastsucess("Please fill Customer Details");
      return;
    }
    try {
      console.log(getuserdata, "getuserdata");
      const formData = new FormData();
      formData.append("entityName", entityName);
      formData.append("entityAddress", entityaddress);
      formData.append("entityPhone", entityPhone);

      formData.append("created_by", "admin");

      const response = await insertmaster(formData);

      Toastsucess(response.message, "success", "light");
      setEntityName("");
      setEntityPhone("");
      setEntityaddress("");

      return response;
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  const Customer = [
    {
      txt: "Name",
      type: "text",
      value: entityName,
      onChange: handleentityname,
      errorKey: "entityName", // Key for error state
    },
    {
      txt: "Entity Address",
      value: entityaddress,
      type: "text",
      onChange: handleentityaddress,
      errorKey: "entityaddress",
    },
    {
      txt: "Phone",
      value: entityPhone,
      type: "text",
      onChange: handleenityphone,
      errorKey: "customerphone", // Key for error state
    },
  ];

  const { mode } = useThemeContext(); // Get the theme mode
  const theme = useTheme(); // Access the current theme
  console.log("Background:", theme.palette.background.default);
  console.log("Text Primary:", theme.palette.text.primary);
  console.log("Button Main:", theme.palette.button?.main);
  return (
    <React.Fragment>
      <Grid container spacing={2} sx={{ p: "3%" }}>
        <Grid item xs={12}>
          <TypographyText
            Typography={"Add New Employee"}
            fontSize="1.5rem"
            fontWeight="600"
          />
        </Grid>
        {Customer.map((data, index) => (
          <Grid item lg={6} xs={12} md={6} sm={6} key={index}>
            <TypographyText
              Typography={data.txt}
              textAlign="left"
              fontSize=".8rem"
            />

            <input
              type={data.type}
              value={data.value}
              onChange={data.onChange}
              required
              style={{
                height: "35px",
                width: "100%",
                border: ".5px solid",
                borderRadius: "5px",
              }}
            />
            {errors[data.errorKey] && ( // Access error using errorKey
              <TypographyText
                Typography={errors[data.errorKey]} // Use error key to get the error message
                color="red"
                textAlign="left"
                textTransform="lowercase"
              />
            )}
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              textAlign: "left",
              minWidth: "240px",
              textTransform: "capitalize",
              margin: "auto",
              backgroundColor:
                mode === "light"
                  ? theme.palette.button?.main
                  : theme.palette.button?.main, // primary color
            }}
            onClick={handleinsertcustomer}
          >
            Add
          </Button>
        </Grid>
      </Grid>

       <TableContainer component={Paper} style={{ overflow: 'auto' }}>
          <Table aria-label="caption table">
            <TableHead>
              <TableRow>
                {EmployeeDetails.map((data, index) => (
                  <TableCell className="shadow-checkoutCardheading" key={index}
                  sx={{width:'100px'}}>
                    {data.txt}
                  </TableCell>
                ))}{" "}
              </TableRow>
            </TableHead>
          <TableBody>
 
              {getmaster?.map((data,index) => (
                <TableRow key={data.product_id} >
                  <TableCell component="th" scope="row">
                    {index + 1 }
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.entityName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.entityPhone}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.entityAddress}
                  </TableCell>
             
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> 
    </React.Fragment>
  );
};
const EmployeeDetails = [
  {
    txt: "Id",
  },
  { txt: "Name" },
  { txt: "Contact" },
  { txt: "Address" },

];

