import React, { useState, useRef } from "react";
import { useContext, useEffect } from "react";
import { pdfContext } from "../../Context/pdfcontext";
import { BASE_URL } from "../../apiConfig";
import { Document, Page, Text, PDFViewer, PDFDownloadLink, StyleSheet, View } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./pdfStyles.css";



// const fetchData = async (pdfData, setAllData) => {
//   try {
//     const response = await fetch(`${BASE_URL}GetFormDataByFormIdAndMerchantId?formId=${pdfData.formID}&merchantId=${pdfData.merchantID}`)
//     const result = await response.json();
//     setAllData(result.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

  // const fetchImage = async (pdfData,setApiImage) => {
  //   const apiurl = `${BASE_URL}ImageUpload/GetImage?formId=${pdfData.formID}&merchantId=${pdfData.merchantID}`;

  //   try {
  //     const response = await fetch(apiurl);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     const blob = await response.blob();
  //     const imageUrl = URL.createObjectURL(blob);
  //     setApiImage(imageUrl);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    // fontFamily: 'Helvetica'
  },
  content: {
    fontSize: 12,
    textAlign: 'justify',
    // fontFamily: 'Helvetica'
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row'
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10
  },
  // Styles for header and paragraph
  header: {
    fontSize: 18,
    textAlign: 'center',
    // fontFamily: 'Helvetica',
    fontWeight: 'bold'
  },
  paragraph: {
    fontSize: 12,
    textAlign: 'justify',
    // fontFamily: 'Helvetica'
  }
});

// const MyDocument = ({allData,apiImage,isValidJson}) => ( 
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <View id="pdf-content" style={{ backgroundColor: 'white', color: 'black' }}>
//           <View>

//             <View style={{ textAlign: "right" }}>
//               <img
//                 src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                 alt="logo"
//                 style={{ width: "100px" }}
//               />
//             </View>
//             <View
//               style={{
//                 display: "flex",
//                 justifyContent: "left",
//                 marginBottom: "120px",
//                 marginLeft: "30px",
//                 marginTop: "100px",
//               }}
//             >
//               <View>
//                 <Text>
//                   Payment Card Industry (PCI) <br />
//                   Data Security Standard
//                 </Text>
//                 <Text>
//                   <span style={{ fontSize: "34px" }}>
//                     Self-Assessment Questionnaire A
//                   </span>
//                   <br />
//                   and Attestation of Compliance{" "}
//                 </Text>
//               </View>
//             </View>
//             <hr />
//             <View style={{ marginLeft: "30px", marginBottom: "110px" }}>
//               <Text>
//                 Card-not-present Merchants, <br />
//                 All Cardholder Data Functions Fully Outsourced
//               </Text>
//               <Text style={{ fontSize: "26px", marginTop: "-12px" }}>
//                 For use with PCI DSS Version 3.2.1
//               </Text>
//               <pre
//                 style={{
//                   fontSize: "20px",
//                   marginTop: "-12px",
//                   fontFamily: "Arial, Helvetica, sans-serif",
//                 }}
//               >
//                 Revision 2{"\n"}September 2022{"  "}
//                 {"\n"}
//                 {"                    "}
//               </pre>
//             </View>
//             <View id="document-changes" className="document_changes page-break">
//               <img
//                 src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                 alt="logo"
//                 style={{ width: "100px" }}
//               />
//               <Text>Document Changes</Text>
//               {/* <hr /> */}
//               <View>
//                 <View>
//                   < View>
//                     <View style={{ textAlign: "center" }}>Date</View>
//                     <View style={{ textAlign: "center" }}>PCI DSS Version</View>
//                     <View style={{ textAlign: "center" }}>SAQ Revision</View>
//                     <View style={{ textAlign: "center" }}>Description</View>
//                   </View>
//                 </View>
//                 <View>
//                   <View>
//                     <View style={{ textAlign: "center" }}>October 2008</View>
//                     <View style={{ textAlign: "center" }}>1.2</View>
//                     <View />
//                     <View>
//                       To align content with new PCI DSS v1.2 and to implement minor
//                       changes noted since original v1.1.
//                     </View>
//                   </View>
//                   <View>
//                     <View style={{ textAlign: "center" }}>October 2010</View>
//                     <View style={{ textAlign: "center" }}>2.0</View>
//                     <View />
//                     <View>
//                       To align content with new PCI DSS v2.0 requirements and
//                       testing procedures.
//                     </View>
//                   </View>
//                   <View>
//                     <View style={{ textAlign: "center" }}>February 2014</View>
//                     <View style={{ textAlign: "center" }}>3.0</View>
//                     <View />
//                     <View>
//                       To align content with PCI DSS v3.0 requirements and testing
//                       procedures and incorporate additional response options.
//                     </View>
//                   </View>
//                   <View>
//                     <View style={{ textAlign: "center" }}>April 2015</View>
//                     <View style={{ textAlign: "center" }}>3.1</View>
//                     <View />
//                     <View>
//                       Updated to align with PCI DSS v3.1. For details of PCI DSS
//                       changes, see
//                       <i>
//                         {" "}
//                         PCI DSS Summary of Changes from PCI DSS Version 3.0 to
//                         3.1.
//                       </i>
//                     </View>
//                   </View>
//                   <View>
//                     <View style={{ textAlign: "center" }}>July 2015</View>
//                     <View style={{ textAlign: "center" }}>3.1</View>
//                     <View style={{ textAlign: "center" }}>1.1</View>
//                     <View>Updated version numbering to align with other SAQs.</View>
//                   </View>
//                   <View>
//                     <View style={{ textAlign: "center" }}>April 2016</View>
//                     <View style={{ textAlign: "center" }}>3.2</View>
//                     <View style={{ textAlign: "center" }}>1.0</View>
//                     <View>
//                       Updated to align with PCI DSS v3.2. For details of PCI DSS
//                       changes, see{" "}
//                       <i>
//                         PCI DSS – Summary of Changes from PCI DSS Version 3.1 to
//                         3.2.
//                       </i>{" "}
//                       Requirements added from PCI DSS v3.2 Requirements 2, 8, and
//                       12.
//                     </View>
//                   </View>
//                   <View>
//                     <View style={{ textAlign: "center" }}>January 2017</View>
//                     <View style={{ textAlign: "center" }}>3.2</View>
//                     <View style={{ textAlign: "center" }}>1.1</View>
//                     <View>
//                       Updated Document Changes to clarify requirements added in the
//                       April 2016 update. Added note to Before You Begin section to
//                       clarify intent of inclusion of PCI DSS Requirements 2 and 8.
//                     </View>
//                   </View>
//                   <View>
//                     <View style={{ textAlign: "center" }}>June 2018</View>
//                     <View style={{ textAlign: "center" }}>3.2.1</View>
//                     <View style={{ textAlign: "center" }}>1.0</View>
//                     <View>
//                       Updated to align with PCI DSS v3.2.1. For details of PCI DSS
//                       changes, see{" "}
//                       <i>
//                         PCI DSS – Summary of Changes from PCI DSS Version 3.2 to
//                         3.2.1.
//                       </i>{" "}
//                       Added Requirement 6.2 from PCI DSS v3.2.1.
//                     </View>
//                   </View>
//                   <View>
//                     <View style={{ textAlign: "center" }}>September 2022</View>
//                     <View style={{ textAlign: "center" }}>3.2.1</View>
//                     <View style={{ textAlign: "center" }}>2.0</View>
//                     <View>
//                       Updated to reflect the inclusion of UnionPay as a
//                       Participating Payment Brand. This document aligns with PCI DSS
//                       v3.2.1 r1.
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             </View>
//             <View
//               style={{ marginTop: "80px" }}
//               className="table_of_content page-break"
//             >
//               <img
//                 src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                 alt="logo"
//                 style={{ width: "100px" }}
//               />
//               <View>
//                 <View>
//                   <View>
//                     <View>Table of Contents</View>
//                   </View>
//                 </View>
//                 <View>
//                   <View>
//                     <View>
//                       <a href="#document-changes">Document Changes</a>{" "}
//                       <span>i</span>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a href="#before-you-begin">Before You Begin</a> iii
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a href="#pci-dss-self-assessment">
//                         PCI DSS Self-Assessment Completion Steps
//                       </a>{" "}
//                       iv
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a href="#understanding-saq">
//                         Understanding the Self-Assessment Questionnaire
//                       </a>{" "}
//                       iv
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a
//                         style={{ marginLeft: "18px", color: "black" }}
//                         href="#expected-testing"
//                       >
//                         <i>Expected Testing</i>
//                       </a>{" "}
//                       iv
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a href="#completing-saq">
//                         Completing the Self-Assessment Questionnaire
//                       </a>{" "}
//                       v
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a href="#guidance-non-applicability">
//                         Guidance for Non-Applicability of Certain, Specific
//                         Requirements
//                       </a>{" "}
//                       v
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a href="#legal-exception">Legal Exception</a> v
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a href="#section-1">Section 1: Assessment Information</a> 1
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a href="#section-2">
//                         Section 2: Self-Assessment Questionnaire A
//                       </a>{" "}
//                       4
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a href="#build-maintain-network">
//                         Build and Maintain a Secure Network and Systems
//                       </a>{" "}
//                       4
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a
//                         style={{ marginLeft: "18px", color: "black" }}
//                         href="#requirement-2"
//                       >
//                         <i>
//                           Requirement 2: Do not use vendor-supplied defaults for
//                           system passwords and other security parameters
//                         </i>
//                       </a>{" "}
//                       4
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a href="#maintains">
//                         Maintain a Vulnerability Management Program
//                       </a>{" "}
//                       5
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a
//                         style={{ marginLeft: "18px", color: "black" }}
//                         href="#requirement-6"
//                       >
//                         <i>
//                           Requirement 6: Develop and maintain secure systems and
//                           applications
//                         </i>
//                       </a>{" "}
//                       5
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a href="#measure">
//                         Implement Strong Access Control Measures
//                       </a>{" "}
//                       6
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a
//                         style={{ marginLeft: "18px", color: "black" }}
//                         href="#requirement-8"
//                       >
//                         <i>
//                           Requirement 8: Identify and authenticate access to system
//                           components
//                         </i>
//                       </a>{" "}
//                       6
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a style={{ color: "black" }} href="#requirement-9">
//                         <i>
//                           Requirement 9: Restrict physical access to cardholder data
//                         </i>
//                       </a>{" "}
//                       7
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a href="#maintain">
//                         Maintain an Information Security Policy
//                       </a>{" "}
//                       9
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a
//                         style={{ marginLeft: "18px", color: "black" }}
//                         href="#requirement-12"
//                       >
//                         <i>
//                           Requirement 12: Maintain a policy that addresses
//                           information security for all personnel
//                         </i>
//                       </a>{" "}
//                       9
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a href="#appendix-a">
//                         Appendix A: Additional PCI DSS Requirements
//                       </a>{" "}
//                       11
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a
//                         style={{ marginLeft: "18px", color: "black" }}
//                         href="#appendix-a1"
//                       >
//                         <i>
//                           Appendix A1: Additional PCI DSS Requirements for Shared
//                           Hosting Providers
//                         </i>
//                       </a>{" "}
//                       11
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a
//                         style={{ marginLeft: "18px", color: "black" }}
//                         href="#appendix-a2"
//                       >
//                         <i>
//                           Appendix A2: Additional PCI DSS Requirements for Entities
//                           using SSL/early TLS for Card-Present POS POI terminal
//                           connections
//                         </i>
//                       </a>{" "}
//                       11
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a
//                         style={{ marginLeft: "18px", color: "black" }}
//                         href="#appendix-a3"
//                       >
//                         <i>
//                           Appendix A3: Designated Entities Supplemental Validation
//                           (DESV)
//                         </i>
//                       </a>{" "}
//                       11
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a href="#appendix-b">
//                         Appendix B: Compensating Controls Worksheet
//                       </a>{" "}
//                       12
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a href="#appendix-c">
//                         Appendix C: Explanation of Non-Applicability
//                       </a>{" "}
//                       13
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <a href="#section-3">
//                         Section 3: Validation and Attestation Details
//                       </a>{" "}
//                       14
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             </View>
//             <View className="before_you_begin page-break" id="before-you-begin">
//               <img
//                 src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                 alt="logo"
//                 style={{ width: "100px" }}
//               />
//               <Text style={{ marginTop: "80px" }}>Before You Begin</Text>
//               <hr />
//               <p>
//                 SAQ A has been developed to address requirements applicable to
//                 merchants whose cardholder data functions are completely outsourced
//                 to validated third parties, where the merchant retains only paper
//                 reports or receipts with cardholder data.
//               </p>
//               <p>
//                 SAQ A merchants may be either e-commerce or mail/telephone-order
//                 merchants (card-not-present), and do not store, process, or transmit
//                 any cardholder data in electronic format on their systems or
//                 premises.
//               </p>
//               <p>SAQ A merchants confirm that, for this payment channel:</p>
//               <ul>
//                 <li>
//                   Your company accepts only card-not-present (e-commerce or
//                   mail/telephone-order) transactions;
//                 </li>
//                 <li>
//                   All processing of cardholder data is entirely outsourced to PCI
//                   DSS validated third-party service providers;
//                 </li>
//                 <li>
//                   Your company does not electronically store, process, or transmit
//                   any cardholder data on your systems or premises, but relies
//                   entirely on a third party(s) to handle all these functions;
//                 </li>
//                 <li>
//                   Your company has confirmed that all third party(s) handling
//                   storage, processing, and/or transmission of cardholder data are
//                   PCI DSS compliant; and
//                 </li>
//                 <li>
//                   Any cardholder data your company retains is on paper (for example,
//                   printed reports or receipts), and these documents are not received
//                   electronically.
//                 </li>
//               </ul>
//               <p>Additionally, for e-commerce channels:</p>
//               <ul>
//                 <li>
//                   All elements of the payment page(s) delivered to the consumer’s
//                   browser originate only and directly from a PCI DSS validated
//                   third-party service provider(s).
//                 </li>
//               </ul>
//               <p style={{ textAlign: "center" }}>
//                 <b>
//                   <i>This SAQ is not applicable to face-to-face channels.</i>
//                 </b>
//               </p>
//               <p>
//                 This shortened version of the SAQ includes questions that apply to a
//                 specific type of small merchant environment, as defined in the above
//                 eligibility criteria. If there are PCI DSS requirements applicable
//                 to your environment that are not covered in this SAQ, it may be an
//                 indication that this SAQ is not suitable for your environment.
//                 Additionally, you must still comply with all applicable PCI DSS
//                 requirements in order to be PCI DSS compliant.
//               </p>
//               <p>
//                 <mark style={{ backgroundColor: "rgb(245, 241, 241)" }}>
//                   <strong>Note:</strong>
//                   <i>
//                     {" "}
//                     For this SAQ, PCI DSS Requirements that address the protection
//                     of computer systems (for example, Requirements 2, 6, and 8)
//                     apply to e-commerce merchants that redirect customers from their
//                     website to a third party for payment processing, and
//                     specifically to the merchant web server upon which the
//                     redirection mechanism is located. Mail order/telephone order
//                     (MOTO) or e-commerce merchants that have completely outsourced
//                     all operations (where there is no redirection mechanism from the
//                     merchant to the third party) and therefore do not have any
//                     systems in scope for this SAQ, would consider these requirements
//                     to be “not applicable.” Refer to guidance on the following pages
//                     for how to report requirements that are not applicable.
//                   </i>
//                 </mark>
//               </p>
//             </View>
//             <View className="PCI DSS page-break" id="pci-dss-self-assessment">
//               <img
//                 src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                 alt="logo"
//                 style={{ width: "100px" }}
//               />
//               <Text>PCI DSS Self-Assessment Completion Steps</Text>
//               <ol>
//                 <li>
//                   Identify the applicable SAQ for your environment⎯refer to the{" "}
//                   <i>Self-Assessment Questionnaire Instructions and Guidelines</i>{" "}
//                   document on{" "}
//                   <a href="https://www.pcisecuritystandards.org/">
//                     PCI SSC website
//                   </a>{" "}
//                   for information.
//                 </li>
//                 <li>
//                   Confirm that your environment is properly scoped and meets the
//                   eligibility criteria for the SAQ you are using (as defined in Part
//                   2g of the Attestation of Compliance).
//                 </li>
//                 <li>
//                   Assess your environment for compliance with applicable PCI DSS
//                   requirements.
//                 </li>
//                 <li>
//                   Complete all sections of this document:
//                   <ul>
//                     <li>
//                       Section 1 (Parts 1 &amp; 2 of the AOC) – Assessment
//                       Information and Executive Summary
//                     </li>
//                     <li>
//                       Section 2 – PCI DSS Self-Assessment Questionnaire (SAQ A)
//                     </li>
//                     <li>
//                       Section 3 (Parts 3 &amp; 4 of the AOC) – Validation and
//                       Attestation Details and Action Plan for Non-Compliant
//                       Requirements (if applicable)
//                     </li>
//                   </ul>
//                 </li>
//                 <li>
//                   Submit the SAQ and Attestation of Compliance (AOC), along with any
//                   other requested documentation—such as ASV scan reports—to your
//                   acquirer, payment brand, or other requester.
//                 </li>
//               </ol>
//               <Text id="understanding-saq">
//                 Understanding the Self-Assessment Questionnaire
//               </Text>
//               <p>
//                 The questions contained in the “PCI DSS Question” column in this
//                 self-assessment questionnaire are based on the requirements in the
//                 PCI DSS.
//               </p>
//               <p>
//                 Additional resources that provide guidance on PCI DSS requirements
//                 and how to complete the self-assessment questionnaire have been
//                 provided to assist with the assessment process. An overview of some
//                 of these resources is provided below:
//               </p>
//               <View>
//                 <View>
//                   <View>
//                     <View style={{ backgroundColor: "#384d59", color: "#fff" }}>
//                       Document
//                     </View>
//                     <View style={{ backgroundColor: "#384d59", color: "#fff" }}>
//                       Includes
//                     </View>
//                   </View>
//                 </View>
//                 <View>
//                   <View>
//                     <View>
//                       PCI DSS
//                       <i>
//                         (PCI Data Security Standard Requirements and Security
//                         Assessment Procedures)
//                       </i>
//                     </View>
//                     <View>
//                       <li>Guidance on Scoping</li>
//                       <li>Guidance on the intent of all PCI DSS Requirements</li>
//                       <li>Details of testing procedures</li>
//                       <li>Guidance on Compensating Controls</li>
//                     </View>
//                   </View>
//                   <View></View>
//                   <View>
//                     <View>SAQ Instructions and Guidelines documents</View>
//                     <View>
//                       <li>
//                         Information about all SAQs and their eligibility criteria
//                       </li>
//                       <li>
//                         How to determine which SAQ is right for your organization
//                       </li>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <i>
//                         PCI DSS and PA-DSS Glossary of Terms, Abbreviations, and
//                         Acronyms
//                       </i>
//                     </View>
//                     <View>
//                       <li>
//                         Descriptions and definitions of terms used in the PCI DSS
//                         and self-
//                         <span style={{ marginLeft: "20px" }}>
//                           assessment questionnaires
//                         </span>
//                       </li>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//               <p>
//                 These and other resources can be found on the{" "}
//                 <a href="https://www.pcisecuritystandards.org/">
//                   <i>PCI SSC website</i>
//                 </a>
//                 . Organizations are encouraged to review the PCI DSS and other
//                 supporting documents before beginning an assessment.
//               </p>
//               <Text id="expected-testing">
//                 <i>Expected Testing</i>
//               </Text>
//               <p>
//                 The instructions provided in the “Expected Testing” column are based
//                 on the testing procedures in the PCI DSS and provide a high-level
//                 description of the types of testing activities that should be
//                 performed to verify that a requirement has been met. Full details of
//                 testing procedures for each requirement can be found in the PCI DSS.
//               </p>
//             </View>
//             <View className="completing page-break" id="completing-saq">
//               <img
//                 src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                 alt="logo"
//                 style={{ width: "100px" }}
//               />
//               <Text>Completing the Self-Assessment Questionnaire</Text>
//               <p>
//                 For each question, there is a choice of responses to indicate your
//                 company’s status regarding that requirement.
//                 <b>
//                   {" "}
//                   <i>Only one response should be selected for each question.</i>
//                 </b>{" "}
//               </p>
//               <p>
//                 A description of the meaning for each response is provided in the
//                 table below:
//               </p>
//               <View>
//                 <View>
//                   <View>
//                     <View
//                       style={{
//                         backgroundColor: "#384d59",
//                         color: "#fff",
//                         textAlign: "center",
//                       }}
//                     >
//                       Response
//                     </View>
//                     <View
//                       style={{
//                         backgroundColor: "#384d59",
//                         color: "#fff",
//                         textAlign: "center",
//                       }}
//                     >
//                       When to use this response:
//                     </View>
//                   </View>
//                 </View>
//                 <View>
//                   <View>
//                     <View style={{ textAlign: "center" }}>
//                       <b>Yes</b>
//                     </View>
//                     <View>
//                       The expected testing has been performed, and all elements of
//                       the requirement have been met as stated.
//                     </View>
//                   </View>
//                   <View>
//                     <View style={{ textAlign: "center" }}>
//                       <b>Yes with CCW</b> <br />
//                       (Compensating Control Worksheet)
//                     </View>
//                     <View>
//                       {" "}
//                       The expected testing has been performed, and the requirement
//                       has been met with the assistance of a compensating control.
//                       All responses in this column require completion of a
//                       Compensating Conol Worksheet (CCW) in Appendix B of the SAQ.
//                       Information on the use of compensating controls and guidance
//                       on how to complete the worksheet is provided in the PCI DSS.
//                     </View>
//                   </View>
//                   <View>
//                     <View style={{ textAlign: "center" }}>
//                       <b>No</b>
//                     </View>
//                     <View>
//                       Some or all elements of the requirement have not been met, or
//                       are in the process of being implemented, or require further
//                       testing before it will be known if they are in place.
//                     </View>
//                   </View>
//                   <View>
//                     <View style={{ textAlign: "center" }}>
//                       <b>N/A</b> <br />
//                       (Not Applicable)
//                     </View>
//                     <View>
//                       {" "}
//                       The requirement does not apply to the organization’s
//                       environment.
//                       <i>
//                         {" "}
//                         (See Guidance for Non-Applicability of Certain, Specific
//                         Requirements
//                       </i>{" "}
//                       below for examples.) All responses in this column require a
//                       supporting explanation in Appendix C of the SAQ.
//                     </View>
//                   </View>
//                 </View>
//               </View>
//               <Text id="guidance-non-applicability">
//                 Guidance for Non-Applicability of Certain, Specific Requirements
//               </Text>
//               <p>
//                 If any requirements are deemed not applicable to your environment,
//                 select the “N/A” option for that specific requirement, and complete
//                 the “Explanation of Non-Applicability” worksheet in Appendix C for
//                 each “N/A” entry.
//               </p>
//               <p id="legal-exception">
//                 <strong>Legal Exception</strong>
//               </p>
//               <p>
//                 If your organization is subject to a legal restriction that prevents
//                 the organization from meeting a PCI DSS requirement, check the “No”
//                 column for that requirement and complete the relevant attestation in
//                 Part 3.
//               </p>
//             </View>
//             <View style={{ marginTop: "100px" }} className="section_1 page-break">
//               <img
//                 src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                 alt="logo"
//                 style={{ width: "100px" }}
//               />
//               <Text id="section-1">Section 1: Assessment Information</Text>
//               <hr />
//               <Text>Instructions for Submission</Text>
//               <p>
//                 This document must be completed as a declaration of the results of
//                 the merchant’s self-assessment with the{" "}
//                 <i>
//                   Payment Card Industry Data Security Standard Requirements and
//                   Security Assessment Procedures (PCI DSS)
//                 </i>
//               </p>
//               . Complete all sections: The merchant is responsible for ensuring that
//               each section is completed by the relevant parties, as applicable.
//               Contact acquirer (merchant bank) or the payment brands to determine
//               reporting and submission procedures.
//               <p />
//               <View className="part1">
//                 <View>
//                   <View>
//                     <View style={{ backgroundColor: "#006c73" }}>
//                       <View className="bg" colSpan={6}>
//                         <Text>
//                           Part 1. Merchant and Qualified Security Assessor
//                           Information
//                         </Text>
//                       </View>
//                     </View>
//                     <View>
//                       <View colSpan={6}>
//                         Part 1a. Merchant Organization Information
//                       </View>
//                     </View>
//                     <View>
//                       <View>Company Name:</View>
//                       <View >{allData && allData[0]?.partResponse}</View>
//                       <View>DBA (doing business as):</View>
//                       <View colSpan={4}>{allData && allData[1]?.partResponse}</View>
//                     </View>
//                     <View>
//                       <View>Contact Name:</View>
//                       <View>{allData && allData[2]?.partResponse}</View>
//                       <View>Title:</View>
//                       <View colSpan={6}>{allData && allData[3]?.partResponse}</View>
//                     </View>
//                     <View>
//                       <View>Telephone:</View>
//                       <View>{allData && allData[4]?.partResponse}</View>
//                       <View>E-mail:</View>
//                       <View colSpan={4}>{allData && allData[5]?.partResponse}</View>
//                     </View>
//                     <View>
//                       <View>Business Address:</View>
//                       <View>{allData && allData[11]?.partResponse}</View>
//                       <View colSpan={1}>City:</View>
//                       <View colSpan={4}>{allData && allData[8]?.partResponse}</View>
//                     </View>
//                     <View>
//                       <View>State/Province:</View>
//                       <View>{allData && allData[7]?.partResponse}</View>
//                       <View>Country</View>
//                       <View>{allData && allData[6]?.partResponse}</View>
//                       <View>Zip</View>
//                       <View>{allData && allData[10]?.partResponse}</View>
//                     </View>
//                     <View>
//                       <View>URL: </View>
//                       <View colSpan={5}>{allData && allData[9]?.partResponse}</View>
//                     </View>
//                   </View>
//                 </View>
//                 <View>
//                   <View>
//                     <View>
//                       <View colSpan={6}>
//                         Part 1b. Qualified Security Assessor Company Information (if
//                         applicable)
//                       </View>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <View>Company Name:</View>
//                       <View colSpan={5}>{allData && allData[0]?.partResponse}</View>

