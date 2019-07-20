import * as React from 'react';
import * as ReactDOM from 'react-dom';
class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.props.state.username = '';
        this.props.state.password = '';
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUsername(event) {
        this.props.state.username = event.currentTarget.value;
    }
    handlePassword(event) {
        this.props.state.password = event.currentTarget.value;
    }
    handleSubmit(event) {
        this.confirmation(event);
    }
    confirmation(e) {
        e.preventDefault();
        const data = {
            username: this.props.state.username,
            password: this.props.state.password
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
                    // ReactDOM.render(
                    //     <UserOutput firstName={result.firstname} lastName={result.lastname} email={result.email} username={result.username}/>,
                    //     document.getElementById('formContainer')
                    // );
                }
            },
            error: function () {
                throw "An error occured please try again.";
            }
        });
    }
    render() {
        let renderErrorMessage = {
            signInError: this.props.state.errorMessage.signInError
        };
        return (React.createElement("div", { id: "signInForm", className: "form" },
            React.createElement("div", { id: "signInFormHeader", className: "formHeader" }, "Sign in to see your user details."),
            React.createElement(SignInRenderError, { signInError: renderErrorMessage.signInError }),
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("label", { id: "usernameSignInLabel", className: "fieldLabel" },
                    "Username:",
                    React.createElement("input", { id: "usernameSignIn", className: "textInput", type: "text", value: this.props.state.username, onChange: this.handleUsername })),
                React.createElement("label", { id: "passwordSignInLabel", className: "fieldLabel" },
                    "Password:",
                    React.createElement("input", { id: "passwordSignIn", className: "textInput", type: "password", value: this.props.state.password, onChange: this.handlePassword })),
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
            return (React.createElement("div", { id: "errorSignIn", className: "error" }, this.errorMessage.signInError));
        }
    }
}
class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.props.state.firstName = '';
        this.props.state.lastName = '';
        this.props.state.email = '';
        this.props.state.username = '';
        this.props.state.password = '';
        this.props.state.confirmPassword = '';
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
        this.props.state.firstName = event.currentTarget.value;
    }
    handleLastName(event) {
        this.props.state.lastName = event.currentTarget.value;
    }
    handleEmail(event) {
        this.props.state.email = event.currentTarget.value;
    }
    handleUsername(event) {
        this.props.state.username = event.currentTarget.value;
    }
    handlePassword(event) {
        this.props.state.password = event.currentTarget.value;
    }
    handleConfirmPassword(event) {
        this.props.state.confirmPassword = event.currentTarget.value;
    }
    handleSubmit(event) {
        let errorMessages = {
            noError: true
        };
        if (this.props.state.firstName != undefined) {
            if (this.props.state.firstName.length == 0) {
                errorMessages.firstNameError = "Please enter a first name.";
                errorMessages.noError = false;
            }
            if (this.props.state.firstName != undefined) {
                if (this.props.state.firstName.length > 50) {
                    errorMessages.firstNameError = "Please enter a first name less than 50 characters.";
                    errorMessages.noError = false;
                }
            }
        }
        else {
            errorMessages.firstNameError = "Please enter a first name.";
            errorMessages.noError = false;
        }
        if (this.props.state.lastName != undefined) {
            if (this.props.state.lastName.length == 0) {
                errorMessages.lastNameError = "Please enter a last name.";
                errorMessages.noError = false;
            }
            if (this.props.state.lastName != undefined) {
                if (this.props.state.lastName.length > 50) {
                    errorMessages.lastNameError = "Please enter a last name less than 50 characters.";
                    errorMessages.noError = false;
                }
            }
        }
        else {
            errorMessages.lastNameError = "Please enter a last name.";
            errorMessages.noError = false;
        }
        if (this.props.state.email != undefined) {
            if (this.props.state.email.length == 0) {
                errorMessages.emailError = "Please enter an email.";
                errorMessages.noError = false;
            }
            if (this.props.state.email.length > 100) {
                errorMessages.emailError = "Please enter an email less than 100 characters.";
                errorMessages.noError = false;
            }
            if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.props.state.email))) {
                errorMessages.emailError = "Please enter a valid email address.";
                errorMessages.noError = false;
            }
        }
        else {
            errorMessages.emailError = "Please enter an email.";
            errorMessages.noError = false;
        }
        if (this.props.state.username != undefined) {
            if (this.props.state.username.length == 0) {
                errorMessages.usernameError = "Please enter a username.";
                errorMessages.noError = false;
            }
            if (this.props.state.username.length > 50) {
                errorMessages.usernameError = "Please enter a username less than 50 characters.";
                errorMessages.noError = false;
            }
        }
        else {
            errorMessages.usernameError = "Please enter a username.";
            errorMessages.noError = false;
        }
        if (this.props.state.password != "") {
            if (this.props.state.password != this.props.state.confirmPassword) {
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
            let returnState;
            returnState.errorMessage = errorMessages;
            returnState.firstName = ((errorMessages.firstNameError == undefined) ? this.props.state.firstName : '');
            returnState.lastName = ((errorMessages.lastNameError == undefined) ? this.props.state.lastName : '');
            returnState.email = ((errorMessages.emailError == undefined) ? this.props.state.email : '');
            returnState.username = ((errorMessages.usernameError == undefined) ? this.props.state.username : '');
            ReactDOM.render([React.createElement(MenuComponent, null), React.createElement(SignUpForm, { state: returnState })], document.getElementById('formContainer'));
        }
    }
    confirmation(e) {
        e.preventDefault();
        const data = {
            'firstName': this.props.state.firstName,
            'lastName': this.props.state.lastName,
            'email': this.props.state.email,
            'username': this.props.state.username,
            'password': this.props.state.password
        };
        $.ajax({
            type: 'POST',
            url: "/SignUp",
            data: data,
            success: function (result) {
                if (result.errorMessage != undefined) {
                    let returnState;
                    returnState.errorMessage = result.errorMessage;
                    returnState.firstName = result.firstName;
                    returnState.lastName = result.lastName;
                    returnState.email = result.email;
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
        return (React.createElement("div", { id: "signUpFormContainer", className: "form" },
            React.createElement("div", { id: "signUpFormHeader", className: "formHeader" }, "Sign up to add your user details to the database."),
            React.createElement("form", { id: "signUpForm", onSubmit: this.handleSubmit },
                React.createElement(SignUpRenderE1, { firstNameError: this.props.state.errorMessage.firstNameError }),
                React.createElement("label", { id: "fistNameSignUpLabel", className: "fieldLabel" },
                    "First Name:",
                    React.createElement("input", { id: "fistNameSignUp", className: "textInput", type: "text", value: this.props.state.firstName, onChange: this.handleFirstName, maxLength: 50 })),
                React.createElement(SignUpRenderE2, { lastNameError: this.props.state.errorMessage.lastNameError }),
                React.createElement("label", { id: "lastNameSignUpLabel", className: "fieldLabel" },
                    "Last Name:",
                    React.createElement("input", { id: "lastNameSignUp", className: "textInput", type: "text", value: this.props.state.lastName, onChange: this.handleLastName, maxLength: 50 })),
                React.createElement(SignUpRenderE3, { emailError: this.props.state.errorMessage.emailError }),
                React.createElement("label", { id: "emailSignUpLabel", className: "fieldLabel" },
                    "Email:",
                    React.createElement("input", { id: "emailSignUp", className: "textInput", type: "text", value: this.props.state.email, onChange: this.handleEmail, maxLength: 100 })),
                React.createElement(SignUpRenderE4, { usernameError: this.props.state.errorMessage.usernameError }),
                React.createElement("label", { id: "usernameSignUpLabel", className: "fieldLabel" },
                    "Username:",
                    React.createElement("input", { id: "usernameSignUp", className: "textInput", type: "text", value: this.props.state.username, onChange: this.handleUsername, maxLength: 50 })),
                React.createElement(SignUpRenderE5, { passwordError: this.props.state.errorMessage.passwordError }),
                React.createElement("label", { id: "passwordSignUpLabel", className: "fieldLabel" },
                    "Password:",
                    React.createElement("input", { id: "passwordSignUp", className: "textInput", type: "password", value: this.props.state.password, onChange: this.handlePassword, maxLength: 50 })),
                React.createElement("label", { id: "confirmPasswordSignUpLabel", className: "fieldLabel" },
                    "Confirm Password:",
                    React.createElement("input", { id: "confirmPasswordSignUp", className: "textInput", type: "password", value: this.props.state.confirmPassword, onChange: this.handleConfirmPassword, maxLength: 50 })),
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
function GetAppState() {
    switch (appState) {
        case "SIGN_IN":
            return [React.createElement(MenuComponent, null), React.createElement(SignInForm, { state: emptyState })];
        case "SIGN_UP":
            return [React.createElement(MenuComponent, null), React.createElement(SignUpForm, { state: emptyState })];
        // case "USER_OUTPUT":
        //     return <UserOutput />;
        default:
            throw "Unexpected menu state encountered. Please reload the page and try again.";
    }
}
function UpdateDOM() {
    ReactDOM.render(React.createElement(GetAppState, null), document.getElementById('formContainer'));
}
UpdateDOM();
