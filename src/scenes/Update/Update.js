import { Box, Button, TextField, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { SidebarContext } from "../global/SidebarContext";
import { useContext, useState } from "react";
import { DarkContext } from "../global/DarkBar";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../apiConfig";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";

const Update = () => { 
  const storedUserId = sessionStorage.getItem("userId");
  console.log("userid",storedUserId)
  const[alternativeEmail,setAlternativeEmail]=useState({
    new_AlterNateEmail:'',
    old_AlterNateEmail:''
  })
  const[phoneDetails,setPhoneDetails]=useState({
    old_Phone_Number:'',
    new_Phone_Number:''
  })
  const handleAlternativeEmailChange = (e) => {
    setAlternativeEmail({
      ...alternativeEmail,
      [e.target.name]: e.target.value,
    });
  };
  const handlePhoneChange=(e)=>{
    e.preventDefault();
    setPhoneDetails({
      ...phoneDetails,[e.target.name]:e.target.value
    })
  }


  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm(); 



  const onSubmit = async(data) => {
    if(data.old_Email===data.new_Email){
      console.log("Pm");
      toast.error("old and new Email must not be same");
      reset();

      return;

    }
   

    try{
      const response=await axios.post(`${BASE_URL}ChangeEmailByAdminId`,data,{
              headers:{
                "Content-Type":"application/json",
              },
              params:{
                AdminId:storedUserId
              }
      }
      );
      
      if(response?.status===200){
        const responseData=await response?.data;
        console.log("responseData",responseData)
        toast.success(responseData.message)
      }else{
        console.log("error occurs")
      } 
      reset();
    }catch(error){
      console.log("error",error);
    }
  
    
  }; 
const handle=async(e)=>{
  e.preventDefault();
  // if(alternativeEmail.new_AlterNateEmail==='' || alternativeEmail.old_AlterNateEmail===''){
  //   toast.error("Enter valid email address");
  //   return
  // }
 
  if(alternativeEmail.new_AlterNateEmail===''|| alternativeEmail.old_AlterNateEmail==='' ){
    toast.error("Enter valid email address");
    return;
  }
  if(alternativeEmail.new_AlterNateEmail==alternativeEmail.old_AlterNateEmail){
    toast.error("Both email can not be same")
    console.log("Hello");
    return;
  }
  console.log("aa",alternativeEmail); 

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    if (!emailRegex.test(alternativeEmail.old_AlterNateEmail)) {
      toast.warning("Enter a valid format for the old alternate email");
      return;
    }

    if (!emailRegex.test(alternativeEmail.new_AlterNateEmail)) {
      toast.warning("Enter a valid format for the new alternate email");
      return;
    }

    try{
    const response=await axios.post(`${BASE_URL}ChangeAlterNateEmailByAdminId`,alternativeEmail,{
            headers:{
              "Content-Type":"application/json",
            },
            params:{
              AdminId:storedUserId
            }
    }
    );
    const responseData=await response?.data;
    console.log(responseData,"data");

    if(responseData?.statusCode===200){
      toast.success(responseData.message)
      setAlternativeEmail({
        new_AlterNateEmail: '',
        old_AlterNateEmail: '',
      });
    }else{ 
      console.log("error occurs")
    } 
    
  }catch(error){
    console.log("error",error);
  }
  
  
  console.log(alternativeEmail);
}
const handlePhone=async(e)=>{
  e.preventDefault();
  console.log(phoneDetails)
  if(phoneDetails.old_Phone_Number==='' || phoneDetails.new_Phone_Number===''){
    toast.warning("Enter valid phone number");
    return
  }
  if(phoneDetails.old_Phone_Number===phoneDetails.new_Phone_Number){
    toast.warning("Number can not be same")
    return;
  }
  const isValidIndianPhoneNumber = /^(\+91-|\+91|0)?\d{10}$/.test(
    phoneDetails.old_Phone_Number
  ) && /^(\+91-|\+91|0)?\d{10}$/.test(phoneDetails.new_Phone_Number);

  if (!isValidIndianPhoneNumber) {
    toast.warning("Enter valid Indian phone numbers");
    return;
  }

  try{
    const response=await axios.post(`${BASE_URL}ChangePhoneNumberByAdminId`,phoneDetails,{
            headers:{
              "Content-Type":"application/json",
            },
            params:{
              AdminId:storedUserId
            }
    }
    );
    
    if(response?.status===200){
      const responseData=await response?.data;
      console.log("responseData",responseData)
      toast.success(responseData.message)
      setPhoneDetails({
        old_Phone_Number:'',
        new_Phone_Number:'',
      });
    }else{
      const responst=await response.json();
      console.log("responst",responst)
      toast.error(responst.message)
      console.log("error occurs")
    } 
   
    
  }catch(error){
    console.log("error",error);
  }
}

  const { isDark } = useContext(DarkContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { isCollapsed } = useContext(SidebarContext);

  
  return (
    <Box
      m="20px"
      sx={{
        marginLeft: isCollapsed ? "100px" : "300px",
        transition: "margin-left 0.3s",
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Header title="Edit Admin Data" />
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
            type="email"
            label="Old Email"
            name="old_Email"
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("old_Email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
            error={Boolean(errors.old_Email)}
            helperText={
              <span style={{position:"absolute",fontSize:'14px',marginLeft:'-10px'}}>{errors.old_Email?.message}</span>
            }
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="New Email Address"
            name="new_Email"
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            {...register("new_Email", {
              required: "New_email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
            error={Boolean(errors.new_Email)}
            helperText={
              <span style={{position:'absolute',fontSize:'14px',marginLeft:'-10px'}}>{errors.new_Email?.message}</span>
            }
            sx={{ gridColumn: "span 2" }}
          />
        </Box>
        <Box display="flex" justifyContent="start" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Update Email Address
          </Button>
        </Box>
      </form>
      <form onSubmit={handle} style={{ marginTop: "12px" }}>
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
            type="email"
            label="Alternative Old Email"
            name="old_AlterNateEmail"
            value={alternativeEmail.old_AlterNateEmail}

            onChange={handleAlternativeEmailChange}
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
             
            sx={{ gridColumn: "span 2" }}
          
           
          />
          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Alternative New Email Address"
            name="new_AlterNateEmail"
            onChange={handleAlternativeEmailChange}
            value={alternativeEmail.new_AlterNateEmail}
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            
            sx={{ gridColumn: "span 2" }}
           
           

          />
        </Box>
        <Box display="flex" justifyContent="flex-start" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Update Alternative Email
          </Button>
        </Box>
      </form>
      <form onSubmit={handlePhone} style={{ marginTop: "12px" }}>
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
            type="number"
            label="Old Phone Number"
            name="old_Phone_Number"
            value={phoneDetails.old_Phone_Number}
            onChange={handlePhoneChange}
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            inputProps={{
              min:"0"
            }}  
            sx={{ gridColumn: "span 2" }}
            
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="New Phone Number"
            name="new_Phone_Number"
            value={phoneDetails.new_Phone_Number}
            onChange={handlePhoneChange}
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            inputProps={{
              min:"0"
            }}  
            sx={{ gridColumn: "span 2" }}
          />
        </Box>
        <Box display="flex" justifyContent="start" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Update Phone Number
          </Button>
        </Box>
      </form>
      {/* <form  style={{ marginTop: "12px" }}>
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
            type="number"
            label="Alternative old Phone Number"
            name="alternativeoldcontact"
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            sx={{ gridColumn: "span 2" }}
            required
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Alternative new Phone Number"
            name="alternativenewcontact"
            sx={{ gridColumn: "span 2" }}
            InputLabelProps={{
              style: {
                color: isDark ? "black" : "white",
              },
            }}
            required
          />
        </Box>
        <Box display="flex" justifyContent="flex-start" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Update Alternative Phone
          </Button>
        </Box>
      </form> */}

      <ToastContainer position="top-center" />
    </Box>
  );
};

export default Update;