//                     </View>
//                     <View>
//                       <View>Lead QSA Contact Name:</View>
//                       <View>{allData && allData[2]?.partResponse}</View>
//                       <View>Title: </View>
//                       <View colSpan={3}>{allData && allData[3]?.partResponse}</View>
//                     </View>
//                     <View>
//                       <View>Telephone:</View>
//                       <View>{allData && allData[4]?.partResponse}</View>

//                       <View>E-mail:</View>
//                       <View colSpan={3}>{allData && allData[5]?.partResponse}</View>
//                     </View>
//                     <View>
//                       <View>Business Address:</View>
//                       <View colSpan={2}>{allData && allData[11]?.partResponse}</View>
//                       <View colSpan={1}>City:</View>
//                       <View colSpan={4}>{allData && allData[8]?.partResponse}</View>
//                     </View>
//                     <View>
//                       <View>State/Province:</View>
//                       <View>{allData && allData[7]?.partResponse}</View>

//                       <View>Country</View>
//                       <View>{allData && allData[6]?.partResponse}</View>
//                       <View>Zip</View>
//                       <View>{allData && allData[10]?.parViewesponse}</View>
//                     </View>
//                     <View>
//                       <View>URL: </View>
//                       <View colSpan={5}>{allData && allData[9]?.partResponse}</View>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//               <View className="part2">
//                 <View>
//                   <View>
//                     <View>
//                       <View className="bg" colSpan={4}>
//                         <Text>Part 2. Executive Summary</Text>
//                       </View>
//                     </View>
//                     <View>
//                       <View colSpan={4}>
//                         Part 2a. Type of Merchant Business (check all that apply)
//                       </View>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <View>
//                         <input type="checkbox" />
//                         Retailer
//                       </View>
//                       <View>
//                         <input type="checkbox" />
//                         Telecommunication
//                       </View>
//                       <View>
//                         <input type="checkbox" /> Grocery and Supermarkets
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         <input type="checkbox" />
//                         Petroleum
//                       </View>
//                       <View>
//                         <input type="checkbox" defaultChecked /> E-Commerce
//                       </View>
//                       <View>
//                         <input type="checkbox" /> Mail order/telephone order (MOTO)
//                       </View>
//                     </View>
//                     <View>
//                       <View colSpan={4}>
//                         {" "}
//                         <input type="checkbox" /> Others (please specify):
//                       </View>
//                     </View>
//                     <View>
//                       <View rowSpan={3} colSpan={2}>
//                         What types of payment channels does your business serve?
//                         <br />
//                         <input type="checkbox" /> Mail order/telephone order (MOTO)
//                         <br />
//                         <input type="checkbox" defaultChecked /> E-Commerce
//                         <br />
//                         <input type="checkbox" /> Card-present (face-to-face)
//                         <br />
//                       </View>
//                     </View>
//                     <View>
//                       <View rowSpan={3} colSpan={2}>
//                         Which payment channels are covered by this SAQ?
//                         <br />
//                         <input type="checkbox" /> Mail order/telephone order (MOTO)
//                         <br />
//                         <input type="checkbox" defaultChecked /> E-Commerce
//                         <br />
//                         <input type="checkbox" /> Card-present (face-to-face)
//                         <br />
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//                 <p>
//                   <mark style={{ backgroundColor: "rgb(245, 241, 241)" }}>
//                     <strong>Note: </strong>
//                     <i>
//                       If your organization has a payment channel or process that is
//                       not covered by this SAQ, consult your acquirer or payment
//                       brand about validation for the other channels.
//                     </i>
//                   </mark>
//                 </p>
//                 <View className="page-break">
//                   <img
//                     src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                     alt="logo"
//                     style={{ width: "100px" }}
//                   />
//                   <View>
//                     <View>
//                       <View style={{ height: "12px" }}>
//                         {" "}
//                         <View className="bg" colSpan={4}>
//                           <Text>
//                             Part 2. Executive Summary{" "}
//                             <span style={{ fontWeight: 100 }}>(continued)</span>
//                           </Text>
//                         </View>
//                       </View>
//                       <View>
//                         <View colSpan={4}>
//                           Part 2b. Description of Payment Card Business
//                         </View>
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         <View rowSpan={4}>
//                           How and in what capacity does your business store, process
//                           and/or transmit cardholder data?
//                         </View>
//                       </View>
//                       <View>
//                         <View rowSpan={4}>
//                           We do not Store, Process or Transmit any Card Holder Data.
//                           Payment processing has been fully outsourced. Transactions
//                           involving Debit / Credit cards are handled by{" "}
//                           <span

//                             style={{ borderBottom: "1px solid black" }}
//                           >{allData && allData[12]?.partResponse + ".  "}</span>
//                           For Payment, Card details are entered on{" "}
//                           <span
//                             style={{ borderBottom: "1px solid black" }}
//                           >
//                             {allData && allData[13]?.partResponse}
//                           </span>
//                         </View>
//                       </View>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <View>
//                         <View colSpan={4}>Part 2c. Locations</View>
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         <View colSpan={4}>
//                           List types of facilities (for example, retail outlets,
//                           corporate offices, data centers, call centers, etc.) and a
//                           summary of locations included in the PCI DSS review.
//                         </View>
//                       </View>
//                       <View>
//                         <View>Type of facility</View>
//                         <View>Number of facilities of is type</View>
//                         <View>Location(s) of facility (city, country)</View>
//                       </View>
//                       <View>
//                         <View>
//                           <p>
//                             <i>Example: Retail outlets</i>
//                           </p>
//                         </View>
//                         <View>
//                           <p style={{ textAlign: "center" }}>3</p>
//                         </View>
//                         <View>
//                           <p>
//                             <i>Boston, MA, USA</i>
//                           </p>
//                         </View>
//                       </View>
//                       <View>
//                         <View>
//                           ntion In Scope Facility Type (e.g. Corporate office, Head
//                           Office, Branch, Store etc
//                         </View>
//                         <View>Mention numbers of Facility Locations</View>
//                         <View>Mention in Facility Locations</View>
//                       </View>
//                       <View>
//                         <View>{allData && allData[14]?.partResponse && JSON.parse(allData[14].partResponse).type}</View>
//                         <View>{allData && allData[14]?.partResponse && JSON.parse(allData[14].partResponse).number}</View>
//                         <View>{allData && allData[14]?.partResponse && JSON.parse(allData[14].partResponse).location}</View>

