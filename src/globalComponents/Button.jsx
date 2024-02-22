export default function Button({ classname, className, text, red, children, ...props }) {
    return (
        <button
            className={
                (classname ? classname : "login_form_btn login_form_btn--login")
                +
                (red?" red":"")
                + (className ? " "+className:"")
            }
            {...props}
        >
            {text || children}
        </button>
    );
}
