import { useState } from "react";
import {useDispatch } from "react-redux";
import { showNottification } from "../../store";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useChangePasswordMutation } from "../../store";
import { useLogoutMutation } from "../../store";
import { setUserLogout } from "../../store";

function ChangePassword(){

    const dispatch = useDispatch()
    const [changePassword,results] = useChangePasswordMutation()
    const [logout] = useLogoutMutation();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);


    const showErrorMessage = (message, isSuccess) => {
      if (!isSuccess) {
        setErrorMessage({ message, isSuccess });
        setTimeout(() => setErrorMessage(null), 2000);
      }
    };

    const handleLogout = async () => {
        await logout();
        dispatch(setUserLogout())
        window.location.href = '/auth'
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await changePassword({ currentPassword, newPassword });
            if (data.error) throw data.error;

            dispatch(
              showNottification({
                message: data.data.message,
                type: "success",
                duration: 2000,
                show: true,
              }))

            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
            setTimeout(() => {
                handleLogout();
            }, 2000);
        } catch (err) {
            showErrorMessage(
              err?.data?.message || 'Došlo je do greške, proverite internet konekciju.',
              false
            );
    
        }
    };


      
return   (

<form onSubmit={handleSubmit} className="animate-fade-in">
<div className="flex flex-col gap-3">
    {errorMessage && (
          <div className="p-3 rounded-lg flex items-center text-sm font-medium shadow border bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700 mb-4">
            <XCircleIcon className="w-5 h-5 mr-2" />
            {errorMessage.message}
          </div>
        )}
  <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="currentPassword">
    Trenutna lozinka
  </label>
  <input
    id="currentPassword"
    name="currentPassword"
    type="password"
    className="input"
    value={currentPassword}
    onChange={(e) => setCurrentPassword(e.target.value)}
    required
    placeholder="Unesi trenutnu lozinku"
    autoComplete="current-password"
  />
  <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="newPassword">
    Nova lozinka
  </label>
  <input
    id="newPassword"
    name="newPassword"
    type="password"
    className="input"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    required
    placeholder="Unesi novu lozinku"
    autoComplete="new-password"
  />
  <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="confirmNewPassword">
    Potvrdi novu lozinku
  </label>
  <input
    id="confirmNewPassword"
    name="confirmNewPassword"
    type="password"
    className="input"
    value={confirmNewPassword}
    onChange={(e) => setConfirmNewPassword(e.target.value)}
    required
    placeholder="Potvrdi novu lozinku"
    autoComplete="new-password"
  />
  <button
    type="submit"
    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
    disabled={results.isLoading}
  >
    {results.isLoading ? "Menjam..." : "Promeni lozinku"}
  </button>

</div>
</form>
)
}


export default ChangePassword