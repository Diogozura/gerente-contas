
import { useRouter } from "next/router"
import { tokenService } from "../src/services/auth/tokenService"
import React from 'react'
import { HttpClient } from "../src/infra/HttpClient/HttpClient"

export default function LougoutPage() {
  const router = useRouter()
  
  
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    (async function anyNameFunction() {
      try {
        await HttpClient('/api/refresh', {
          method:'DELETE',
        });
        tokenService.delete()
        router.push('/')
      }
      catch (err){
        alert(err.message)
      }
    })();
  }, [router]);

  return (
    <div>
      Você será redirecionado em instantes ...
    </div>
  )
}