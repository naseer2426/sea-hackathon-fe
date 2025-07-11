import { SignIn, useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

export function Login() {
    const { isSignedIn } = useUser();
    if (isSignedIn) {
        return <Navigate to="/forum" />;
    }
    return (
        <>
            <div className="h-screen w-screen flex flex-col items-center justify-center">
                <SignIn fallbackRedirectUrl={"/forum"} />
            </div>
        </>
    )
}
