import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useChangePasswordMutation } from "../../store";
import { useLogoutMutation } from "../../store";
import { setUserLogout } from "../../store";

function ChangePassword(){

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user);
    const [changePassword,results] = useChangePasswordMutation()
    const [logout] = useLogoutMutation();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [message, setMessage] = useState("");



    const handleLogout = async () => {
        await logout();
        dispatch(setUserLogout())
        window.location.href = '/auth'
    };



    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setMessage("");
        if (newPassword !== confirmNewPassword) {
            setMessage("Nove lozinke se ne poklapaju.");
            setTimeout(() => setMessage(""), 2000);
            return;
        }
        try {
            const data = await changePassword({ currentPassword, newPassword });
            if (data.error) throw data.error;
            setMessage(data?.data?.message);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
            setTimeout(() => {
                handleLogout();
            }, 2000);
        } catch (err) {
            setMessage(err?.data?.message || "Greška pri promeni lozinke.");
            setTimeout(() => setMessage(""), 2000);
        }
    };


      
return   (

<form onSubmit={handlePasswordChange} className="animate-fade-in">
<div className="flex flex-col gap-3">
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
  {message && (
    <div className={`mt-2 text-center text-sm font-medium ${message.includes('uspešno') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{message}</div>
  )}
</div>
</form>
)
}


export default ChangePassword