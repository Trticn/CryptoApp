const AuthFormContent = ({ mode, form, onChange, onSubmit, loading }) => {
    return (
      <form onSubmit={onSubmit} className="flex flex-col space-y-4 text-zinc-600 dark:text-zinc-400">
        {mode === 'register' && (
          <input
            type="text"
            name="username"
            placeholder="Korisničko ime"
            value={form.username}
            onChange={onChange}
            className="input"
            required
            maxLength={20}
          />
        )}
        {(mode === 'login' || mode === 'register' || mode === 'forgot') && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
            className="input"
            required
          />
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
          disabled={loading}
        >
          {{
            login: 'Prijavi se',
            register: 'Registruj se',
            forgot: 'Pošalji email za reset',
            reset: 'Resetuj lozinku',
          }[mode]}
        </button>
      </form>
    );
  };
  
  export default AuthFormContent;
  