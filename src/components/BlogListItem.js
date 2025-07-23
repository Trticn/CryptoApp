import { formatRelativeDays } from "../helpers";

function BlogListItem({blog}){

    return (
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
        <div className="flex items-center mb-1">
          <span className="font-semibold text-gray-800 dark:text-white"></span>
          <span className="text-xs text-gray-400">
            {formatRelativeDays(blog.createdAt)}
          </span>
        </div>
        <div className="text-gray-700 dark:text-gray-200">{blog.description}</div>
      </div>
    )
}

export default BlogListItem