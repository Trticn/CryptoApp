// ... existing code ...
import { useState } from 'react';
import {
  useLoginMutation,
  useRegisterMutation,
  // useGoogleLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from '../store/apis/authApi';
import { useDispatch } from 'react-redux';
import { FcGoogle } from "react-icons/fc";
import { setCredentials} from '../store';

const AuthPage = () => {
  const dispatch = useDispatch();
  
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', username:'', newPassword: '' });
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [register, { isLoading: registerLoading }] = useRegisterMutation();
  // const [googleLogin] = useGoogleLoginMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [resetPassword] = useResetPasswordMutation();
  const [message, setMessage] = useState('');

  const handleGoogleLogin = async () => {
    setMessage('Google login nije implementiran u ovom demo-u.');
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (mode === 'login') {
        const res = await login({ email: form.email, password: form.password });
        dispatch(setCredentials({ user: res.data.user }));
        setMessage('Uspešna prijava!');
      } else if (mode === 'register') {
        await register(form);
        setMessage('Registracija uspešna! Proverite email za verifikaciju.');
        setMode('login');
      } else if (mode === 'forgot') {
        await forgotPassword({ email: form.email }).unwrap();
        setMessage('Poslat je email za reset lozinke.');
      } else if (mode === 'reset') {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (!token) return setMessage('Token nije pronađen.');
        await resetPassword({ token, newPassword: form.newPassword }).unwrap();
        setMessage('Lozinka uspešno resetovana!');
        setMode('login');
      }
    } catch (err) {
      setMessage(err.data?.message || 'Greška!');
    }
  };

  return (
    <div className="min-h-screen flex  items-center justify-center">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          {mode === 'login' && 'Prijava'}
          {mode === 'register' && 'Registracija'}
          {mode === 'forgot' && 'Zaboravljena lozinka'}
          {mode === 'reset' && 'Resetuj lozinku'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 text-zinc-600 dark:text-zinc-400">
          {mode === 'register' && (
            <>
         
              <input
                type="text"
                name="username"
                placeholder="Prezime"
                value={form.username}
                onChange={handleChange}
                className="input"
                required
                maxLength={20}
              />
            </>
          )}
          {(mode === 'login' || mode === 'register' || mode === 'forgot') && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="input"
              required
            />
          )}
          {(mode === 'login' || mode === 'register') && (
            <input
              type="password"
              name="password"
              placeholder="Lozinka"
              value={form.password}
              onChange={handleChange}
              className="input"
              required={mode !== 'login'}
            />
          )}
          {mode === 'reset' && (
            <input
              type="password"
              name="newPassword"
              placeholder="Nova lozinka"
              value={form.newPassword}
              onChange={handleChange}
              className="input"
              required
            />
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
            disabled={loginLoading || registerLoading}
          >
            {mode === 'login' && 'Prijavi se'}
            {mode === 'register' && 'Registruj se'}
            {mode === 'forgot' && 'Pošalji email za reset'}
            {mode === 'reset' && 'Resetuj lozinku'}
          </button>
        </form>
        <div className="my-4 flex items-center">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
          <span className="mx-2 text-gray-400">ili</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-100 font-semibold rounded-lg shadow-md transition"
        >
          <FcGoogle className='w-6 h-6'/>
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
        {message && (
          <div className="mt-4 text-center text-green-600 dark:text-green-400 font-medium">{message}</div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
