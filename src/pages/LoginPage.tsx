import { useState, useMemo } from "react";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";

import { GoogleLogin } from '@react-oauth/google';
const formStyles = "border border-slate-200 shadow-[5px_5px_30px_-15px_rgba(0,0,0,0.3)]";

function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);

    const FormComponent = useMemo(() => {
        return isRegistering ? Register : Login;
    }, [isRegistering]);

    const toggleText = isRegistering
        ? "Masz już konto? Zaloguj się"
        : "Nie masz konta? Zarejestruj się";

    return (
        <div className="flex pt-10 items-center flex-col min-h-screen bg-gray-100">
            <div className="border m-1 p-6 rounded-lg shadow-lg bg-white min-w-96">
                <FormComponent className={formStyles} />
            </div>
            <button
                className="mt-4 text-blue-600 hover:underline transition-colors duration-300"
                onClick={() => setIsRegistering((prev) => !prev)}
            >
                {toggleText}
            </button>
            <div className="mt-2 shadow-xl">
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
        </div>
    );
}

export default LoginPage;