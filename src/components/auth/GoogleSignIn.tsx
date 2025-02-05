import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from "@/store";
import { LoginResponse } from "@/types/auth";

const GoogleSignIn: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Ensure Google's script is loaded
        if (!window.google) {
            console.error('Google Sign-In script not loaded');
            return;
        }

        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse
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
            dispatch(setCredentials(loginResponse));
            navigate('/');
        } catch (error) {
            console.error('Google Sign-In Error:', error);
        }
    };

    return (
        <div id="googleSignInButton"></div>
    );
};

export default GoogleSignIn;