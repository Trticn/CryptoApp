import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useChangeEmailMutation, showNottification } from "../../store";
import { XCircleIcon } from "@heroicons/react/24/outline";

function ChangeEmail() {
  const dispatch = useDispatch();
  const [changeEmail, results] = useChangeEmailMutation();
  const user = useSelector((state) => state.auth.user);
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [errorMessage, setErrorMessage] = useState(null);

  const showErrorMessage = (message, isSuccess) => {
    if (!isSuccess) {
      setErrorMessage({ message, isSuccess });
      setTimeout(() => setErrorMessage(null), 2000);
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    try {
      const data = await changeEmail({ newEmail });
      if (data.error) throw data.error;

      dispatch(
        showNottification({
          message: data.data.message,
          type: "success",
          duration: 2000,
          show: true,
        })
      );
    } catch (err) {
      showErrorMessage(
        err?.data?.message || 'Došlo je do greške, proverite internet konekciju.',
        false
      );
    }
  };

  return (
    <form onSubmit={handleEmailChange} className="animate-fade-in">
      <div className="flex flex-col gap-3">
        {errorMessage && (
          <div className="p-3 rounded-lg flex items-center text-sm font-medium shadow border bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700 mb-4">
            <XCircleIcon className="w-5 h-5 mr-2" />
            {errorMessage.message}
          </div>
        )}
        <label
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor="newEmail"
        >
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
      </div>
    </form>
  );
}

export default ChangeEmail;