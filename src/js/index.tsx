interface ErrorMessages {
    noError?: Boolean;
    signInError?: String;
    usernameError?: String;
    passwordError?: String;
    firstNameError?: String;
    lastNameError?: String;
    emailError?: String;
}

type Data = {
    errorMessage?: ErrorMessages,
    username?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    confirmPassword?: string
}

interface Props extends React.ClassAttributes<any> {
    state: Data
}

class SignInForm extends React.Component<Props, Data> {
    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleUsername(event: React.FormEvent<HTMLInputElement>): void {
        this.setState({ username: event.currentTarget.value });

    }

    handlePassword(event: React.FormEvent<HTMLInputElement>): void {
        this.setState({ password: event.currentTarget.value });
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        this.confirmation(event);
    }

    confirmation(e: React.FormEvent<HTMLElement>): void {
        e.preventDefault();
        const data: Data = {
            username: this.state.username,
            password: this.state.password
        }
        $.ajax({
            type: 'POST',
            url: "/SignIn",
            data: data,
            success: function(result: Data): void {
                if (result.errorMessage != undefined) {
                    ReactDOM.render(
                        [<MenuComponent />, <SignInForm state={result}/>],
                        document.getElementById('formContainer')
                    );
                } else {
                    ReactDOM.render(
                        <UserOutput state={result}/>,
                        document.getElementById('formContainer')
                    );
                }
            },
            error: function(): void {
                throw "An error occured please try again.";
            }
        });
        }
    render(): JSX.Element {
        let renderErrorMessage: ErrorMessages;
        if (this.props.state.errorMessage != undefined) {
            renderErrorMessage = {
                signInError: this.props.state.errorMessage.signInError
            }
        } else {
            renderErrorMessage = {
                signInError: undefined
            }
        }
        return (
            <div id="signInForm" className="form">
                <div id="signInFormHeader" className="formHeader">Sign in to see your user details.</div>
                <SignInRenderError signInError={renderErrorMessage.signInError}/>
                <form onSubmit={this.handleSubmit}>
                    <label id="usernameSignInLabel" className="fieldLabel">
                        Username:
                        <input id="usernameSignIn" className="textInput" type="text" value={this.state.username} onChange={this.handleUsername} />
                    </label>
                    <label id="passwordSignInLabel" className="fieldLabel">
                        Password:
                        <input id="passwordSignIn" className="textInput" type="password" value={this.state.password} onChange={this.handlePassword} />
                    </label>
                    <input id="submitSignIn" className="submitButton" type="submit" value="Sign In" />
                </form>
            </div>
        );
    }
}

function SignInRenderError(errorMessage: ErrorMessages): JSX.Element {
    if (errorMessage == undefined) {
        return (null);
    } else {
        if ((errorMessage.signInError == undefined) || (errorMessage.signInError == '')) {
            return (null);
        } else {
            return (
                <div id="errorSignIn" className="error">{errorMessage.signInError}</div>
            );
        }
    }
}

