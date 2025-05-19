export default function ErrorScreen({ title, message }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center p-6 rounded-lg max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">{title}</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 shadow-md"
        >
          Pokušaj ponovo
        </button>
      </div>
    </div>
  );
}
