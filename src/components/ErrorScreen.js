export default function ErrorScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center p-6 rounded-lg max-w-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
          Greška pri učitavanju
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Došlo je do problema.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
        >
          Pokušaj ponovo
        </button>
      </div>
    </div>
  );
}