//                       </View>
//                       <View>
//                         <View></View>
//                         <View></View>
//                         <View></View>
//                       </View>
//                       <View>
//                         <View></View>
//                         <View></View>
//                         <View></View>
//                       </View>
//                       <View>
//                         <View></View>
//                         <View></View>
//                         <View></View>
//                       </View>
//                       <View>
//                         <View></View>
//                         <View></View>
//                         <View></View>
//                       </View>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <View>
//                         <View colSpan={5}>Part 2d. Payment Application</View>
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         <View colSpan={5}>
//                           Does the organization use one or more Payment
//                           Applications? <input type="checkbox" /> Yes{" "}
//                           <input type="checkbox" defaultChecked /> No
//                         </View>
//                       </View>
//                       <View>
//                         <View colSpan={5}>
//                           Provide the following information regarding the Payment
//                           Applications your organization uses:
//                         </View>
//                       </View>
//                       <View style={{ backgroundColor: "rgb(203, 213, 212)" }}>
//                         <View>
//                           <b>Payment Application Name</b>
//                         </View>
//                         <View>
//                           <b>Version Number</b>
//                         </View>
//                         <View>
//                           <b>Application Vendor</b>
//                         </View>
//                         <View>
//                           <b>Is application PA-DSS Listed?</b>
//                         </View>
//                         <View>
//                           <b>
//                             PA-DSS Listing Expiry date (if applicable)<b></b>
//                           </b>
//                         </View>
//                       </View>
//                       <View>
//                         <View>{allData && allData[15]?.partResponse && JSON.parse(allData[15].partResponse).name}</View>
//                         <View>{allData && allData[15]?.partResponse && JSON.parse(allData[15].partResponse).version}</View>
//                         <View>{allData && allData[15]?.partResponse && JSON.parse(allData[15].partResponse).vendor}</View>                    <View style={{ textAlign: "center" }}>
//                           <input type="checkbox" checked /> Yes
//                           <input type="checkbox" /> No
//                         </View>
//                         <View>{allData && allData[15]?.partResponse && JSON.parse(allData[15].partResponse).expiryDate}</View>                  </View>
//                       <View>
//                         <View></View>
//                         <View></View>
//                         <View></View>
//                         <View style={{ textAlign: "center" }}>
//                           <input type="checkbox" checked /> Yes
//                           <input type="checkbox" /> No
//                         </View>
//                         <View />
//                       </View>
//                       <View>
//                         <View></View>
//                         <View></View>
//                         <View></View>
//                         <View style={{ textAlign: "center" }}>
//                           <input type="checkbox" checked /> Yes
//                           <input type="checkbox" /> No
//                         </View>
//                         <View />
//                       </View>
//                       <View>
//                         <View></View>
//                         <View></View>
//                         <View></View>
//                         <View style={{ textAlign: "center" }}>
//                           <input type="checkbox" checked /> Yes <input type="checkbox" /> No
//                         </View>
//                         <View />
//                       </View>
//                       <View>
//                         <View></View>
//                         <View></View>
//                         <View></View>
//                         <View style={{ textAlign: "center" }}>
//                           <input type="checkbox" checked /> Yes
//                           <input type="checkbox" /> No
//                         </View>
//                         <View />
//                       </View>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <View>
//                         <View colSpan={4}>Part 2e. Description of Environment</View>
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         <View colSpan={2}>
//                           Provide a{" "}
//                           <u>
//                             <i>
//                               <b>high-level</b>
//                             </i>
//                           </u>{" "}
//                           description of the environment covered by this assessment.{" "}
//                           <br />
//                           <mark style={{ backgroundColor: "rgb(245, 241, 241)" }}>
//                             {" "}
//                             For example:
//                             <br />
//                           </mark>
//                           <mark style={{ backgroundColor: "rgb(245, 241, 241)" }}>
//                             <li>
//                               <i>
//                                 <mark
//                                   style={{ backgroundColor: "rgb(245, 241, 241)" }}
//                                 >
//                                   Connections into and out of the cardholder data
//                                   environment (CDE).
//                                 </mark>
//                               </i>
//                             </li>
//                             <li>
//                               <i>
//                                 <mark
//                                   style={{ backgroundColor: "rgb(245, 241, 241)" }}
//                                 >
//                                   Critical system components within the CDE, such as
//                                   POS devices, databases, web servers, etc., and any
//                                   other necessary payment components, as applicable.
//                                 </mark>
//                               </i>
//                             </li>
//                           </mark>
//                         </View>
//                         <View colSpan={2}>
//                           Merchant's website URL -{" "}
//                           <span
//                           ><u>{allData && allData[16]?.partResponse}</u></span>
//                           <br />
//                           Name of ERP -{" "}
//                           <span
//                           ><u>{allData && allData[17]?.partResponse}</u></span>
//                           <br />
//                           Payment Gateway -{" "}
//                           <span
//                           ><u>{allData && allData[18]?.partResponse}</u></span>
//                           <br />
//                           Any other third party service Provider -{" "}
//                           <span
//                           ><u>{allData && allData[19]?.partResponse}</u></span>
//                         </View>
//                       </View>
//                       <View>
//                         <View colSpan={2}>
//                           Does your business use network segmentation to affect the
//                           scope of your PCI DSS environment? <br />
//                           <i>
//                             (Refer to “Network Segmentation” section of PCI DSS for
//                             guidance on network segmentation.)
//                           </i>
//                         </View>
//                         <View colSpan={2}>
//                           <input type="checkbox" /> Yes{" "}
//                           <input type="checkbox" defaultChecked /> No
//                         </View>
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//                 <img
//                   src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                   alt="logo"
//                   style={{ width: "100px" }}
//                 />
//                 <View className="page-break">
//                   <View>
//                     <View>
//                       <View className="bg" colSpan={4}>
//                         <Text>
//                           Part 2. Executive Summary{" "}
//                           <span style={{ fontWeight: 100 }}>(continued)</span>
//                         </Text>
//                       </View>
//                     </View>
//                     <View>
//                       <View colSpan={4}>Part 2f. Third-Party Service Providers</View>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <View colSpan={2}>
//                         Does your company use a Qualified Integrator &amp; Reseller
//                         (QIR)?
//                       </View>
//                       <View colSpan={2} style={{ width: "11%" }}>
//                         <input type="checkbox" /> Yes{" "}
//                         <input type="checkbox" defaultChecked /> No
//                       </View>
//                     </View>
//                     <View>
//                       <View colSpan={4} style={{ backgroundColor: "grey" }}>
//                         If Yes:
//                       </View>
//                     </View>
//                     <View>
//                       <View>Name of QIR Company:</View>
//                       <View colSpan={3} />
//                     </View>
//                     <View>
//                       <View>QIR Individual Name:</View>
//                       <View colSpan={3} />
//                     </View>
//                     <View>
//                       <View>Description of services provided by QIR:</View>
//                       <View colSpan={3} />
//                     </View>
//                     <View>
//                       <View colSpan={2}>
//                         Does your company share cardholder data with any third-party
//                         service providers (for example, Qualified Integrator &amp;
//                         Resellers (QIR), gateways, payment processors, payment
//                         service providers (PSP), web-hosting companies, airline
//                         booking agents, loyalty program agents, etc.)?
//                       </View>
//                       <View colSpan={2}>
//                         <input type="checkbox" /> Yes{" "}
//                         <input type="checkbox" defaultChecked /> No
//                       </View>
//                     </View>
//                     <View>
//                       <View colSpan={4} style={{ backgroundColor: "grey" }}>
//                         If Yes:
//                       </View>
//                     </View>
//                     <View>
//                       <View>Name of service provider:</View>
//                       <View colSpan={2}>Description of services provided:</View>
//                     </View>
//                     <View>
//                       <View>{allData && allData[20]?.partResponse && JSON.parse(allData[20].partResponse).name}</View>
//                       <View colSpan={2}>{allData && allData[20]?.partResponse && JSON.parse(allData[20].partResponse).description}</View>                </View>
//                     <View>
//                       <View />
//                       <View colSpan={2} />
//                     </View>
//                     <View>
//                       <View />
//                       <View colSpan={2} />
//                     </View>
//                     <View>
//                       <View />
//                       <View colSpan={2} />
//                     </View>
//                     <View>
//                       <View />
//                       <View colSpan={2} />
//                     </View>
//                     <View>
//                       <View colSpan={4}>
//                         <mark style={{ backgroundColor: "rgb(245, 241, 241)" }}>
//                           <strong>Note:</strong>{" "}
//                           <i>
//                             Requirement 12.8 applies to all entities in this list.
//                           </i>
//                         </mark>
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//                 <View>
//                   <View>
//                     <View>
//                       <View>Part 2g. Eligibility to Complete SAQ A</View>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <View>
//                         Merchant certifies eligibility to complete this shortened
//                         version of the Self-Assessment Questionnaire because, for
//                         this payment channel:
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         <input type="checkbox" defaultChecked />
//                         Merchant accepts only card-not-present (e-commerce or
//                         mail/telephone-order) transactions);
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         {" "}
//                         <input type="checkbox" defaultChecked />
//                         All processing of cardholder data is entirely outsourced to
//                         PCI DSS validated third-party service providers;
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         {" "}
//                         <input type="checkbox" defaultChecked />
//                         Merchant does not electronically store, process, or transmit
//                         any cardholder data on merchant systems or premises, but
//                         relies entirely on a third party(s) to handle all these
//                         functions;
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         {" "}
//                         <input type="checkbox" defaultChecked />
//                         Merchant has confirmed that all third party(s) handling
//                         storage, processing, and/or transmission of cardholder data
//                         are PCI DSS compliant;<b>and</b>
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         {" "}
//                         <input type="checkbox" defaultChecked />
//                         Any cardholder data the merchant retains is on paper (for
//                         example, printed reports or receipts), and these documents
//                         are not received electronically.
//                       </View>
//                     </View>
//                     {/* <tr><View> <input type="checkbox" checked/>Additionally, for e-commerce channels:  */}
//                     {/* </View></tr> */}
//                     <View>
//                       <View>
//                         {" "}
//                         <input type="checkbox" defaultChecked />
//                         <i>Additionally, for e-commerce channels:</i> <br />
//                         All elements of the payment page(s) delivered to the
//                         consumer’s browser originate only and directly from a PCI
//                         DSS validated third-party service provider(s).
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             </View>
//             <View style={{ marginTop: "130px" }} className="page-break">
//               <img
//                 src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                 alt="logo"
//                 style={{ width: "100px" }}
//               />
//               <Text id="section-2">Section 2: Self-Assessment Questionnaire A</Text>
//               <hr />
//               <p>
//                 {" "}
//                 <mark style={{ backgroundColor: "rgb(245, 241, 241)" }}>
//                   <i>
//                     <b>Note :</b> The following questions are numbered according to
//                     PCI DSS requirements and testing procedures, as defined in the
//                     PCI DSS Requirements and Security Assessment Procedures
//                     document.
//                   </i>{" "}
//                 </mark>
//               </p>
//               <strong style={{ float: "right" }}>
//                 {" "}
//                 Self-assessment completion date:
//               </strong>
//               <br />
//               <Text id="build-maintain-network">
//                 Build and Maintain a Secure Network and Systems
//               </Text>
//               <Text id="requirement-2">
//                 <i>
//                   Requirement 2:Do not use vendor-supplied defaults for system
//                   passwords and other security parameters
//                 </i>
//               </Text>
//               <View>
//                 <View>
//                   <View>
//                     <View
//                       style={{
//                         textAlign: "center",
//                         backgroundColor: "rgb(34, 100, 134)",
//                         color: "#fff",
//                       }}
//                       rowSpan={2}
//                     />
//                     <View
//                       rowSpan={2}
//                       style={{
//                         textAlign: "center",
//                         backgroundColor: "rgb(34, 100, 134)",
//                         color: "#fff",
//                       }}
//                     >
//                       PCI DSS Question
//                     </View>
//                     <View
//                       rowSpan={2}
//                       style={{
//                         textAlign: "center",
//                         backgroundColor: "rgb(34, 100, 134)",
//                         color: "#fff",
//                       }}
//                     >
//                       Expected Testing
//                     </View>
//                     <View
//                       colSpan={4}
//                       className="response-checkbox"
//                       style={{
//                         textAlign: "center",
//                         backgroundColor: "rgb(34, 100, 134)",
//                         color: "#fff",
//                       }}
//                     >
//                       Response <i>(Check one response for each question)</i>
//                     </View>
//                   </View>
//                   <View>
//                     <View style={{ textAlign: "center" }}>Yes</View>
//                     <View style={{ textAlign: "center" }}>Yes with CCW</View>
//                     <View style={{ textAlign: "center" }}>No</View>
//                     <View style={{ textAlign: "center" }}>N/A</View>
//                   </View>
//                 </View>
//                 <View>
//                   <View>
//                     <View>2.1</View>
//                     <View>
//                       (a)Are vendor-supplied defaults always changed before
//                       installing a system on the network?
//                       <br />
//                       <mark style={{ backgroundColor: "rgb(245, 241, 241)" }}>
//                         This applies to ALL default passwords, including but not
//                         limited to those used by operating systems,
//                         <br /> software that provides security services, application
//                         and system accounts, point-of-sale (POS) terminals, payment
//                         applications,Simple Network Management Protocol (SNMP)
//                         community strings, etc.
//                       </mark>
//                     </View>
//                     <View>
//                       <li>
//                         Review policies and{" "}
//                         <span style={{ marginLeft: "22px" }}>procedures</span>
//                       </li>
//                       <li>Examine vendor documention.</li>
//                       <li>
//                         Observe system configurations{" "}
//                         <span style={{ marginLeft: "22px" }}>
//                           and account settings.
//                         </span>
//                       </li>
//                       <li>Interview personnel.</li>
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" defaultChecked />
//                     </View>
//                     <View style={{ textAlign: "center", width: "6%" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                   </View>
//                   <View>
//                     <View />
//                     <View>
//                       (b) Are unnecessary default accounts removed or disabled
//                       before installing a system on the network?
//                     </View>
//                     <View>
//                       <li>
//                         Review policies and{" "}
//                         <span style={{ marginLeft: "22px" }}>procedures</span>
//                       </li>
//                       <li>
//                         Examine vendor{" "}
//                         <span style={{ marginLeft: "22px" }}>documentation</span>
//                       </li>
//                       <li>
//                         Observe system configurations{" "}
//                         <span style={{ marginLeft: "22px" }}>
//                           and account settings
//                         </span>
//                         .
//                       </li>
//                       <li>Interview personnel.</li>
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" defaultChecked />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                   </View>
//                 </View>
//               </View>
//               <View className="page-break">
//                 <img
//                   src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                   alt="logo"
//                   style={{ width: "100px" }}
//                 />
//                 <Text id="maintains">Maintain a Vulnerability Management Program</Text>
//                 <Text id="requirement-6">
//                   <i>
//                     Requirement 6: Develop and maintain secure systems and
//                     applications
//                   </i>
//                 </Text>
//                 <View>
//                   <View>
//                     <View>
//                       <View
//                         rowSpan={2}
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                       />
//                       <View
//                         rowSpan={2}
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                       >
//                         PCI DSS Question
//                       </View>
//                       <View
//                         rowSpan={2}
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                       >
//                         Expected Testing
//                       </View>
//                       <View
//                         colSpan={4}
//                         className="response-checkbox"
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                       >
//                         Response <i> (Check one response for each question)</i>
//                       </View>
//                     </View>
//                     <View>
//                       <View style={{ textAlign: "center" }}>Yes</View>
//                       <View style={{ textAlign: "center", width: "70px" }}>
//                         Yes with CCW
//                       </View>
//                       <View style={{ textAlign: "center" }}>No</View>
//                       <View style={{ textAlign: "center" }}>N/A</View>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <View>6.2</View>
//                       <View>
//                         (a) Are all system components and software protected from
//                         known vulnerabilities by installing applicable
//                         vendor-supplied security patches?
//                       </View>
//                       <View>
//                         <li>Review policies and procedures.</li>
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" defaultChecked />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                     </View>
//                     <View>
//                       <View />
//                       <View>
//                         (b) Are critical security patches installed within one month
//                         of release?
//                       </View>
//                       <View>
//                         <li>Review policies and procedures.</li>
//                         <li>Examine system components.</li>
//                         <li>
//                           Compare list of security patches{" "}
//                           <span style={{ marginLeft: "22px" }}>
//                             {" "}
//                             installed to recent vendor patch
//                           </span>
//                           <span style={{ marginLeft: "22px" }}>lists.</span>
//                         </li>
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" defaultChecked />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//               <View className="page-break">
//                 <img
//                   src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                   alt="logo"
//                   style={{ width: "100px" }}
//                 />
//                 <Text id="measure">Implement Strong Access Control Measures</Text>
//                 <Text id="requirement-8">
//                   <i>
//                     Requirement 8: Identify and authenticate access to system
//                     components
//                   </i>
//                 </Text>
//                 <View>
//                   <View>
//                     <View>
//                       <View
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                         rowSpan={2}
//                       />
//                       <View
//                         rowSpan={2}
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                       >
//                         PCI DSS Question
//                       </View>
//                       <View
//                         rowSpan={2}
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                       >
//                         Expected Testing
//                       </View>
//                       <View
//                         colSpan={4}
//                         className="response-checkbox"
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                       >
//                         Response<i> (Check one response for each question)</i>
//                       </View>
//                     </View>
//                     <View>
//                       <View style={{ textAlign: "center" }}>Yes</View>
//                       <View style={{ textAlign: "center", width: "70px" }}>
//                         Yes with CCW
//                       </View>
//                       <View style={{ textAlign: "center" }}>No</View>
//                       <View style={{ textAlign: "center" }}>N/A</View>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <View>8.1.1</View>
//                       <View>
//                         Are all users assigned a unique ID before allowing them to
//                         access system components or cardholder data?
//                       </View>
//                       <View>
//                         <ul>
//                           {" "}
//                           <li>Review password procedures.</li>
//                           <li>Interview personnel.</li>
//                         </ul>
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" defaultChecked />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View>
//                         <input type="checkbox" />
//                       </View>
//                     </View>
//                     <View>
//                       <View>8.1.3</View>
//                       <View>
//                         {" "}
//                         Is access for any terminated users immediately deactivated
//                         or removed?
//                       </View>
//                       <View>
//                         <ul>
//                           <li>Review password procedures.</li>
//                           <li>Examine terminated users accounts.</li>
//                           <li>Review current access lists.</li>
//                           <li>Observe returned physical authentication devices.</li>
//                         </ul>
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" defaultChecked />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                     </View>
//                     <View>
//                       <View>8.2</View>
//                       <View>
//                         In addition to assigning a unique ID, is one or more of the
//                         following methods employed to authenticate all users?
//                         <ul>
//                           <li>
//                             Something you know, such as a password or passphrase
//                           </li>
//                           <li>
//                             Something you have, such as a token device or smart card
//                           </li>
//                           <li>Something you are, such as a biometric</li>
//                         </ul>
//                       </View>
//                       <View>
//                         <ul>
//                           {" "}
//                           <li>Review password procedures.</li>
//                           <li>Observe authentication processes.</li>
//                         </ul>
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" defaultChecked />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                     </View>
//                     <View>
//                       <View>8.2.3</View>
//                       <View>
//                         (a) Are user password parameters configured to require
//                         passwords/passphrases meet the following?
//                         <ul>
//                           <li>
//                             A minimum password length of at least seven characters
//                           </li>
//                           <li>Contain both numeric and alphabetic characters</li>
//                         </ul>
//                         Alternatively, the passwords/passphrases must have
//                         complexity and strength at least equivalent to the
//                         parameters specified above.
//                       </View>
//                       <View>
//                         <ul>
//                           <li>
//                             Examine system configuration settings to verify password
//                             parameters
//                           </li>
//                         </ul>
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" defaultChecked />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//               <br />
//               <View className="page-break">
//                 <img
//                   src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                   alt="logo"
//                   style={{ width: "100px" }}
//                 />
//                 <View>
//                   <View>
//                     <View>
//                       <View
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                         rowSpan={2}
//                       />
//                       <View
//                         rowSpan={2}
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                       >
//                         PCI DSS Question
//                       </View>
//                       <View
//                         rowSpan={2}
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                       >
//                         Expected Testing
//                       </View>
//                       <View
//                         colSpan={4}
//                         className="response-checkbox"
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                       >
//                         Response <i> (Check one response for each question)</i>
//                       </View>
//                     </View>
//                     <View>
//                       <View style={{ textAlign: "center" }}>Yes</View>
//                       <View style={{ textAlign: "center", width: "70px" }}>
//                         Yes with CCW
//                       </View>
//                       <View style={{ textAlign: "center" }}>No</View>
//                       <View style={{ textAlign: "center" }}>N/A</View>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <View>8.5</View>
//                       <View>
//                         Are group, shared, or generic accounts, passwords, or other
//                         authentication methods prohibited as follows:
//                         <ul>
//                           <li>
//                             Generic user IDs and accounts are disabled or removed;
//                           </li>
//                           <li>
//                             Shared user IDs for system administration activities and
//                             other critical functions do not exist; and
//                           </li>
//                           <li>
//                             Shared and generic user IDs are not used to administer
//                             any system components?
//                           </li>
//                         </ul>
//                       </View>
//                       <View>
//                         <li>
//                           Review policies and{" "}
//                           <span style={{ marginLeft: "22px" }}>procedures</span>
//                         </li>
//                         <li>Examine user ID lists.</li>
//                         <li>Interview personnel.</li>
//                       </View>
//                       <View style={{ textAlign: "center" }}>
//                         <input type="checkbox" defaultChecked />
//                       </View>
//                       <View style={{ textAlign: "center" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center" }}>
//                         <input type="checkbox" />
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//                 <Text id="requirement-9">
//                   <i>Requirement 9:Restrict physical access to cardholder data</i>{" "}
//                 </Text>
//                 <View>
//                   <View>
//                     <View>
//                       <View
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                         rowSpan={2}
//                       />
//                       <View
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                         rowSpan={2}
//                       >
//                         PCI DSS Question
//                       </View>
//                       <View
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                         rowSpan={2}
//                       >
//                         Expected Testing
//                       </View>
//                       <View
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                         colSpan={4}
//                         className="response-checkbox"
//                       >
//                         Response <i> (Check one response for each question)</i>
//                       </View>
//                     </View>
//                     <View>
//                       <View style={{ textAlign: "center" }}>Yes</View>
//                       <View style={{ textAlign: "center" }}>Yes with CCW</View>
//                       <View style={{ textAlign: "center" }}>No</View>
//                       <View style={{ textAlign: "center" }}>N/A</View>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <View>9.5</View>
//                       <View>
//                         Are all media physically secured (including but not limited
//                         to computers, removable electronic media, paper receipts,
//                         paper reports, and faxes)?
//                         <mark style={{ backgroundColor: "rgb(209, 202, 202)" }}>
//                           <i>
//                             For purposes of Requirement 9, “media” refers to all
//                             paper and electronic media containing cardholder data.
//                           </i>
//                         </mark>
//                       </View>
//                       <View>
//                         <ul>
//                           {" "}
//                           <li>
//                             Review policies and procedures for physically securing
//                             media.
//                           </li>
//                           <li>Interview personnel.</li>
//                         </ul>
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" defaultChecked />
//                       </View>
//                     </View>
//                     <View>
//                       <View rowSpan={2}>9.6</View>
//                     </View>
//                     <View>
//                       <View>
//                         (a) Is strict control maintained over the internal or
//                         external distribution of any kind of media?
//                       </View>
//                       <View>
//                         <ul>
//                           <li>
//                             Review policies and procedures for distribution of media
//                           </li>
//                         </ul>
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" defaultChecked />
//                       </View>
//                     </View>
//                     <View>
//                       <View />
//                       <View>(b) Do controls include the following:</View>
//                       <View colSpan={5} />
//                     </View>
//                     <View>
//                       <View>9.6.1</View>
//                       <View>
//                         Is media classified so the sensitivity of the data can be
//                         determined? Review policies and procedures for media
//                         classification.
//                       </View>
//                       <View>
//                         <ul>
//                           <li>
//                             Review policies and procedures for media classification.
//                           </li>
//                           <li>Interview security personnel.</li>
//                         </ul>
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" defaultChecked />
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//               <br />
//               <img
//                 src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                 alt="logo"
//                 style={{ width: "100px" }}
//               />
//               <View className="page-break">
//                 <View>
//                   <View>
//                     <View
//                       rowSpan={2}
//                       style={{
//                         textAlign: "center",
//                         backgroundColor: "rgb(34, 100, 134)",
//                         color: "#fff",
//                       }}
//                     />
//                     <View
//                       rowSpan={2}
//                       style={{
//                         textAlign: "center",
//                         backgroundColor: "rgb(34, 100, 134)",
//                         color: "#fff",
//                       }}
//                     >
//                       PCI DSS Question
//                     </View>
//                     <View
//                       rowSpan={2}
//                       style={{
//                         textAlign: "center",
//                         backgroundColor: "rgb(34, 100, 134)",
//                         color: "#fff",
//                       }}
//                     >
//                       Expected Testing
//                     </View>
//                     <View
//                       colSpan={4}
//                       className="response-checkbox"
//                       style={{
//                         textAlign: "center",
//                         backgroundColor: "rgb(34, 100, 134)",
//                         color: "#fff",
//                       }}
//                     >
//                       Response<i> (Check one response for each question)</i>
//                     </View>
//                   </View>
//                   <View>
//                     <View style={{ textAlign: "center" }}>Yes</View>
//                     <View style={{ textAlign: "center" }}>Yes with CCW</View>
//                     <View style={{ textAlign: "center" }}>No</View>
//                     <View style={{ textAlign: "center" }}>N/A</View>
//                   </View>
//                 </View>
//                 <View>
//                   <View>
//                     <View>9.6.2</View>
//                     <View>
//                       Is media sent by secured courier or other delivery method that
//                       can be accurately tracked?
//                     </View>
//                     <View>
//                       <ul>
//                         {" "}
//                         <li>Interview personnel.</li>
//                         <li>
//                           Examine media distribution tracking logs and
//                           documentation.{" "}
//                         </li>
//                       </ul>
//                     </View>
//                     <View style={{ textAlign: "center", width: "6%" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center", width: "6%" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center", width: "6%" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center", width: "6%" }}>
//                       <input type="checkbox" defaultChecked />
//                     </View>
//                   </View>
//                   <View>
//                     <View>9.6.3</View>
//                     <View>
//                       Is management approval obtained prior to moving the media
//                       (especially when media is distributed to individuals)?
//                     </View>
//                     <View>
//                       <ul>
//                         <li>Interview personnel.</li>
//                         <li>
//                           Examine media distribution tracking logs and documentation
//                         </li>
//                       </ul>
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" defaultChecked />
//                     </View>
//                   </View>
//                   <View>
//                     <View>9.7</View>
//                     <View>
//                       Is strict control maintained over the storage and
//                       accessibility of media?
//                     </View>
//                     <View>
//                       <ul>
//                         {" "}
//                         <li>Review policies and procedures.</li>
//                       </ul>
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" defaultChecked />
//                     </View>
//                   </View>
//                   <View>
//                     <View rowSpan={2}>9.8</View>
//                     <View rowSpan={1}>
//                       (a) Is all media destroyed when it is no longer needed for
//                       business or legal reasons?
//                     </View>
//                     <View>
//                       <ul>
//                         <li>
//                           Review periodic media destruction policies and procedures.
//                         </li>
//                       </ul>
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" defaultChecked />
//                     </View>
//                   </View>
//                   <View>
//                     <View>(c) Is media destruction performed as follows:</View>
//                     <View colSpan={5} />
//                   </View>
//                   <View>
//                     <View rowSpan={2}>9.8.1</View>
//                     <View rowSpan={1}>
//                       (a) Are hardcopy materials cross-cut shredded, incinerated, or
//                       pulped so that cardholder data cannot be reconstructed?
//                     </View>
//                     <View>
//                       <ul>
//                         <li>
//                           Review periodic media destruction policies and procedures
//                         </li>
//                         <li>Interview personnel.</li>
//                         <li>Observe processes.</li>
//                       </ul>
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" defaultChecked />
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       (b) Are storage containers used for materials that contain
//                       information to be destroyed secured to prevent access to the
//                       contents?
//                     </View>
//                     <View>
//                       <ul>
//                         <li>Examine security of storage containers.</li>
//                       </ul>
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" defaultChecked />
//                     </View>
//                   </View>
//                 </View>
//               </View>
//               <View className="page-break">
//                 <img
//                   src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                   alt="logo"
//                   style={{ width: "100px" }}
//                 />
//                 <Text id="maintain">Maintain an Information Security Policy </Text>
//                 <Text id="requirement-12">
//                   <i>
//                     Requirement 12: Maintain a policy that addresses information
//                     security for all personnel
//                   </i>
//                 </Text>
//                 <p>
//                   <mark style={{ backgroundColor: "rgb(209, 202, 202)" }}>
//                     <i>
//                       <b>Note:</b> For the purposes of Requirement 12, “personnel”
//                       refers to full-time part-time employees, temporary employees
//                       and personnel, and contractors and consultants who are
//                       “resident” on the entity’s site or otherwise have access to
//                       the company’s site cardholder data environment.
//                     </i>
//                   </mark>
//                 </p>
//                 <View>
//                   <View>
//                     <View>
//                       <View
//                         rowSpan={2}
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                       />
//                       <View
//                         rowSpan={2}
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                       >
//                         PCI DSS Question
//                       </View>
//                       <View
//                         rowSpan={2}
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                       >
//                         Expected Testing
//                       </View>
//                       <View
//                         colSpan={4}
//                         className="response-checkbox"
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                           color: "#fff",
//                         }}
//                       >
//                         Response <i> (Check one response for each question)</i>
//                       </View>
//                     </View>
//                     <View>
//                       <View style={{ textAlign: "center" }}>Yes</View>
//                       <View style={{ textAlign: "center" }}>Yes with CCW</View>
//                       <View style={{ textAlign: "center" }}>No</View>
//                       <View style={{ textAlign: "center" }}>N/A</View>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <View>12.8</View>
//                       <View>
//                         Are policies and procedures maintained and implemented to
//                         manage service providers with whom cardholder data is
//                         shared, or that could affect the security of cardholder
//                         data, as follows:
//                       </View>
//                       <View
//                         colSpan={5}
//                         style={{ backgroundColor: "rgb(209, 202, 202)" }}
//                       ></View>
//                     </View>
//                     <View>
//                       <View>12.8.1</View>
//                       <View>
//                         Is a list of service providers maintained, including a
//                         description of the service(s) provided?
//                       </View>
//                       <View>
//                         <ul>
//                           <li>Review policies and procedures.</li>
//                           <li>Observe processes.</li>
//                           <li>Review list of service providers. </li>
//                         </ul>
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" defaultChecked />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                     </View>
//                     <View>
//                       <View>12.8.2</View>
//                       <View>
//                         Is a written agreement maintained that includes an
//                         acknowledgement that the service providers are responsible
//                         for the security of cardholder data the service providers
//                         possess or otherwise store, process, or transmit on behalf
//                         of the customer, or to the extent that they could impact the
//                         security of the customer’s cardholder data environment?
//                         <br />
//                         <mark style={{ backgroundColor: "rgb(226, 222, 222)" }}>
//                           <i>
//                             <b>Note: </b> The exact wording of an acknowledgement
//                             will depend on the agreement between the two parties,
//                             the details of the service being provided, and the
//                             responsibilities assigned to each party. The
//                             acknowledgement does not have to include the exact
//                             wording provided in this requirement.
//                           </i>
//                         </mark>
//                       </View>
//                       <View>
//                         <ul>
//                           <li>Observe written agreements.</li>
//                           <li>Review policies and procedures</li>
//                         </ul>
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" defaultChecked />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                     </View>
//                     <View>
//                       <View>12.8.3</View>
//                       <View>
//                         Is there an established process for engaging service
//                         providers, including proper due diligence prior to
//                         engagement?
//                       </View>
//                       <View>
//                         <ul>
//                           <li>Observe processes</li>
//                           <li>
//                             Review policies and procedures and supporting
//                             documentation.
//                           </li>
//                         </ul>
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" defaultChecked />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                       <View style={{ textAlign: "center", width: "6%" }}>
//                         <input type="checkbox" />
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//               <br />
//               <img
//                 src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                 alt="logo"
//                 style={{ width: "100px" }}
//               />
//               <View className="page-break">
//                 <View>
//                   <View>
//                     <View
//                       style={{
//                         textAlign: "center",
//                         backgroundColor: "rgb(34, 100, 134)",
//                         color: "#fff",
//                       }}
//                       rowSpan={2}
//                     />
//                     <View
//                       rowSpan={2}
//                       style={{
//                         textAlign: "center",
//                         backgroundColor: "rgb(34, 100, 134)",
//                         color: "#fff",
//                       }}
//                     >
//                       PCI DSS Question
//                     </View>
//                     <View
//                       rowSpan={2}
//                       style={{
//                         textAlign: "center",
//                         backgroundColor: "rgb(34, 100, 134)",
//                         color: "#fff",
//                       }}
//                     >
//                       Expected Testing
//                     </View>
//                     <View
//                       colSpan={4}
//                       className="response-checkbox"
//                       style={{
//                         textAlign: "center",
//                         backgroundColor: "rgb(34, 100, 134)",
//                         color: "#fff",
//                       }}
//                     >
//                       Response<i> (Check one response for each question)</i>
//                     </View>
//                   </View>
//                   <View>
//                     <View style={{ textAlign: "center" }}>Yes</View>
//                     <View style={{ textAlign: "center", width: "70px" }}>
//                       Yes with CCW
//                     </View>
//                     <View style={{ textAlign: "center" }}>No</View>
//                     <View style={{ textAlign: "center" }}>N/A</View>
//                   </View>
//                 </View>
//                 <View>
//                   <View>
//                     <View>12.8.4</View>
//                     <View>
//                       Is a program maintained to monitor service providers’ PCI DSS
//                       compliance status at least annually?
//                     </View>
//                     <View>
//                       <ul>
//                         <li>Observe processes.</li>
//                         <li>
//                           Review policies and procedures and supporting
//                           documentation.
//                         </li>
//                       </ul>
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" defaultChecked />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                   </View>
//                   <View>
//                     <View>12.8.5</View>
//                     <View>
//                       Is information maintained about which PCI DSS requirements are
//                       managed by each service provider, and which are managed by the
//                       entity?
//                     </View>
//                     <View>
//                       <ul>
//                         <li>Observe processes.</li>
//                         <li>
//                           Review policies and procedures and supporting
//                           documentation.
//                         </li>
//                       </ul>
//                     </View>
//                     <View style={{ textAlign: "center", width: "6%" }}>
//                       <input type="checkbox" defaultChecked />
//                     </View>
//                     <View style={{ textAlign: "center", width: "6%" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center", width: "6%" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center", width: "6%" }}>
//                       <input type="checkbox" />
//                     </View>
//                   </View>
//                   <View>
//                     <View>12.10.1</View>
//                     <View>
//                       (a) Has an incident response plan been created to be
//                       implemented in the event of system breach?
//                     </View>
//                     <View>
//                       <ul>
//                         <li>Review the incident response plan.</li>
//                         <li>Review incident response plan procedures.</li>
//                       </ul>
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" defaultChecked />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                     <View style={{ textAlign: "center" }}>
//                       <input type="checkbox" />
//                     </View>
//                   </View>
//                 </View>
//               </View>
//               <View className="page-break">
//                 <img
//                   src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                   alt="logo"
//                   style={{ width: "100px" }}
//                 />
//                 <Text id="appendix-a">
//                   Appendix A: Additional PCI DSS Requirements{" "}
//                 </Text>
//                 <Text id="appendix-a1">
//                   <i>
//                     Appendix A1: Additional PCI DSS Requirements for Shared Hosting
//                     Providers
//                   </i>
//                 </Text>
//                 <p>This appendix is not used for merchant assessments. </p>
//                 <Text id="appendix-a2">
//                   <i>
//                     Appendix A2: Additional PCI DSS Requirements for Entities using
//                     SSL/early TLS for{" "}
//                   </i>
//                 </Text>
//                 <Text style={{ marginLeft: "117px" }}>
//                   Card-Present POS POI Terminal Connections
//                 </Text>
//                 <p>This appendix is not used for SAQ A merchant assessments </p>
//                 <Text id="appendix-a3">
//                   <i>
//                     Appendix A3: Designated Entities Supplemental Validation (DESV)
//                   </i>
//                 </Text>
//                 <p>
//                   This Appendix applies only to entities designated by a payment
//                   brand(s) or acquirer as requiring additional validation of
//                   existing PCI DSS requirements. Entities required to validate to
//                   this Appendix should use the DESV Supplemental Reporting Template
//                   and Supplemental Attestation of Compliance for reporting, and
//                   consult with the applicable payment brand and/or acquirer for
//                   submission procedures
//                 </p>
//               </View>
//               <View className="page-break">
//                 <img
//                   src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                   alt="logo"
//                   style={{ width: "100px" }}
//                 />
//                 <Text id="appendix-b">
//                   Appendix B: Compensating Controls Worksheet{" "}
//                 </Text>
//                 <p>
//                   <i>
//                     Use this worksheet to define compensating controls for any
//                     requirement where “YES with CCW” was checked.
//                   </i>
//                 </p>
//                 <p>
//                   <mark style={{ backgroundColor: "rgb(234 229 229)" }}>
//                     <i>
//                       <b>Note:</b>Only companies that have undertaken a risk
//                       analysis and have legitimate technological or documented
//                       business constraints can consider the use of compensating
//                       controls to achieve compliance. Refer to Appendices B, C, and
//                       D of PCI DSS for information about compensating controls and
//                       guidance on how to complete this worksheet.
//                     </i>
//                   </mark>
//                 </p>
//                 <Text>Requirement Number and Definition:</Text>
//                 <View>
//                   <View>
//                     <View
//                       style={{
//                         backgroundColor: "rgb(34, 100, 134)",
//                         color: "#fff",
//                       }}
//                     >
//                       <View
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                         }}
//                       />
//                       <View
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                         }}
//                       >
//                         Information Required
//                       </View>
//                       <View
//                         style={{
//                           textAlign: "center",
//                           backgroundColor: "rgb(34, 100, 134)",
//                         }}
//                       >
//                         Explanation
//                       </View>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <View>
//                         <b>1. Constraints</b>{" "}
//                       </View>
//                       <View>
//                         List constraints precluding compliance with the original
//                         requirement.
//                       </View>
//                       <View />
//                     </View>
//                     <View>
//                       <View>
//                         <b>2. Objective</b>
//                       </View>
//                       <View>
//                         Define the objective of the original control; identify the
//                         objective met by the compensating control.
//                       </View>
//                       <View />
//                     </View>
//                     <View>
//                       <View>
//                         <b>3. Identified Risk</b>
//                       </View>
//                       <View>
//                         Identify any additional risk posed by the lack of the
//                         original control.
//                       </View>
//                       <View />
//                     </View>
//                     <View>
//                       <View>
//                         <b>4. Definition of Compensating Controls</b>
//                       </View>
//                       <View>
//                         Definition of Compensating Controls Define the compensating
//                         controls and explain how they address the objectives of the
//                         original control and the increased risk, if any.
//                       </View>
//                       <View />
//                     </View>
//                     <View>
//                       <View>
//                         <b>5. Validation of Compensating Controls</b>
//                       </View>
//                       <View>
//                         Validation of Compensating Controls Define how the
//                         compensating controls were validated and tested.
//                       </View>
//                       <View />
//                     </View>
//                     <View>
//                       <View>
//                         <b>6. Maintenance</b>
//                       </View>
//                       <View>
//                         Maintenance Define process and controls in place to maintain
//                         compensating controls.
//                       </View>
//                       <View />
//                     </View>
//                   </View>
//                 </View>
//               </View>
//               <br />
//               <View className="page-break">
//                 <img
//                   src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                   alt="logo"
//                   style={{ width: "100px" }}
//                 />
//                 <Text id="appendix-c">
//                   Appendix C: Explanation of Non-Applicability
//                 </Text>
//                 <p>
//                   <i>
//                     If the “N/A” (Not Applicable) column was checked in the
//                     questionnaire, use this worksheet to explain why the related
//                     requirement is not applicable to your organization.
//                   </i>
//                 </p>
//                 <View>
//                   <View>
//                     <View
//                       style={{
//                         backgroundColor: "rgb(34, 100, 134)",
//                         color: "#fff",
//                       }}
//                     >
//                       <View>Requirement</View>
//                       <View>Reason Requirement is Not Applicable</View>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <View colSpan={2}>
//                         <i>Example:</i>
//                       </View>
//                     </View>
//                     <View>
//                       <View>3.4</View>
//                       <View>Cardholder data is never stored electronically </View>
//                     </View>
//                     <View>
//                       <View>9.5</View>
//                       <View>
//                         This requirement is not applicable since the cardholder data
//                         is not being stored, processed or transmitted.{" "}
//                       </View>
//                     </View>{" "}
//                     <View>
//                       <View>9.6</View>
//                       <View>
//                         This requirement is not applicable since the cardholder data
//                         is not being stored, processed or transmitted.{" "}
//                       </View>
//                     </View>{" "}
//                     <View>
//                       <View>9.6.1</View>
//                       <View>
//                         This requirement is not applicable since there is no
//                         disViewibution of media having cardholder data.{" "}
//                       </View>
//                     </View>{" "}
//                     <View>
//                       <View>9.6.2</View>
//                       <View>
//                         This requirement is not applicable since there is no
//                         delivery of cardholder data is received through courier or
//                         other mode of transport.
//                       </View>
//                     </View>{" "}
//                     <View>
//                       <View>9.6.3</View>
//                       <View>
//                         This requirement is not applicable since there is no
//                         distribution of media having cardholder data.
//                       </View>
//                     </View>{" "}
//                     <View>
//                       <View>9.7</View>
//                       <View>
//                         This requirement is not applicable since the cardholder data
//                         is not being stored
//                       </View>
//                     </View>{" "}
//                     <View>
//                       <View>9.8</View>
//                       <View>
//                         This requirement is not applicable since the cardholder data
//                         is not being stored. Hence desuction of media does not
//                         take place.
//                       </View>
//                     </View>{" "}
//                     <View>
//                       <View>9.8.1</View>
//                       <View>
//                         This requirement is not applicable since the cardholder data
//                         is not being stored.{" "}
//                       </View>
//                     </View>{" "}
//                     <View>
//                       <View>
//                         <mark
//                           style={{
//                             width: "50px",
//                             backgroundColor: "gainsboro",
//                             height: "20px",
//                           }}
//                         />
//                       </View>
//                       <View> </View>
//                     </View>{" "}
//                     <View>
//                       <View />
//                       <View> </View>
//                     </View>
//                     <View>
//                       <View />
//                       <View />
//                     </View>
//                     <View>
//                       <View />
//                       <View />
//                     </View>{" "}
//                     <View>
//                       <View />
//                       <View />
//                     </View>{" "}
//                     <View>
//                       <View />
//                       <View />
//                     </View>{" "}
//                     <View>
//                       <View />
//                       <View />
//                     </View>{" "}
//                     <View>
//                       <View />
//                       <View />
//                     </View>
//                   </View>
//                 </View>
//               </View>
//               <View style={{ marginTop: "120px" }} className="page-break">
//                 <img
//                   src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                   alt="logo"
//                   style={{ width: "100px" }}
//                 />
//                 <Text id="section-3">
//                   Section 3: Validation and Attestation Details
//                 </Text>
//                 <Text className="bg">PCI DSS Validation</Text>
//                 <Text>
//                   This AOC is based on results noted in SAQ A (Section 2), dated{" "}
//                   <i>
//                     <b>(SAQ completion date).</b>
//                   </i>
//                 </Text>
//                 <p>
//                   Based on the results documented in the SAQ A noted above, the
//                   signatories identified in Parts 3b-3d, as applicable, assert(s)
//                   the following compliance status for the entity identified in Part
//                   2 of this document:
//                   <b>
//                     <i>(check one):</i>
//                   </b>
//                 </p>
//                 <View>
//                   <View></View>
//                   <View>
//                     <View>
//                       <View>
//                         <input type="checkbox" defaultChecked />
//                       </View>
//                       <View>
//                         <b>Compliant:</b> All sections of the PCI DSS SAQ are
//                         complete, all questions answered affirmatively, resulting in
//                         an overall <b>COMPLIANT</b> rating; thereby{" "}
//                         <i>(Merchant Company Name)</i> has demonstrated full
//                         compliance with the PCI DSS.
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         <input type="checkbox" />
//                       </View>
//                       <View>
//                         <b>Non-Compliant:</b> Not all sections of the PCI DSS SAQ
//                         are complete, or not all questions are answered
//                         affirmatively, resulting in an overall <b>NON-COMPLIANT</b>{" "}
//                         rating, thereby <i>(Merchant Company Name)</i> has not
//                         demonstrated full compliance with the PCI DSS.
//                         <br />
//                         <b>Target Date </b> for Compliance:{" "}
//                         <input
//                           type="text"
//                           style={{
//                             padding: "0px",
//                             margin: "4px",
//                             height: "25px",
//                             width: "10%",
//                           }}
//                         />
//                         <br /> <br />
//                         An entity submitting this form with a status of
//                         Non-Compliant may be required to complete the Action Plan in
//                         Part 4 of this document. Check with your acquirer or the
//                         payment brand(s) before completing Part 4.
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         <input type="checkbox" />
//                       </View>
//                       <View>
//                         <b>Compliant but with Legal exception: </b> One or more
//                         requirements are marked “No” due to a legal restriction that
//                         prevents the requirement from being met. This option
//                         requires additional review from acquirer or payment brand.{" "}
//                         <br />
//                         <i> If checked, complete the following:</i>
//                       </View>
//                     </View>
//                     <View>
//                       <View colSpan={2}>
//                         <View>
//                           <View>
//                             <View>
//                               <View>Affected Requirement</View>
//                               <View>
//                                 Details of how legal constraint prevents requirement
//                                 being met
//                               </View>
//                             </View>
//                           </View>
//                           <View>
//                             <View>
//                               <View>
//                                 <input
//                                   type="text"
//                                   style={{
//                                     padding: "0px",
//                                     margin: "0px",
//                                     height: "20px",
//                                     width: "30%",
//                                   }}
//                                 />
//                               </View>
//                               <View>
//                                 <input
//                                   type="text"
//                                   style={{
//                                     padding: "0px",
//                                     margin: "0px",
//                                     height: "20px",
//                                     width: "10%",
//                                   }}
//                                 />
//                               </View>
//                             </View>
//                             <View>
//                               <View>
//                                 <input
//                                   type="text"
//                                   style={{
//                                     padding: "0px",
//                                     margin: "0px",
//                                     height: "20px",
//                                     width: "30%",
//                                   }}
//                                 />
//                               </View>
//                               <View>
//                                 <input
//                                   type="text"
//                                   style={{
//                                     padding: "0px",
//                                     margin: "0px",
//                                     height: "20px",
//                                     width: "10%",
//                                   }}
//                                 />
//                               </View>
//                             </View>
//                             <View></View>
//                           </View>
//                         </View>
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//                 <View>
//                   <View>
//                     <View>
//                       <View colSpan={2}>Part 3a. Acknowledgement of Status</View>
//                     </View>
//                     <View>
//                       <View
//                         colSpan={2}
//                         style={{ background: "none", fontSize: "small" }}
//                       >
//                         Signatory(s) confirms:
//                         <br />
//                         <i>(Check all table apply)</i>
//                       </View>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <View>
//                         <input type="checkbox" defaultChecked />
//                       </View>
//                       <View>
//                         PCI DSS Self-Assessment Questionnaire A, Version{" "}
//                         <mark style={{ backgroundColor: "rgb(158, 151, 151)" }}>
//                           <i style={{ background: "aliceblue" }}>(ver 3.2.1)</i>
//                         </mark>
//                         , was completed according to the instructions therein
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         <input type="checkbox" defaultChecked />
//                       </View>
//                       <View>
//                         All information within the above-referenced SAQ and in this
//                         attestation fairly represents the results of my assessment
//                         in all material respects.
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         <input type="checkbox" />
//                       </View>
//                       <View>
//                         I have confirmed with my payment application vendor that my
//                         payment system does not store sensitive authentication data
//                         after authorization.
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         <input type="checkbox" defaultChecked />
//                       </View>
//                       <View>
//                         I have read the PCI DSS and I recognize that I must maintain
//                         PCI DSS compliance, as applicable to my environment, at all
//                         times.
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         <input type="checkbox" defaultChecked />
//                       </View>
//                       <View>
//                         If my environment changes, I recognize I must reassess my
//                         environment and implement any additional PCI DSS
//                         requirements that apply.{" "}
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//                 <View className="page-break">
//                   <img
//                     src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                     alt="logo"
//                     style={{ width: "100px" }}
//                   />
//                   <View>
//                     <View>
//                       <View>
//                         <View
//                           colSpan={2}
//                           style={{
//                             backgroundColor: "rgb(34, 100, 134)",
//                             color: "#fff",
//                           }}
//                         >
//                           Part 3. PCI DSS Validation<i>(continued)</i>
//                         </View>
//                       </View>
//                       <View>
//                         <View colSpan={2}>
//                           Part 3a. Acknowledgement of Status (continued)
//                         </View>
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         <View>
//                           <input type="checkbox" defaultChecked />
//                         </View>
//                         <View>
//                           No evidence of full track data, CAV2, CVC2, CVN2, CVV2, or
//                           CID data, or PIN data storage after transaction
//                           authorization was found on ANY system reviewed during this
//                           assessment.
//                         </View>
//                       </View>
//                       <View>
//                         <View>
//                           <input type="checkbox" />
//                         </View>
//                         <View>
//                           {" "}
//                           ASV scans are being completed by the PCI SSC Approved
//                           Scanning Vendor{" "}
//                           <i>
//                             <mark style={{ backgroundColor: "rgb(200, 191, 191)" }}>
//                               (ASV Name)
//                             </mark>
//                           </i>
//                         </View>
//                       </View>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <View>
//                         <View colSpan={2}>Part 3b. Merchant Attestation</View>
//                       </View>
//                       <View>
//                         <View
//                           colSpan={2}
//                           style={{
//                             // backgroundColor: "white",
//                             // height: "65px",
//                             textAlign: "center",
//                           }}
//                         ><img
//                             src={apiImage}
//                             alt="edit"
//                           // sx={{ maxHeight: "100px", mt: 2, ml: 2 }}
//                           />

