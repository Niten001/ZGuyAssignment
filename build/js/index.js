var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SignInForm = /** @class */ (function (_super) {
    __extends(SignInForm, _super);
    function SignInForm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            username: '',
            password: ''
        };
        _this.handleUsername = _this.handleUsername.bind(_this);
        _this.handlePassword = _this.handlePassword.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }
    SignInForm.prototype.handleUsername = function (event) {
        this.setState({ username: event.target.value });
    };
    SignInForm.prototype.handlePassword = function (event) {
        this.setState({ password: event.target.value });
    };
    SignInForm.prototype.handleSubmit = function (event) {
        this.confirmation(event);
    };
    SignInForm.prototype.confirmation = function (e) {
        e.preventDefault();
        var data = {
            'username': this.state.username,
            'password': this.state.password
        };
        $.ajax({
            type: 'POST',
            url: "/SignIn",
            data: data,
            success: function (result) {
                if (result.error != undefined) {
                    ReactDOM.render([React.createElement(MenuComponent, null), React.createElement(SignInForm, { errorMessage: result.error })], document.getElementById('formContainer'));
                }
                else {
                    ReactDOM.render(React.createElement(UserOutput, { firstName: result.firstname, lastName: result.lastname, email: result.email, username: result.username }), document.getElementById('formContainer'));
                }
            },
            error: function () {
                throw "An error occured please try again.";
            }
        });
    };
    SignInForm.prototype.render = function () {
        if (this.props.errorMessage == undefined) {
            return (React.createElement("div", { id: "signInForm", className: "form" },
                React.createElement("div", { id: "signInFormHeader", className: "formHeader" }, "Sign in to see your user details."),
                React.createElement("form", { onSubmit: this.handleSubmit },
                    React.createElement("label", { id: "usernameSignInLabel", className: "fieldLabel" },
                        "Username:",
                        React.createElement("input", { id: "usernameSignIn", className: "textInput", type: "text", value: this.state.username, onChange: this.handleUsername })),
                    React.createElement("label", { id: "passwordSignInLabel", className: "fieldLabel" },
                        "Password:",
                        React.createElement("input", { id: "passwordSignIn", className: "textInput", type: "password", value: this.state.password, onChange: this.handlePassword })),
                    React.createElement("input", { id: "submitSignIn", className: "submitButton", type: "submit", value: "Sign In" }))));
        }
        else {
            return (React.createElement("div", { id: "signInForm", className: "form" },
                React.createElement("div", { id: "signInFormHeader", className: "formHeader" }, "Sign in to see your user details."),
                React.createElement("div", { id: "errorSignIn", className: "error" }, this.props.errorMessage),
                React.createElement("form", { onSubmit: this.handleSubmit },
                    React.createElement("label", { id: "usernameSignInLabel", className: "fieldLabel" },
                        "Username:",
                        React.createElement("input", { id: "usernameSignIn", className: "textInput", type: "text", value: this.state.username, onChange: this.handleUsername })),
                    React.createElement("label", { id: "passwordSignInLabel", className: "fieldLabel" },
                        "Password:",
                        React.createElement("input", { id: "passwordSignIn", className: "textInput", type: "password", value: this.state.password, onChange: this.handlePassword })),
                    React.createElement("input", { id: "submitSignIn", className: "submitButton", type: "submit", value: "Sign In" }))));
        }
    };
    return SignInForm;
}(React.Component));
var SignUpForm = /** @class */ (function (_super) {
    __extends(SignUpForm, _super);
    function SignUpForm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        };
        _this.state.firstName = _this.props.firstName;
        _this.state.lastName = _this.props.lastName;
        _this.state.email = _this.props.email;
        _this.state.username = _this.props.username;
        _this.handleFirstName = _this.handleFirstName.bind(_this);
        _this.handleLastName = _this.handleLastName.bind(_this);
        _this.handleEmail = _this.handleEmail.bind(_this);
        _this.handleUsername = _this.handleUsername.bind(_this);
        _this.handlePassword = _this.handlePassword.bind(_this);
        _this.handleConfirmPassword = _this.handleConfirmPassword.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.confirmation = _this.confirmation.bind(_this);
        return _this;
    }
    SignUpForm.prototype.handleFirstName = function (event) {
        this.setState({ firstName: event.target.value });
    };
    SignUpForm.prototype.handleLastName = function (event) {
        this.setState({ lastName: event.target.value });
    };
    SignUpForm.prototype.handleEmail = function (event) {
        this.setState({ email: event.target.value });
    };
    SignUpForm.prototype.handleUsername = function (event) {
        this.setState({ username: event.target.value });
    };
    SignUpForm.prototype.handlePassword = function (event) {
        this.setState({ password: event.target.value });
    };
    SignUpForm.prototype.handleConfirmPassword = function (event) {
        this.setState({ confirmPassword: event.target.value });
    };
    SignUpForm.prototype.handleSubmit = function (event) {
        var errorMessages = {
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
            var returnFirstName = ((errorMessages.firstNameError == undefined) ? this.state.firstName : '');
            var returnLastName = ((errorMessages.lastNameError == undefined) ? this.state.lastName : '');
            var returnEmail = ((errorMessages.emailError == undefined) ? this.state.email : '');
            var returnUsername = ((errorMessages.usernameError == undefined) ? this.state.username : '');
            ReactDOM.render([React.createElement(MenuComponent, null), React.createElement(SignUpForm, { errorMessage: errorMessages, firstName: returnFirstName, lastName: returnLastName, email: returnEmail, username: returnUsername })], document.getElementById('formContainer'));
        }
    };
    SignUpForm.prototype.confirmation = function (e) {
        e.preventDefault();
        var data = {
            'firstName': this.state.firstName,
            'lastName': this.state.lastName,
            'email': this.state.email,
            'username': this.state.username,
            'password': this.state.password
        };
        $.ajax({
            type: 'POST',
            url: "/SignUp",
            data: data,
            success: function (result) {
                if (result.error != undefined) {
                    ReactDOM.render([React.createElement(MenuComponent, null), React.createElement(SignUpForm, { errorMessage: result.error, firstName: result.error.firstName, lastName: result.error.lastName, email: result.error.email })], document.getElementById('formContainer'));
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
    };
    SignUpForm.prototype.render = function () {
        return (React.createElement("div", { id: "signUpFormContainer", className: "form" },
            React.createElement("div", { id: "signUpFormHeader", className: "formHeader" }, "Sign up to add your user details to the database."),
            React.createElement("form", { id: "signUpForm", onSubmit: this.handleSubmit },
                React.createElement(SignUpRenderE1, { errorMessage: this.props.errorMessage }),
                React.createElement("label", { id: "fistNameSignUpLabel", className: "fieldLabel" },
                    "First Name:",
                    React.createElement("input", { id: "fistNameSignUp", className: "textInput", type: "text", value: this.state.firstName, onChange: this.handleFirstName, maxLength: "50" })),
                React.createElement(SignUpRenderE2, { errorMessage: this.props.errorMessage }),
                React.createElement("label", { id: "lastNameSignUpLabel", className: "fieldLabel" },
                    "Last Name:",
                    React.createElement("input", { id: "lastNameSignUp", className: "textInput", type: "text", value: this.state.lastName, onChange: this.handleLastName, maxLength: "50" })),
                React.createElement(SignUpRenderE3, { errorMessage: this.props.errorMessage }),
                React.createElement("label", { id: "emailSignUpLabel", className: "fieldLabel" },
                    "Email:",
                    React.createElement("input", { id: "emailSignUp", className: "textInput", type: "text", value: this.state.email, onChange: this.handleEmail, maxLength: "100" })),
                React.createElement(SignUpRenderE4, { errorMessage: this.props.errorMessage }),
                React.createElement("label", { id: "usernameSignUpLabel", className: "fieldLabel" },
                    "Username:",
                    React.createElement("input", { id: "usernameSignUp", className: "textInput", type: "text", value: this.state.username, onChange: this.handleUsername, maxLength: "50" })),
                React.createElement(SignUpRenderE5, { errorMessage: this.props.errorMessage }),
                React.createElement("label", { id: "passwordSignUpLabel", className: "fieldLabel" },
                    "Password:",
                    React.createElement("input", { id: "passwordSignUp", className: "textInput", type: "password", value: this.state.password, onChange: this.handlePassword, maxLength: "50" })),
                React.createElement("label", { id: "confirmPasswordSignUpLabel", className: "fieldLabel" },
                    "Confirm Password:",
                    React.createElement("input", { id: "confirmPasswordSignUp", className: "textInput", type: "password", value: this.state.confirmPassword, onChange: this.handleConfirmPassword, maxLength: "50" })),
                React.createElement("input", { id: "submitSignUp", className: "submitButton", type: "submit", value: "Sign up" }))));
    };
    return SignUpForm;
}(React.Component));
function SignUpRenderE1(props) {
    if (props.errorMessage == undefined) {
        return (null);
    }
    else {
        if ((props.errorMessage.firstNameError == undefined) || (props.errorMessage.firstNameError == '')) {
            return (null);
        }
        else {
            return (React.createElement("div", { id: "errorSignUpFirstName", className: "error" }, props.errorMessage.firstNameError));
        }
    }
}
function SignUpRenderE2(props) {
    if (props.errorMessage == undefined) {
        return (null);
    }
    else {
        if ((props.errorMessage.lastNameError == undefined) || (props.errorMessage.lastNameError == '')) {
            return (null);
        }
        else {
            return (React.createElement("div", { id: "errorSignUpLastName", className: "error" }, props.errorMessage.lastNameError));
        }
    }
}
function SignUpRenderE3(props) {
    if (props.errorMessage == undefined) {
        return (null);
    }
    else {
        if ((props.errorMessage.emailError == undefined) || (props.errorMessage.emailError == '')) {
            return (null);
        }
        else {
            return (React.createElement("div", { id: "errorSignUpEmail", className: "error" }, props.errorMessage.emailError));
        }
    }
}
function SignUpRenderE4(props) {
    if (props.errorMessage == undefined) {
        return (null);
    }
    else {
        if ((props.errorMessage.usernameError == undefined) || (props.errorMessage.usernameError == '')) {
            return (null);
        }
        else {
            return (React.createElement("div", { id: "errorSignUpUsername", className: "error" }, props.errorMessage.usernameError));
        }
    }
}
function SignUpRenderE5(props) {
    if (props.errorMessage == undefined) {
        return (null);
    }
    else {
        if ((props.errorMessage.passwordError == undefined) || (props.errorMessage.passwordError == '')) {
            return (null);
        }
        else {
            return (React.createElement("div", { id: "errorSignUpPassword", className: "error" }, props.errorMessage.passwordError));
        }
    }
}
var UserOutput = /** @class */ (function (_super) {
    __extends(UserOutput, _super);
    function UserOutput(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: ''
        };
        _this.handleSignOut = _this.handleSignOut.bind(_this);
        _this.handleDeleteUser = _this.handleDeleteUser.bind(_this);
        return _this;
    }
    UserOutput.prototype.handleSignOut = function (event) {
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: ''
        };
        appState = "SIGN_IN";
        UpdateDOM();
    };
    UserOutput.prototype.handleDeleteUser = function (event) {
        this["delete"](event);
    };
    UserOutput.prototype["delete"] = function (e) {
        e.preventDefault();
        var data = {
            username: this.props.username
        };
        $.ajax({
            type: 'POST',
            url: "/DeleteUser",
            data: data,
            success: function (result) {
                alert("User has been deleted successfully.");
                ReactDOM.render([React.createElement(MenuComponent, null), React.createElement(SignInForm, null)], document.getElementById('formContainer'));
            },
            error: function () {
                throw "Unable to delete user please try again.";
            }
        });
    };
    UserOutput.prototype.render = function () {
        return (React.createElement("div", { id: "userOutputForm", className: "form" },
            React.createElement("div", { id: "userOutputHeader", className: "formHeader" }, "Your user details are displayed below."),
            React.createElement("label", { id: "firstNameOutputLabel", className: "fieldLabel" },
                "First Name:",
                React.createElement("div", { id: "firstNameOutput", className: "textOutput" }, this.props.firstName)),
            React.createElement("label", { id: "lastNameOutputLabel", className: "fieldLabel" },
                "Last Name:",
                React.createElement("div", { id: "lastNameOutput", className: "textOutput" }, this.props.lastName)),
            React.createElement("label", { id: "emailOutputLabel", className: "fieldLabel" },
                "Email:",
                React.createElement("div", { id: "emailOutput", className: "textOutput" }, this.props.email)),
            React.createElement("div", { id: "userOutputFooter", className: "formFooter" },
                React.createElement("div", { id: "logoutButton", className: "footerButton", onClick: this.handleSignOut }, "Log out"),
                React.createElement("div", { id: "deleteUserButton", className: "footerButton", onClick: this.handleDeleteUser }, "Delete User"))));
    };
    return UserOutput;
}(React.Component));
var appState = "SIGN_IN";
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
            return [React.createElement(MenuComponent, null), React.createElement(SignInForm, null)];
        case "SIGN_UP":
            return [React.createElement(MenuComponent, null), React.createElement(SignUpForm, null)];
        case "USER_OUTPUT":
            return React.createElement(UserOutput, null);
        default:
            throw "Unexpected menu state encountered. Please reload the page and try again.";
    }
}
function UpdateDOM() {
    ReactDOM.render(React.createElement(GetAppState, null), document.getElementById('formContainer'));
}
UpdateDOM();
