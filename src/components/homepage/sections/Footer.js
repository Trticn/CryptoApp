const Footer = () => {
  return (
    <footer className="mt-12 border-t border-gray-200 dark:border-gray-700 py-6 px-4 bg-white dark:bg-gray-900 transition-all">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <p className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Kriptomat. Sva prava zadržana.
        </p>

        <div className="flex gap-4">
          <a href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition">
            Privatnost
          </a>
          <a href="/terms" className="hover:text-gray-900 dark:hover:text-white transition">
            Uslovi
          </a>
          <a href="/kontakt" className="hover:text-gray-900 dark:hover:text-white transition">
            Kontakt
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
