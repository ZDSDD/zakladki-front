import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { setCredentials } from "@/store";
import { GoogleLogin } from '@react-oauth/google';
import { LoginResponse } from "@/types/auth";

function LoginPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: { user: { token: string } }) => state.user);

    useEffect(() => {
        if (user?.token) {
            navigate('/');
        }
    }, [user, navigate]);

    const FormComponent = useMemo(() => (isRegistering ? Register : Login), [isRegistering]);
    const toggleText = isRegistering
        ? "Masz już konto? Zaloguj się"
        : "Nie masz konta? Zarejestruj się";

    return (
        <div className="flex pt-10 items-center flex-col min-h-screen bg-gray-100">
            <div className="border m-1 p-6 rounded-lg shadow-lg bg-white min-w-96">
                <FormComponent
                    onAuthSuccess={() => navigate('/')}
                />
            </div>
            <button
                className="mt-4 text-blue-600 hover:underline transition-colors duration-300"
                onClick={() => setIsRegistering((prev) => !prev)}
            >
                {toggleText}
            </button>
            <div className="mt-2 shadow-xl">
                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        try {
                            const response = await fetch(import.meta.env.VITE_BACKEND_API_URL + "/users/google", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ token: credentialResponse.credential }),
                            });

                            if (!response.ok) throw new Error(`response status: ${response.status}`);
                            const loginResponse: LoginResponse = await response.json();
                            dispatch(setCredentials(loginResponse));
                            navigate('/');
                        } catch (error: unknown) {
                            console.error(error instanceof Error ? error.message : error);
                        }
                    }}
                    onError={() => console.error('Google Login Failed')}
                />
            </div>
        </div>
    );
}

export default LoginPage;
