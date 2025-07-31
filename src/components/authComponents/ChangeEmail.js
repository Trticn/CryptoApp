import { useState } from "react";
import { useSelector } from "react-redux";
import { useChangeEmailMutation } from "../../store";


function ChangeEmail(){
    const [changeEmail,results] = useChangeEmailMutation()
    const user = useSelector((state) => state.auth.user);
    const [newEmail, setNewEmail] = useState(user?.email || "");
    const [message, setMessage] = useState("");

    const handleEmailChange = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            await changeEmail({ newEmail }).unwrap();
            setMessage("Email je uspešno promenjen.");
        } catch (err) {
            setMessage(err?.data?.message || "Greška pri promeni emaila.");
        }
        setTimeout(() => setMessage(""), 2000);
    };

    return (
        <form onSubmit={handleEmailChange} className="animate-fade-in">
            <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="newEmail">
                    Novi email
                </label>
                <input
                    id="newEmail"
                    name="newEmail"
                    type="email"
                    className="input"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                    placeholder="Unesi novi email"
                    autoComplete="email"
                />
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
                    disabled={results.isLoading}
                >
                    {results.isLoading ? "Menjam..." : "Promeni email"}
                </button>
                {message && (
                    <div className={`mt-2 text-center text-sm font-medium ${message.includes('uspešno') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{message}</div>
                )}
            </div>
        </form>
    );
}
    
    
    export default ChangeEmail;