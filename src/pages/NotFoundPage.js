import { Link } from 'react-router-dom';



export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col text-center p-6">
      <h1 className="text-4xl bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
        404
      </h1>
      <p className="mt-4 text-lg gap-2 text-gray-700  dark:text-white">Stranica nije pronađena.</p>
      <div className="flex justify-center mt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium text-base shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
        >
          Vrati se na početnu
        </Link>
      </div>
    </div>
  );
}
