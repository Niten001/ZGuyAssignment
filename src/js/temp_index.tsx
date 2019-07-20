import * as React from 'react';
import * as ReactDOM from 'react-dom';

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

class SignInForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.props.state.username = '';
        this.props.state.password = '';

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleUsername(event: React.FormEvent<HTMLInputElement>): void {
        this.props.state.username = event.currentTarget.value;
    }

    handlePassword(event: React.FormEvent<HTMLInputElement>): void {
        this.props.state.password = event.currentTarget.value;
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        this.confirmation(event);
    }

    confirmation(e: React.FormEvent<HTMLElement>): void {
        e.preventDefault();
        const data: Data = {
            username: this.props.state.username,
            password: this.props.state.password
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
                    // ReactDOM.render(
                    //     <UserOutput firstName={result.firstname} lastName={result.lastname} email={result.email} username={result.username}/>,
                    //     document.getElementById('formContainer')
                    // );
                }
            },
            error: function(): void {
                throw "An error occured please try again.";
            }
        });
        }
    render(): JSX.Element {
        let renderErrorMessage: ErrorMessages = {
            signInError: this.props.state.errorMessage.signInError
        }
        return (
            <div id="signInForm" className="form">
                <div id="signInFormHeader" className="formHeader">Sign in to see your user details.</div>
                <SignInRenderError signInError={renderErrorMessage.signInError}/>
                <form onSubmit={this.handleSubmit}>
                    <label id="usernameSignInLabel" className="fieldLabel">
                        Username:
                        <input id="usernameSignIn" className="textInput" type="text" value={this.props.state.username} onChange={this.handleUsername} />
                    </label>
                    <label id="passwordSignInLabel" className="fieldLabel">
                        Password:
                        <input id="passwordSignIn" className="textInput" type="password" value={this.props.state.password} onChange={this.handlePassword} />
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
                <div id="errorSignIn" className="error">{this.errorMessage.signInError}</div>
            );
        }
    }
}

class SignUpForm extends React.Component<Props> {
    constructor(props: Props) {
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

    handleFirstName(event: React.FormEvent<HTMLInputElement>): void {
        this.props.state.firstName = event.currentTarget.value;
    }

    handleLastName(event: React.FormEvent<HTMLInputElement>): void {
        this.props.state.lastName = event.currentTarget.value;
    }

    handleEmail(event: React.FormEvent<HTMLInputElement>): void {
        this.props.state.email = event.currentTarget.value;
    }

    handleUsername(event: React.FormEvent<HTMLInputElement>): void {
        this.props.state.username = event.currentTarget.value;
    }

    handlePassword(event: React.FormEvent<HTMLInputElement>): void {
        this.props.state.password = event.currentTarget.value;
    }

    handleConfirmPassword(event: React.FormEvent<HTMLInputElement>): void {
        this.props.state.confirmPassword = event.currentTarget.value;
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        let errorMessages: ErrorMessages = {
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
        } else {
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
        } else {
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
        } else {
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
        } else {
            errorMessages.usernameError = "Please enter a username.";
            errorMessages.noError = false;
        }

        if (this.props.state.password != "") {
            if (this.props.state.password != this.props.state.confirmPassword) {
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
            let returnState: Data;
            returnState.errorMessage = errorMessages;
            returnState.firstName = ((errorMessages.firstNameError == undefined) ? this.props.state.firstName : '');
            returnState.lastName = ((errorMessages.lastNameError == undefined) ? this.props.state.lastName : '');
            returnState.email = ((errorMessages.emailError == undefined) ? this.props.state.email : '');
            returnState.username = ((errorMessages.usernameError == undefined) ? this.props.state.username : '');
            ReactDOM.render(
                [<MenuComponent />, <SignUpForm state={returnState}/>],
                document.getElementById('formContainer')
            );
        }
    }

    confirmation(e: React.FormEvent<HTMLElement>): void {
        e.preventDefault();
        const data: Data = {
            'firstName': this.props.state.firstName,
            'lastName': this.props.state.lastName,
            'email': this.props.state.email,
            'username': this.props.state.username,
            'password': this.props.state.password
        }
        $.ajax({
            type: 'POST',
            url: "/SignUp",
            data: data,
            success: function(result: Data) {
                if (result.errorMessage != undefined) {
                    let returnState: Data;
                    returnState.errorMessage = result.errorMessage;
                    returnState.firstName = result.firstName;
                    returnState.lastName = result.lastName;
                    returnState.email = result.email;

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
        return (
            <div id="signUpFormContainer" className="form">
                <div id="signUpFormHeader" className="formHeader">Sign up to add your user details to the database.</div>
                <form id="signUpForm" onSubmit={this.handleSubmit}>
                    <SignUpRenderE1 firstNameError={this.props.state.errorMessage.firstNameError}/>
                    <label id="fistNameSignUpLabel" className="fieldLabel">
                        First Name:
                        <input id="fistNameSignUp" className="textInput" type="text" value={this.props.state.firstName} onChange={this.handleFirstName} maxLength={50}/>
                    </label>
                    <SignUpRenderE2 lastNameError={this.props.state.errorMessage.lastNameError}/>
                    <label id="lastNameSignUpLabel" className="fieldLabel">
                        Last Name:
                        <input id="lastNameSignUp" className="textInput" type="text" value={this.props.state.lastName} onChange={this.handleLastName} maxLength={50}/>
                    </label>
                    <SignUpRenderE3 emailError={this.props.state.errorMessage.emailError}/>
                    <label id="emailSignUpLabel" className="fieldLabel">
                        Email:
                        <input id="emailSignUp" className="textInput" type="text" value={this.props.state.email} onChange={this.handleEmail} maxLength={100}/>
                    </label>
                    <SignUpRenderE4 usernameError={this.props.state.errorMessage.usernameError}/>
                    <label id="usernameSignUpLabel" className="fieldLabel">
                        Username:
                        <input id="usernameSignUp" className="textInput" type="text" value={this.props.state.username} onChange={this.handleUsername} maxLength={50}/>
                    </label>
                    <SignUpRenderE5 passwordError={this.props.state.errorMessage.passwordError}/>
                    <label id="passwordSignUpLabel" className="fieldLabel">
                        Password:
                        <input id="passwordSignUp" className="textInput" type="password" value={this.props.state.password} onChange={this.handlePassword} maxLength={50}/>
                    </label>
                    <label id="confirmPasswordSignUpLabel" className="fieldLabel">
                        Confirm Password:
                        <input id="confirmPasswordSignUp" className="textInput" type="password" value={this.props.state.confirmPassword} onChange={this.handleConfirmPassword} maxLength={50}/>
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

function GetAppState(): any {
    switch (appState) {
        case "SIGN_IN":
            return [<MenuComponent />, <SignInForm state={emptyState}/>];
        case "SIGN_UP":
            return [<MenuComponent />, <SignUpForm state={emptyState}/>];
        // case "USER_OUTPUT":
        //     return <UserOutput />;
        default:
            throw "Unexpected menu state encountered. Please reload the page and try again."
    }
}

function UpdateDOM(): void {
    ReactDOM.render(
        <GetAppState />,
        document.getElementById('formContainer')
    );
}

UpdateDOM();