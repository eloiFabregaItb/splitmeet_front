import { signUp } from "../../services/signUp";
import { SHA256 } from "crypto-js";

function SignUp() {
    signUp("user3", "user3@example.com", SHA256("hashed_password3").toString());
    return (
        <>
            <h1>Sign Up</h1>
        </>
    );
}

export default SignUp;
