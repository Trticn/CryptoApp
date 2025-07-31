import { useState } from "react";

import FaqListItem from "./FaqListItem";

const faqData = [
    {
      id: 1,
      question: "Šta mogu da radim u ovoj aplikaciji?",
      answer: "Možete pratiti cene kriptovaluta u realnom vremenu, kreirati i upravljati sopstvenim portfolioima, čitati edukativne blog tekstove i postavljati cenovne alarme."
    },
    {
      id: 2,
      question: "Kako da dodam kriptovalute u svoj portfolio?",
      answer: "Na početnoj stranici kliknite na dugme 'Uplata/Isplata', izaberite kriptovalutu, unesite količinu i cenu kupovine/prodaje, i sačuvajte."
    },
    {
      id: 3,
      question: "Da li mogu da pratim više portfolija?",
      answer: "Da, možete kreirati više portfolija i organizovati svoja ulaganja po različitim strategijama (npr. dugoročno, DeFi, testni portfolio itd.)."
    },
    {
      id: 4,
      question: "Kako funkcioniše blog sekcija?",
      answer: "Blog sekcija nudi najnovije vesti, analize i tutorijale iz sveta kriptovaluta. Sadržaj se redovno ažurira i pisan je od strane stručnjaka i entuzijasta."
    },
    {
      id: 5,
      question: "Da li mogu da dobijam obaveštenja o kretanju cena?",
      answer: "Da, možete podesiti obaveštenja za bilo koju kriptovalutu i bićete obavešteni kad dostigne željeni cenovni prag."
    },
    {
      id: 6,
      question: "Da li je moj portfolio vidljiv drugima?",
      answer: "Ne, vaš portfolio je privatan. Možete ga deliti javno samo ako to sami omogućite putem specijalnog linka za deljenje."
    }
  ];

function FaqList(){
    const [openId, setOpenId] = useState(null);

    const handleToggle = (id) => {
      setOpenId(prevId => (prevId === id ? null : id));
    };

      

  return (
    <div className="space-y-4">
      {faqData.map((faq) => (
        <FaqListItem   onClick={() => handleToggle(faq.id)} isOpen={openId === faq.id} key={faq.id} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}

export default FaqList;