import {
  Box,
  Button,
  Modal,
  TextField,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { SidebarContext } from "../global/SidebarContext";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "../../apiConfig";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import EmailIcon from "@mui/icons-material/Email";
import { EmailSharp } from "@mui/icons-material";
import EditModal from "../../components/Modal/EditModal";
import SendEmailModal from "../../components/Modal/SendEmailModal";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from '@mui/material/Skeleton';


const fetchData = async () => {
  const response = await fetch(`${BASE_URL}GetallMerchant`);
  const result = await response.json();
  const rowsWithIds = result?.data.map((row) => ({ ...row, id: uuidv4() }));
  return rowsWithIds;
};
const Contacts = () => {
  const [merchantData, setMerchantData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRow, setSelectedRow] = useState(null);
  const { isCollapsed } = useContext(SidebarContext);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [formId, setFormId] = useState([]);
  const [emailRow, setEmailRow] = useState(null);
  const {isLoading,error,data:data1}=useQuery({queryKey:["merchant"],
  queryFn:fetchData,
})
  
  const [emailData, setEmailData] = useState({
    name: "",
    email: "",
    merchantId: "",
    formId: "",
  });
  const [editData, setEditData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const handleEmailIconClick = (row) => {
    setEmailRow(row);
    setEmailModalOpen(true);
  };
  const handleCloseEmailModal = () => {
    setEmailModalOpen(false);
  };

  const columns = [
    {
      field: "merchantId",
      headerName: "Id",
      flex: 4,
      headerAlign: "center",
      align: "center",
      cellClassName: "custom-cell",
    },
    {
      field: "leagalName",
      headerName: "Leagal Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
      cellClassName: "custom-cell",
    },


    {
      field: "email",
      headerName: "Email",
      flex: 3,
      headerAlign: "center",
      align: "center",
      cellClassName: "custom-cell",
    },
   
    {
      field: "merchantType",
      headerName: "Merchant Type",
      flex: 2,
      headerAlign: "center",
      align: "center",
      cellClassName: "custom-cell",
    },
    {
      field: "caseOwner",
      headerName: "Owner ID",
      flex: 4,
      headerAlign: "center",
      align: "center",
      cellClassName: "custom-cell",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      headerAlign: "center",
      align: "center",
      cellClassName: "custom-cell",
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleEdit(params.row)}
        >
          <Button size="small" variant="contained" color="success">
            Edit
          </Button>
        </div>
      ),
    },
    {
      field: "sendEmail",
      headerName: "Sent Email",
      flex: 2,
      headerAlign: "center",
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer", textAlign: "center" }}
          onClick={() => handleEmailIconClick(params.row)}
        >
          <Button size="small" variant="contained" color="primary">
            <EmailIcon />
          </Button>
        </div>
      ),
    },
  ];
  const handleEdit = (row) => {
    setSelectedRow(row);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
  };
  const getAllFormId = async () => {
    try {
      const response = await fetch(`${BASE_URL}GetAllFormData`);
      const result = await response.json();
      setFormId(result.data);
      console.log("result", result.data);
    } catch (error) {
      console.log("error", error);
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
      <Header title="Merchant List" subtitle="List of Merchants" />
      {/* {isLoading && <Skeleton variant="rectangular" style={{width:'100px',height:'100px',borderRadius:'50%',textAlign:'center'}}/>} */}
      {isLoading &&   <CircularProgress color="secondary"style={{marginLeft:'45%',marginTop:'200px'}}  />}

      {data1 &&(
             <Box
             m="40px 0 0 0"
             height="75vh"
             sx={{
               "& .MuiDataGrid-root": {
                 border: "none",
                 overflowX: "auto",
               },
               "& .MuiDataGrid-cell": {
                 borderBottom: "none",
               },
               "& .name-column--cell": {
                 color: colors.greenAccent[300],
               },
               "& .MuiDataGrid-columnHeaders": {
                 backgroundColor: colors.blueAccent[700],
                 borderBottom: "none",
               },
               "& .MuiDataGrid-virtualScroller": {
                 backgroundColor: colors.primary[400],
               },
               "& .MuiDataGrid-footerContainer": {
                 borderTop: "none",
                 backgroundColor: colors.blueAccent[700],
               },
               "& .MuiCheckbox-root": {
                 color: `${colors.greenAccent[200]} !important`,
               },
               "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                 color: `${colors.grey[100]} !important`,
               },
               "& .custom-cell": {
                 textAlign: "center",
               },
               "& .MuiDataGrid-columnHeaderTitle": {
                 fontSize: "15px",
               },
             }}
           >
             <DataGrid
               rows={data1}
               columns={columns}
               components={{ Toolbar: GridToolbar }}
               align="center"
             />
           </Box>
      )}
      
      <EditModal
        selectedItem={selectedRow}
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
        handleCloseModal={handleCloseModal}
      />
      <SendEmailModal
        rowData={emailRow}
        emailModalOpen={emailModalOpen}
        handleCloseEmailModal={handleCloseEmailModal}
        setEmailModalOpen={setEditModalOpen}
      />
    </Box>
  );
};

export default Contacts;