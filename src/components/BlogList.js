
import { useFetchUserBlogsQuery } from "../store";
import BlogListItem from "./BlogListItem";
import Skeleton from "./Skeleton";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
function BlogList() {
    const { data, error, isFetching } = useFetchUserBlogsQuery();
    let content;

    if (isFetching) {
        content = (
            <div className="space-y-3 p-4">
            <Skeleton className="h-16 w-full rounded-2xl bg-gray-200 dark:bg-gray-900" times={3} />
          </div>
        );
    } else if (error) {
        content = (
            <div className="p-4 m-4 rounded-2xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 shadow-sm">
            <div className="flex items-center gap-3">
              <InformationCircleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
              <p className="text-sm text-red-800 dark:text-red-300">
                Došlo je do greške prilikom učitavanja blogova. Pokušaj ponovo kasnije.
              </p>
            </div>
          </div>
        );
    } else if (data.length === 0) {
        content = (
            <div className="p-4 sm:p-6 m-4 rounded-2xl border border-blue-300 dark:border-blue-800  shadow-sm">
            <div className="flex items-start items-center gap-3">
              <InformationCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 sm:mt-0" />
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Nema pronađenih blogova korisnika.
              </p>
            </div>
          </div>
        );
    } else {
        content = (
            <div className="space-y-2">
                {data && data.map((blog) => (
                    <BlogListItem key={blog._id} blog={blog} />
                ))}
            </div>
        );
    }

    return (
        <div className="max-h-[500px]  overflow-y-auto">
            {content}
        </div>
    );
}

export default BlogList