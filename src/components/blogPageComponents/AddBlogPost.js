import { useState } from "react";
import { useDispatch} from "react-redux";
import { useAddUserBlogMutation } from "../../store/apis/userBlogApi";
import {
  showNottification,

} from "../../store";
import {
  XCircleIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function AddBlogPost({ open, onClose }) {
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const [addUserBlog, results] = useAddUserBlogMutation();

  const showErrorMessage = (message, isSuccess) => {
    if (!isSuccess) {
      setErrorMessage({ message, isSuccess });
      setTimeout(() => setErrorMessage(null), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      if (!content) throw new Error("Molimo popunite sva obavezna polja!");

     const data = await addUserBlog({
        description: content,
      });

      if(data.error) throw new Error(data?.error?.data?.message || 'Došlo je do greške, proverite internet konekciju.')

      onClose()
      dispatch(
        showNottification({
          message: data.data.message,
          type: "success",
          duration: 2000,
          show: true,
        })
      );

      setContent("");
 
  
    } catch (err) {
      console.log(err)
      showErrorMessage(
        err.message,
        false
      );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-6 w-full max-w-lg transition-colors relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-[10px] bg-white/70 dark:bg-gray-800/30 backdrop-blur-md rounded-full border border-gray-300 dark:border-gray-700 shadow-md hover:shadow-xl hover:bg-white/90 dark:hover:bg-gray-700/50 transition-all duration-300 group"
          aria-label="Zatvori modal"
        >
          <XMarkIcon className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-red-500 group-hover:scale-110 transition-all duration-300" />
        </button>

        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 flex items-center gap-2 mb-4">
          <PlusCircleIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Novi blog post
        </h2>

     

        {/* ERROR NOTIFIKACIJA */}
        {errorMessage && (
          <div className="p-3 rounded-lg flex items-center text-sm font-medium shadow border bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700 mb-4">
            <XCircleIcon className="w-5 h-5 mr-2" />
            {errorMessage.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <textarea
              id="description"
              name="description"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Napiši svoj blog post ovde..."
              rows={6}
              className="w-full py-2 px-4 outline-none rounded-xl bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-400 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 shadow-sm min-h-[120px]"
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              onClick={onClose}
            >
              Otkaži
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
              disabled={results.isLoading}
            >
              {results.isLoading ? "Dodavanje..." : "Dodaj post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBlogPost;
