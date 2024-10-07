import Login from "@/components/Login";
import Register from "@/components/Register";
import { useState } from "react";
function LoginPage() {
  const [notRegisteredYet, setNotRegisteredYet] = useState<boolean>(false);

  const formStyles: string =
    "border border-slate-200 shadow-[5px_5px_30px_-15px_rgba(0,0,0,0.3)]";

  const getForm = () => {
    if (notRegisteredYet) {
      return (
        <>
          <Register className={formStyles}></Register>
        </>
      );
    }
    return (
      <>
        <Login className={formStyles} />
      </>
    );
  };

  return (
    <div className="flex justify-center items-center flex-col m-auto transition-all duration-1000 delay-500">
      {getForm()}
      <div
        className="hover:cursor-pointer hover:underline"
        onClick={() => setNotRegisteredYet((oldVal) => !oldVal)}
      >
        {notRegisteredYet ? (
          <span>Masz już konto? Zaloguj się</span>
        ) : (
          <span>Nie masz konta? Zarejestruj się</span>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
