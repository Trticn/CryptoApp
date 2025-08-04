import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FcGoogle } from "react-icons/fc";
import { setCredentials } from '../store';
import {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from '../store/apis/authApi';
import AuthFormContent from '../components/authComponents/AuthFormContent';

const AuthPage = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState('login');
  const [notification, setNotification] = useState(null);

  // Prikazuje notifikaciju sa bojom u zavisnosti od uspeha
  const showNotification = (message, isSuccess) => {
    setNotification({ message, isSuccess });
  };

  const [form, setForm] = useState({ email: '', password: '', username: '', newPassword: '' });

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [register, { isLoading: registerLoading }] = useRegisterMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [resetPassword] = useResetPasswordMutation();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGoogleLogin = () => {
    showNotification('Google login nije implementiran u ovom demo-u.', false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Resetuj notifikaciju pre nove akcije
    setNotification(null);
    try {
      if (mode === 'login') {
        const res = await login({ email: form.email, password: form.password }).unwrap();
        dispatch(setCredentials({ user: res.data.user }));
        showNotification('Uspešna prijava!', true);
      } else if (mode === 'register') {
        await register(form).unwrap();
        showNotification('Registracija uspešna! Proverite email.', true);
        setMode('login');
      } else if (mode === 'forgot') {
        await forgotPassword({ email: form.email }).unwrap();
        showNotification('Poslat je email za reset lozinke.', true);
      } else if (mode === 'reset') {
        const token = new URLSearchParams(window.location.search).get('token');
        if (!token) {
          showNotification('Token nije pronađen.', false);
          return;
        }
        await resetPassword({ token, newPassword: form.newPassword }).unwrap();
        showNotification('Lozinka uspešno resetovana!', true);
        setMode('login');
      }
    } catch (err) {
      console.log(err);
      showNotification(
        err?.data?.error?.message ||
        'Greška!',
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
            reset: 'Resetuj lozinku',
          }[mode]}
        </h2>

        <AuthFormContent
          mode={mode}
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loginLoading || registerLoading}
        />

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

        {notification && (
          <div
            className={`mt-4 text-center font-medium transition-all duration-200 ${
              notification.isSuccess
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