class SignUpForm extends React.Component<Props, Data> {
    constructor(props: Props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        }

        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.confirmation = this.confirmation.bind(this);
    }

    handleFirstName(event: React.FormEvent<HTMLInputElement>): void {
        this.setState({ firstName: event.currentTarget.value });
    }

    handleLastName(event: React.FormEvent<HTMLInputElement>): void {
        this.setState({ lastName: event.currentTarget.value });
    }

    handleEmail(event: React.FormEvent<HTMLInputElement>): void {
        this.setState({ email: event.currentTarget.value });
    }

    handleUsername(event: React.FormEvent<HTMLInputElement>): void {
        this.setState({ username: event.currentTarget.value });
    }

    handlePassword(event: React.FormEvent<HTMLInputElement>): void {
        this.setState({ password: event.currentTarget.value });
    }

    handleConfirmPassword(event: React.FormEvent<HTMLInputElement>): void {
        this.setState({ confirmPassword: event.currentTarget.value });
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        let errorMessages: ErrorMessages = {
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
        } else {
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
        } else {
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
        } else {
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
        } else {
            errorMessages.usernameError = "Please enter a username.";
            errorMessages.noError = false;
        }

        if (this.state.password != "") {
            if (this.state.password != this.state.confirmPassword) {
                errorMessages.passwordError = "Those passwords didn't match. Try again.";
                errorMessages.noError = false;
            }
        } else {
            errorMessages.passwordError = "Please enter a password.";
            errorMessages.noError = false;
        }

        if (errorMessages.noError) {
            this.confirmation(event);
        } else {
            const returnState: Data = {
                errorMessage: errorMessages,
                firstName: ((errorMessages.firstNameError == undefined) ? this.state.firstName : ''),
                lastName: ((errorMessages.lastNameError == undefined) ? this.state.lastName : ''),
                email: ((errorMessages.emailError == undefined) ? this.state.email : ''),
                username: ((errorMessages.usernameError == undefined) ? this.state.username : '')
            }
            ReactDOM.render(
                [<MenuComponent />, <SignUpForm state={returnState}/>],
                document.getElementById('formContainer')
            );
        }
    }

    confirmation(e: React.FormEvent<HTMLElement>): void {
        e.preventDefault();
        const data: Data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }

        this.setState({ username: '' });
        this.setState({ password: '' });
        this.setState({ confirmPassword: '' });

        $.ajax({
            type: 'POST',
            url: "/SignUp",
            data: data,
            success: function(result: Data) {
                if (result.errorMessage != undefined) {
                    let returnState: Data = {
                        errorMessage: result.errorMessage,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        email: result.email
                    }

                    ReactDOM.render(
                        [<MenuComponent />, <SignUpForm state={returnState}/>],
                        document.getElementById('formContainer')
                    );
                } else {
                    alert("New user created successfuly.")
                    appState = "SIGN_IN";
                    UpdateDOM();
                }
            },
            error: function () {
                throw "An error occured please try again.";
            }
        });
    }

    render(): JSX.Element {
        let renderErrorMessage: ErrorMessages;
        if (this.props.state.errorMessage != undefined) {
            renderErrorMessage = this.props.state.errorMessage;
        } else {
            renderErrorMessage = {
                signInError: undefined
            }
        }
        return (
            <div id="signUpFormContainer" className="form">
                <div id="signUpFormHeader" className="formHeader">Sign up to add your user details to the database.</div>
                <form id="signUpForm" onSubmit={this.handleSubmit}>
                    <SignUpRenderE1 firstNameError={renderErrorMessage.firstNameError}/>
                    <label id="fistNameSignUpLabel" className="fieldLabel">
                        First Name:
                        <input id="fistNameSignUp" className="textInput" type="text" value={this.state.firstName} onChange={this.handleFirstName} maxLength={50}/>
                    </label>
                    <SignUpRenderE2 lastNameError={renderErrorMessage.lastNameError}/>
                    <label id="lastNameSignUpLabel" className="fieldLabel">
                        Last Name:
                        <input id="lastNameSignUp" className="textInput" type="text" value={this.state.lastName} onChange={this.handleLastName} maxLength={50}/>
                    </label>
                    <SignUpRenderE3 emailError={renderErrorMessage.emailError}/>
                    <label id="emailSignUpLabel" className="fieldLabel">
                        Email:
                        <input id="emailSignUp" className="textInput" type="text" value={this.state.email} onChange={this.handleEmail} maxLength={100}/>
                    </label>
                    <SignUpRenderE4 usernameError={renderErrorMessage.usernameError}/>
                    <label id="usernameSignUpLabel" className="fieldLabel">
                        Username:
                        <input id="usernameSignUp" className="textInput" type="text" value={this.state.username} onChange={this.handleUsername} maxLength={50}/>
                    </label>
                    <SignUpRenderE5 passwordError={renderErrorMessage.passwordError}/>
                    <label id="passwordSignUpLabel" className="fieldLabel">
                        Password:
                        <input id="passwordSignUp" className="textInput" type="password" value={this.state.password} onChange={this.handlePassword} maxLength={50}/>
                    </label>
                    <label id="confirmPasswordSignUpLabel" className="fieldLabel">
                        Confirm Password:
                        <input id="confirmPasswordSignUp" className="textInput" type="password" value={this.state.confirmPassword} onChange={this.handleConfirmPassword} maxLength={50}/>
                    </label>
                    <input id="submitSignUp" className="submitButton" type="submit" value="Sign up" />
                </form>
            </div>
        );
    }
}

function SignUpRenderE1(errorMessage: ErrorMessages): JSX.Element {
    if (errorMessage == undefined) {
        return (null);
    } else {
        if ((errorMessage.firstNameError == undefined) || (errorMessage.firstNameError == '')) {
            return (null);
        } else {
            return (
                <div id="errorSignUpFirstName" className="error">{errorMessage.firstNameError}</div>
            );
        }
    }
}

function SignUpRenderE2(errorMessage: ErrorMessages): JSX.Element {
    if (errorMessage == undefined) {
        return (null);
    } else {
        if ((errorMessage.lastNameError == undefined) || (errorMessage.lastNameError == '')) {
            return (null);
        } else {
            return (
                <div id="errorSignUpLastName" className="error">{errorMessage.lastNameError}</div>
            );
        }
    }
}

function SignUpRenderE3(errorMessage: ErrorMessages): JSX.Element {
    if (errorMessage == undefined) {
        return (null);
    } else {
        if ((errorMessage.emailError == undefined) || (errorMessage.emailError == '')) {
            return (null);
        } else {
            return (
                <div id="errorSignUpEmail" className="error">{errorMessage.emailError}</div>
            );
        }
    }
}

