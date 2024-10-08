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
        <div className="flex justify-center items-center flex-col min-h-screen bg-gray-100">
            <div className="border-1 m-1 p-6 rounded-lg shadow-lg bg-white min-w-96">
                {getForm()}
            </div>
            <div
                className="mt-4 text-blue-600 hover:cursor-pointer hover:underline transition-colors duration-300"
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
