import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { Toastsucess, TypographyText } from '../Reuse/Reuse';
import { useCustomerField } from '../API/CustomerApi';
import { useAuthContext } from '../Context/AuthContext';
import ThemeProvider, { useThemeContext } from '../Reuse/ThemeProvider';

export const Users = () => {
  const [errors, setErrors] = useState({});
  const [customername, setCustomername] = useState('');
  const [customeremail, setCustomeremail] = useState('');
  const [customerphone, setCustomerphone] = useState('');
  const [customeraddress, setCustomeraddress] = useState('');
  const [customerstatus, setCustomerstatus] = useState('');
  const { getuserdata } = useAuthContext();
  const { InserCustomer } = useCustomerField();

  const handlecustomername = (e) => {
    if (!e.target.value) {
      setErrors((errors) => ({ ...errors, customername: 'Name is required' }));
    } else {
      setErrors((errors) => ({ ...errors, customername: '' }));
    }
    setCustomername(e.target.value);
  };

  const handlecustomeremail = (e) => {
    const value = e.target.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    let errorMsg = '';
    if (!value) {
      errorMsg = 'Email is required';
    } else if (!regex.test(value)) {
      errorMsg = 'Invalid email address';
    }
    setErrors((errors) => ({ ...errors, customeremail: errorMsg }));
    setCustomeremail(value);
  };

  const handlecustomerphone = (e) => {
    if (!e.target.value) {
      setErrors((errors) => ({
        ...errors, customerphone: 'Phone number is required'
      }));
    } else {
      setErrors((errors) => ({
        ...errors, customerphone: ''
      }));
    }
    setCustomerphone(e.target.value);
  };

  const handlecustomeraddress = (e) => {
    if (!e.target.value) {
      setErrors((errors) => ({
        ...errors, customeraddress: 'Address is required'
      }));
    } else {
      setErrors((errors) => ({
        ...errors, customeraddress: ''
      }));
    }
    setCustomeraddress(e.target.value);
  };

  const handlecustomerstatus = (e) => {
    setCustomerstatus(e.target.value);
  };

  const handleinsertcustomer = async () => {
    if (
      !customername ||
      !customeremail ||
      !customerphone ||
      !customeraddress ||
      !customerstatus
    ) {
      Toastsucess("Please fill Customer Details");
      return;
    }
    try {
      console.log(getuserdata, "getuserdata");
      const formData = new FormData();
      formData.append("customerName", customername);
      formData.append("customerEmail", customeremail);
      formData.append("customerContactNo", customerphone);
      formData.append("customerAddress", customeraddress);
      formData.append("customerOption", customerstatus);
      formData.append("created_by", "admin");
      formData.append("user_id", getuserdata?.userId);

      const response = await InserCustomer(formData);
      Toastsucess(response.message, "success", "light");
      setCustomername("");
      setCustomeremail("");
      setCustomerphone("");
      setCustomeraddress("");
      setCustomerstatus("");

      return response;
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  const Customer = [
    {
      txt: "Name",
      type: "text",
      value: customername,
      onChange: handlecustomername,
      errorKey: 'customername' // Key for error state
    },
    {
      txt: "Email",
      value: customeremail,
      type: "email",
      onChange: handlecustomeremail,
      errorKey: 'customeremail' // Key for error state
    },
    {
      txt: "Phone",
      value: customerphone,
      type: "text",
      onChange: handlecustomerphone,
      errorKey: 'customerphone' // Key for error state
    },
    {
      txt: "Address",
      value: customeraddress,
      type: "text",
      onChange: handlecustomeraddress,
      errorKey: 'customeraddress' // Key for error state
    }
  ];

  const { mode } = useThemeContext(); // Get the theme mode
  const theme = useTheme(); // Access the current theme 
  console.log('Background:', theme.palette.background.default);
  console.log('Text Primary:', theme.palette.text.primary);
  console.log('Button Main:', theme.palette.button?.main);
  return (
    <Grid container spacing={2} sx={{ p: '3%' }}>
      <Grid item xs={12}>
        <TypographyText
          Typography={"Add New Member"}
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
              borderRadius:'5px'
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
        <FormControl component="fieldset">
        <TypographyText
            Typography={'Option'}
            textAlign="left"
            fontSize=".8rem"
          />
          {/* <FormLabel component="legend">Status</FormLabel> */}
          <RadioGroup
            row
            value={customerstatus}
            onChange={handlecustomerstatus}
          >
            <FormControlLabel value="self" control={<Radio />} label="Self Training" />
            <FormControlLabel value="personal" control={<Radio />} label="Personal Trainer" />
          </RadioGroup>
          {errors.customerstatus && (
            <TypographyText
              Typography={errors.customerstatus}
              color="red"
              textAlign="left"
              textTransform="lowercase"
            />
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          type="submit"
          sx={{
            textAlign: "left",
            minWidth: '240px',
            textTransform: "capitalize",
            margin: "auto",
            backgroundColor: mode === 'light'?theme.palette.button?.main:theme.palette.button?.main, // primary color
        
          }}
          onClick={handleinsertcustomer}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
};
