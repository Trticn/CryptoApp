function ContactForm({onClick}) {
return (
    <>
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Pošaljite nam poruku</h3>
    <form  className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Vaše ime"
          className="input"
          required
        />
        <input
          type="email"
          placeholder="Vaš email"
          className="input"
          required
        />
      </div>
      <select className="input">
        <option value="">Izaberite temu</option>
        <option value="technical">Tehnička podrška</option>
        <option value="account">Pitanja o nalogu</option>
        <option value="billing">Fakturisanje</option>
        <option value="other">Ostalo</option>
      </select>
      <textarea
        placeholder="Vaša poruka"
        className="input"
        rows={4}
        required
      />
      <button
        type="submit"
        className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all"
      >
        Pošalji poruku
      </button>
      {/* Dugme za povratak na FAQ */}
      <button
        type="button"
        onClick={onClick}
        className="w-full mt-2 py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
      >
        Nazad na FAQ
      </button>
    </form>
  </>
)
}

export default ContactForm;