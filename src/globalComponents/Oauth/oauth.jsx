import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";



const GoogleAuth = () => {
    const clientId = "384807507489-0u90koe30ia44ibbtqitqloipk193i8h.apps.googleusercontent.com";

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log("Login Failed");
                }}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleAuth;