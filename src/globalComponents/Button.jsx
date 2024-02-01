export default function Button({ classname, text, red, ...props }) {
    return (
        <button
            className={
                (classname ? classname : "login_form_btn login_form_btn--login")
                +
                (red?" red":"")
            }
            {...props}
        >
            {text}
        </button>
    );
}
