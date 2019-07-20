class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUsername(event) {
        this.setState({ username: event.currentTarget.value });
    }
    handlePassword(event) {
        this.setState({ password: event.currentTarget.value });
    }
    handleSubmit(event) {
        this.confirmation(event);
    }
    confirmation(e) {
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        $.ajax({
            type: 'POST',
            url: "/SignIn",
            data: data,
            success: function (result) {
                if (result.errorMessage != undefined) {
                    ReactDOM.render([React.createElement(MenuComponent, null), React.createElement(SignInForm, { state: result })], document.getElementById('formContainer'));
                }
                else {
                    ReactDOM.render(React.createElement(UserOutput, { state: result }), document.getElementById('formContainer'));
                }
            },
            error: function () {
                throw "An error occured please try again.";
            }
        });
    }
    render() {
        let renderErrorMessage;
        if (this.props.state.errorMessage != undefined) {
            renderErrorMessage = {
                signInError: this.props.state.errorMessage.signInError
            };
        }
        else {
            renderErrorMessage = {
                signInError: undefined
            };
        }
        return (React.createElement("div", { id: "signInForm", className: "form" },
            React.createElement("div", { id: "signInFormHeader", className: "formHeader" }, "Sign in to see your user details."),
            React.createElement(SignInRenderError, { signInError: renderErrorMessage.signInError }),
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("label", { id: "usernameSignInLabel", className: "fieldLabel" },
                    "Username:",
                    React.createElement("input", { id: "usernameSignIn", className: "textInput", type: "text", value: this.state.username, onChange: this.handleUsername })),
                React.createElement("label", { id: "passwordSignInLabel", className: "fieldLabel" },
                    "Password:",
                    React.createElement("input", { id: "passwordSignIn", className: "textInput", type: "password", value: this.state.password, onChange: this.handlePassword })),
                React.createElement("input", { id: "submitSignIn", className: "submitButton", type: "submit", value: "Sign In" }))));
    }
}
function SignInRenderError(errorMessage) {
    if (errorMessage == undefined) {
        return (null);
    }
    else {
        if ((errorMessage.signInError == undefined) || (errorMessage.signInError == '')) {
            return (null);
        }
        else {
            return (React.createElement("div", { id: "errorSignIn", className: "error" }, errorMessage.signInError));
        }
    }
}
class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        };
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.confirmation = this.confirmation.bind(this);
    }
    handleFirstName(event) {
        this.setState({ firstName: event.currentTarget.value });
    }
    handleLastName(event) {
        this.setState({ lastName: event.currentTarget.value });
    }
    handleEmail(event) {
        this.setState({ email: event.currentTarget.value });
    }
    handleUsername(event) {
        this.setState({ username: event.currentTarget.value });
    }
    handlePassword(event) {
        this.setState({ password: event.currentTarget.value });
    }
    handleConfirmPassword(event) {
        this.setState({ confirmPassword: event.currentTarget.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        let errorMessages = {
            noError: true
        };
        if (this.state.firstName != undefined) {
            if (this.state.firstName.length == 0) {
                errorMessages.firstNameError = "Please enter a first name.";
                errorMessages.noError = false;
            }
            if (this.state.firstName != undefined) {
                if (this.state.firstName.length > 50) {
                    errorMessages.firstNameError = "Please enter a first name less than 50 characters.";
                    errorMessages.noError = false;
                }
            }
        }
        else {
            errorMessages.firstNameError = "Please enter a first name.";
            errorMessages.noError = false;
        }
        if (this.state.lastName != undefined) {
            if (this.state.lastName.length == 0) {
                errorMessages.lastNameError = "Please enter a last name.";
                errorMessages.noError = false;
            }
            if (this.state.lastName != undefined) {
                if (this.state.lastName.length > 50) {
                    errorMessages.lastNameError = "Please enter a last name less than 50 characters.";
                    errorMessages.noError = false;
                }
            }
        }
        else {
            errorMessages.lastNameError = "Please enter a last name.";
            errorMessages.noError = false;
        }
        if (this.state.email != undefined) {
            if (this.state.email.length == 0) {
                errorMessages.emailError = "Please enter an email.";
                errorMessages.noError = false;
            }
            if (this.state.email.length > 100) {
                errorMessages.emailError = "Please enter an email less than 100 characters.";
                errorMessages.noError = false;
            }
            if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email))) {
                errorMessages.emailError = "Please enter a valid email address.";
                errorMessages.noError = false;
            }
        }
        else {
            errorMessages.emailError = "Please enter an email.";
            errorMessages.noError = false;
        }
        if (this.state.username != undefined) {
            if (this.state.username.length == 0) {
                errorMessages.usernameError = "Please enter a username.";
                errorMessages.noError = false;
            }
            if (this.state.username.length > 50) {
                errorMessages.usernameError = "Please enter a username less than 50 characters.";
                errorMessages.noError = false;
            }
        }
        else {
            errorMessages.usernameError = "Please enter a username.";
            errorMessages.noError = false;
        }
        if (this.state.password != "") {
            if (this.state.password != this.state.confirmPassword) {
                errorMessages.passwordError = "Those passwords didn't match. Try again.";
                errorMessages.noError = false;
            }
        }
        else {
            errorMessages.passwordError = "Please enter a password.";
            errorMessages.noError = false;
        }
        if (errorMessages.noError) {
            this.confirmation(event);
        }
        else {
            const returnState = {
                errorMessage: errorMessages,
                firstName: ((errorMessages.firstNameError == undefined) ? this.state.firstName : ''),
                lastName: ((errorMessages.lastNameError == undefined) ? this.state.lastName : ''),
                email: ((errorMessages.emailError == undefined) ? this.state.email : ''),
                username: ((errorMessages.usernameError == undefined) ? this.state.username : '')
            };
            ReactDOM.render([React.createElement(MenuComponent, null), React.createElement(SignUpForm, { state: returnState })], document.getElementById('formContainer'));
        }
    }
    confirmation(e) {
        e.preventDefault();
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        };
        this.setState({ username: '' });
        this.setState({ password: '' });
        this.setState({ confirmPassword: '' });
        $.ajax({
            type: 'POST',
            url: "/SignUp",
            data: data,
            success: function (result) {
                if (result.errorMessage != undefined) {
                    let returnState = {
                        errorMessage: result.errorMessage,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        email: result.email
                    };
                    ReactDOM.render([React.createElement(MenuComponent, null), React.createElement(SignUpForm, { state: returnState })], document.getElementById('formContainer'));
                }
                else {
                    alert("New user created successfuly.");
                    appState = "SIGN_IN";
                    UpdateDOM();
                }
            },
            error: function () {
                throw "An error occured please try again.";
            }
        });
    }
    render() {
        let renderErrorMessage;
        if (this.props.state.errorMessage != undefined) {
            renderErrorMessage = this.props.state.errorMessage;
        }
        else {
            renderErrorMessage = {
                signInError: undefined
            };
        }
        return (React.createElement("div", { id: "signUpFormContainer", className: "form" },
            React.createElement("div", { id: "signUpFormHeader", className: "formHeader" }, "Sign up to add your user details to the database."),
            React.createElement("form", { id: "signUpForm", onSubmit: this.handleSubmit },
                React.createElement(SignUpRenderE1, { firstNameError: renderErrorMessage.firstNameError }),
                React.createElement("label", { id: "fistNameSignUpLabel", className: "fieldLabel" },
                    "First Name:",
                    React.createElement("input", { id: "fistNameSignUp", className: "textInput", type: "text", value: this.state.firstName, onChange: this.handleFirstName, maxLength: 50 })),
                React.createElement(SignUpRenderE2, { lastNameError: renderErrorMessage.lastNameError }),
                React.createElement("label", { id: "lastNameSignUpLabel", className: "fieldLabel" },
                    "Last Name:",
                    React.createElement("input", { id: "lastNameSignUp", className: "textInput", type: "text", value: this.state.lastName, onChange: this.handleLastName, maxLength: 50 })),
                React.createElement(SignUpRenderE3, { emailError: renderErrorMessage.emailError }),
                React.createElement("label", { id: "emailSignUpLabel", className: "fieldLabel" },
                    "Email:",
                    React.createElement("input", { id: "emailSignUp", className: "textInput", type: "text", value: this.state.email, onChange: this.handleEmail, maxLength: 100 })),
                React.createElement(SignUpRenderE4, { usernameError: renderErrorMessage.usernameError }),
                React.createElement("label", { id: "usernameSignUpLabel", className: "fieldLabel" },
                    "Username:",
                    React.createElement("input", { id: "usernameSignUp", className: "textInput", type: "text", value: this.state.username, onChange: this.handleUsername, maxLength: 50 })),
                React.createElement(SignUpRenderE5, { passwordError: renderErrorMessage.passwordError }),
                React.createElement("label", { id: "passwordSignUpLabel", className: "fieldLabel" },
                    "Password:",
                    React.createElement("input", { id: "passwordSignUp", className: "textInput", type: "password", value: this.state.password, onChange: this.handlePassword, maxLength: 50 })),
                React.createElement("label", { id: "confirmPasswordSignUpLabel", className: "fieldLabel" },
                    "Confirm Password:",
                    React.createElement("input", { id: "confirmPasswordSignUp", className: "textInput", type: "password", value: this.state.confirmPassword, onChange: this.handleConfirmPassword, maxLength: 50 })),
                React.createElement("input", { id: "submitSignUp", className: "submitButton", type: "submit", value: "Sign up" }))));
    }
}
function SignUpRenderE1(errorMessage) {
    if (errorMessage == undefined) {
        return (null);
    }
    else {
        if ((errorMessage.firstNameError == undefined) || (errorMessage.firstNameError == '')) {
            return (null);
        }
        else {
            return (React.createElement("div", { id: "errorSignUpFirstName", className: "error" }, errorMessage.firstNameError));
        }
    }
}
function SignUpRenderE2(errorMessage) {
    if (errorMessage == undefined) {
        return (null);
    }
    else {
        if ((errorMessage.lastNameError == undefined) || (errorMessage.lastNameError == '')) {
            return (null);
        }
        else {
            return (React.createElement("div", { id: "errorSignUpLastName", className: "error" }, errorMessage.lastNameError));
        }
    }
}
function SignUpRenderE3(errorMessage) {
    if (errorMessage == undefined) {
        return (null);
    }
    else {
        if ((errorMessage.emailError == undefined) || (errorMessage.emailError == '')) {
            return (null);
        }
        else {
            return (React.createElement("div", { id: "errorSignUpEmail", className: "error" }, errorMessage.emailError));
        }
    }
}
function SignUpRenderE4(errorMessage) {
    if (errorMessage == undefined) {
        return (null);
    }
    else {
        if ((errorMessage.usernameError == undefined) || (errorMessage.usernameError == '')) {
            return (null);
        }
        else {
            return (React.createElement("div", { id: "errorSignUpUsername", className: "error" }, errorMessage.usernameError));
        }
    }
}
function SignUpRenderE5(errorMessage) {
    if (errorMessage == undefined) {
        return (null);
    }
    else {
        if ((errorMessage.passwordError == undefined) || (errorMessage.passwordError == '')) {
            return (null);
        }
        else {
            return (React.createElement("div", { id: "errorSignUpPassword", className: "error" }, errorMessage.passwordError));
        }
    }
}
class UserOutput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: this.props.state.firstName,
            lastName: this.props.state.lastName,
            email: this.props.state.email
        };
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }
    handleSignOut(event) {
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: ''
        };
        appState = "SIGN_IN";
        UpdateDOM();
    }
    handleDeleteUser(event) {
        this.delete(event);
    }
    delete(e) {
        e.preventDefault();
        const data = {
            username: this.props.state.username
        };
        $.ajax({
            type: 'POST',
            url: "/DeleteUser",
            data: data,
            success: function (result) {
                alert("User has been deleted successfully.");
                ReactDOM.render([React.createElement(MenuComponent, null), React.createElement(SignInForm, { state: result })], document.getElementById('formContainer'));
            },
            error: function () {
                throw "Unable to delete user please try again.";
            }
        });
    }
    render() {
        return (React.createElement("div", { id: "userOutputForm", className: "form" },
            React.createElement("div", { id: "userOutputHeader", className: "formHeader" }, "Your user details are displayed below."),
            React.createElement("label", { id: "firstNameOutputLabel", className: "fieldLabel" },
                "First Name:",
                React.createElement("div", { id: "firstNameOutput", className: "textOutput" }, this.props.state.firstName)),
            React.createElement("label", { id: "lastNameOutputLabel", className: "fieldLabel" },
                "Last Name:",
                React.createElement("div", { id: "lastNameOutput", className: "textOutput" }, this.props.state.lastName)),
            React.createElement("label", { id: "emailOutputLabel", className: "fieldLabel" },
                "Email:",
                React.createElement("div", { id: "emailOutput", className: "textOutput" }, this.props.state.email)),
            React.createElement("div", { id: "userOutputFooter", className: "formFooter" },
                React.createElement("div", { id: "logoutButton", className: "footerButton", onClick: this.handleSignOut }, "Log out"),
                React.createElement("div", { id: "deleteUserButton", className: "footerButton", onClick: this.handleDeleteUser }, "Delete User"))));
    }
}
var appState = "SIGN_IN";
let emptyState = {
    errorMessage: undefined,
    username: undefined,
    password: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined
};
function MenuComponent() {
    var selectedState = false;
    switch (appState) {
        case "SIGN_IN":
            selectedState = true;
            break;
        case "SIGN_UP":
            selectedState = false;
            break;
        default:
            throw "Unexpected menu state encountered. Please reload the page and try again.";
    }
    return (React.createElement("form", { id: "formMenu", className: "menu" },
        React.createElement("div", { id: !selectedState ? 'unselectedSignIn' : '', className: "menuItem", onClick: setMenuSignInState }, "Sign in"),
        React.createElement("div", { id: selectedState ? 'unselectedSignUp' : '', className: "menuItem", onClick: setMenuSignUpState }, "Sign up")));
}
function setMenuSignInState() {
    appState = "SIGN_IN";
    UpdateDOM();
}
function setMenuSignUpState() {
    appState = "SIGN_UP";
    UpdateDOM();
}
function UpdateDOM() {
    switch (appState) {
        case "SIGN_IN":
            ReactDOM.render([React.createElement(MenuComponent, null), React.createElement(SignInForm, { state: emptyState })], document.getElementById('formContainer'));
            break;
        case "SIGN_UP":
            ReactDOM.render([React.createElement(MenuComponent, null), React.createElement(SignUpForm, { state: emptyState })], document.getElementById('formContainer'));
            break;
        case "USER_OUTPUT":
            ReactDOM.render(React.createElement(UserOutput, { state: emptyState }), document.getElementById('formContainer'));
            break;
        default:
            throw "Unexpected menu state encountered. Please reload the page and try again.";
    }
}
UpdateDOM();
