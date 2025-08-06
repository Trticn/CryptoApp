import ResetPassword from "../components/authComponents/ResetPassword"

function ResetPasswordPage(){
return (
    <div className="min-h-screen flex items-center justify-center">
    <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 w-full max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">Resetuj lozinku</h1>
    <div>
     <ResetPassword/>
   
    </div>
  </div>
  </div>
)
}


export default ResetPasswordPage