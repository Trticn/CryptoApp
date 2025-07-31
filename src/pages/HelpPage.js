import FaqList from "../components/FaqList";
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { FiMail, FiPhone, FiMessageCircle, FiHelpCircle } from 'react-icons/fi';
import useHandleBack from '../hooks/useHandleBack';

function HelpPage() {
  const handleBack = useHandleBack();

  return (
    <div className="p-6 w-screen md:p-10 min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-lg flex justify-center items-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Nazad"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <span className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            <FiHelpCircle className="h-7 w-7" />
          </span>
          <span>Help & FAQ</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-xl text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Dobrodošli u Help Centar!</h2>
          <p className="text-blue-100">
            Evo svega što trebate da znate o korišćenju naše Crypto aplikacije. 
            Ako ne pronađete odgovor na vaše pitanje, slobodno nas kontaktirajte.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiMail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Email</h3>
            <a
              href="mailto:kriptomat.support@gmail.com"
              className="text-sm cursor-pointer text-gray-600 dark:text-gray-400"
             
            >
              kriptomat.support@gmail.com
            </a>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiPhone className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Telefon</h3>
            <a href="tel:+38760123456" className="text-sm text-gray-600 dark:text-gray-400">+387 66 136 261</a>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiMessageCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Chat</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">24/7 podrška</p>
          </div>
        </div>

        {/* FAQ sekcija */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Najčešća pitanja</h3>

          
          <FaqList />
        </div>
        
        {/* Kontakt sekcija */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Pošaljite nam poruku</h3>
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Vaše ime"
                className="input"
                required
              />
              <input
                type="email"
                placeholder="Vaš email"
                className="input"
                required
              />
            </div>
            <select className="input">
              <option value="">Izaberite temu</option>
              <option value="technical">Tehnička podrška</option>
              <option value="account">Pitanja o nalogu</option>
              <option value="billing">Fakturisanje</option>
              <option value="other">Ostalo</option>
            </select>
            <textarea
              placeholder="Vaša poruka"
              className="input"
              rows={4}
              required
            />
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all"
            >
              Pošalji poruku
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;