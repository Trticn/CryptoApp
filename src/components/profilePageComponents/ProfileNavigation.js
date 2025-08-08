import { Link} from "react-router-dom";
import { useLogoutMutation } from "../../store";
import { ProfileLinks } from "../../config/Links";
import { showNottification } from "../../store";
import { useSelector,useDispatch } from "react-redux";
import { setUserLogout } from "../../store";
import Button from "../Button";

function ProfileNavigation({isOpen,onClose}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user);
    const [logout,results] = useLogoutMutation();
    const handleLogout = async () => {
        try {
            const res = await logout();
            if (res.error) throw new Error('Došlo je do greške, proverite internet konekciju.');
            
    
            dispatch(setUserLogout());
            onClose();
            dispatch(
                showNottification({
                    message: res.data?.message || "Uspešno ste se odjavili.",
                    type: "success",
                    duration: 2000,
                    show: true,
                })
            );

            setTimeout(() => {
                window.location.href = '/auth?mode=login';
            }, 1000);

        } catch (err) {
        
            dispatch(
                showNottification({
                    message: err?.message,
                    type: "error",
                    duration: 2000,
                    show: true,
                })
            );
        }
    };

    let content;

    if(!user){
        content = <>
            <Link onClick={onClose} className="text-md font-semibold hover:opacity-90 rounded-xl px-3 py-2 bg-indigo-500 dark:bg-indigo-400 text-white " to='/auth?mode=login'>Prijavi se</Link>
            <Link onClick={onClose} className="text-md hover:opacity-90 rounded-xl px-3 py-2 bg-transparent border border-indigo-500 dark:border-indigo-400 font-semibold text-gray-700 dark:text-gray-300 " to='/auth?mode=register'>Registruj se</Link>
        </>
    } else{
        content =<>
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow">
            <span>{user?.username?.[0]}</span>
        </div>
        <div>
            <div className="text-md font-semibold text-gray-800 dark:text-white">{user?.username}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</div>
        </div>
        </>
   
    }


    return (
        isOpen ? (
            <>
                {/* Overlay that blocks interaction outside, but allows interaction inside the menu */}
                <div
                    className="fixed inset-0 z-40"
                    onClick={onClose}
                    aria-hidden="true"
                />
                <div className="absolute right-3 mt-1 top-20 z-50 w-[300px] rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 flex flex-col  transition-colors">
                    <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700 pb-3 mb-3">
                        {content}
                    </div>
                
                    <div className="flex flex-col space-y-3 transition  text-gray-700 dark:text-gray-300  font-semibold text-md ">
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4 space-y-3 flex flex-col">
                            {(user
                                ? ProfileLinks
                                : ProfileLinks.filter(link => link.label !== 'Nalog')
                            ).map(link => (
                                <Link
                                    key={link.path}
                                    onClick={onClose}
                                    to={link.path}
                                    className="hover:bg-gray-100 flex items-center py-2 px-3 rounded-xl dark:hover:bg-gray-700 "
                                >
                                    <span className="mr-3 text-lg text-indigo-500 dark:text-indigo-400">
                                        {link.icon}
                                    </span>
                                    <span>{link.label}</span>
                                </Link>
                            ))}
                        </div>
                        { 
                        user &&
                        <Button
                            onClick={handleLogout}
                            className="rounded-xl px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                            type="button"
                            loading = {results.isLoading}
                        >
                            Odjava
                        </Button>
                        }
                    </div>
                </div>
            </>
        ) : null
    );
}

export default ProfileNavigation;