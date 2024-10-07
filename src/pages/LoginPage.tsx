import Login from "@/components/Login";
import { useState } from "react";
function LoginPage() {
  const [notRegisteredYet, setNotRegisteredYet] = useState<boolean>(false);
  return (
    <div className="flex justify-center items-center flex-col m-auto">
      <Login className="border border-slate-200 shadow-[5px_5px_30px_-15px_rgba(0,0,0,0.3)]" />
      <div
        className="hover:cursor-pointer hover:underline"
        onClick={() => setNotRegisteredYet((oldVal) => !oldVal)}
      >
        {notRegisteredYet ? (
          <span>Nie masz konta? Zarejestruj się</span>
        ) : (
          <span>Masz już konto? Zaloguj się</span>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