//                         </View>
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         <View>
//                           <i>
//                             Signature of Merchant Executive Officer{" "}
//                             <i className="fas fa-arrow-up" />
//                           </i>{" "}
//                         </View>
//                         <View>
//                           <i>Date:</i>
//                           <span>{allData && allData[21]?.submissionDate}</span></View>
//                       </View>
//                       <View>
//                         <View>
//                           <i>Merchant Executive Officer Name:</i>
//                           <span style={{ marginLeft: '20px' }}>{allData && allData[21]?.partResponse && JSON.parse(allData[21].partResponse).executiveName}</span>
//                         </View>
//                         <View>
//                           {" "}
//                           <i>Title: </i><span >{allData && allData[21]?.partResponse && JSON.parse(allData[21].partResponse).executiveTitle}</span>
//                         </View>
//                       </View>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <View>
//                         <View colSpan={2}>
//                           Part 3c. Qualified Security Assessor (QSA) Acknowledgement
//                           (if applicable)
//                         </View>
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         <View style={{ width: "50%" }}>
//                           If a QSA was involved or assisted with this assessment,
//                           describe the role performed:{" "}
//                         </View>
//                         <View>
//                           <input
//                             type="text"
//                             style={{
//                               padding: "0px",
//                               margin: "0px",
//                               height: "20px",
//                               width: "20%",
//                             }}
//                           />
//                         </View>
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         <View
//                           colSpan={2}
//                           style={{ backgroundColor: "white", height: "65px" }}
//                         ></View>
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         <View>
//                           <i>
//                             Signature of Duly Authorized Officer of QSA Company{" "}
//                           </i>{" "}
//                           <i className="fas fa-arrow-up" />
//                         </View>
//                         <View>
//                           <i>Date:</i>{" "}
//                           <input
//                             type="text"
//                             style={{
//                               padding: "0px",
//                               margin: "0px",
//                               height: "20px",
//                               width: "20%",
//                             }}
//                           />{" "}
//                         </View>
//                       </View>
//                       <View>
//                         <View>
//                           <i>Duly Authorized Officer Name:</i>
//                         </View>
//                         <View>
//                           {" "}
//                           <i>QSA Company</i>:{" "}
//                           <input
//                             type="text"
//                             style={{
//                               padding: "0px",
//                               margin: "0px",
//                               height: "20px",
//                               width: "20%",
//                             }}
//                           />
//                         </View>
//                       </View>
//                     </View>
//                   </View>
//                   <View>
//                     <View>
//                       <View>
//                         <View colSpan={2}>
//                           Part 3d. Internal Security Assessor (ISA) Involvement (if
//                           applicable)
//                         </View>
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         <View style={{ width: "50%" }}>
//                           If an ISA(s) was involved or assisted with this
//                           assessment, identify the ISA personnel and describe the
//                           role performed:
//                         </View>
//                         <View>
//                           <input
//                             type="text"
//                             style={{
//                               padding: "2px",
//                               margin: "2px",
//                               height: "18px",
//                               width: "18%",
//                             }}
//                           />
//                           <br />
//                           <input
//                             type="text"
//                             style={{
//                               padding: "2px",
//                               margin: "2px",
//                               height: "18px",
//                               width: "18%",
//                             }}
//                           />
//                           <br />
//                           <input
//                             type="text"
//                             style={{
//                               padding: "2px",
//                               margin: "2px",
//                               height: "18px",
//                               width: "18%",
//                             }}
//                           />
//                           <br />
//                           <input
//                             type="text"
//                             style={{
//                               padding: "2px",
//                               margin: "2px",
//                               height: "18px",
//                               width: "18%",
//                             }}
//                           />
//                         </View>
//                       </View>
//                     </View>
//                   </View>
//                   <p>
//                     Data encoded in the magnetic stripe or equivalent data on a chip
//                     used for authorization during a card-present transaction.
//                     Entities may not retain full track data after transaction
//                     authorization. The only elements of track data that may be
//                     retained are primary account number (PAN), expiration date, and
//                     cardholder name.
//                   </p>
//                   <p>
//                     The three- or four-digit value printed by the signature panel or
//                     on the face of a payment card used to verify card-not-present
//                     transactions.
//                   </p>
//                   <p>
//                     {" "}
//                     Personal identification number entered by cardholder during a
//                     card-present transaction, and/or encrypted PIN block present
//                     within the transaction message.
//                   </p>
//                 </View>
//                 <View className="page-break">
//                   <img
//                     src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
//                     alt="logo"
//                     style={{ width: "100px" }}
//                   />
//                   <View>
//                     <View>
//                       <View>
//                         <View
//                           colSpan={2}
//                           style={{ backgroundColor: "#2e878d", color: "#fff" }}
//                         >
//                           Part 4. Action Plan for Non-Compliant Requirements
//                         </View>
//                       </View>
//                       <View>
//                         <View
//                           colSpan={2}
//                           style={{
//                             backgroundColor: "white",
//                             height: "115px",
//                             fontWeight: 100,
//                           }}
//                         >
//                           Select the appropriate response for “Compliant to PCI DSS
//                           Requirements” for each requirement. If you answer “No” to
//                           any of the requirements, you may be required to provide
//                           the date your Company expects to be compliant with the
//                           requirement and a brief description of the actions being
//                           taken to meet the requirement.
//                           <br /> <br />
//                           <i>
//                             Check with your acquirer or the payment brand(s) before
//                             completing Part 4.
//                           </i>
//                         </View>
//                       </View>
//                     </View>
//                   </View>
//                   <View style={{ marginTop: "-12px" }}>
//                     <View>
//                       <View>
//                         <View rowSpan={2} style={{ textAlign: "center" }}>
//                           PCI DSS Requirement*
//                         </View>
//                         <View rowSpan={2} style={{ textAlign: "center" }}>
//                           Description of Requirement*
//                         </View>
//                         <View
//                           colSpan={2}
//                           className="response-checkbox"
//                           style={{ textAlign: "center" }}
//                         >
//                           Compliant to PCI DSS Requirements
//                           <br />
//                           <span style={{ fontWeight: 100 }}>(Select One)</span>
//                         </View>
//                         <View rowSpan={2} style={{ textAlign: "center" }}>
//                           Remediation Date and Actions <br />
//                           <span style={{ fontWeight: 100 }}>
//                             (If “NO” selected for any Requirement)
//                           </span>
//                         </View>
//                       </View>
//                       <View>
//                         <View style={{ textAlign: "center" }}>Yes</View>
//                         <View style={{ textAlign: "center" }}>No</View>
//                       </View>
//                     </View>
//                     <View>
//                       <View>
//                         <View style={{ textAlign: "center" }}>2</View>
//                         <View>
//                           Do not use vendor-supplied defaults for system passwords
//                           and other security parameters.
//                         </View>
//                         <View style={{ textAlign: "center" }}>
//                           <input type="checkbox" defaultChecked />
//                         </View>
//                         <View style={{ textAlign: "center" }}>
//                           <input type="checkbox" />
//                         </View>
//                         <View />
//                       </View>
//                       <View>
//                         <View style={{ textAlign: "center" }}>6</View>
//                         <View>
//                           Develop and maintain secure systems and applications.
//                         </View>
//                         <View style={{ textAlign: "center" }}>
//                           <input type="checkbox" defaultChecked />
//                         </View>
//                         <View style={{ textAlign: "center" }}>
//                           <input type="checkbox" />
//                         </View>
//                         <View />
//                       </View>
//                       <View>
//                         <View style={{ textAlign: "center" }}>8</View>
//                         <View>
//                           Identify and authenticate access to system components..
//                         </View>
//                         <View style={{ textAlign: "center" }}>
//                           <input type="checkbox" defaultChecked />
//                         </View>
//                         <View style={{ textAlign: "center" }}>
//                           <input type="checkbox" />
//                         </View>
//                         <View />
//                       </View>
//                       <View>
//                         <View style={{ textAlign: "center" }}>9</View>
//                         <View>Restrict physical access to cardholder data</View>
//                         <View style={{ textAlign: "center" }}>
//                           <input type="checkbox" defaultChecked />
//                         </View>
//                         <View style={{ textAlign: "center" }}>
//                           <input type="checkbox" />
//                         </View>
//                         <View />
//                       </View>
//                       <View>
//                         <View style={{ textAlign: "center" }}>12</View>
//                         <View>
//                           Maintain a policy that addresses information security for
//                           all personnel
//                         </View>
//                         <View style={{ textAlign: "center" }}>
//                           <input type="checkbox" defaultChecked />
//                         </View>
//                         <View style={{ textAlign: "center" }}>
//                           <input type="checkbox" />
//                         </View>
//                         <View />
//                       </View>
//                     </View>
//                   </View>
//                   <p>
//                     *
//                     <i>
//                       {" "}
//                       PCI DSS Requirements indicated here refer to the questions in
//                       Section 2 of the SAQ.
//                     </i>
//                   </p>
//                   <View
//                     className="logo"
//                     style={{
//                       marginTop: "300px",
//                       marginLeft: "100px",
//                       display: "flex",
//                     }}
//                   >
//                     <img
//                       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxqzQva-C1IKxyT5v7XeaC5n7BimY1gJj6OfdLlYxJfOmeD0Rlp6Fs&usqp=CAE&s"
//                       style={{
//                         marginLeft: "50px",
//                         width: "120px",
//                         height: "100px",
//                         marginTop: "10px",
//                       }}
//                     />
//                     <img
//                       src="https://www.discoverglobalnetwork.com/content/dam/discover/en_us/dgn/images/global/logos/discover-global-network-logo.svg"
//                       style={{ marginLeft: "40px" }}
//                     />
//                     <img
//                       src="https://www.global.jcb/en/common/images/svg/jcb_emblem_logo.svg"
//                       width="120px"
//                       height="120px"
//                       style={{ marginLeft: "40px" }}
//                     />
//                     <img
//                       src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAgCAMAAABq4atUAAAApVBMVEX3nhvrABv/////XwD+8fLtGjLsDSbtJDv/+fHzKA/+VwLuLkTwQlb7zYn+7dX94uXrBR/83KvxHhL9cAf94rv3pCv+aQT82KP6iBH95sT4n6nxUGL1go/7zNH5vmb4r0T4qzv5tE7yXW72jZn0c4H4p7D/9eb+6ev3YUb81JruDhb7ewzzZ3f7TQX5jxT3oSP3lhj5srruKT/2NQv4bFH6vmf+8d0ofNcMAAABMUlEQVQ4jZ2V6XaCMBCFhyRCrMpSwaVWFKtW7GJbte//aG0KQuxMwpH7i5PDdyZzMwuwSuJh1uuErtd/nFdnMkoXCSTLbODXPzK4fASr0KnkPQl1Nk2h1jL6D4m1hii5G7bN4FqZfwU99xykHWBFGjTvYOaeDwlqUEEByXCSyktIfGFmz5VeCCouoFfMOG9/EH/HUCIVFBBMt2D4iE4L2IqA7kqITzB0kAyEJRAdasxgY85I6QNDKQPqdjVD3w+IWthrEOW6D4aHvYh64Bjc26FxE0TaB16b6/XbGEFVnt1ykPBJQPbHzX5rj3DCXkZ5m4LdqtYIMdTYGmxtDkUEKprw1naXU+Ng6ZpKyDrCjnxE2J03DMvTARunD8t2Y1klNmtYAIsYbw3TqjmXq+ZbWzU/CLUYCqjQWk0AAAAASUVORK5CYII="
//                       style={{
//                         marginLeft: "40px",
//                         width: "70px",
//                         height: "40px",
//                         marginTop: "30px",
//                       }}
//                     />
//                     <img
//                       width="120px"
//                       height="120px"
//                       src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UnionPay_logo.svg/800px-UnionPay_logo.svg.png"
//                       style={{
//                         marginLeft: "40px",
//                         width: "80px",
//                         height: "70px",
//                         marginTop: "10px",
//                       }}
//                     />
//                     <img
//                       src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAAAoCAMAAACbzBeiAAAAgVBMVEX///8UNMsAKsoAHch6hdzP0fEOMcsAJckAJ8kAFccAI8kALMr09fwAAMYAGsgAEcfq7PmJkd+kquX6+v7S1fKXnuJ1gNu3vOuLlN/KzfDi5Pe9weyus+hpddghO8xjcNc2Ss/Z3PQ9T9BSYdRDVdGBi92cpOQqQs5XZtXEx+5ea9ah6SEzAAACi0lEQVRIie1UWYKqMBAMiWwJCQiKioqi6Ojc/4DTSwDhAu99WD8ksbt6q1aIL774HxBe6npF2FbD2xqva/7WO3rKykurdXDfHwajEo3q0Ud0ZW+VBOjAvzQWbvlJCIffIz49rDZREEQmsQUb1Sn62O4zp2KvAoALfToJXBRESOGbg1/WxoFH5IMVOV31aV7dG4niki8SIidQ1kl7v5tEhljr2Mgz2+wT4pGrRZta8JU1HY/ImTdCrMDdXITYOXgw7fN9LM/2OcVC8uuC5wE+0Q8d7wa8XnC4gm0Mfhcz/iYqbs9OYbOAKK3mPEc9PFLl7g0ueFDQs5/IE0/oI2A+A5HbzHkyi96drzxq4RBifS5jnkDvP6w7CCHXp3jq6Qgsgrqf+GrEM/bl1JJG075HY3xx3Qb6Zs4LHhy2fPjJpZCFwLSp9Q3POHJ945uUU8qV85l/4oCd64V4Dd7CDBmKt+XpmJzFXUIzky3XYLM5D3U15i7n3dhv1mtzVcxkSaqgKhIGDlkd5jw4giAtttjlGyWhWdWMXUSSpjIOztvswCTeLniQQR9xNpqyp7n1Hw2k3cE1+YXSk2eVZRvFQp0hpCiGqkOgHOX6cxKSCy1w7YIkTVNijhc8laI1BAtWCi4DZzaURlJthtUakBYLIkxgSB1a69hLhD3rpmlJjiywD+jjgufJfw7md4ru4FAqld9+z7eUaLa0WoFMCWpKf0LniMfxIHGmtFQox8gYSkJeea5yBV0GkKLvCx6hx8kK1hhqTURjGSDoilZr2k4MnSx5XrlSyvLiZRbPuPUX63QiZaLzFrt+BiM3uvYpWDULniYEHPgPJTtM581pv1rtd2yO72E3c1kO7Isv/hH+AKvCJSx1FolpAAAAAElFTkSuQmCC"
//                       style={{
//                         marginLeft: "40px",
//                         width: "70px",
//                         height: "70px",
//                         marginTop: "10px",
//                       }}
//                     />
//                   </View>
//                 </View>
//               </View>
//             </View>


//           </View>

//         </View>
//       </View>
//     </Page>
//   </Document>
// );




// const handleDownloadPdf = async (allData,apiImage,isValidJson) => {
//   const blob = await pdf(<MyDocument allData={allData} apiImage={apiImage} isValidJson={isValidJson}/>).toBlob();
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = 'download.pdf';
//   link.click();
// };


