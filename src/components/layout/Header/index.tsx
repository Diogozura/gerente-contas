import React from "react";
import { authenticatedPages } from "../../../config/authenticatedPages";
import PrivateLayout from "./PrivateLayout";
import PublicLayout from "./PublicLayout";

export default function Header({currentPath}){
  const isAuthenticatedPage = authenticatedPages.includes(currentPath);
  React.useEffect(() => {
  
  
 
  }, []);


  return (
    <>
    {isAuthenticatedPage ? <PublicLayout currentPath={currentPath} /> : <PrivateLayout  currentPath={currentPath}/> }
    
    {/*  */}
    </>
  )
}