import { useState } from "react";
import Button from "../Button";
import { useResetPasswordMutation,showNottification } from "../../store";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [password,setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [resetPassword, results] = useResetPasswordMutation();
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    const showErrorMessage = (message, isSuccess) => {
      if (!isSuccess) {
        setErrorMessage({ message, isSuccess });
        setTimeout(() => setErrorMessage(null), 2000);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const data = await resetPassword({
          token: token,
          newPassword: password,
          confirmPassword: confirmPassword,
        });

        // Provera da li postoji greška
        if(data.error) throw data.error;
    
        navigate('/auth'); 
            dispatch(
                showNottification({
                  message: data.data.message,
                  type: "success",
                  duration: 2000,
                  show: true,
                }))

            
            
        } catch(err){
            showErrorMessage(
                err?.data?.message || 'Došlo je do greške, proverite internet konekciju.',
                false
              );
        }
    }

    return (

        <>
        {errorMessage && (
          <div className="p-3 rounded-lg flex items-center text-sm font-medium shadow border bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700 mb-4">
            <XCircleIcon className="w-5 h-5 mr-2" />
            {errorMessage.message}
          </div>
        )}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 text-zinc-600 dark:text-zinc-400">

          <input
            type="password"
            name="newPassword"
            placeholder="Lozinka"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="input"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Nova lozinka"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            className="input"
            required
          />

        <Button
          type="submit"
          className="w-full py-5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
          loading={results.isLoading}
        >
        Resetuj lozinku
        </Button>
      </form>
      </>
    );
  };
  
  export default ResetPassword;;
  
