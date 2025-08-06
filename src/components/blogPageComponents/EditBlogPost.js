import { useState } from "react";
import { useDispatch} from "react-redux";
import {useUpdateUserBlogMutation } from "../../store/apis/userBlogApi";
import {
  showNottification,

} from "../../store";
import {
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function EditBlogPost({ blog,open, onClose }) {
  const [content, setContent] = useState(blog.description);

  const dispatch = useDispatch();
  const [updateUserBlog, results] = useUpdateUserBlogMutation();



  const handleSubmit = async (e) => {
    e.preventDefault();
 

    try {
      if (!content) throw new Error("Molimo popunite sva obavezna polja!");

      // RTK Query mutacija vraća promise koji sadrži {data, error}
      const result = await updateUserBlog({
        id: blog._id,
        description: content,
      });

      if (result.error) throw result.error;
      onClose();
      dispatch(
        showNottification({
          message: result.data.message,
          type: "success",
          duration: 2000,
          show: true,
        })
      );

      setContent("");
    } catch (err) {
      console.log(err)
      dispatch(
        showNottification({
          message: err?.data?.message || 'Došlo je do greške, proverite internet konekciju.',
          type: "error",
          duration: 3000,
          show: true,
        })
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
          Ažuriraj blog post
        </h2>

     



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
              {results.isLoading ? "Ažuriranje..." : "Izmeni post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBlogPost;