export default function Pdf() {
  const { pdfData } = useContext(pdfContext);
  console.log("pp", pdfData);
  const [allData, setAllData] = useState([]);
  const [apiImage, setApiImage] = useState(null);
  const pdfRef = useRef(null);
  const[data,setData]=useState('');


 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://hdfcbackend-dev.eba-2dfdccz5.us-east-1.elasticbeanstalk.com/api/GetFormDataByFormId?FormId=${pdfData.formID}`);
        const data1 = await response.json();
        setData(data1.data.htmlFileContent);
        // console.log("data:", data);
      } catch (error) {
        console.error('Error fetching HTML:', error);
      }
    };
  
    fetchData();
  }, [pdfData]);
  console.log("data",data);



  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}GetFormDataByFormIdAndMerchantId?formId=${pdfData.formID}&merchantId=${pdfData.merchantID}`)
  //     const result = await response.json();
  //     setAllData(result.data);
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   fetchData(pdfData, setAllData);
  //   fetchImage(pdfData,setApiImage) // Call fetchData here
  // }, [pdfData])
  // useEffect(() => {
  //   const fetchImage = async () => {
  //     const apiurl = `${BASE_URL}ImageUpload/GetImage?formId=${pdfData.formID}&merchantId=${pdfData.merchantID}`;

  //     try {
  //       const response = await fetch(apiurl);
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const blob = await response.blob();
  //       const imageUrl = URL.createObjectURL(blob);
  //       setApiImage(imageUrl);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchImage();
  // }, [pdfData]);
  console.log(allData);



  // function isValidJson(jsonString) {
  //   try {
  //     JSON.parse(jsonString);
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // }

return (
  <>
      <div dangerouslySetInnerHTML={{ __html:data }} />

  </>
)


  // return (

  //   <>
  //     <button onClick={()=>handleDownloadPdf(allData,apiImage)} >pdf</button>
  //     <div id="pdf-content" style={{ backgroundColor: 'white', color: 'black' }}>
  //       <div>

  //         <div style={{ textAlign: "right" }}>
  //           <img
  //             src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //             alt="logo"
  //             style={{ width: "100px" }}
  //           />
  //         </div>
  //         <div
  //           style={{
  //             display: "flex",
  //             justifyContent: "left",
  //             marginBottom: "120px",
  //             marginLeft: "30px",
  //             marginTop: "100px",
  //           }}
  //         >
  //           <div>
  //             <h2>
  //               Payment Card Industry (PCI) <br />
  //               Data Security Standard
  //             </h2>
  //             <h1>
  //               <span style={{ fontSize: "34px" }}>
  //                 Self-Assessment Questionnaire A
  //               </span>
  //               <br />
  //               and Attestation of Compliance{" "}
  //             </h1>
  //           </div>
  //         </div>
  //         <hr />
  //         <div style={{ marginLeft: "30px", marginBottom: "110px" }}>
  //           <h1>
  //             Card-not-present Merchants, <br />
  //             All Cardholder Data Functions Fully Outsourced
  //           </h1>
  //           <h4 style={{ fontSize: "26px", marginTop: "-12px" }}>
  //             For use with PCI DSS Version 3.2.1
  //           </h4>
  //           <pre
  //             style={{
  //               fontSize: "20px",
  //               marginTop: "-12px",
  //               fontFamily: "Arial, Helvetica, sans-serif",
  //             }}
  //           >
  //             Revision 2{"\n"}September 2022{"  "}
  //             {"\n"}
  //             {"                    "}
  //           </pre>
  //         </div>
  //         <div id="document-changes" className="document_changes page-break">
  //           <img
  //             src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //             alt="logo"
  //             style={{ width: "100px" }}
  //           />
  //           <h2>Document Changes</h2>
  //           <hr />
  //           <table>
  //             <thead>
  //               <tr>
  //                 <th style={{ textAlign: "center" }}>Date</th>
  //                 <th style={{ textAlign: "center" }}>PCI DSS Version</th>
  //                 <th style={{ textAlign: "center" }}>SAQ Revision</th>
  //                 <th style={{ textAlign: "center" }}>Description</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               <tr>
  //                 <td style={{ textAlign: "center" }}>October 2008</td>
  //                 <td style={{ textAlign: "center" }}>1.2</td>
  //                 <td />
  //                 <td>
  //                   To align content with new PCI DSS v1.2 and to implement minor
  //                   changes noted since original v1.1.
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td style={{ textAlign: "center" }}>October 2010</td>
  //                 <td style={{ textAlign: "center" }}>2.0</td>
  //                 <td />
  //                 <td>
  //                   To align content with new PCI DSS v2.0 requirements and
  //                   testing procedures.
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td style={{ textAlign: "center" }}>February 2014</td>
  //                 <td style={{ textAlign: "center" }}>3.0</td>
  //                 <td />
  //                 <td>
  //                   To align content with PCI DSS v3.0 requirements and testing
  //                   procedures and incorporate additional response options.
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td style={{ textAlign: "center" }}>April 2015</td>
  //                 <td style={{ textAlign: "center" }}>3.1</td>
  //                 <td />
  //                 <td>
  //                   Updated to align with PCI DSS v3.1. For details of PCI DSS
  //                   changes, see
  //                   <i>
  //                     {" "}
  //                     PCI DSS Summary of Changes from PCI DSS Version 3.0 to
  //                     3.1.
  //                   </i>
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td style={{ textAlign: "center" }}>July 2015</td>
  //                 <td style={{ textAlign: "center" }}>3.1</td>
  //                 <td style={{ textAlign: "center" }}>1.1</td>
  //                 <td>Updated version numbering to align with other SAQs.</td>
  //               </tr>
  //               <tr>
  //                 <td style={{ textAlign: "center" }}>April 2016</td>
  //                 <td style={{ textAlign: "center" }}>3.2</td>
  //                 <td style={{ textAlign: "center" }}>1.0</td>
  //                 <td>
  //                   Updated to align with PCI DSS v3.2. For details of PCI DSS
  //                   changes, see{" "}
  //                   <i>
  //                     PCI DSS – Summary of Changes from PCI DSS Version 3.1 to
  //                     3.2.
  //                   </i>{" "}
  //                   Requirements added from PCI DSS v3.2 Requirements 2, 8, and
  //                   12.
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td style={{ textAlign: "center" }}>January 2017</td>
  //                 <td style={{ textAlign: "center" }}>3.2</td>
  //                 <td style={{ textAlign: "center" }}>1.1</td>
  //                 <td>
  //                   Updated Document Changes to clarify requirements added in the
  //                   April 2016 update. Added note to Before You Begin section to
  //                   clarify intent of inclusion of PCI DSS Requirements 2 and 8.
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td style={{ textAlign: "center" }}>June 2018</td>
  //                 <td style={{ textAlign: "center" }}>3.2.1</td>
  //                 <td style={{ textAlign: "center" }}>1.0</td>
  //                 <td>
  //                   Updated to align with PCI DSS v3.2.1. For details of PCI DSS
  //                   changes, see{" "}
  //                   <i>
  //                     PCI DSS – Summary of Changes from PCI DSS Version 3.2 to
  //                     3.2.1.
  //                   </i>{" "}
  //                   Added Requirement 6.2 from PCI DSS v3.2.1.
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td style={{ textAlign: "center" }}>September 2022</td>
  //                 <td style={{ textAlign: "center" }}>3.2.1</td>
  //                 <td style={{ textAlign: "center" }}>2.0</td>
  //                 <td>
  //                   Updated to reflect the inclusion of UnionPay as a
  //                   Participating Payment Brand. This document aligns with PCI DSS
  //                   v3.2.1 r1.
  //                 </td>
  //               </tr>
  //             </tbody>
  //           </table>
  //         </div>
  //         <div
  //           style={{ marginTop: "80px" }}
  //           className="table_of_content page-break"
  //         >
  //           <img
  //             src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //             alt="logo"
  //             style={{ width: "100px" }}
  //           />
  //           <table>
  //             <thead>
  //               <tr>
  //                 <th>Table of Contents</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               <tr>
  //                 <td>
  //                   <a href="#document-changes">Document Changes</a>{" "}
  //                   <span>i</span>
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a href="#before-you-begin">Before You Begin</a> iii
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a href="#pci-dss-self-assessment">
  //                     PCI DSS Self-Assessment Completion Steps
  //                   </a>{" "}
  //                   iv
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a href="#understanding-saq">
  //                     Understanding the Self-Assessment Questionnaire
  //                   </a>{" "}
  //                   iv
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a
  //                     style={{ marginLeft: "18px", color: "black" }}
  //                     href="#expected-testing"
  //                   >
  //                     <i>Expected Testing</i>
  //                   </a>{" "}
  //                   iv
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a href="#completing-saq">
  //                     Completing the Self-Assessment Questionnaire
  //                   </a>{" "}
  //                   v
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a href="#guidance-non-applicability">
  //                     Guidance for Non-Applicability of Certain, Specific
  //                     Requirements
  //                   </a>{" "}
  //                   v
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a href="#legal-exception">Legal Exception</a> v
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a href="#section-1">Section 1: Assessment Information</a> 1
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a href="#section-2">
  //                     Section 2: Self-Assessment Questionnaire A
  //                   </a>{" "}
  //                   4
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a href="#build-maintain-network">
  //                     Build and Maintain a Secure Network and Systems
  //                   </a>{" "}
  //                   4
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a
  //                     style={{ marginLeft: "18px", color: "black" }}
  //                     href="#requirement-2"
  //                   >
  //                     <i>
  //                       Requirement 2: Do not use vendor-supplied defaults for
  //                       system passwords and other security parameters
  //                     </i>
  //                   </a>{" "}
  //                   4
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a href="#maintains">
  //                     Maintain a Vulnerability Management Program
  //                   </a>{" "}
  //                   5
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a
  //                     style={{ marginLeft: "18px", color: "black" }}
  //                     href="#requirement-6"
  //                   >
  //                     <i>
  //                       Requirement 6: Develop and maintain secure systems and
  //                       applications
  //                     </i>
  //                   </a>{" "}
  //                   5
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a href="#measure">
  //                     Implement Strong Access Control Measures
  //                   </a>{" "}
  //                   6
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a
  //                     style={{ marginLeft: "18px", color: "black" }}
  //                     href="#requirement-8"
  //                   >
  //                     <i>
  //                       Requirement 8: Identify and authenticate access to system
  //                       components
  //                     </i>
  //                   </a>{" "}
  //                   6
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a style={{ color: "black" }} href="#requirement-9">
  //                     <i>
  //                       Requirement 9: Restrict physical access to cardholder data
  //                     </i>
  //                   </a>{" "}
  //                   7
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a href="#maintain">
  //                     Maintain an Information Security Policy
  //                   </a>{" "}
  //                   9
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a
  //                     style={{ marginLeft: "18px", color: "black" }}
  //                     href="#requirement-12"
  //                   >
  //                     <i>
  //                       Requirement 12: Maintain a policy that addresses
  //                       information security for all personnel
  //                     </i>
  //                   </a>{" "}
  //                   9
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a href="#appendix-a">
  //                     Appendix A: Additional PCI DSS Requirements
  //                   </a>{" "}
  //                   11
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a
  //                     style={{ marginLeft: "18px", color: "black" }}
  //                     href="#appendix-a1"
  //                   >
  //                     <i>
  //                       Appendix A1: Additional PCI DSS Requirements for Shared
  //                       Hosting Providers
  //                     </i>
  //                   </a>{" "}
  //                   11
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a
  //                     style={{ marginLeft: "18px", color: "black" }}
  //                     href="#appendix-a2"
  //                   >
  //                     <i>
  //                       Appendix A2: Additional PCI DSS Requirements for Entities
  //                       using SSL/early TLS for Card-Present POS POI terminal
  //                       connections
  //                     </i>
  //                   </a>{" "}
  //                   11
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a
  //                     style={{ marginLeft: "18px", color: "black" }}
  //                     href="#appendix-a3"
  //                   >
  //                     <i>
  //                       Appendix A3: Designated Entities Supplemental Validation
  //                       (DESV)
  //                     </i>
  //                   </a>{" "}
  //                   11
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a href="#appendix-b">
  //                     Appendix B: Compensating Controls Worksheet
  //                   </a>{" "}
  //                   12
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a href="#appendix-c">
  //                     Appendix C: Explanation of Non-Applicability
  //                   </a>{" "}
  //                   13
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <a href="#section-3">
  //                     Section 3: Validation and Attestation Details
  //                   </a>{" "}
  //                   14
  //                 </td>
  //               </tr>
  //             </tbody>
  //           </table>
  //         </div>
  //         <div className="before_you_begin page-break" id="before-you-begin">
  //           <img
  //             src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //             alt="logo"
  //             style={{ width: "100px" }}
  //           />
  //           <h1 style={{ marginTop: "80px" }}>Before You Begin</h1>
  //           <hr />
  //           <p>
  //             SAQ A has been developed to address requirements applicable to
  //             merchants whose cardholder data functions are completely outsourced
  //             to validated third parties, where the merchant retains only paper
  //             reports or receipts with cardholder data.
  //           </p>
  //           <p>
  //             SAQ A merchants may be either e-commerce or mail/telephone-order
  //             merchants (card-not-present), and do not store, process, or transmit
  //             any cardholder data in electronic format on their systems or
  //             premises.
  //           </p>
  //           <p>SAQ A merchants confirm that, for this payment channel:</p>
  //           <ul>
  //             <li>
  //               Your company accepts only card-not-present (e-commerce or
  //               mail/telephone-order) transactions;
  //             </li>
  //             <li>
  //               All processing of cardholder data is entirely outsourced to PCI
  //               DSS validated third-party service providers;
  //             </li>
  //             <li>
  //               Your company does not electronically store, process, or transmit
  //               any cardholder data on your systems or premises, but relies
  //               entirely on a third party(s) to handle all these functions;
  //             </li>
  //             <li>
  //               Your company has confirmed that all third party(s) handling
  //               storage, processing, and/or transmission of cardholder data are
  //               PCI DSS compliant; and
  //             </li>
  //             <li>
  //               Any cardholder data your company retains is on paper (for example,
  //               printed reports or receipts), and these documents are not received
  //               electronically.
  //             </li>
  //           </ul>
  //           <p>Additionally, for e-commerce channels:</p>
  //           <ul>
  //             <li>
  //               All elements of the payment page(s) delivered to the consumer’s
  //               browser originate only and directly from a PCI DSS validated
  //               third-party service provider(s).
  //             </li>
  //           </ul>
  //           <p style={{ textAlign: "center" }}>
  //             <b>
  //               <i>This SAQ is not applicable to face-to-face channels.</i>
  //             </b>
  //           </p>
  //           <p>
  //             This shortened version of the SAQ includes questions that apply to a
  //             specific type of small merchant environment, as defined in the above
  //             eligibility criteria. If there are PCI DSS requirements applicable
  //             to your environment that are not covered in this SAQ, it may be an
  //             indication that this SAQ is not suitable for your environment.
  //             Additionally, you must still comply with all applicable PCI DSS
  //             requirements in order to be PCI DSS compliant.
  //           </p>
  //           <p>
  //             <mark style={{ backgroundColor: "rgb(245, 241, 241)" }}>
  //               <strong>Note:</strong>
  //               <i>
  //                 {" "}
  //                 For this SAQ, PCI DSS Requirements that address the protection
  //                 of computer systems (for example, Requirements 2, 6, and 8)
  //                 apply to e-commerce merchants that redirect customers from their
  //                 website to a third party for payment processing, and
  //                 specifically to the merchant web server upon which the
  //                 redirection mechanism is located. Mail order/telephone order
  //                 (MOTO) or e-commerce merchants that have completely outsourced
  //                 all operations (where there is no redirection mechanism from the
  //                 merchant to the third party) and therefore do not have any
  //                 systems in scope for this SAQ, would consider these requirements
  //                 to be “not applicable.” Refer to guidance on the following pages
  //                 for how to report requirements that are not applicable.
  //               </i>
  //             </mark>
  //           </p>
  //         </div>
  //         <div className="PCI DSS page-break" id="pci-dss-self-assessment">
  //           <img
  //             src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //             alt="logo"
  //             style={{ width: "100px" }}
  //           />
  //           <h1>PCI DSS Self-Assessment Completion Steps</h1>
  //           <ol>
  //             <li>
  //               Identify the applicable SAQ for your environment⎯refer to the{" "}
  //               <i>Self-Assessment Questionnaire Instructions and Guidelines</i>{" "}
  //               document on{" "}
  //               <a href="https://www.pcisecuritystandards.org/">
  //                 PCI SSC website
  //               </a>{" "}
  //               for information.
  //             </li>
  //             <li>
  //               Confirm that your environment is properly scoped and meets the
  //               eligibility criteria for the SAQ you are using (as defined in Part
  //               2g of the Attestation of Compliance).
  //             </li>
  //             <li>
  //               Assess your environment for compliance with applicable PCI DSS
  //               requirements.
  //             </li>
  //             <li>
  //               Complete all sections of this document:
  //               <ul>
  //                 <li>
  //                   Section 1 (Parts 1 &amp; 2 of the AOC) – Assessment
  //                   Information and Executive Summary
  //                 </li>
  //                 <li>
  //                   Section 2 – PCI DSS Self-Assessment Questionnaire (SAQ A)
  //                 </li>
  //                 <li>
  //                   Section 3 (Parts 3 &amp; 4 of the AOC) – Validation and
  //                   Attestation Details and Action Plan for Non-Compliant
  //                   Requirements (if applicable)
  //                 </li>
  //               </ul>
  //             </li>
  //             <li>
  //               Submit the SAQ and Attestation of Compliance (AOC), along with any
  //               other requested documentation—such as ASV scan reports—to your
  //               acquirer, payment brand, or other requester.
  //             </li>
  //           </ol>
  //           <h2 id="understanding-saq">
  //             Understanding the Self-Assessment Questionnaire
  //           </h2>
  //           <p>
  //             The questions contained in the “PCI DSS Question” column in this
  //             self-assessment questionnaire are based on the requirements in the
  //             PCI DSS.
  //           </p>
  //           <p>
  //             Additional resources that provide guidance on PCI DSS requirements
  //             and how to complete the self-assessment questionnaire have been
  //             provided to assist with the assessment process. An overview of some
  //             of these resources is provided below:
  //           </p>
  //           <table>
  //             <thead>
  //               <tr>
  //                 <th style={{ backgroundColor: "#384d59", color: "#fff" }}>
  //                   Document
  //                 </th>
  //                 <th style={{ backgroundColor: "#384d59", color: "#fff" }}>
  //                   Includes
  //                 </th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               <tr>
  //                 <td>
  //                   PCI DSS
  //                   <i>
  //                     (PCI Data Security Standard Requirements and Security
  //                     Assessment Procedures)
  //                   </i>
  //                 </td>
  //                 <td>
  //                   <li>Guidance on Scoping</li>
  //                   <li>Guidance on the intent of all PCI DSS Requirements</li>
  //                   <li>Details of testing procedures</li>
  //                   <li>Guidance on Compensating Controls</li>
  //                 </td>
  //               </tr>
  //               <tr></tr>
  //               <tr>
  //                 <td>SAQ Instructions and Guidelines documents</td>
  //                 <td>
  //                   <li>
  //                     Information about all SAQs and their eligibility criteria
  //                   </li>
  //                   <li>
  //                     How to determine which SAQ is right for your organization
  //                   </li>
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <i>
  //                     PCI DSS and PA-DSS Glossary of Terms, Abbreviations, and
  //                     Acronyms
  //                   </i>
  //                 </td>
  //                 <td>
  //                   <li>
  //                     Descriptions and definitions of terms used in the PCI DSS
  //                     and self-
  //                     <span style={{ marginLeft: "20px" }}>
  //                       assessment questionnaires
  //                     </span>
  //                   </li>
  //                 </td>
  //               </tr>
  //             </tbody>
  //           </table>
  //           <p>
  //             These and other resources can be found on the{" "}
  //             <a href="https://www.pcisecuritystandards.org/">
  //               <i>PCI SSC website</i>
  //             </a>
  //             . Organizations are encouraged to review the PCI DSS and other
  //             supporting documents before beginning an assessment.
  //           </p>
  //           <h2 id="expected-testing">
  //             <i>Expected Testing</i>
  //           </h2>
  //           <p>
  //             The instructions provided in the “Expected Testing” column are based
  //             on the testing procedures in the PCI DSS and provide a high-level
  //             description of the types of testing activities that should be
  //             performed to verify that a requirement has been met. Full details of
  //             testing procedures for each requirement can be found in the PCI DSS.
  //           </p>
  //         </div>
  //         <div className="completing page-break" id="completing-saq">
  //           <img
  //             src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //             alt="logo"
  //             style={{ width: "100px" }}
  //           />
  //           <h2>Completing the Self-Assessment Questionnaire</h2>
  //           <p>
  //             For each question, there is a choice of responses to indicate your
  //             company’s status regarding that requirement.
  //             <b>
  //               {" "}
  //               <i>Only one response should be selected for each question.</i>
  //             </b>{" "}
  //           </p>
  //           <p>
  //             A description of the meaning for each response is provided in the
  //             table below:
  //           </p>
  //           <table>
  //             <thead>
  //               <tr>
  //                 <th
  //                   style={{
  //                     backgroundColor: "#384d59",
  //                     color: "#fff",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   Response
  //                 </th>
  //                 <th
  //                   style={{
  //                     backgroundColor: "#384d59",
  //                     color: "#fff",
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   When to use this response:
  //                 </th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               <tr>
  //                 <td style={{ textAlign: "center" }}>
  //                   <b>Yes</b>
  //                 </td>
  //                 <td>
  //                   The expected testing has been performed, and all elements of
  //                   the requirement have been met as stated.
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td style={{ textAlign: "center" }}>
  //                   <b>Yes with CCW</b> <br />
  //                   (Compensating Control Worksheet)
  //                 </td>
  //                 <td>
  //                   {" "}
  //                   The expected testing has been performed, and the requirement
  //                   has been met with the assistance of a compensating control.
  //                   All responses in this column require completion of a
  //                   Compensating Control Worksheet (CCW) in Appendix B of the SAQ.
  //                   Information on the use of compensating controls and guidance
  //                   on how to complete the worksheet is provided in the PCI DSS.
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td style={{ textAlign: "center" }}>
  //                   <b>No</b>
  //                 </td>
  //                 <td>
  //                   Some or all elements of the requirement have not been met, or
  //                   are in the process of being implemented, or require further
  //                   testing before it will be known if they are in place.
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td style={{ textAlign: "center" }}>
  //                   <b>N/A</b> <br />
  //                   (Not Applicable)
  //                 </td>
  //                 <td>
  //                   {" "}
  //                   The requirement does not apply to the organization’s
  //                   environment.
  //                   <i>
  //                     {" "}
  //                     (See Guidance for Non-Applicability of Certain, Specific
  //                     Requirements
  //                   </i>{" "}
  //                   below for examples.) All responses in this column require a
  //                   supporting explanation in Appendix C of the SAQ.
  //                 </td>
  //               </tr>
  //             </tbody>
  //           </table>
  //           <h2 id="guidance-non-applicability">
  //             Guidance for Non-Applicability of Certain, Specific Requirements
  //           </h2>
  //           <p>
  //             If any requirements are deemed not applicable to your environment,
  //             select the “N/A” option for that specific requirement, and complete
  //             the “Explanation of Non-Applicability” worksheet in Appendix C for
  //             each “N/A” entry.
  //           </p>
  //           <p id="legal-exception">
  //             <strong>Legal Exception</strong>
  //           </p>
  //           <p>
  //             If your organization is subject to a legal restriction that prevents
  //             the organization from meeting a PCI DSS requirement, check the “No”
  //             column for that requirement and complete the relevant attestation in
  //             Part 3.
  //           </p>
  //         </div>
  //         <div style={{ marginTop: "100px" }} className="section_1 page-break">
  //           <img
  //             src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //             alt="logo"
  //             style={{ width: "100px" }}
  //           />
  //           <h2 id="section-1">Section 1: Assessment Information</h2>
  //           <hr />
  //           <h3>Instructions for Submission</h3>
  //           <p>
  //             This document must be completed as a declaration of the results of
  //             the merchant’s self-assessment with the{" "}
  //             <i>
  //               Payment Card Industry Data Security Standard Requirements and
  //               Security Assessment Procedures (PCI DSS)
  //             </i>
  //           </p>
  //           . Complete all sections: The merchant is responsible for ensuring that
  //           each section is completed by the relevant parties, as applicable.
  //           Contact acquirer (merchant bank) or the payment brands to determine
  //           reporting and submission procedures.
  //           <p />
  //           <div className="part1">
  //             <table>
  //               <tbody>
  //                 <tr style={{ backgroundColor: "#006c73" }}>
  //                   <th className="bg" colSpan={6}>
  //                     <h3>
  //                       Part 1. Merchant and Qualified Security Assessor
  //                       Information
  //                     </h3>
  //                   </th>
  //                 </tr>
  //                 <tr>
  //                   <th colSpan={6}>
  //                     Part 1a. Merchant Organization Information
  //                   </th>
  //                 </tr>
  //                 <tr>
  //                   <td>Company Name:</td>
  //                   <td >{allData && allData[0]?.partResponse}</td>
  //                   <td>DBA (doing business as):</td>
  //                   <td colSpan={4}>{allData && allData[1]?.partResponse}</td>
  //                 </tr>
  //                 <tr>
  //                   <td>Contact Name:</td>
  //                   <td>{allData && allData[2]?.partResponse}</td>
  //                   <td>Title:</td>
  //                   <td colSpan={6}>{allData && allData[3]?.partResponse}</td>
  //                 </tr>
  //                 <tr>
  //                   <td>Telephone:</td>
  //                   <td>{allData && allData[4]?.partResponse}</td>
  //                   <td>E-mail:</td>
  //                   <td colSpan={4}>{allData && allData[5]?.partResponse}</td>
  //                 </tr>
  //                 <tr>
  //                   <td>Business Address:</td>
  //                   <td>{allData && allData[11]?.partResponse}</td>
  //                   <td colSpan={1}>City:</td>
  //                   <td colSpan={4}>{allData && allData[8]?.partResponse}</td>
  //                 </tr>
  //                 <tr>
  //                   <td>State/Province:</td>
  //                   <td>{allData && allData[7]?.partResponse}</td>
  //                   <td>Country</td>
  //                   <td>{allData && allData[6]?.partResponse}</td>
  //                   <td>Zip</td>
  //                   <td>{allData && allData[10]?.partResponse}</td>
  //                 </tr>
  //                 <tr>
  //                   <td>URL: </td>
  //                   <td colSpan={5}>{allData && allData[9]?.partResponse}</td>
  //                 </tr>
  //               </tbody>
  //             </table>
  //             <table>
  //               <thead>
  //                 <tr>
  //                   <th colSpan={6}>
  //                     Part 1b. Qualified Security Assessor Company Information (if
  //                     applicable)
  //                   </th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 <tr>
  //                   <td>Company Name:</td>
  //                   <td colSpan={5}>{allData && allData[0]?.partResponse}</td>

  //                 </tr>
  //                 <tr>
  //                   <td>Lead QSA Contact Name:</td>
  //                   <td>{allData && allData[2]?.partResponse}</td>
  //                   <td>Title: </td>
  //                   <td colSpan={3}>{allData && allData[3]?.partResponse}</td>
  //                 </tr>
  //                 <tr>
  //                   <td>Telephone:</td>
  //                   <td>{allData && allData[4]?.partResponse}</td>

  //                   <td>E-mail:</td>
  //                   <td colSpan={3}>{allData && allData[5]?.partResponse}</td>
  //                 </tr>
  //                 <tr>
  //                   <td>Business Address:</td>
  //                   <td colSpan={2}>{allData && allData[11]?.partResponse}</td>
  //                   <td colSpan={1}>City:</td>
  //                   <td colSpan={4}>{allData && allData[8]?.partResponse}</td>
  //                 </tr>
  //                 <tr>
  //                   <td>State/Province:</td>
  //                   <td>{allData && allData[7]?.partResponse}</td>

  //                   <td>Country</td>
  //                   <td>{allData && allData[6]?.partResponse}</td>
  //                   <td>Zip</td>
  //                   <td>{allData && allData[10]?.partResponse}</td>
  //                 </tr>
  //                 <tr>
  //                   <td>URL: </td>
  //                   <td colSpan={5}>{allData && allData[9]?.partResponse}</td>
  //                 </tr>
  //               </tbody>
  //             </table>
  //           </div>
  //           <div className="part2">
  //             <table>
  //               <thead>
  //                 <tr>
  //                   <th className="bg" colSpan={4}>
  //                     <h4>Part 2. Executive Summary</h4>
  //                   </th>
  //                 </tr>
  //                 <tr>
  //                   <th colSpan={4}>
  //                     Part 2a. Type of Merchant Business (check all that apply)
  //                   </th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 <tr>
  //                   <td>
  //                     <input type="checkbox" />
  //                     Retailer
  //                   </td>
  //                   <td>
  //                     <input type="checkbox" />
  //                     Telecommunication
  //                   </td>
  //                   <td>
  //                     <input type="checkbox" /> Grocery and Supermarkets
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td>
  //                     <input type="checkbox" />
  //                     Petroleum
  //                   </td>
  //                   <td>
  //                     <input type="checkbox" defaultChecked /> E-Commerce
  //                   </td>
  //                   <td>
  //                     <input type="checkbox" /> Mail order/telephone order (MOTO)
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td colSpan={4}>
  //                     {" "}
  //                     <input type="checkbox" /> Others (please specify):
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td rowSpan={3} colSpan={2}>
  //                     What types of payment channels does your business serve?
  //                     <br />
  //                     <input type="checkbox" /> Mail order/telephone order (MOTO)
  //                     <br />
  //                     <input type="checkbox" defaultChecked /> E-Commerce
  //                     <br />
  //                     <input type="checkbox" /> Card-present (face-to-face)
  //                     <br />
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td rowSpan={3} colSpan={2}>
  //                     Which payment channels are covered by this SAQ?
  //                     <br />
  //                     <input type="checkbox" /> Mail order/telephone order (MOTO)
  //                     <br />
  //                     <input type="checkbox" defaultChecked /> E-Commerce
  //                     <br />
  //                     <input type="checkbox" /> Card-present (face-to-face)
  //                     <br />
  //                   </td>
  //                 </tr>
  //               </tbody>
  //             </table>
  //             <p>
  //               <mark style={{ backgroundColor: "rgb(245, 241, 241)" }}>
  //                 <strong>Note: </strong>
  //                 <i>
  //                   If your organization has a payment channel or process that is
  //                   not covered by this SAQ, consult your acquirer or payment
  //                   brand about validation for the other channels.
  //                 </i>
  //               </mark>
  //             </p>
  //             <div className="page-break">
  //               <img
  //                 src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //                 alt="logo"
  //                 style={{ width: "100px" }}
  //               />
  //               <table>
  //                 <thead>
  //                   <tr style={{ height: "12px" }}>
  //                     {" "}
  //                     <th className="bg" colSpan={4}>
  //                       <h3>
  //                         Part 2. Executive Summary{" "}
  //                         <span style={{ fontWeight: 100 }}>(continued)</span>
  //                       </h3>
  //                     </th>
  //                   </tr>
  //                   <tr>
  //                     <th colSpan={4}>
  //                       Part 2b. Description of Payment Card Business
  //                     </th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   <tr>
  //                     <td rowSpan={4}>
  //                       How and in what capacity does your business store, process
  //                       and/or transmit cardholder data?
  //                     </td>
  //                   </tr>
  //                   <tr>
  //                     <td rowSpan={4}>
  //                       We do not Store, Process or Transmit any Card Holder Data.
  //                       Payment processing has been fully outsourced. Transactions
  //                       involving Debit / Credit cards are handled by{" "}
  //                       <span

  //                         style={{ borderBottom: "1px solid black" }}
  //                       >{allData && allData[12]?.partResponse + ".  "}</span>
  //                       For Payment, Card details are entered on{" "}
  //                       <span
  //                         style={{ borderBottom: "1px solid black" }}
  //                       >
  //                         {allData && allData[13]?.partResponse}
  //                       </span>
  //                     </td>
  //                   </tr>
  //                 </tbody>
  //               </table>
  //               <table>
  //                 <thead>
  //                   <tr>
  //                     <th colSpan={4}>Part 2c. Locations</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   <tr>
  //                     <td colSpan={4}>
  //                       List types of facilities (for example, retail outlets,
  //                       corporate offices, data centers, call centers, etc.) and a
  //                       summary of locations included in the PCI DSS review.
  //                     </td>
  //                   </tr>
  //                   <tr>
  //                     <th>Type of facility</th>
  //                     <th>Number of facilities of this type</th>
  //                     <th>Location(s) of facility (city, country)</th>
  //                   </tr>
  //                   <tr>
  //                     <td>
  //                       <p>
  //                         <i>Example: Retail outlets</i>
  //                       </p>
  //                     </td>
  //                     <td>
  //                       <p style={{ textAlign: "center" }}>3</p>
  //                     </td>
  //                     <td>
  //                       <p>
  //                         <i>Boston, MA, USA</i>
  //                       </p>
  //                     </td>
  //                   </tr>
  //                   <tr>
  //                     <td>
  //                       ntion In Scope Facility Type (e.g. Corporate office, Head
  //                       Office, Branch, Store etc
  //                     </td>
  //                     <td>Mention numbers of Facility Locations</td>
  //                     <td>Mention in Facility Locations</td>
  //                   </tr>
  //                   <tr>
  //                     <td>{isValidJson(allData[14]?.partResponse) ? JSON.parse(allData[14].partResponse).type : ''}</td>
  //                     <td>{isValidJson(allData[14]?.partResponse) ? JSON.parse(allData[14].partResponse).number : ''}</td>
  //                     <td>{isValidJson(allData[14]?.partResponse) ? JSON.parse(allData[14].partResponse).location : ''}</td>

  //                     {/* <td>{allData && allData[14]?.partResponse && JSON.parse(allData[14].partResponse).type}</td>
  //                   <td>{allData && allData[14]?.partResponse && JSON.parse(allData[14].partResponse).number}</td>
  //                   <td>{allData && allData[14]?.partResponse && JSON.parse(allData[14].partResponse).location}</td> */}

  //                   </tr>
  //                   <tr>
  //                     <td></td>
  //                     <td></td>
  //                     <td></td>
  //                   </tr>
  //                   <tr>
  //                     <td></td>
  //                     <td></td>
  //                     <td></td>
  //                   </tr>
  //                   <tr>
  //                     <td></td>
  //                     <td></td>
  //                     <td></td>
  //                   </tr>
  //                   <tr>
  //                     <td></td>
  //                     <td></td>
  //                     <td></td>
  //                   </tr>
  //                 </tbody>
  //               </table>
  //               <table>
  //                 <thead>
  //                   <tr>
  //                     <th colSpan={5}>Part 2d. Payment Application</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   <tr>
  //                     <td colSpan={5}>
  //                       Does the organization use one or more Payment
  //                       Applications? <input type="checkbox" /> Yes{" "}
  //                       <input type="checkbox" defaultChecked /> No
  //                     </td>
  //                   </tr>
  //                   <tr>
  //                     <td colSpan={5}>
  //                       Provide the following information regarding the Payment
  //                       Applications your organization uses:
  //                     </td>
  //                   </tr>
  //                   <tr style={{ backgroundColor: "rgb(203, 213, 212)" }}>
  //                     <td>
  //                       <b>Payment Application Name</b>
  //                     </td>
  //                     <td>
  //                       <b>Version Number</b>
  //                     </td>
  //                     <td>
  //                       <b>Application Vendor</b>
  //                     </td>
  //                     <td>
  //                       <b>Is application PA-DSS Listed?</b>
  //                     </td>
  //                     <td>
  //                       <b>
  //                         PA-DSS Listing Expiry date (if applicable)<b></b>
  //                       </b>
  //                     </td>
  //                   </tr>
  //                   <tr>
  //                     <td>{allData && allData[15]?.partResponse && JSON.parse(allData[15].partResponse).name}</td>
  //                     <td>{allData && allData[15]?.partResponse && JSON.parse(allData[15].partResponse).version}</td>
  //                     <td>{allData && allData[15]?.partResponse && JSON.parse(allData[15].partResponse).vendor}</td>                    <td style={{ textAlign: "center" }}>
  //                       <input type="checkbox" checked /> Yes
  //                       <input type="checkbox" /> No
  //                     </td>
  //                     <td>{allData && allData[15]?.partResponse && JSON.parse(allData[15].partResponse).expiryDate}</td>                  </tr>
  //                   <tr>
  //                     <td></td>
  //                     <td></td>
  //                     <td></td>
  //                     <td style={{ textAlign: "center" }}>
  //                       <input type="checkbox" checked /> Yes
  //                       <input type="checkbox" /> No
  //                     </td>
  //                     <td />
  //                   </tr>
  //                   <tr>
  //                     <td></td>
  //                     <td></td>
  //                     <td></td>
  //                     <td style={{ textAlign: "center" }}>
  //                       <input type="checkbox" checked /> Yes
  //                       <input type="checkbox" /> No
  //                     </td>
  //                     <td />
  //                   </tr>
  //                   <tr>
  //                     <td></td>
  //                     <td></td>
  //                     <td></td>
  //                     <td style={{ textAlign: "center" }}>
  //                       <input type="checkbox" checked /> Yes <input type="checkbox" /> No
  //                     </td>
  //                     <td />
  //                   </tr>
  //                   <tr>
  //                     <td></td>
  //                     <td></td>
  //                     <td></td>
  //                     <td style={{ textAlign: "center" }}>
  //                       <input type="checkbox" checked /> Yes
  //                       <input type="checkbox" /> No
  //                     </td>
  //                     <td />
  //                   </tr>
  //                 </tbody>
  //               </table>
  //               <table>
  //                 <thead>
  //                   <tr>
  //                     <th colSpan={4}>Part 2e. Description of Environment</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   <tr>
  //                     <td colSpan={2}>
  //                       Provide a{" "}
  //                       <u>
  //                         <i>
  //                           <b>high-level</b>
  //                         </i>
  //                       </u>{" "}
  //                       description of the environment covered by this assessment.{" "}
  //                       <br />
  //                       <mark style={{ backgroundColor: "rgb(245, 241, 241)" }}>
  //                         {" "}
  //                         For example:
  //                         <br />
  //                       </mark>
  //                       <mark style={{ backgroundColor: "rgb(245, 241, 241)" }}>
  //                         <li>
  //                           <i>
  //                             <mark
  //                               style={{ backgroundColor: "rgb(245, 241, 241)" }}
  //                             >
  //                               Connections into and out of the cardholder data
  //                               environment (CDE).
  //                             </mark>
  //                           </i>
  //                         </li>
  //                         <li>
  //                           <i>
  //                             <mark
  //                               style={{ backgroundColor: "rgb(245, 241, 241)" }}
  //                             >
  //                               Critical system components within the CDE, such as
  //                               POS devices, databases, web servers, etc., and any
  //                               other necessary payment components, as applicable.
  //                             </mark>
  //                           </i>
  //                         </li>
  //                       </mark>
  //                     </td>
  //                     <td colSpan={2}>
  //                       Merchant's website URL -{" "}
  //                       <span
  //                       ><u>{allData && allData[16]?.partResponse}</u></span>
  //                       <br />
  //                       Name of ERP -{" "}
  //                       <span
  //                       ><u>{allData && allData[17]?.partResponse}</u></span>
  //                       <br />
  //                       Payment Gateway -{" "}
  //                       <span
  //                       ><u>{allData && allData[18]?.partResponse}</u></span>
  //                       <br />
  //                       Any other third party service Provider -{" "}
  //                       <span
  //                       ><u>{allData && allData[19]?.partResponse}</u></span>
  //                     </td>
  //                   </tr>
  //                   <tr>
  //                     <td colSpan={2}>
  //                       Does your business use network segmentation to affect the
  //                       scope of your PCI DSS environment? <br />
  //                       <i>
  //                         (Refer to “Network Segmentation” section of PCI DSS for
  //                         guidance on network segmentation.)
  //                       </i>
  //                     </td>
  //                     <td colSpan={2}>
  //                       <input type="checkbox" /> Yes{" "}
  //                       <input type="checkbox" defaultChecked /> No
  //                     </td>
  //                   </tr>
  //                 </tbody>
  //               </table>
  //             </div>
  //             <img
  //               src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //               alt="logo"
  //               style={{ width: "100px" }}
  //             />
  //             <table className="page-break">
  //               <thead>
  //                 <tr>
  //                   <th className="bg" colSpan={4}>
  //                     <h3>
  //                       Part 2. Executive Summary{" "}
  //                       <span style={{ fontWeight: 100 }}>(continued)</span>
  //                     </h3>
  //                   </th>
  //                 </tr>
  //                 <tr>
  //                   <th colSpan={4}>Part 2f. Third-Party Service Providers</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 <tr>
  //                   <td colSpan={2}>
  //                     Does your company use a Qualified Integrator &amp; Reseller
  //                     (QIR)?
  //                   </td>
  //                   <td colSpan={2} style={{ width: "11%" }}>
  //                     <input type="checkbox" /> Yes{" "}
  //                     <input type="checkbox" defaultChecked /> No
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <th colSpan={4} style={{ backgroundColor: "grey" }}>
  //                     If Yes:
  //                   </th>
  //                 </tr>
  //                 <tr>
  //                   <td>Name of QIR Company:</td>
  //                   <td colSpan={3} />
  //                 </tr>
  //                 <tr>
  //                   <td>QIR Individual Name:</td>
  //                   <td colSpan={3} />
  //                 </tr>
  //                 <tr>
  //                   <td>Description of services provided by QIR:</td>
  //                   <td colSpan={3} />
  //                 </tr>
  //                 <tr>
  //                   <td colSpan={2}>
  //                     Does your company share cardholder data with any third-party
  //                     service providers (for example, Qualified Integrator &amp;
  //                     Resellers (QIR), gateways, payment processors, payment
  //                     service providers (PSP), web-hosting companies, airline
  //                     booking agents, loyalty program agents, etc.)?
  //                   </td>
  //                   <td colSpan={2}>
  //                     <input type="checkbox" /> Yes{" "}
  //                     <input type="checkbox" defaultChecked /> No
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <th colSpan={4} style={{ backgroundColor: "grey" }}>
  //                     If Yes:
  //                   </th>
  //                 </tr>
  //                 <tr>
  //                   <td>Name of service provider:</td>
  //                   <td colSpan={2}>Description of services provided:</td>
  //                 </tr>
  //                 <tr>
  //                   <td>{allData && allData[20]?.partResponse && JSON.parse(allData[20].partResponse).name}</td>
  //                   <td colSpan={2}>{allData && allData[20]?.partResponse && JSON.parse(allData[20].partResponse).description}</td>                </tr>
  //                 <tr>
  //                   <td />
  //                   <td colSpan={2} />
  //                 </tr>
  //                 <tr>
  //                   <td />
  //                   <td colSpan={2} />
  //                 </tr>
  //                 <tr>
  //                   <td />
  //                   <td colSpan={2} />
  //                 </tr>
  //                 <tr>
  //                   <td />
  //                   <td colSpan={2} />
  //                 </tr>
  //                 <tr>
  //                   <td colSpan={4}>
  //                     <mark style={{ backgroundColor: "rgb(245, 241, 241)" }}>
  //                       <strong>Note:</strong>{" "}
  //                       <i>
  //                         Requirement 12.8 applies to all entities in this list.
  //                       </i>
  //                     </mark>
  //                   </td>
  //                 </tr>
  //               </tbody>
  //             </table>
  //             <table>
  //               <thead>
  //                 <tr>
  //                   <th>Part 2g. Eligibility to Complete SAQ A</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 <tr>
  //                   <td>
  //                     Merchant certifies eligibility to complete this shortened
  //                     version of the Self-Assessment Questionnaire because, for
  //                     this payment channel:
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td>
  //                     <input type="checkbox" defaultChecked />
  //                     Merchant accepts only card-not-present (e-commerce or
  //                     mail/telephone-order) transactions);
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td>
  //                     {" "}
  //                     <input type="checkbox" defaultChecked />
  //                     All processing of cardholder data is entirely outsourced to
  //                     PCI DSS validated third-party service providers;
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td>
  //                     {" "}
  //                     <input type="checkbox" defaultChecked />
  //                     Merchant does not electronically store, process, or transmit
  //                     any cardholder data on merchant systems or premises, but
  //                     relies entirely on a third party(s) to handle all these
  //                     functions;
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td>
  //                     {" "}
  //                     <input type="checkbox" defaultChecked />
  //                     Merchant has confirmed that all third party(s) handling
  //                     storage, processing, and/or transmission of cardholder data
  //                     are PCI DSS compliant;<b>and</b>
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td>
  //                     {" "}
  //                     <input type="checkbox" defaultChecked />
  //                     Any cardholder data the merchant retains is on paper (for
  //                     example, printed reports or receipts), and these documents
  //                     are not received electronically.
  //                   </td>
  //                 </tr>
  //                 {/* <tr><td> <input type="checkbox" checked/>Additionally, for e-commerce channels:  */}
  //                 {/* </td></tr> */}
  //                 <tr>
  //                   <td>
  //                     {" "}
  //                     <input type="checkbox" defaultChecked />
  //                     <i>Additionally, for e-commerce channels:</i> <br />
  //                     All elements of the payment page(s) delivered to the
  //                     consumer’s browser originate only and directly from a PCI
  //                     DSS validated third-party service provider(s).
  //                   </td>
  //                 </tr>
  //               </tbody>
  //             </table>
  //           </div>
  //         </div>
  //         <div style={{ marginTop: "130px" }} className="page-break">
  //           <img
  //             src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //             alt="logo"
  //             style={{ width: "100px" }}
  //           />
  //           <h2 id="section-2">Section 2: Self-Assessment Questionnaire A</h2>
  //           <hr />
  //           <p>
  //             {" "}
  //             <mark style={{ backgroundColor: "rgb(245, 241, 241)" }}>
  //               <i>
  //                 <b>Note :</b> The following questions are numbered according to
  //                 PCI DSS requirements and testing procedures, as defined in the
  //                 PCI DSS Requirements and Security Assessment Procedures
  //                 document.
  //               </i>{" "}
  //             </mark>
  //           </p>
  //           <strong style={{ float: "right" }}>
  //             {" "}
  //             Self-assessment completion date:
  //           </strong>
  //           <br />
  //           <h2 id="build-maintain-network">
  //             Build and Maintain a Secure Network and Systems
  //           </h2>
  //           <h4 id="requirement-2">
  //             <i>
  //               Requirement 2:Do not use vendor-supplied defaults for system
  //               passwords and other security parameters
  //             </i>
  //           </h4>
  //           <table>
  //             <thead>
  //               <tr>
  //                <th
  //                   style={{
  //                     textAlign: "center",
  //                     backgroundColor: "rgb(34, 100, 134)",
  //                     color: "#fff",
  //                   }}
  //                   rowSpan={2}
  //                 />
  //                 <th
  //                   rowSpan={2}
  //                   style={{
  //                     textAlign: "center",
  //                     backgroundColor: "rgb(34, 100, 134)",
  //                     color: "#fff",
  //                   }}
  //                 >
  //                   PCI DSS Question
  //                 </th>
  //                 <th
  //                   rowSpan={2}
  //                   style={{
  //                     textAlign: "center",
  //                     backgroundColor: "rgb(34, 100, 134)",
  //                     color: "#fff",
  //                   }}
  //                 >
  //                   Expected Testing
  //                 </th>
  //                 <th
  //                   colSpan={4}
  //                   className="response-checkbox"
  //                   style={{
  //                     textAlign: "center",
  //                     backgroundColor: "rgb(34, 100, 134)",
  //                     color: "#fff",
  //                   }}
  //                 >
  //                   Response <i>(Check one response for each question)</i>
  //                 </th>
  //               </tr>
  //               <tr>
  //                 <th style={{ textAlign: "center" }}>Yes</th>
  //                 <th style={{ textAlign: "center" }}>Yes with CCW</th>
  //                 <th style={{ textAlign: "center" }}>No</th>
  //                 <th style={{ textAlign: "center" }}>N/A</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               <tr>
  //                 <td>2.1</td>
  //                 <td>
  //                   (a)Are vendor-supplied defaults always changed before
  //                   installing a system on the network?
  //                   <br />
  //                   <mark style={{ backgroundColor: "rgb(245, 241, 241)" }}>
  //                     This applies to ALL default passwords, including but not
  //                     limited to those used by operating systems,
  //                     <br /> software that provides security services, application
  //                     and system accounts, point-of-sale (POS) terminals, payment
  //                     applications,Simple Network Management Protocol (SNMP)
  //                     community strings, etc.
  //                   </mark>
  //                 </td>
  //                 <td>
  //                   <li>
  //                     Review policies and{" "}
  //                     <span style={{ marginLeft: "22px" }}>procedures</span>
  //                   </li>
  //                   <li>Examine vendor documention.</li>
  //                   <li>
  //                     Observe system configurations{" "}
  //                     <span style={{ marginLeft: "22px" }}>
  //                       and account settings.
  //                     </span>
  //                   </li>
  //                   <li>Interview personnel.</li>
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" defaultChecked />
  //                 </td>
  //                 <td style={{ textAlign: "center", width: "6%" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td />
  //                 <td>
  //                   (b) Are unnecessary default accounts removed or disabled
  //                   before installing a system on the network?
  //                 </td>
  //                 <td>
  //                   <li>
  //                     Review policies and{" "}
  //                     <span style={{ marginLeft: "22px" }}>procedures</span>
  //                   </li>
  //                   <li>
  //                     Examine vendor{" "}
  //                     <span style={{ marginLeft: "22px" }}>documentation</span>
  //                   </li>
  //                   <li>
  //                     Observe system configurations{" "}
  //                     <span style={{ marginLeft: "22px" }}>
  //                       and account settings
  //                     </span>
  //                     .
  //                   </li>
  //                   <li>Interview personnel.</li>
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" defaultChecked />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //               </tr>
  //             </tbody>
  //           </table>
  //           <div className="page-break">
  //             <img
  //               src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //               alt="logo"
  //               style={{ width: "100px" }}
  //             />
  //             <h2 id="maintains">Maintain a Vulnerability Management Program</h2>
  //             <h4 id="requirement-6">
  //               <i>
  //                 Requirement 6: Develop and maintain secure systems and
  //                 applications
  //               </i>
  //             </h4>
  //             <table>
  //               <thead>
  //                 <tr>
  //                   <th
  //                     rowSpan={2}
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                   />
  //                   <th
  //                     rowSpan={2}
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                   >
  //                     PCI DSS Question
  //                   </th>
  //                   <th
  //                     rowSpan={2}
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                   >
  //                     Expected Testing
  //                   </th>
  //                   <th
  //                     colSpan={4}
  //                     className="response-checkbox"
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                   >
  //                     Response <i> (Check one response for each question)</i>
  //                   </th>
  //                 </tr>
  //                 <tr>
  //                   <th style={{ textAlign: "center" }}>Yes</th>
  //                   <th style={{ textAlign: "center", width: "70px" }}>
  //                     Yes with CCW
  //                   </th>
  //                   <th style={{ textAlign: "center" }}>No</th>
  //                   <th style={{ textAlign: "center" }}>N/A</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 <tr>
  //                   <td>6.2</td>
  //                   <td>
  //                     (a) Are all system components and software protected from
  //                     known vulnerabilities by installing applicable
  //                     vendor-supplied security patches?
  //                   </td>
  //                   <td>
  //                     <li>Review policies and procedures.</li>
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" defaultChecked />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td />
  //                   <td>
  //                     (b) Are critical security patches installed within one month
  //                     of release?
  //                   </td>
  //                   <td>
  //                     <li>Review policies and procedures.</li>
  //                     <li>Examine system components.</li>
  //                     <li>
  //                       Compare list of security patches{" "}
  //                       <span style={{ marginLeft: "22px" }}>
  //                         {" "}
  //                         installed to recent vendor patch
  //                       </span>
  //                       <span style={{ marginLeft: "22px" }}>lists.</span>
  //                     </li>
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" defaultChecked />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                 </tr>
  //               </tbody>
  //             </table>
  //           </div>
  //           <div className="page-break">
  //             <img
  //               src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //               alt="logo"
  //               style={{ width: "100px" }}
  //             />
  //             <h2 id="measure">Implement Strong Access Control Measures</h2>
  //             <h4 id="requirement-8">
  //               <i>
  //                 Requirement 8: Identify and authenticate access to system
  //                 components
  //               </i>
  //             </h4>
  //             <table>
  //               <thead>
  //                 <tr>
  //                   <th
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                     rowSpan={2}
  //                   />
  //                   <th
  //                     rowSpan={2}
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                   >
  //                     PCI DSS Question
  //                   </th>
  //                   <th
  //                     rowSpan={2}
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                   >
  //                     Expected Testing
  //                   </th>
  //                   <th
  //                     colSpan={4}
  //                     className="response-checkbox"
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                   >
  //                     Response<i> (Check one response for each question)</i>
  //                   </th>
  //                 </tr>
  //                 <tr>
  //                   <th style={{ textAlign: "center" }}>Yes</th>
  //                   <th style={{ textAlign: "center", width: "70px" }}>
  //                     Yes with CCW
  //                   </th>
  //                   <th style={{ textAlign: "center" }}>No</th>
  //                   <th style={{ textAlign: "center" }}>N/A</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 <tr>
  //                   <td>8.1.1</td>
  //                   <td>
  //                     Are all users assigned a unique ID before allowing them to
  //                     access system components or cardholder data?
  //                   </td>
  //                   <td>
  //                     <ul>
  //                       {" "}
  //                       <li>Review password procedures.</li>
  //                       <li>Interview personnel.</li>
  //                     </ul>
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" defaultChecked />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td>
  //                     <input type="checkbox" />
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td>8.1.3</td>
  //                   <td>
  //                     {" "}
  //                     Is access for any terminated users immediately deactivated
  //                     or removed?
  //                   </td>
  //                   <td>
  //                     <ul>
  //                       <li>Review password procedures.</li>
  //                       <li>Examine terminated users accounts.</li>
  //                       <li>Review current access lists.</li>
  //                       <li>Observe returned physical authentication devices.</li>
  //                     </ul>
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" defaultChecked />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td>8.2</td>
  //                   <td>
  //                     In addition to assigning a unique ID, is one or more of the
  //                     following methods employed to authenticate all users?
  //                     <ul>
  //                       <li>
  //                         Something you know, such as a password or passphrase
  //                       </li>
  //                       <li>
  //                         Something you have, such as a token device or smart card
  //                       </li>
  //                       <li>Something you are, such as a biometric</li>
  //                     </ul>
  //                   </td>
  //                   <td>
  //                     <ul>
  //                       {" "}
  //                       <li>Review password procedures.</li>
  //                       <li>Observe authentication processes.</li>
  //                     </ul>
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" defaultChecked />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td>8.2.3</td>
  //                   <td>
  //                     (a) Are user password parameters configured to require
  //                     passwords/passphrases meet the following?
  //                     <ul>
  //                       <li>
  //                         A minimum password length of at least seven characters
  //                       </li>
  //                       <li>Contain both numeric and alphabetic characters</li>
  //                     </ul>
  //                     Alternatively, the passwords/passphrases must have
  //                     complexity and strength at least equivalent to the
  //                     parameters specified above.
  //                   </td>
  //                   <td>
  //                     <ul>
  //                       <li>
  //                         Examine system configuration settings to verify password
  //                         parameters
  //                       </li>
  //                     </ul>
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" defaultChecked />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                 </tr>
  //               </tbody>
  //             </table>
  //           </div>
  //           <br />
  //           <div className="page-break">
  //             <img
  //               src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //               alt="logo"
  //               style={{ width: "100px" }}
  //             />
  //             <table>
  //               <thead>
  //                 <tr>
  //                   <th
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                     rowSpan={2}
  //                   />
  //                   <th
  //                     rowSpan={2}
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                   >
  //                     PCI DSS Question
  //                   </th>
  //                   <th
  //                     rowSpan={2}
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                   >
  //                     Expected Testing
  //                   </th>
  //                   <th
  //                     colSpan={4}
  //                     className="response-checkbox"
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                   >
  //                     Response <i> (Check one response for each question)</i>
  //                   </th>
  //                 </tr>
  //                 <tr>
  //                   <th style={{ textAlign: "center" }}>Yes</th>
  //                   <th style={{ textAlign: "center", width: "70px" }}>
  //                     Yes with CCW
  //                   </th>
  //                   <th style={{ textAlign: "center" }}>No</th>
  //                   <th style={{ textAlign: "center" }}>N/A</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 <tr>
  //                   <td>8.5</td>
  //                   <td>
  //                     Are group, shared, or generic accounts, passwords, or other
  //                     authentication methods prohibited as follows:
  //                     <ul>
  //                       <li>
  //                         Generic user IDs and accounts are disabled or removed;
  //                       </li>
  //                       <li>
  //                         Shared user IDs for system administration activities and
  //                         other critical functions do not exist; and
  //                       </li>
  //                       <li>
  //                         Shared and generic user IDs are not used to administer
  //                         any system components?
  //                       </li>
  //                     </ul>
  //                   </td>
  //                   <td>
  //                     <li>
  //                       Review policies and{" "}
  //                       <span style={{ marginLeft: "22px" }}>procedures</span>
  //                     </li>
  //                     <li>Examine user ID lists.</li>
  //                     <li>Interview personnel.</li>
  //                   </td>
  //                   <td style={{ textAlign: "center" }}>
  //                     <input type="checkbox" defaultChecked />
  //                   </td>
  //                   <td style={{ textAlign: "center" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                 </tr>
  //               </tbody>
  //             </table>
  //             <h3 id="requirement-9">
  //               <i>Requirement 9:Restrict physical access to cardholder data</i>{" "}
  //             </h3>
  //             <table>
  //               <thead>
  //                 <tr>
  //                   <th
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                     rowSpan={2}
  //                   />
  //                   <th
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                     rowSpan={2}
  //                   >
  //                     PCI DSS Question
  //                   </th>
  //                   <th
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                     rowSpan={2}
  //                   >
  //                     Expected Testing
  //                   </th>
  //                   <th
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                     colSpan={4}
  //                     className="response-checkbox"
  //                   >
  //                     Response <i> (Check one response for each question)</i>
  //                   </th>
  //                 </tr>
  //                 <tr>
  //                   <th style={{ textAlign: "center" }}>Yes</th>
  //                   <th style={{ textAlign: "center" }}>Yes with CCW</th>
  //                   <th style={{ textAlign: "center" }}>No</th>
  //                   <th style={{ textAlign: "center" }}>N/A</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 <tr>
  //                   <td>9.5</td>
  //                   <td>
  //                     Are all media physically secured (including but not limited
  //                     to computers, removable electronic media, paper receipts,
  //                     paper reports, and faxes)?
  //                     <mark style={{ backgroundColor: "rgb(209, 202, 202)" }}>
  //                       <i>
  //                         For purposes of Requirement 9, “media” refers to all
  //                         paper and electronic media containing cardholder data.
  //                       </i>
  //                     </mark>
  //                   </td>
  //                   <td>
  //                     <ul>
  //                       {" "}
  //                       <li>
  //                         Review policies and procedures for physically securing
  //                         media.
  //                       </li>
  //                       <li>Interview personnel.</li>
  //                     </ul>
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" defaultChecked />
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td rowSpan={2}>9.6</td>
  //                 </tr>
  //                 <tr>
  //                   <td>
  //                     (a) Is strict control maintained over the internal or
  //                     external distribution of any kind of media?
  //                   </td>
  //                   <td>
  //                     <ul>
  //                       <li>
  //                         Review policies and procedures for distribution of media
  //                       </li>
  //                     </ul>
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" defaultChecked />
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td />
  //                   <td>(b) Do controls include the following:</td>
  //                   <td colSpan={5} />
  //                 </tr>
  //                 <tr>
  //                   <td>9.6.1</td>
  //                   <td>
  //                     Is media classified so the sensitivity of the data can be
  //                     determined? Review policies and procedures for media
  //                     classification.
  //                   </td>
  //                   <td>
  //                     <ul>
  //                       <li>
  //                         Review policies and procedures for media classification.
  //                       </li>
  //                       <li>Interview security personnel.</li>
  //                     </ul>
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" defaultChecked />
  //                   </td>
  //                 </tr>
  //               </tbody>
  //             </table>
  //           </div>
  //           <br />
  //           <img
  //             src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //             alt="logo"
  //             style={{ width: "100px" }}
  //           />
  //           <table className="page-break">
  //             <thead>
  //               <tr>
  //                 <th
  //                   rowSpan={2}
  //                   style={{
  //                     textAlign: "center",
  //                     backgroundColor: "rgb(34, 100, 134)",
  //                     color: "#fff",
  //                   }}
  //                 />
  //                 <th
  //                   rowSpan={2}
  //                   style={{
  //                     textAlign: "center",
  //                     backgroundColor: "rgb(34, 100, 134)",
  //                     color: "#fff",
  //                   }}
  //                 >
  //                   PCI DSS Question
  //                 </th>
  //                 <th
  //                   rowSpan={2}
  //                   style={{
  //                     textAlign: "center",
  //                     backgroundColor: "rgb(34, 100, 134)",
  //                     color: "#fff",
  //                   }}
  //                 >
  //                   Expected Testing
  //                 </th>
  //                 <th
  //                   colSpan={4}
  //                   className="response-checkbox"
  //                   style={{
  //                     textAlign: "center",
  //                     backgroundColor: "rgb(34, 100, 134)",
  //                     color: "#fff",
  //                   }}
  //                 >
  //                   Response<i> (Check one response for each question)</i>
  //                 </th>
  //               </tr>
  //               <tr>
  //                 <th style={{ textAlign: "center" }}>Yes</th>
  //                 <th style={{ textAlign: "center" }}>Yes with CCW</th>
  //                 <th style={{ textAlign: "center" }}>No</th>
  //                 <th style={{ textAlign: "center" }}>N/A</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               <tr>
  //                 <td>9.6.2</td>
  //                 <td>
  //                   Is media sent by secured courier or other delivery method that
  //                   can be accurately tracked?
  //                 </td>
  //                 <td>
  //                   <ul>
  //                     {" "}
  //                     <li>Interview personnel.</li>
  //                     <li>
  //                       Examine media distribution tracking logs and
  //                       documentation.{" "}
  //                     </li>
  //                   </ul>
  //                 </td>
  //                 <td style={{ textAlign: "center", width: "6%" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center", width: "6%" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center", width: "6%" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center", width: "6%" }}>
  //                   <input type="checkbox" defaultChecked />
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>9.6.3</td>
  //                 <td>
  //                   Is management approval obtained prior to moving the media
  //                   (especially when media is distributed to individuals)?
  //                 </td>
  //                 <td>
  //                   <ul>
  //                     <li>Interview personnel.</li>
  //                     <li>
  //                       Examine media distribution tracking logs and documentation
  //                     </li>
  //                   </ul>
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" defaultChecked />
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>9.7</td>
  //                 <td>
  //                   Is strict control maintained over the storage and
  //                   accessibility of media?
  //                 </td>
  //                 <td>
  //                   <ul>
  //                     {" "}
  //                     <li>Review policies and procedures.</li>
  //                   </ul>
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" defaultChecked />
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td rowSpan={2}>9.8</td>
  //                 <td rowSpan={1}>
  //                   (a) Is all media destroyed when it is no longer needed for
  //                   business or legal reasons?
  //                 </td>
  //                 <td>
  //                   <ul>
  //                     <li>
  //                       Review periodic media destruction policies and procedures.
  //                     </li>
  //                   </ul>
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" defaultChecked />
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>(c) Is media destruction performed as follows:</td>
  //                 <td colSpan={5} />
  //               </tr>
  //               <tr>
  //                 <td rowSpan={2}>9.8.1</td>
  //                 <td rowSpan={1}>
  //                   (a) Are hardcopy materials cross-cut shredded, incinerated, or
  //                   pulped so that cardholder data cannot be reconstructed?
  //                 </td>
  //                 <td>
  //                   <ul>
  //                     <li>
  //                       Review periodic media destruction policies and procedures
  //                     </li>
  //                     <li>Interview personnel.</li>
  //                     <li>Observe processes.</li>
  //                   </ul>
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" defaultChecked />
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   (b) Are storage containers used for materials that contain
  //                   information to be destroyed secured to prevent access to the
  //                   contents?
  //                 </td>
  //                 <td>
  //                   <ul>
  //                     <li>Examine security of storage containers.</li>
  //                   </ul>
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" defaultChecked />
  //                 </td>
  //               </tr>
  //             </tbody>
  //           </table>
  //           <div className="page-break">
  //             <img
  //               src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //               alt="logo"
  //               style={{ width: "100px" }}
  //             />
  //             <h2 id="maintain">Maintain an Information Security Policy </h2>
  //             <h4 id="requirement-12">
  //               <i>
  //                 Requirement 12: Maintain a policy that addresses information
  //                 security for all personnel
  //               </i>
  //             </h4>
  //             <p>
  //               <mark style={{ backgroundColor: "rgb(209, 202, 202)" }}>
  //                 <i>
  //                   <b>Note:</b> For the purposes of Requirement 12, “personnel”
  //                   refers to full-time part-time employees, temporary employees
  //                   and personnel, and contractors and consultants who are
  //                   “resident” on the entity’s site or otherwise have access to
  //                   the company’s site cardholder data environment.
  //                 </i>
  //               </mark>
  //             </p>
  //             <table>
  //               <thead>
  //                 <tr>
  //                   <th
  //                     rowSpan={2}
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                   />
  //                   <th
  //                     rowSpan={2}
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                   >
  //                     PCI DSS Question
  //                   </th>
  //                   <th
  //                     rowSpan={2}
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                   >
  //                     Expected Testing
  //                   </th>
  //                   <th
  //                     colSpan={4}
  //                     className="response-checkbox"
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                       color: "#fff",
  //                     }}
  //                   >
  //                     Response <i> (Check one response for each question)</i>
  //                   </th>
  //                 </tr>
  //                 <tr>
  //                   <th style={{ textAlign: "center" }}>Yes</th>
  //                   <th style={{ textAlign: "center" }}>Yes with CCW</th>
  //                   <th style={{ textAlign: "center" }}>No</th>
  //                   <th style={{ textAlign: "center" }}>N/A</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 <tr>
  //                   <td>12.8</td>
  //                   <td>
  //                     Are policies and procedures maintained and implemented to
  //                     manage service providers with whom cardholder data is
  //                     shared, or that could affect the security of cardholder
  //                     data, as follows:
  //                   </td>
  //                   <td
  //                     colSpan={5}
  //                     style={{ backgroundColor: "rgb(209, 202, 202)" }}
  //                   ></td>
  //                 </tr>
  //                 <tr>
  //                   <td>12.8.1</td>
  //                   <td>
  //                     Is a list of service providers maintained, including a
  //                     description of the service(s) provided?
  //                   </td>
  //                   <td>
  //                     <ul>
  //                       <li>Review policies and procedures.</li>
  //                       <li>Observe processes.</li>
  //                       <li>Review list of service providers. </li>
  //                     </ul>
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" defaultChecked />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td>12.8.2</td>
  //                   <td>
  //                     Is a written agreement maintained that includes an
  //                     acknowledgement that the service providers are responsible
  //                     for the security of cardholder data the service providers
  //                     possess or otherwise store, process, or transmit on behalf
  //                     of the customer, or to the extent that they could impact the
  //                     security of the customer’s cardholder data environment?
  //                     <br />
  //                     <mark style={{ backgroundColor: "rgb(226, 222, 222)" }}>
  //                       <i>
  //                         <b>Note: </b> The exact wording of an acknowledgement
  //                         will depend on the agreement between the two parties,
  //                         the details of the service being provided, and the
  //                         responsibilities assigned to each party. The
  //                         acknowledgement does not have to include the exact
  //                         wording provided in this requirement.
  //                       </i>
  //                     </mark>
  //                   </td>
  //                   <td>
  //                     <ul>
  //                       <li>Observe written agreements.</li>
  //                       <li>Review policies and procedures</li>
  //                     </ul>
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" defaultChecked />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td>12.8.3</td>
  //                   <td>
  //                     Is there an established process for engaging service
  //                     providers, including proper due diligence prior to
  //                     engagement?
  //                   </td>
  //                   <td>
  //                     <ul>
  //                       <li>Observe processes</li>
  //                       <li>
  //                         Review policies and procedures and supporting
  //                         documentation.
  //                       </li>
  //                     </ul>
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" defaultChecked />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td style={{ textAlign: "center", width: "6%" }}>
  //                     <input type="checkbox" />
  //                   </td>
  //                 </tr>
  //               </tbody>
  //             </table>
  //           </div>
  //           <br />
  //           <img
  //             src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //             alt="logo"
  //             style={{ width: "100px" }}
  //           />
  //           <table className="page-break">
  //             <thead>
  //               <tr>
  //                 <th
  //                   style={{
  //                     textAlign: "center",
  //                     backgroundColor: "rgb(34, 100, 134)",
  //                     color: "#fff",
  //                   }}
  //                   rowSpan={2}
  //                 />
  //                 <th
  //                   rowSpan={2}
  //                   style={{
  //                     textAlign: "center",
  //                     backgroundColor: "rgb(34, 100, 134)",
  //                     color: "#fff",
  //                   }}
  //                 >
  //                   PCI DSS Question
  //                 </th>
  //                 <th
  //                   rowSpan={2}
  //                   style={{
  //                     textAlign: "center",
  //                     backgroundColor: "rgb(34, 100, 134)",
  //                     color: "#fff",
  //                   }}
  //                 >
  //                   Expected Testing
  //                 </th>
  //                 <th
  //                   colSpan={4}
  //                   className="response-checkbox"
  //                   style={{
  //                     textAlign: "center",
  //                     backgroundColor: "rgb(34, 100, 134)",
  //                     color: "#fff",
  //                   }}
  //                 >
  //                   Response<i> (Check one response for each question)</i>
  //                 </th>
  //               </tr>
  //               <tr>
  //                 <th style={{ textAlign: "center" }}>Yes</th>
  //                 <th style={{ textAlign: "center", width: "70px" }}>
  //                   Yes with CCW
  //                 </th>
  //                 <th style={{ textAlign: "center" }}>No</th>
  //                 <th style={{ textAlign: "center" }}>N/A</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               <tr>
  //                 <td>12.8.4</td>
  //                 <td>
  //                   Is a program maintained to monitor service providers’ PCI DSS
  //                   compliance status at least annually?
  //                 </td>
  //                 <td>
  //                   <ul>
  //                     <li>Observe processes.</li>
  //                     <li>
  //                       Review policies and procedures and supporting
  //                       documentation.
  //                     </li>
  //                   </ul>
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" defaultChecked />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>12.8.5</td>
  //                 <td>
  //                   Is information maintained about which PCI DSS requirements are
  //                   managed by each service provider, and which are managed by the
  //                   entity?
  //                 </td>
  //                 <td>
  //                   <ul>
  //                     <li>Observe processes.</li>
  //                     <li>
  //                       Review policies and procedures and supporting
  //                       documentation.
  //                     </li>
  //                   </ul>
  //                 </td>
  //                 <td style={{ textAlign: "center", width: "6%" }}>
  //                   <input type="checkbox" defaultChecked />
  //                 </td>
  //                 <td style={{ textAlign: "center", width: "6%" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center", width: "6%" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center", width: "6%" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //               </tr>
  //               <tr>
  //                 <td>12.10.1</td>
  //                 <td>
  //                   (a) Has an incident response plan been created to be
  //                   implemented in the event of system breach?
  //                 </td>
  //                 <td>
  //                   <ul>
  //                     <li>Review the incident response plan.</li>
  //                     <li>Review incident response plan procedures.</li>
  //                   </ul>
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" defaultChecked />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //                 <td style={{ textAlign: "center" }}>
  //                   <input type="checkbox" />
  //                 </td>
  //               </tr>
  //             </tbody>
  //           </table>
  //           <div className="page-break">
  //             <img
  //               src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //               alt="logo"
  //               style={{ width: "100px" }}
  //             />
  //             <h2 id="appendix-a">
  //               Appendix A: Additional PCI DSS Requirements{" "}
  //             </h2>
  //             <h4 id="appendix-a1">
  //               <i>
  //                 Appendix A1: Additional PCI DSS Requirements for Shared Hosting
  //                 Providers
  //               </i>
  //             </h4>
  //             <p>This appendix is not used for merchant assessments. </p>
  //             <h3 id="appendix-a2">
  //               <i>
  //                 Appendix A2: Additional PCI DSS Requirements for Entities using
  //                 SSL/early TLS for{" "}
  //               </i>
  //             </h3>
  //             <h3 style={{ marginLeft: "117px" }}>
  //               Card-Present POS POI Terminal Connections
  //             </h3>
  //             <p>This appendix is not used for SAQ A merchant assessments </p>
  //             <h3 id="appendix-a3">
  //               <i>
  //                 Appendix A3: Designated Entities Supplemental Validation (DESV)
  //               </i>
  //             </h3>
  //             <p>
  //               This Appendix applies only to entities designated by a payment
  //               brand(s) or acquirer as requiring additional validation of
  //               existing PCI DSS requirements. Entities required to validate to
  //               this Appendix should use the DESV Supplemental Reporting Template
  //               and Supplemental Attestation of Compliance for reporting, and
  //               consult with the applicable payment brand and/or acquirer for
  //               submission procedures
  //             </p>
  //           </div>
  //           <div className="page-break">
  //             <img
  //               src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //               alt="logo"
  //               style={{ width: "100px" }}
  //             />
  //             <h2 id="appendix-b">
  //               Appendix B: Compensating Controls Worksheet{" "}
  //             </h2>
  //             <p>
  //               <i>
  //                 Use this worksheet to define compensating controls for any
  //                 requirement where “YES with CCW” was checked.
  //               </i>
  //             </p>
  //             <p>
  //               <mark style={{ backgroundColor: "rgb(234 229 229)" }}>
  //                 <i>
  //                   <b>Note:</b>Only companies that have undertaken a risk
  //                   analysis and have legitimate technological or documented
  //                   business constraints can consider the use of compensating
  //                   controls to achieve compliance. Refer to Appendices B, C, and
  //                   D of PCI DSS for information about compensating controls and
  //                   guidance on how to complete this worksheet.
  //                 </i>
  //               </mark>
  //             </p>
  //             <h3>Requirement Number and Definition:</h3>
  //             <table>
  //               <thead>
  //                 <tr
  //                   style={{
  //                     backgroundColor: "rgb(34, 100, 134)",
  //                     color: "#fff",
  //                   }}
  //                 >
  //                   <th
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                     }}
  //                   />
  //                   <th
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                     }}
  //                   >
  //                     Information Required
  //                   </th>
  //                   <th
  //                     style={{
  //                       textAlign: "center",
  //                       backgroundColor: "rgb(34, 100, 134)",
  //                     }}
  //                   >
  //                     Explanation
  //                   </th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 <tr>
  //                   <td>
  //                     <b>1. Constraints</b>{" "}
  //                   </td>
  //                   <td>
  //                     List constraints precluding compliance with the original
  //                     requirement.
  //                   </td>
  //                   <td />
  //                 </tr>
  //                 <tr>
  //                   <td>
  //                     <b>2. Objective</b>
  //                   </td>
  //                   <td>
  //                     Define the objective of the original control; identify the
  //                     objective met by the compensating control.
  //                   </td>
  //                   <td />
  //                 </tr>
  //                 <tr>
  //                   <td>
  //                     <b>3. Identified Risk</b>
  //                   </td>
  //                   <td>
  //                     Identify any additional risk posed by the lack of the
  //                     original control.
  //                   </td>
  //                   <td />
  //                 </tr>
  //                 <tr>
  //                   <td>
  //                     <b>4. Definition of Compensating Controls</b>
  //                   </td>
  //                   <td>
  //                     Definition of Compensating Controls Define the compensating
  //                     controls and explain how they address the objectives of the
  //                     original control and the increased risk, if any.
  //                   </td>
  //                   <td />
  //                 </tr>
  //                 <tr>
  //                   <td>
  //                     <b>5. Validation of Compensating Controls</b>
  //                   </td>
  //                   <td>
  //                     Validation of Compensating Controls Define how the
  //                     compensating controls were validated and tested.
  //                   </td>
  //                   <td />
  //                 </tr>
  //                 <tr>
  //                   <td>
  //                     <b>6. Maintenance</b>
  //                   </td>
  //                   <td>
  //                     Maintenance Define process and controls in place to maintain
  //                     compensating controls.
  //                   </td>
  //                   <td />
  //                 </tr>
  //               </tbody>
  //             </table>
  //           </div>
  //           <br />
  //           <div className="page-break">
  //             <img
  //               src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //               alt="logo"
  //               style={{ width: "100px" }}
  //             />
  //             <h2 id="appendix-c">
  //               Appendix C: Explanation of Non-Applicability
  //             </h2>
  //             <p>
  //               <i>
  //                 If the “N/A” (Not Applicable) column was checked in the
  //                 questionnaire, use this worksheet to explain why the related
  //                 requirement is not applicable to your organization.
  //               </i>
  //             </p>
  //             <table>
  //               <thead>
  //                 <tr
  //                   style={{
  //                     backgroundColor: "rgb(34, 100, 134)",
  //                     color: "#fff",
  //                   }}
  //                 >
  //                   <td>Requirement</td>
  //                   <td>Reason Requirement is Not Applicable</td>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 <tr>
  //                   <td colSpan={2}>
  //                     <i>Example:</i>
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td>3.4</td>
  //                   <td>Cardholder data is never stored electronically </td>
  //                 </tr>
  //                 <tr>
  //                   <td>9.5</td>
  //                   <td>
  //                     This requirement is not applicable since the cardholder data
  //                     is not being stored, processed or transmitted.{" "}
  //                   </td>
  //                 </tr>{" "}
  //                 <tr>
  //                   <td>9.6</td>
  //                   <td>
  //                     This requirement is not applicable since the cardholder data
  //                     is not being stored, processed or transmitted.{" "}
  //                   </td>
  //                 </tr>{" "}
  //                 <tr>
  //                   <td>9.6.1</td>
  //                   <td>
  //                     This requirement is not applicable since there is no
  //                     distribution of media having cardholder data.{" "}
  //                   </td>
  //                 </tr>{" "}
  //                 <tr>
  //                   <td>9.6.2</td>
  //                   <td>
  //                     This requirement is not applicable since there is no
  //                     delivery of cardholder data is received through courier or
  //                     other mode of transport.
  //                   </td>
  //                 </tr>{" "}
  //                 <tr>
  //                   <td>9.6.3</td>
  //                   <td>
  //                     This requirement is not applicable since there is no
  //                     distribution of media having cardholder data.
  //                   </td>
  //                 </tr>{" "}
  //                 <tr>
  //                   <td>9.7</td>
  //                   <td>
  //                     This requirement is not applicable since the cardholder data
  //                     is not being stored
  //                   </td>
  //                 </tr>{" "}
  //                 <tr>
  //                   <td>9.8</td>
  //                   <td>
  //                     This requirement is not applicable since the cardholder data
  //                     is not being stored. Hence destruction of media does not
  //                     take place.
  //                   </td>
  //                 </tr>{" "}
  //                 <tr>
  //                   <td>9.8.1</td>
  //                   <td>
  //                     This requirement is not applicable since the cardholder data
  //                     is not being stored.{" "}
  //                   </td>
  //                 </tr>{" "}
  //                 <tr>
  //                   <td>
  //                     <mark
  //                       style={{
  //                         width: "50px",
  //                         backgroundColor: "gainsboro",
  //                         height: "20px",
  //                       }}
  //                     />
  //                   </td>
  //                   <td> </td>
  //                 </tr>{" "}
  //                 <tr>
  //                   <td />
  //                   <td> </td>
  //                 </tr>
  //                 <tr>
  //                   <td />
  //                   <td />
  //                 </tr>
  //                 <tr>
  //                   <td />
  //                   <td />
  //                 </tr>{" "}
  //                 <tr>
  //                   <td />
  //                   <td />
  //                 </tr>{" "}
  //                 <tr>
  //                   <td />
  //                   <td />
  //                 </tr>{" "}
  //                 <tr>
  //                   <td />
  //                   <td />
  //                 </tr>{" "}
  //                 <tr>
  //                   <td />
  //                   <td />
  //                 </tr>
  //               </tbody>
  //             </table>
  //           </div>
  //           <div style={{ marginTop: "120px" }} className="page-break">
  //             <img
  //               src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //               alt="logo"
  //               style={{ width: "100px" }}
  //             />
  //             <h2 id="section-3">
  //               Section 3: Validation and Attestation Details
  //             </h2>
  //             <h3 className="bg">PCI DSS Validation</h3>
  //             <h4>
  //               This AOC is based on results noted in SAQ A (Section 2), dated{" "}
  //               <i>
  //                 <b>(SAQ completion date).</b>
  //               </i>
  //             </h4>
  //             <p>
  //               Based on the results documented in the SAQ A noted above, the
  //               signatories identified in Parts 3b-3d, as applicable, assert(s)
  //               the following compliance status for the entity identified in Part
  //               2 of this document:
  //               <b>
  //                 <i>(check one):</i>
  //               </b>
  //             </p>
  //             <table>
  //               <thead></thead>
  //               <tbody>
  //                 <tr>
  //                   <td>
  //                     <input type="checkbox" defaultChecked />
  //                   </td>
  //                   <td>
  //                     <b>Compliant:</b> All sections of the PCI DSS SAQ are
  //                     complete, all questions answered affirmatively, resulting in
  //                     an overall <b>COMPLIANT</b> rating; thereby{" "}
  //                     <i>(Merchant Company Name)</i> has demonstrated full
  //                     compliance with the PCI DSS.
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td>
  //                     <b>Non-Compliant:</b> Not all sections of the PCI DSS SAQ
  //                     are complete, or not all questions are answered
  //                     affirmatively, resulting in an overall <b>NON-COMPLIANT</b>{" "}
  //                     rating, thereby <i>(Merchant Company Name)</i> has not
  //                     demonstrated full compliance with the PCI DSS.
  //                     <br />
  //                     <b>Target Date </b> for Compliance:{" "}
  //                     <input
  //                       type="text"
  //                       style={{
  //                         padding: "0px",
  //                         margin: "4px",
  //                         height: "25px",
  //                         width: "10%",
  //                       }}
  //                     />
  //                     <br /> <br />
  //                     An entity submitting this form with a status of
  //                     Non-Compliant may be required to complete the Action Plan in
  //                     Part 4 of this document. Check with your acquirer or the
  //                     payment brand(s) before completing Part 4.
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td>
  //                     <b>Compliant but with Legal exception: </b> One or more
  //                     requirements are marked “No” due to a legal restriction that
  //                     prevents the requirement from being met. This option
  //                     requires additional review from acquirer or payment brand.{" "}
  //                     <br />
  //                     <i> If checked, complete the following:</i>
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td colSpan={2}>
  //                     <table>
  //                       <thead>
  //                         <tr>
  //                           <th>Affected Requirement</th>
  //                           <th>
  //                             Details of how legal constraint prevents requirement
  //                             being met
  //                           </th>
  //                         </tr>
  //                       </thead>
  //                       <tbody>
  //                         <tr>
  //                           <td>
  //                             <input
  //                               type="text"
  //                               style={{
  //                                 padding: "0px",
  //                                 margin: "0px",
  //                                 height: "20px",
  //                                 width: "30%",
  //                               }}
  //                             />
  //                           </td>
  //                           <td>
  //                             <input
  //                               type="text"
  //                               style={{
  //                                 padding: "0px",
  //                                 margin: "0px",
  //                                 height: "20px",
  //                                 width: "10%",
  //                               }}
  //                             />
  //                           </td>
  //                         </tr>
  //                         <tr>
  //                           <td>
  //                             <input
  //                               type="text"
  //                               style={{
  //                                 padding: "0px",
  //                                 margin: "0px",
  //                                 height: "20px",
  //                                 width: "30%",
  //                               }}
  //                             />
  //                           </td>
  //                           <td>
  //                             <input
  //                               type="text"
  //                               style={{
  //                                 padding: "0px",
  //                                 margin: "0px",
  //                                 height: "20px",
  //                                 width: "10%",
  //                               }}
  //                             />
  //                           </td>
  //                         </tr>
  //                         <tr></tr>
  //                       </tbody>
  //                     </table>
  //                   </td>
  //                 </tr>
  //               </tbody>
  //             </table>
  //             <table>
  //               <thead>
  //                 <tr>
  //                   <th colSpan={2}>Part 3a. Acknowledgement of Status</th>
  //                 </tr>
  //                 <tr>
  //                   <th
  //                     colSpan={2}
  //                     style={{ background: "none", fontSize: "small" }}
  //                   >
  //                     Signatory(s) confirms:
  //                     <br />
  //                     <i>(Check all that apply)</i>
  //                   </th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 <tr>
  //                   <td>
  //                     <input type="checkbox" defaultChecked />
  //                   </td>
  //                   <td>
  //                     PCI DSS Self-Assessment Questionnaire A, Version{" "}
  //                     <mark style={{ backgroundColor: "rgb(158, 151, 151)" }}>
  //                       <i style={{ background: "aliceblue" }}>(ver 3.2.1)</i>
  //                     </mark>
  //                     , was completed according to the instructions therein
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td>
  //                     <input type="checkbox" defaultChecked />
  //                   </td>
  //                   <td>
  //                     All information within the above-referenced SAQ and in this
  //                     attestation fairly represents the results of my assessment
  //                     in all material respects.
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td>
  //                     <input type="checkbox" />
  //                   </td>
  //                   <td>
  //                     I have confirmed with my payment application vendor that my
  //                     payment system does not store sensitive authentication data
  //                     after authorization.
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td>
  //                     <input type="checkbox" defaultChecked />
  //                   </td>
  //                   <td>
  //                     I have read the PCI DSS and I recognize that I must maintain
  //                     PCI DSS compliance, as applicable to my environment, at all
  //                     times.
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td>
  //                     <input type="checkbox" defaultChecked />
  //                   </td>
  //                   <td>
  //                     If my environment changes, I recognize I must reassess my
  //                     environment and implement any additional PCI DSS
  //                     requirements that apply.{" "}
  //                   </td>
  //                 </tr>
  //               </tbody>
  //             </table>
  //             <div className="page-break">
  //               <img
  //                 src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //                 alt="logo"
  //                 style={{ width: "100px" }}
  //               />
  //               <table>
  //                 <thead>
  //                   <tr>
  //                     <th
  //                       colSpan={2}
  //                       style={{
  //                         backgroundColor: "rgb(34, 100, 134)",
  //                         color: "#fff",
  //                       }}
  //                     >
  //                       Part 3. PCI DSS Validation<i>(continued)</i>
  //                     </th>
  //                   </tr>
  //                   <tr>
  //                     <th colSpan={2}>
  //                       Part 3a. Acknowledgement of Status (continued)
  //                     </th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   <tr>
  //                     <td>
  //                       <input type="checkbox" defaultChecked />
  //                     </td>
  //                     <td>
  //                       No evidence of full track data, CAV2, CVC2, CVN2, CVV2, or
  //                       CID data, or PIN data storage after transaction
  //                       authorization was found on ANY system reviewed during this
  //                       assessment.
  //                     </td>
  //                   </tr>
  //                   <tr>
  //                     <td>
  //                       <input type="checkbox" />
  //                     </td>
  //                     <td>
  //                       {" "}
  //                       ASV scans are being completed by the PCI SSC Approved
  //                       Scanning Vendor{" "}
  //                       <i>
  //                         <mark style={{ backgroundColor: "rgb(200, 191, 191)" }}>
  //                           (ASV Name)
  //                         </mark>
  //                       </i>
  //                     </td>
  //                   </tr>
  //                 </tbody>
  //               </table>
  //               <table>
  //                 <thead>
  //                   <tr>
  //                     <th colSpan={2}>Part 3b. Merchant Attestation</th>
  //                   </tr>
  //                   <tr>
  //                     <th
  //                       colSpan={2}
  //                       style={{
                         
  //                         textAlign: "center",
  //                       }}
  //                     ><img
  //                         src={apiImage}
  //                         alt="edit"
  //                       />

  //                     </th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   <tr>
  //                     <td>
  //                       <i>
  //                         Signature of Merchant Executive Officer{" "}
  //                         <i className="fas fa-arrow-up" />
  //                       </i>{" "}
  //                     </td>
  //                     <td>
  //                       <i>Date:</i>
  //                       <span>{allData && allData[21]?.submissionDate}</span></td>
  //                   </tr>
  //                   <tr>
  //                     <td>
  //                       <i>Merchant Executive Officer Name:</i>
  //                       <span style={{ marginLeft: '20px' }}>{allData && allData[21]?.partResponse && JSON.parse(allData[21].partResponse).executiveName}</span>
  //                     </td>
  //                     <td>
  //                       {" "}
  //                       <i>Title: </i><span >{allData && allData[21]?.partResponse && JSON.parse(allData[21].partResponse).executiveTitle}</span>
  //                     </td>
  //                   </tr>
  //                 </tbody>
  //               </table>
  //               <table>
  //                 <thead>
  //                   <tr>
  //                     <th colSpan={2}>
  //                       Part 3c. Qualified Security Assessor (QSA) Acknowledgement
  //                       (if applicable)
  //                     </th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   <tr>
  //                     <td style={{ width: "50%" }}>
  //                       If a QSA was involved or assisted with this assessment,
  //                       describe the role performed:{" "}
  //                     </td>
  //                     <td>
  //                       <input
  //                         type="text"
  //                         style={{
  //                           padding: "0px",
  //                           margin: "0px",
  //                           height: "20px",
  //                           width: "20%",
  //                         }}
  //                       />
  //                     </td>
  //                   </tr>
  //                 </tbody>
  //                 <tbody>
  //                   <tr>
  //                     <th
  //                       colSpan={2}
  //                       style={{ backgroundColor: "white", height: "65px" }}
  //                     ></th>
  //                   </tr>
  //                 </tbody>
  //                 <tbody>
  //                   <tr>
  //                     <td>
  //                       <i>
  //                         Signature of Duly Authorized Officer of QSA Company{" "}
  //                       </i>{" "}
  //                       <i className="fas fa-arrow-up" />
  //                     </td>
  //                     <td>
  //                       <i>Date:</i>{" "}
  //                       <input
  //                         type="text"
  //                         style={{
  //                           padding: "0px",
  //                           margin: "0px",
  //                           height: "20px",
  //                           width: "20%",
  //                         }}
  //                       />{" "}
  //                     </td>
  //                   </tr>
  //                   <tr>
  //                     <td>
  //                       <i>Duly Authorized Officer Name:</i>
  //                     </td>
  //                     <td>
  //                       {" "}
  //                       <i>QSA Company</i>:{" "}
  //                       <input
  //                         type="text"
  //                         style={{
  //                           padding: "0px",
  //                           margin: "0px",
  //                           height: "20px",
  //                           width: "20%",
  //                         }}
  //                       />
  //                     </td>
  //                   </tr>
  //                 </tbody>
  //               </table>
  //               <table>
  //                 <thead>
  //                   <tr>
  //                     <th colSpan={2}>
  //                       Part 3d. Internal Security Assessor (ISA) Involvement (if
  //                       applicable)
  //                     </th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   <tr>
  //                     <td style={{ width: "50%" }}>
  //                       If an ISA(s) was involved or assisted with this
  //                       assessment, identify the ISA personnel and describe the
  //                       role performed:
  //                     </td>
  //                     <td>
  //                       <input
  //                         type="text"
  //                         style={{
  //                           padding: "2px",
  //                           margin: "2px",
  //                           height: "18px",
  //                           width: "18%",
  //                         }}
  //                       />
  //                       <br />
  //                       <input
  //                         type="text"
  //                         style={{
  //                           padding: "2px",
  //                           margin: "2px",
  //                           height: "18px",
  //                           width: "18%",
  //                         }}
  //                       />
  //                       <br />
  //                       <input
  //                         type="text"
  //                         style={{
  //                           padding: "2px",
  //                           margin: "2px",
  //                           height: "18px",
  //                           width: "18%",
  //                         }}
  //                       />
  //                       <br />
  //                       <input
  //                         type="text"
  //                         style={{
  //                           padding: "2px",
  //                           margin: "2px",
  //                           height: "18px",
  //                           width: "18%",
  //                         }}
  //                       />
  //                     </td>
  //                   </tr>
  //                 </tbody>
  //               </table>
  //               <p>
  //                 Data encoded in the magnetic stripe or equivalent data on a chip
  //                 used for authorization during a card-present transaction.
  //                 Entities may not retain full track data after transaction
  //                 authorization. The only elements of track data that may be
  //                 retained are primary account number (PAN), expiration date, and
  //                 cardholder name.
  //               </p>
  //               <p>
  //                 The three- or four-digit value printed by the signature panel or
  //                 on the face of a payment card used to verify card-not-present
  //                 transactions.
  //               </p>
  //               <p>
  //                 {" "}
  //                 Personal identification number entered by cardholder during a
  //                 card-present transaction, and/or encrypted PIN block present
  //                 within the transaction message.
  //               </p>
  //             </div>
  //             <div className="page-break">
  //               <img
  //                 src="https://www.pcisecuritystandards.org/wp-content/uploads/2022/03/pci-logo-teal.svg"
  //                 alt="logo"
  //                 style={{ width: "100px" }}
  //               />
  //               <table>
  //                 <thead>
  //                   <tr>
  //                     <th
  //                       colSpan={2}
  //                       style={{ backgroundColor: "#2e878d", color: "#fff" }}
  //                     >
  //                       Part 4. Action Plan for Non-Compliant Requirements
  //                     </th>
  //                   </tr>
  //                   <tr>
  //                     <th
  //                       colSpan={2}
  //                       style={{
  //                         backgroundColor: "white",
  //                         height: "115px",
  //                         fontWeight: 100,
  //                       }}
  //                     >
  //                       Select the appropriate response for “Compliant to PCI DSS
  //                       Requirements” for each requirement. If you answer “No” to
  //                       any of the requirements, you may be required to provide
  //                       the date your Company expects to be compliant with the
  //                       requirement and a brief description of the actions being
  //                       taken to meet the requirement.
  //                       <br /> <br />
  //                       <i>
  //                         Check with your acquirer or the payment brand(s) before
  //                         completing Part 4.
  //                       </i>
  //                     </th>
  //                   </tr>
  //                 </thead>
  //               </table>
  //               <table style={{ marginTop: "-12px" }}>
  //                 <thead>
  //                   <tr>
  //                     <th rowSpan={2} style={{ textAlign: "center" }}>
  //                       PCI DSS Requirement*
  //                     </th>
  //                     <th rowSpan={2} style={{ textAlign: "center" }}>
  //                       Description of Requirement*
  //                     </th>
  //                     <th
  //                       colSpan={2}
  //                       className="response-checkbox"
  //                       style={{ textAlign: "center" }}
  //                     >
  //                       Compliant to PCI DSS Requirements
  //                       <br />
  //                       <span style={{ fontWeight: 100 }}>(Select One)</span>
  //                     </th>
  //                     <th rowSpan={2} style={{ textAlign: "center" }}>
  //                       Remediation Date and Actions <br />
  //                       <span style={{ fontWeight: 100 }}>
  //                         (If “NO” selected for any Requirement)
  //                       </span>
  //                     </th>
  //                   </tr>
  //                   <tr>
  //                     <th style={{ textAlign: "center" }}>Yes</th>
  //                     <th style={{ textAlign: "center" }}>No</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   <tr>
  //                     <td style={{ textAlign: "center" }}>2</td>
  //                     <td>
  //                       Do not use vendor-supplied defaults for system passwords
  //                       and other security parameters.
  //                     </td>
  //                     <td style={{ textAlign: "center" }}>
  //                       <input type="checkbox" defaultChecked />
  //                     </td>
  //                     <td style={{ textAlign: "center" }}>
  //                       <input type="checkbox" />
  //                     </td>
  //                     <td />
  //                   </tr>
  //                   <tr>
  //                     <td style={{ textAlign: "center" }}>6</td>
  //                     <td>
  //                       Develop and maintain secure systems and applications.
  //                     </td>
  //                     <td style={{ textAlign: "center" }}>
  //                       <input type="checkbox" defaultChecked />
  //                     </td>
  //                     <td style={{ textAlign: "center" }}>
  //                       <input type="checkbox" />
  //                     </td>
  //                     <td />
  //                   </tr>
  //                   <tr>
  //                     <td style={{ textAlign: "center" }}>8</td>
  //                     <td>
  //                       Identify and authenticate access to system components..
  //                     </td>
  //                     <td style={{ textAlign: "center" }}>
  //                       <input type="checkbox" defaultChecked />
  //                     </td>
  //                     <td style={{ textAlign: "center" }}>
  //                       <input type="checkbox" />
  //                     </td>
  //                     <td />
  //                   </tr>
  //                   <tr>
  //                     <td style={{ textAlign: "center" }}>9</td>
  //                     <td>Restrict physical access to cardholder data</td>
  //                     <td style={{ textAlign: "center" }}>
  //                       <input type="checkbox" defaultChecked />
  //                     </td>
  //                     <td style={{ textAlign: "center" }}>
  //                       <input type="checkbox" />
  //                     </td>
  //                     <td />
  //                   </tr>
  //                   <tr>
  //                     <td style={{ textAlign: "center" }}>12</td>
  //                     <td>
  //                       Maintain a policy that addresses information security for
  //                       all personnel
  //                     </td>
  //                     <td style={{ textAlign: "center" }}>
  //                       <input type="checkbox" defaultChecked />
  //                     </td>
  //                     <td style={{ textAlign: "center" }}>
  //                       <input type="checkbox" />
  //                     </td>
  //                     <td />
  //                   </tr>
  //                 </tbody>
  //               </table>
  //               <p>
  //                 *
  //                 <i>
  //                   {" "}
  //                   PCI DSS Requirements indicated here refer to the questions in
  //                   Section 2 of the SAQ.
  //                 </i>
  //               </p>
  //               <div
  //                 className="logo"
  //                 style={{
  //                   marginTop: "300px",
  //                   marginLeft: "100px",
  //                   display: "flex",
  //                 }}
  //               >
  //                 <img
  //                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxqzQva-C1IKxyT5v7XeaC5n7BimY1gJj6OfdLlYxJfOmeD0Rlp6Fs&usqp=CAE&s"
  //                   style={{
  //                     marginLeft: "50px",
  //                     width: "120px",
  //                     height: "100px",
  //                     marginTop: "10px",
  //                   }}
  //                 />
  //                 <img
  //                   src="https://www.discoverglobalnetwork.com/content/dam/discover/en_us/dgn/images/global/logos/discover-global-network-logo.svg"
  //                   style={{ marginLeft: "40px" }}
  //                 />
  //                 <img
  //                   src="https://www.global.jcb/en/common/images/svg/jcb_emblem_logo.svg"
  //                   width="120px"
  //                   height="120px"
  //                   style={{ marginLeft: "40px" }}
  //                 />
  //                 <img
  //                   src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAgCAMAAABq4atUAAAApVBMVEX3nhvrABv/////XwD+8fLtGjLsDSbtJDv/+fHzKA/+VwLuLkTwQlb7zYn+7dX94uXrBR/83KvxHhL9cAf94rv3pCv+aQT82KP6iBH95sT4n6nxUGL1go/7zNH5vmb4r0T4qzv5tE7yXW72jZn0c4H4p7D/9eb+6ev3YUb81JruDhb7ewzzZ3f7TQX5jxT3oSP3lhj5srruKT/2NQv4bFH6vmf+8d0ofNcMAAABMUlEQVQ4jZ2V6XaCMBCFhyRCrMpSwaVWFKtW7GJbte//aG0KQuxMwpH7i5PDdyZzMwuwSuJh1uuErtd/nFdnMkoXCSTLbODXPzK4fASr0KnkPQl1Nk2h1jL6D4m1hii5G7bN4FqZfwU99xykHWBFGjTvYOaeDwlqUEEByXCSyktIfGFmz5VeCCouoFfMOG9/EH/HUCIVFBBMt2D4iE4L2IqA7kqITzB0kAyEJRAdasxgY85I6QNDKQPqdjVD3w+IWthrEOW6D4aHvYh64Bjc26FxE0TaB16b6/XbGEFVnt1ykPBJQPbHzX5rj3DCXkZ5m4LdqtYIMdTYGmxtDkUEKprw1naXU+Ng6ZpKyDrCjnxE2J03DMvTARunD8t2Y1klNmtYAIsYbw3TqjmXq+ZbWzU/CLUYCqjQWk0AAAAASUVORK5CYII="
  //                   style={{
  //                     marginLeft: "40px",
  //                     width: "70px",
  //                     height: "40px",
  //                     marginTop: "30px",
  //                   }}
  //                 />
  //                 <img
  //                   width="120px"
  //                   height="120px"
  //                   src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UnionPay_logo.svg/800px-UnionPay_logo.svg.png"
  //                   style={{
  //                     marginLeft: "40px",
  //                     width: "80px",
  //                     height: "70px",
  //                     marginTop: "10px",
  //                   }}
  //                 />
  //                 <img
  //                   src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAAAoCAMAAACbzBeiAAAAgVBMVEX///8UNMsAKsoAHch6hdzP0fEOMcsAJckAJ8kAFccAI8kALMr09fwAAMYAGsgAEcfq7PmJkd+kquX6+v7S1fKXnuJ1gNu3vOuLlN/KzfDi5Pe9weyus+hpddghO8xjcNc2Ss/Z3PQ9T9BSYdRDVdGBi92cpOQqQs5XZtXEx+5ea9ah6SEzAAACi0lEQVRIie1UWYKqMBAMiWwJCQiKioqi6Ojc/4DTSwDhAu99WD8ksbt6q1aIL774HxBe6npF2FbD2xqva/7WO3rKykurdXDfHwajEo3q0Ud0ZW+VBOjAvzQWbvlJCIffIz49rDZREEQmsQUb1Sn62O4zp2KvAoALfToJXBRESOGbg1/WxoFH5IMVOV31aV7dG4niki8SIidQ1kl7v5tEhljr2Mgz2+wT4pGrRZta8JU1HY/ImTdCrMDdXITYOXgw7fN9LM/2OcVC8uuC5wE+0Q8d7wa8XnC4gm0Mfhcz/iYqbs9OYbOAKK3mPEc9PFLl7g0ueFDQs5/IE0/oI2A+A5HbzHkyi96drzxq4RBifS5jnkDvP6w7CCHXp3jq6Qgsgrqf+GrEM/bl1JJG075HY3xx3Qb6Zs4LHhy2fPjJpZCFwLSp9Q3POHJ945uUU8qV85l/4oCd64V4Dd7CDBmKt+XpmJzFXUIzky3XYLM5D3U15i7n3dhv1mtzVcxkSaqgKhIGDlkd5jw4giAtttjlGyWhWdWMXUSSpjIOztvswCTeLniQQR9xNpqyp7n1Hw2k3cE1+YXSk2eVZRvFQp0hpCiGqkOgHOX6cxKSCy1w7YIkTVNijhc8laI1BAtWCi4DZzaURlJthtUakBYLIkxgSB1a69hLhD3rpmlJjiywD+jjgufJfw7md4ru4FAqld9+z7eUaLa0WoFMCWpKf0LniMfxIHGmtFQox8gYSkJeea5yBV0GkKLvCx6hx8kK1hhqTURjGSDoilZr2k4MnSx5XrlSyvLiZRbPuPUX63QiZaLzFrt+BiM3uvYpWDULniYEHPgPJTtM581pv1rtd2yO72E3c1kO7Isv/hH+AKvCJSx1FolpAAAAAElFTkSuQmCC"
  //                   style={{
  //                     marginLeft: "40px",
  //                     width: "70px",
  //                     height: "70px",
  //                     marginTop: "10px",
  //                   }}
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //         </div>


  //       </div>

  //     </div>





  //   </>
  //  );
}
