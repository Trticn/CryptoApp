import { FiMail,FiPhone,FiGlobe,FiLinkedin,FiInstagram,FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Links } from "../../../config/Links";
import crypto from '../../../images/crypto.png'
function Footer(){
  return (
<footer className="bg-zinc-50 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-black border-t border-gray-200 dark:border-gray-700 text-gray-800 dark:text-zinc-300 relative py-16 mt-20 w-full shadow-inner">
  <div className="container mx-auto px-4 pb-20">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-10">

      {/* Logo & Description */}
      <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
        <div className="font-bold mb-3 flex flex-col items-center lg:items-start">
          <img className="w-14 h-14 mb-2" src={crypto} alt="CryptoTrack Logo" />
          <span className="text-xs tracking-widest uppercase text-zinc-600 dark:text-zinc-400 font-semibold">
            Kriptomat
          </span>
        </div>
        <p className="text-sm leading-relaxed max-w-xs text-gray-600 dark:text-zinc-400">
         Kriptomat je tvoj lični portfolio tracker za kriptovalute. Prati, analiziraj i upravljaj svojim investicijama jednostavno i sigurno.
        </p>
      </div>

      {/* Brzi linkovi + Kontakt */}
      <div className="lg:col-span-2 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-end text-center lg:text-left gap-12">
        
        {/* Brzi linkovi */}
        <div className="flex flex-col   text-center lg:text-left space-y-6">
          <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Brzi linkovi</h3>
          <div className="space-y-3 text-base flex flex-col text-gray-700 dark:text-zinc-300">
            {Links.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                className="hover:text-zinc-900  dark:hover:text-white transition"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Kontakt */}
        <div className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-6">
          <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Kontakt</h3>
          <div className="flex items-center space-x-2 justify-center lg:justify-end">
            <span className="w-5 h-5 flex items-center justify-center text-zinc-600 dark:text-zinc-300">
              <FiMail className="w-5 h-5" />
            </span>
            <a href="mailto:cryptotrack.support@gmail.com" className="hover:text-zinc-900 dark:hover:text-white transition text-gray-800 dark:text-zinc-300">cryptotrack.support@gmail.com</a>
          </div>
          <div className="flex items-center space-x-2 justify-center lg:justify-end">
            <span className="w-5 h-5 flex items-center justify-center text-zinc-600 dark:text-zinc-300">
              <FiPhone className="w-5 h-5" />
            </span>
            <a href="tel:+38760123456" className="hover:text-zinc-900 dark:hover:text-white transition text-gray-800 dark:text-zinc-300">+387 66 123 456</a>
          </div>
          <div className="flex items-center space-x-2 justify-center lg:justify-end">
            <span className="w-5 h-5 flex items-center justify-center text-zinc-600 dark:text-zinc-300">
              <FiGlobe className="w-5 h-5" />
            </span>
            <span className="text-gray-800 dark:text-zinc-300">Dostupno globalno</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Social & Copyright */}
  <div className="absolute bottom-0 left-0 right-0 pb-4 pt-6 mt-20 text-center w-full">
    <div className="flex flex-col items-center">
      <div className="flex space-x-6 mb-3">
      <a href="https://www.linkedin.com/in/nikola-trtić-7a6588203" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30">
          <FiLinkedin className="w-6 h-6" />
        </a>
        <a href="https://www.instagram.com/trticn" target="_blank" rel="noopener noreferrer" className="text-zinc-700 dark:text-zinc-300 hover:bg-pink-100 dark:hover:bg-pink-900/30 dark:hover:text-pink-700 hover:text-pink-300 transition flex items-center justify-center w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700/30">
          <FiInstagram className="w-6 h-6" />
        </a>
        <a href="https://wa.me/38766136261" target="_blank" rel="noopener noreferrer" className="text-zinc-700 dark:text-zinc-300 hover:bg-green-400 hover:bg-opacity-80 transition flex items-center justify-center w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700/30">
          <FiMessageCircle className="w-6 h-6" />
        </a>
      </div>
      <div className="text-gray-500 dark:text-zinc-500 text-xs md:text-sm space-y-1">
        <div>
          Copyright © <span>{new Date().getFullYear()}</span> CryptoTrack. Sva prava zadržana.
        </div>
        <div>Izradio Nikola Trtić</div>
      </div>
    </div>
  </div>
</footer>


  );
};

export default Footer;
