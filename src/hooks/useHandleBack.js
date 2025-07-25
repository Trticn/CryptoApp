import { useNavigate } from "react-router-dom";

export default function useHandleBack() {
    const navigate = useNavigate();
    return () => {
      if (window.history.length > 2) {
        navigate(-1);
      } else {
        navigate('/');
      }
    };
  }