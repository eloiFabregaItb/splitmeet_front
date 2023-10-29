export default function Button({ classname, text }) {
    return (
        <button
            className={
                classname ? classname : "login_form_btn login_form_btn--login"
            }
        >
            {text}
        </button>
    );
}
