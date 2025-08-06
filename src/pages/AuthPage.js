import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FcGoogle } from "react-icons/fc";
import { setCredentials } from '../store';
import { useLoginMutation, useRegisterMutation, useForgotPasswordMutation } from '../store';
import { showNottification } from '../store';
import AuthFormContent from '../components/authComponents/AuthFormContent';

const AuthPage = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState('login');

  // errorMessage is now a string (or null)
  const [errorMessage, setErrorMessage] = useState(null);

  // Only set errorMessage as a string
  const showErrorMessage = (message, isSuccess) => {
    if (!isSuccess) {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(null), 2000);
    }
  };

  const [form, setForm] = useState({ email: '', password: '', username: '', newPassword: '',confirmPassword:'' });

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [register, { isLoading: registerLoading }] = useRegisterMutation();
  const [forgotPassword, { isLoading: forgotPasswordLoading }] = useForgotPasswordMutation();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGoogleLogin = () => {
    showErrorMessage('Google login nije implementiran u ovom demo-u.', false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === 'login') {
        const res = await login({ email: form.email, password: form.password });
        if (res.error) throw res.error;
        dispatch(setCredentials({ user: res.data.data.user }));

        dispatch(
          showNottification({
            message: res.data.message,
            type: "success",
            duration: 3000,
            show: true,
          })
        );
      } else if (mode === 'register') {
        const res = await register(form);
        if (res.error) throw res.error;
        dispatch(
          showNottification({
            message: res.data.message,
            type: "success",
            duration: 3000,
            show: true,
          })
        );
        setMode('login');
      } else if (mode === 'forgot') {
        const res = await forgotPassword({ email: form.email });
        if (res.error) throw res.error;
        dispatch(
          showNottification({
            message: res.data.message,
            type: "info",
            duration: 2000,
            show: true,
          })
        );
      }
    } catch (err) {
      showErrorMessage(
        err?.data?.message || 'Došlo je do greške, proverite internet konekciju.',
        false
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          {{
            login: 'Prijava',
            register: 'Registracija',
            forgot: 'Zaboravljena lozinka',
          }[mode]}
        </h2>

        <AuthFormContent
          mode={mode}
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loginLoading || registerLoading || forgotPasswordLoading}
        />
            {errorMessage && (
          <div
            className='mt-4 text-center font-medium transition-all duration-200
                text-red-600 dark:text-red-400'
          >
            {errorMessage}
          </div>
        )}

        <div className="my-4 flex items-center">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
          <span className="mx-2 text-gray-400">ili</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100 font-semibold rounded-lg shadow-md transition"
        >
          <FcGoogle className="w-6 h-6" />
          <span>Nastavi preko Google</span>
        </button>



        <div className="mt-6 flex flex-col items-center gap-2 text-sm">
          {mode === 'login' && (
            <>
              <button className="text-blue-600 hover:underline" onClick={() => setMode('register')}>
                Nemate nalog? Registrujte se
              </button>
              <button className="text-gray-500 hover:underline" onClick={() => setMode('forgot')}>
                Zaboravili ste lozinku?
              </button>
            </>
          )}
          {mode === 'register' && (
            <button className="text-blue-600 hover:underline" onClick={() => setMode('login')}>
              Imate nalog? Prijavite se
            </button>
          )}
          {(mode === 'forgot' || mode === 'reset') && (
            <button className="text-blue-600 hover:underline" onClick={() => setMode('login')}>
              Nazad na prijavu
            </button>
          )}
        </div>

 
      </div>
    </div>
  );
};

export default AuthPage;
