import { useState, useMemo, useEffect } from "react";
import "./loginPage.css"

declare global {
    interface Window {
        google: any;
    }
}
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { setCredentials } from "@/store";
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

        // Initialize Google Sign-In
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: handleGoogleSignIn
            });

            window.google.accounts.id.renderButton(
                document.getElementById('googleSignInButton'),
                {
                    theme: 'filled_blue',
                    size: 'large',
                    text: 'signin_with',
                    shape: 'rectangular'
                }
            );
        }
    }, [user, navigate]);

    const handleGoogleSignIn = async (credentialResponse: { credential?: string }) => {
        if (!credentialResponse.credential) {
            console.error('No credential received');
            return;
        }

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
    };

    const FormComponent = useMemo(() => (isRegistering ? Register : Login), [isRegistering]);
    const toggleText = isRegistering
        ? <>Masz już konto? <span className="underline decoration-2 decoration-emerald-600">Zaloguj się</span></>
        : <>Nie masz konta? <span className="underline">Zarejestruj się</span></>;

    return (
        <div className="flex justify-center items-center flex-col h-screen">
            <div className="flex items-center p-3 flex-col border-1 rounded-lg shadow-lg bg-stone-100 ">
                <FormComponent
                    onAuthSuccess={() => navigate('/')}
                />
            </div>
            <button
                className="mt-4 text-blue-600 transition-colors duration-300"
                onClick={() => setIsRegistering((prev) => !prev)}
            >
                {toggleText}
            </button>
            <div className="mt-2 shadow-xl">
                <div id="googleSignInButton"></div>
            </div>
        </div>
    );
}

export default LoginPage;