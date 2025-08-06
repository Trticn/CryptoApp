import {useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function UserVerifyPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  return (
    <div style={{ maxWidth: 400, margin: "60px auto", textAlign: "center" }}>
      {status === "loading" && <p>Verifikujem email...</p>}
      {status === "success" && (
        <div>
          <h2 style={{ color: "green" }}>Uspeh!</h2>
          <p>{message}</p>
          <p>Preusmeravamo vas na prijavu...</p>
        </div>
      )}
      {status === "error" && (
        <div>
          <h2 style={{ color: "red" }}>Greška</h2>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default UserVerifyPage;