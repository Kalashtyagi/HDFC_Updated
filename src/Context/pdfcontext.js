import { createContext } from "react";
import { useState,useEffect} from "react";
export const pdfContext=createContext();
 
const PdfProvider=({children})=>{  
    const [pdfData, setPdfData] = useState(() => {
        const storedMerchantID = sessionStorage.getItem("merchantID");
        const storedFormID = sessionStorage.getItem("formID");
    
        return {
          merchantID: storedMerchantID || "",
          formID: storedFormID || ""
        };
      });
    
      useEffect(() => {
        sessionStorage.setItem("merchantID", pdfData.merchantID);
        sessionStorage.setItem("formID", pdfData.formID);
      }, [pdfData]);
    // const[pdfData,setPdfData]=useState({
    //   merchantID:'',
    //   formID:''
    // })
    return(
        <pdfContext.Provider value={{pdfData,setPdfData}}>
            {children}
        </pdfContext.Provider>
    )
}
export default PdfProvider;