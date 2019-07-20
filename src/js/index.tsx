class SignInForm extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleUsername(event: any): void {
        this.setState({ username: event.target.value });
    }

    handlePassword(event: any): void {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event: any): void {
        this.confirmation(event);
    }

    confirmation(e: any): void {
        e.preventDefault();
        const data: Object = {
            'username': this.state.username,
            'password': this.state.password
        }
        $.ajax({
            type: 'POST',
            url: "/SignIn",
            data: data,
            success: function(result: any): void {
                if (result.error != undefined) {
                    ReactDOM.render(
                        [<MenuComponent />, <SignInForm errorMessage={result.error}/>],
                        document.getElementById('formContainer')
                    );
                } else {
                    ReactDOM.render(
                        <UserOutput firstName={result.firstname} lastName={result.lastname} email={result.email} username={result.username}/>,
                        document.getElementById('formContainer')
                    );
                }
            },
            error: function(): void {
                throw "An error occured please try again.";
            }
        });
        }
    render(): any {
        if (this.props.errorMessage == undefined) {
            return (
                <div id="signInForm" className="form">
                    <div id="signInFormHeader" className="formHeader">Sign in to see your user details.</div>
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
        } else {
            return (
                <div id="signInForm" className="form">
                    <div id="signInFormHeader" className="formHeader">Sign in to see your user details.</div>
                    <div id="errorSignIn" className="error">{this.props.errorMessage}</div>
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
}

class SignUpForm extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        };

        this.state.firstName = this.props.firstName;
        this.state.lastName = this.props.lastName;
        this.state.email = this.props.email;
        this.state.username = this.props.username;

        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.confirmation = this.confirmation.bind(this);
    }

    handleFirstName(event: any): void {
        this.setState({ firstName: event.target.value });
    }

    handleLastName(event: any): void {
        this.setState({ lastName: event.target.value });
    }

    handleEmail(event: any): void {
        this.setState({ email: event.target.value });
    }

    handleUsername(event: any): void {
        this.setState({ username: event.target.value });
    }

    handlePassword(event: any): void {
        this.setState({ password: event.target.value });
    }

    handleConfirmPassword(event: any): void {
        this.setState({ confirmPassword: event.target.value });
    }

    handleSubmit(event: any): void {
        let errorMessages: any = {
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
            const returnFirstName: String = ((errorMessages.firstNameError == undefined) ? this.state.firstName : '');
            const returnLastName: String = ((errorMessages.lastNameError == undefined) ? this.state.lastName : '');
            const returnEmail: String = ((errorMessages.emailError == undefined) ? this.state.email : '');
            const returnUsername: String = ((errorMessages.usernameError == undefined) ? this.state.username : '');
            ReactDOM.render(
                [<MenuComponent />, <SignUpForm 
                    errorMessage={errorMessages} 
                    firstName={returnFirstName}
                    lastName={returnLastName}
                    email={returnEmail}
                    username={returnUsername}
                />],
                document.getElementById('formContainer')
            );
        }
    }

    confirmation(e: any): void {
        e.preventDefault();
        const data: any = {
            'firstName': this.state.firstName,
            'lastName': this.state.lastName,
            'email': this.state.email,
            'username': this.state.username,
            'password': this.state.password
        }
        $.ajax({
            type: 'POST',
            url: "/SignUp",
            data: data,
            success: function(result) {
                if (result.error != undefined) {
                    ReactDOM.render(
                        [<MenuComponent />, <SignUpForm
                            errorMessage={result.error}
                            firstName={result.error.firstName}
                            lastName={result.error.lastName}
                            email={result.error.email}
                        />],
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

    render(): any {
        return (
            <div id="signUpFormContainer" className="form">
                <div id="signUpFormHeader" className="formHeader">Sign up to add your user details to the database.</div>
                <form id="signUpForm" onSubmit={this.handleSubmit}>
                    <SignUpRenderE1 errorMessage={this.props.errorMessage}/>
                    <label id="fistNameSignUpLabel" className="fieldLabel">
                        First Name:
                        <input id="fistNameSignUp" className="textInput" type="text" value={this.state.firstName} onChange={this.handleFirstName} maxLength="50"/>
                    </label>
                    <SignUpRenderE2 errorMessage={this.props.errorMessage}/>
                    <label id="lastNameSignUpLabel" className="fieldLabel">
                        Last Name:
                        <input id="lastNameSignUp" className="textInput" type="text" value={this.state.lastName} onChange={this.handleLastName} maxLength="50"/>
                    </label>
                    <SignUpRenderE3 errorMessage={this.props.errorMessage}/>
                    <label id="emailSignUpLabel" className="fieldLabel">
                        Email:
                        <input id="emailSignUp" className="textInput" type="text" value={this.state.email} onChange={this.handleEmail} maxLength="100"/>
                    </label>
                    <SignUpRenderE4 errorMessage={this.props.errorMessage}/>
                    <label id="usernameSignUpLabel" className="fieldLabel">
                        Username:
                        <input id="usernameSignUp" className="textInput" type="text" value={this.state.username} onChange={this.handleUsername} maxLength="50"/>
                    </label>
                    <SignUpRenderE5 errorMessage={this.props.errorMessage}/>
                    <label id="passwordSignUpLabel" className="fieldLabel">
                        Password:
                        <input id="passwordSignUp" className="textInput" type="password" value={this.state.password} onChange={this.handlePassword} maxLength="50"/>
                    </label>
                    <label id="confirmPasswordSignUpLabel" className="fieldLabel">
                        Confirm Password:
                        <input id="confirmPasswordSignUp" className="textInput" type="password" value={this.state.confirmPassword} onChange={this.handleConfirmPassword} maxLength="50"/>
                    </label>
                    <input id="submitSignUp" className="submitButton" type="submit" value="Sign up" />
                </form>
            </div>
        );
    }
}

function SignUpRenderE1(props: any): any {
    if (props.errorMessage == undefined) {
        return (null);
    } else {
        if ((props.errorMessage.firstNameError == undefined) || (props.errorMessage.firstNameError == '')) {
            return (null);
        } else {
            return (
                <div id="errorSignUpFirstName" className="error">{props.errorMessage.firstNameError}</div>
            );
        }
    }
}

function SignUpRenderE2(props: any): any {
    if (props.errorMessage == undefined) {
        return (null);
    } else {
        if ((props.errorMessage.lastNameError == undefined) || (props.errorMessage.lastNameError == '')) {
            return (null);
        } else {
            return (
                <div id="errorSignUpLastName" className="error">{props.errorMessage.lastNameError}</div>
            );
        }
    }
}

function SignUpRenderE3(props: any): any {
    if (props.errorMessage == undefined) {
        return (null);
    } else {
        if ((props.errorMessage.emailError == undefined) || (props.errorMessage.emailError == '')) {
            return (null);
        } else {
            return (
                <div id="errorSignUpEmail" className="error">{props.errorMessage.emailError}</div>
            );
        }
    }
}

function SignUpRenderE4(props: any): any {
    if (props.errorMessage == undefined) {
        return (null);
    } else {
        if ((props.errorMessage.usernameError == undefined) || (props.errorMessage.usernameError == '')) {
            return (null);
        } else {
            return (
                <div id="errorSignUpUsername" className="error">{props.errorMessage.usernameError}</div>
            );
        }
    }
}

function SignUpRenderE5(props: any): any {
    if (props.errorMessage == undefined) {
        return (null);
    } else {
        if ((props.errorMessage.passwordError == undefined) || (props.errorMessage.passwordError == '')) {
            return (null);
        } else {
            return (
                <div id="errorSignUpPassword" className="error">{props.errorMessage.passwordError}</div>
            );
        }
    }
}

class UserOutput extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: ''
        };

        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    handleSignOut(event: any): void {
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: ''
        };
        appState = "SIGN_IN";
        UpdateDOM();
    }

    handleDeleteUser(event: any): void {
        this.delete(event);
    }

    delete(e: any): void {
        e.preventDefault();
        const data: Object = {
            username: this.props.username
        }
        $.ajax({
            type: 'POST',
            url: "/DeleteUser",
            data: data,
            success: function(result: any): void {
                alert("User has been deleted successfully.")
                ReactDOM.render(
                    [<MenuComponent />, <SignInForm />],
                    document.getElementById('formContainer')
                );
            },
            error: function(): void {
                throw "Unable to delete user please try again.";
            }
        });
    }

    render(): any {
        return (
            <div id="userOutputForm" className="form">
                <div id="userOutputHeader" className="formHeader">Your user details are displayed below.</div>
                <label id="firstNameOutputLabel" className="fieldLabel">
                    First Name:
                    <div id="firstNameOutput" className="textOutput">{this.props.firstName}</div>
                </label>
                <label id="lastNameOutputLabel" className="fieldLabel">
                    Last Name:
                    <div id="lastNameOutput" className="textOutput">{this.props.lastName}</div>
                </label>
                <label id="emailOutputLabel" className="fieldLabel">
                    Email:
                    <div id="emailOutput" className="textOutput">{this.props.email}</div>
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