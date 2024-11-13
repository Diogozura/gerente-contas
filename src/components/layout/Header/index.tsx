import { authenticatedPages } from "../../../config/authenticatedPages";
import PrivateLayout from "./PrivateLayout";
import PublicLayout from "./PublicLayout";

export default function Header({currentPath}){
  console.log('currentPath', currentPath);
  const isAuthenticatedPage = authenticatedPages.includes(currentPath);
  console.log('isAuthenticatedPage', isAuthenticatedPage)
  return (
    <>
    {isAuthenticatedPage ? <PublicLayout currentPath={currentPath} /> : <PrivateLayout  currentPath={currentPath}/> }
    
    {/*  */}
    </>
  )
}