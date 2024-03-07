import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useState } from "react";
import { SidebarContext } from "../global/SidebarContext";
import { useContext } from "react";
import { DarkContext } from "../global/DarkBar";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../apiConfig";
import { toast,ToastContainer} from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { pdfContext } from "../../Context/pdfcontext";

const CreateAdmin = () => {
  const { isDark } = useContext(DarkContext);
  const{pdfData,setPdfData}=useContext(pdfContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [type, setType] = React.useState("");
  const { isCollapsed } = useContext(SidebarContext);
  const [showPassword, setShowPassword] = useState(false);

 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };
  const isPasswordStrong = (value) => {
    // Define your password strength criteria here
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasDigitOrSpecialChar = /[\d!@#$%^&*()_+[\]{};':"\\|,.<>?/~`-]/.test(value);

    return (
      value.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasDigitOrSpecialChar
    );
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      
      const response = await fetch(`${BASE_URL}InsertAdminDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          alternative_Email: data.alternative_email,
          password: data.password,
          Phone_Number: data.phone_Number,
          admin_SubAdmin: data.adminType,
          isActive: 1,
          alterNate_Phone_Number:data.alterNate_Phone_Number
        }),
      });
       const responseData = await response.json();
       console.log("res",responseData);
      // console.log(responseData, "rfe");

      if (responseData?.statusCode === 200) {
        toast.success(responseData.message);
        console.log("API Response:", response);
      } else {
        console.log("error occurs");
      }

      reset();
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <Box
      m="20px"
      sx={{
        marginLeft: isCollapsed ? "100px" : "300px",
        transition: "margin-left 0.3s",
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Header title="Create Admin" subtitle="Create a New Admin" />
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Full Name"
            name="fullName"
            sx={{ gridColumn: "span 2" }}
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("fullName", {
              required: "Name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/, 
                message: "Only alphabetical characters are allowed",
              },
            })}
            error={Boolean(errors.fullName)}
            helperText={
              <span style={{position:'absolute',fontSize:'14px',marginLeft:'-10px'}}>{errors.fullName?.message}</span>
            }
          />

          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Email"
            name="email"
            sx={{ gridColumn: "span 2" }}
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
            error={Boolean(errors.email)}
            helperText={
              <span style={{position:'absolute',fontSize:'14px',marginLeft:'-10px'}}>{errors.email?.message}</span>
            }
          />
          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Alternate Email"
            name="alternate_email"
            sx={{ gridColumn: "span 2" }}
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("alternative_email", {
              required: "Alternative email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
            error={Boolean(errors.alternative_email)}
            helperText={
              <span style={{position:'absolute',fontSize:'14px',marginLeft:'-10px'}}>{errors.alternative_email?.message}</span>
            }
          />
          <TextField
            fullWidth
            variant="filled"
            type={showPassword ? "text" : "password"}
            label="Password"
            name="password"
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            sx={{ gridColumn: "span 2" }}
           
            {...register("password", {
              required: "Password is required",
              validate: (value) => isPasswordStrong(value) || "Password is not strong enough",
            })}
            error={Boolean(errors.password)}
            helperText={<span style={{position:'absolute',fontSize:'14px',marginLeft:'-10px'}}>{errors.password?.message}</span>}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Phone Number"
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            inputProps={{
              min:"0"
            }}  
            sx={{ gridColumn: "span 2" }}
            {...register("phone_Number", {
              required: "Phone_Number is required",
              pattern: {
                value: /^(\+91-|\+91|0)?\d{10}$/, // Indian phone number regex
                message: "Enter a valid Indian phone number",
              },
          
            })}
            error={Boolean(errors.phone_Number)}
            helperText={
              <span style={{position:'absolute',fontSize:'14px',marginLeft:'-10px'}}>{errors.phone_Number?.message}</span>
            }
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Alternate Phone Number"
            name="alternate phone number"
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            inputProps={{
              min:0,
            }}
            sx={{ gridColumn: "span 2" }}
            {...register("alterNate_Phone_Number", {
              required: "Alternate phone number is required",
              pattern: {
                value: /^(\+91-|\+91|0)?\d{10}$/, // Indian phone number regex
                message: "Enter a valid Indian phone number",
              },
          
            })}
            error={Boolean(errors.alterNate_Phone_Number)}
            helperText={
              <span style={{position:'absolute',fontSize:'14px',marginLeft:'-10px'}}>{errors.alterNate_Phone_Number?.message}</span>
            }
          />
          <Box sx={{ gridColumn: "span 2" }}>
            <FormControl variant="filled" fullWidth>
              <InputLabel
                id="demo-simple-select-filled-label"
                style={{ color: isDark ? "black" : "white" }}
              >
                Admin Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Admin Type"
                type="select"
                name="adminType"
                {...register("adminType", {
                  required: "Admin Type is required",
                })}
                error={Boolean(errors.adminType)}
                helperText={
                  <span style={{position:'absolute',fontSize:'14px',marginLeft:'-10px'}}>{errors.adminType?.message}</span>
                }
              >
                <MenuItem value="subAdmin">SubAdmin</MenuItem>
                <MenuItem value="superAdmin">SuperAdmin</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" mt="20px">
          <Button type="submit" color="secondary" variant="contained" size="large">
            Create New Admin
          </Button>
         
        </Box>
      </form><ToastContainer position="top-center"/>
    </Box>
  );
};

export default CreateAdmin;
