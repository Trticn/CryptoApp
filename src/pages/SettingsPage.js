import { useState } from "react";
import ChangeEmail from "../components/authComponents/ChangeEmail";
import ChangePassword from "../components/authComponents/ChangePassword";

const SettingsPage = () => {


  const [activeTab, setActiveTab] = useState("email");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">Podešavanja naloga</h1>
      {/* Tab Switcher */}
      <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-5 py-2 text-md font-semibold focus:outline-none transition rounded-t-xl ${
            activeTab === "email"
              ? "bg-blue-600 text-white dark:bg-blue-500"
              : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => setActiveTab("email")}
          type="button"
        >
          Promeni email
        </button>
        <button
          className={`px-5 py-2 text-md font-semibold focus:outline-none transition rounded-t-xl ml-2 ${
            activeTab === "password"
              ? "bg-blue-600 text-white dark:bg-blue-500"
              : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => setActiveTab("password")}
          type="button"
        >
          Promeni lozinku
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "email" && (
         <ChangeEmail/>
        )}

        {activeTab === "password" && (
       <ChangePassword/>
        )}
      </div>
    </div>
    </div>
  );
};

export default SettingsPage;
