import  {useEffect } from 'react';
import { useSearchParams} from 'react-router-dom';
import { useVerifyEmailMutation } from '../store';
import { Link } from 'react-router-dom';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

function UserVerifyPage () {

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [verifyEmail, results] = useVerifyEmailMutation();

  useEffect(() => {
     verifyEmail(token);
  }, []);


  let content;

  if(results.isLoading){
    content = <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400">Verifikacija u toku...</p>
    </div>
  </div>
  }
  else if(results.isError){
    content = <>
        <span className="inline-block align-middle" title="Greška">
                <XCircleIcon className="w-20 h-20 text-red-600 dark:text-red-400" />
              </span>
              <span className="text-3xl font-medium mt-2 text-red-600 dark:text-red-400">
                Došlo je do greške prilikom verifikacije.
              </span>

              <p className="text-gray-600 font-md font-regular dark:text-gray-300 transition-colors mb-6">
          {results?.error?.data?.message || 'Proverite vašu internet konekciju i pokušajte ponovo.'}
        </p>


    </>
  }

  else if(results.isSuccess){
    content = <>

<span className="inline-block align-middle" title="Uspeh">
                <CheckCircleIcon className="w-20 h-20 text-green-600 dark:text-green-400" />
              </span>
              <span className="text-3xl font-medium mt-2 text-gray-600 dark:text-gray-300 transition-colors">
                Email verifikovan!
              </span>

              <p className="text-gray-600 text-lg  font-regular dark:text-gray-300 transition-colors mb-6">
              Vaša email adresa je uspešno verifikovana.
        </p>

        <Link className="font-semibold hover:opacity-90 rounded-xl px-5 py-3 bg-indigo-500 dark:bg-indigo-400 text-white " to='/auth?mode=login'>Prijavi se</Link>
    </>
  }

  return (
    <div className="flex items-center tracking-wide justify-center min-h-screen transition-colors">
      <div className="rounded-lg text-lg p-6 max-w-md w-full text-center transition-colors">
        <div
          className='mb-4 transition-colors flex flex-col items-center justify-center gap-2'>
            {content}
        </div>
      </div>
    </div>
  )

};

export default UserVerifyPage;
