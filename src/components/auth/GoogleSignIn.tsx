import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginResponse } from "@/types/auth";
import { useAuthStore } from '@/store/authStore';

declare global {
    interface Window {
        google: any;
    }
}

const GoogleSignIn: React.FC = () => {
    const navigate = useNavigate();
    const setCredentials = useAuthStore(state => state.setCredentials);

    useEffect(() => {
        const interval = setInterval(() => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                    callback: handleCredentialResponse,
                });

                const buttonElement = document.getElementById('googleSignInButton');
                if (buttonElement && !buttonElement.hasChildNodes()) {
                    window.google.accounts.id.renderButton(buttonElement, {
                        theme: 'filled_blue',
                        size: 'large',
                        text: 'signin_with',
                        shape: 'rectangular',
                    });
                }

                clearInterval(interval);
            }
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const handleCredentialResponse = async (response: { credential?: string }) => {
        if (!response.credential) {
            console.error('No credential received');
            return;
        }

        try {
            const apiResponse = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/users/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: response.credential }),
            });

            if (!apiResponse.ok) {
                const errorText = await apiResponse.text();
                throw new Error(`Authentication failed: ${errorText}`);
            }

            const loginResponse: LoginResponse = await apiResponse.json();

            if (!loginResponse.user || !loginResponse.token) {
                throw new Error('Invalid login response');
            }

            setCredentials(loginResponse.user, loginResponse.token);
            navigate('/');
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            alert('Google Sign-In failed. Please try again.');
        }
    };

    return <div id="googleSignInButton"></div>;
};

export default GoogleSignIn;