function SignUpRenderE4(errorMessage: ErrorMessages): JSX.Element {
    if (errorMessage == undefined) {
        return (null);
    } else {
        if ((errorMessage.usernameError == undefined) || (errorMessage.usernameError == '')) {
            return (null);
        } else {
            return (
                <div id="errorSignUpUsername" className="error">{errorMessage.usernameError}</div>
            );
        }
    }
}

function SignUpRenderE5(errorMessage: ErrorMessages): JSX.Element {
    if (errorMessage == undefined) {
        return (null);
    } else {
        if ((errorMessage.passwordError == undefined) || (errorMessage.passwordError == '')) {
            return (null);
        } else {
            return (
                <div id="errorSignUpPassword" className="error">{errorMessage.passwordError}</div>
            );
        }
    }
}

class UserOutput extends React.Component<Props, Data> {
    constructor(props: any) {
        super(props);
        this.state = {
            firstName: this.props.state.firstName,
            lastName: this.props.state.lastName,
            email: this.props.state.email
        }

        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    handleSignOut(event: React.MouseEvent<HTMLDivElement>): void {
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: ''
        };
        appState = "SIGN_IN";
        UpdateDOM();
    }

    handleDeleteUser(event: React.MouseEvent<HTMLDivElement>): void {
        this.delete(event);
    }

    delete(e: React.MouseEvent<HTMLElement>): void {
        e.preventDefault();
        const data: Data = {
            username: this.props.state.username
        }
        $.ajax({
            type: 'POST',
            url: "/DeleteUser",
            data: data,
            success: function(result: Data): void {
                alert("User has been deleted successfully.")
                ReactDOM.render(
                    [<MenuComponent />, <SignInForm state={result}/>],
                    document.getElementById('formContainer')
                );
            },
            error: function(): void {
                throw "Unable to delete user please try again.";
            }
        });
    }

    render(): JSX.Element {
        return (
            <div id="userOutputForm" className="form">
                <div id="userOutputHeader" className="formHeader">Your user details are displayed below.</div>
                <label id="firstNameOutputLabel" className="fieldLabel">
                    First Name:
                    <div id="firstNameOutput" className="textOutput">{this.props.state.firstName}</div>
                </label>
                <label id="lastNameOutputLabel" className="fieldLabel">
                    Last Name:
                    <div id="lastNameOutput" className="textOutput">{this.props.state.lastName}</div>
                </label>
                <label id="emailOutputLabel" className="fieldLabel">
                    Email:
                    <div id="emailOutput" className="textOutput">{this.props.state.email}</div>
                </label>
                <div id="userOutputFooter" className="formFooter">
                    <div id="logoutButton" className="footerButton" onClick={this.handleSignOut}>
                        Log out
                    </div>
                    <div id="deleteUserButton" className="footerButton" onClick={this.handleDeleteUser}>
                        Delete User
                    </div>
                </div>
            </div>
        );
    }
}

var appState: String = "SIGN_IN";

let emptyState: Data = {
    errorMessage: undefined,
    username: undefined,
    password: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined
}

function MenuComponent(): JSX.Element {
    var selectedState = false;

    switch (appState) {
        case "SIGN_IN":
            selectedState = true;
            break;
        case "SIGN_UP":
            selectedState = false;
            break;
        default:
            throw "Unexpected menu state encountered. Please reload the page and try again."
    }

    return (
        <form id="formMenu" className="menu">
            <div id={!selectedState ? 'unselectedSignIn' : ''} className="menuItem" onClick={setMenuSignInState}>Sign in</div>
            <div id={selectedState ? 'unselectedSignUp' : ''} className="menuItem" onClick={setMenuSignUpState}>Sign up</div>
        </form>
    );
}

function setMenuSignInState(): void {
    appState = "SIGN_IN";

    UpdateDOM();
}

function setMenuSignUpState(): void {
    appState = "SIGN_UP";

    UpdateDOM();
}

function UpdateDOM(): void {
    switch (appState) {
        case "SIGN_IN":
            ReactDOM.render(
                [<MenuComponent />, <SignInForm state={emptyState}/>],
                document.getElementById('formContainer')
            );
            break;
        case "SIGN_UP":
            ReactDOM.render(
                [<MenuComponent />, <SignUpForm state={emptyState}/>],
                document.getElementById('formContainer')
            );
            break;
        case "USER_OUTPUT":
            ReactDOM.render(
                <UserOutput state={emptyState}/>,
                document.getElementById('formContainer')
            );
            break;
        default:
            throw "Unexpected menu state encountered. Please reload the page and try again."
    }
}

UpdateDOM();