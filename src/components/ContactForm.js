import { useSelector,useDispatch } from "react-redux";
import { useSendMessageMutation } from "../store";
import { useState } from "react";
import { showNottification } from "../store";


function ContactForm({onClick}) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [email,setEmail] = useState(user?.email || '')
  const [sendMessage,results] = useSendMessageMutation();
  const [topic,setTopic] = useState('general');
  const [message,setMessage] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
  

     const data = await sendMessage({
        topic,email,message
      });

      if(data.error) throw data.error;

      dispatch(
        showNottification({
          message: data.data.message,
          type: "success",
          duration: 2000,
          show: true,
        })
      );
      console.log(data)

      setTopic("general");
      setEmail(user?.email);
      setMessage('')
 
  
    } catch (err) {
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

return (
    <div>
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Pošaljite nam poruku</h3>
    <form onSubmit={handleSubmit}  className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="email"
          value={email}
          name="email"
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Vaš email"
          className="input"
          required
        />
              <select value={topic} onChange={(e)=>setTopic(e.target.value)} required className="input" name="topic">
  <option value="general">Opšte pitanje</option>
  <option value="technical">Tehnička podrška</option>
  <option value="suggestion">Predlog za poboljšanje</option>
  <option value="billing">Problem sa naplatom</option>
  <option value="bug">Prijava greške</option>
  <option value="account">Problem sa nalogom</option>
  <option value="partnership">Saradnja</option>
  <option value="inappropriate">Neprimeren sadržaj</option>
  <option value="other">Drugo</option>
</select>
      </div>

      <textarea
        placeholder="Vaša poruka"
        className="input"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        rows={4}
        required
        name="message"
      />
      <button
        type="submit"
        className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all"
        disabled={results.isLoading}
      >
            {results.isLoading ? "Slanje..." : "Pošalji poruku"}
      </button>
      <button
        type="button"
        onClick={onClick}
        className="w-full mt-2 py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
      >
        Nazad na FAQ
      </button>
    </form>
  </div>
)
}

export default ContactForm;