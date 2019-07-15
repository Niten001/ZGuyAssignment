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
        this.setState({ username: event.target.value });
    }

    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        this.confirmation(event);
    }

    confirmation(e) {
        e.preventDefault();
        const data = {
            'username': this.state.username,
            'password': this.state.password
        }
        $.ajax({
            type: 'POST',
            url: "/SignIn",
            body: data,
            success: function (result) {
                alert("success");
            },
            error: function () {
                throw "Incorrect username or password please try again.";
            }
        });
    }

    render() {
        return (
            <div id="signInForm" className="form">
                <div id="signInFormHeader" className="formHeader">Sign In to see your user details.</div>
                <form onSubmit={this.handleSubmit}>
                    <label id="usernameSignInLabel" className="fieldLabel">
                        Username:
                        <input id="usernameSignIn" className="textInput" type="text" value={this.state.username} onChange={this.handleUsername} />
                    </label>
                    <label id="passwordSignInLabel" className="fieldLabel">
                        Password:
                        <input id="passwordSignIn" className="textInput" type="password" value={this.state.password} onChange={this.handlePassword} />
                    </label>
                    <input id="submitSignIn" type="submit" value="Sign In" />
                </form>
            </div>
        );
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
        console.log(event)
        this.setState({ firstName: event.target.value });
    }

    handleLastName(event) {
        this.setState({ lastName: event.target.value });
    }

    handleEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleUsername(event) {
        this.setState({ username: event.target.value });
    }

    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleConfirmPassword(event) {
        this.setState({ confirmPassword: event.target.value });
    }

    handleSubmit(event) {
        this.confirmation(event);
    }

    confirmation(e) {
        e.preventDefault();
        const data = {
            'firstName': this.state.firstName,
            'lastName': this.state.lastName,
            'email': this.state.email,
            'username': this.state.username,
            'password': this.state.password
        }
        $.ajax({
            type: 'POST',
            url: "/SignUp",
            body: JSON.stringify(data),
            contentType: 'application/json',
            success: function (result) {
                alert("success");
            },
            error: function () {
                throw "An Error occured while creating the new user. Please try again.";
            }
        });
    }

    render() {
        return (
            <div id="signUpForm" className="form">
                <div id="signUpFormHeader" className="formHeader">Sign Up to add your user details to the database.</div>
                <form onSubmit={this.handleSubmit}>
                    <label id="fistNameSignUpLabel" className="fieldLabel">
                        First Name:
                        <input id="fistNameSignUp" className="textInput" type="text" value={this.state.firstName} onChange={this.handleFirstName} />
                    </label>
                    <label id="lastNameSignUpLabel" className="fieldLabel">
                        Last Name:
                        <input id="lastNameSignUp" className="textInput" type="text" value={this.state.lastName} onChange={this.handleLastName} />
                    </label>
                    <label id="emailSignUpLabel" className="fieldLabel">
                        Email:
                        <input id="emailSignUp" className="textInput" type="text" value={this.state.email} onChange={this.handleEmail} />
                    </label>
                    <label id="usernameSignUpLabel" className="fieldLabel">
                        Username:
                        <input id="usernameSignUp" className="textInput" type="text" value={this.state.username} onChange={this.handleUsername} />
                    </label>
                    <label id="passwordSignUpLabel" className="fieldLabel">
                        Password:
                        <input id="passwordSignUp" className="textInput" type="text" value={this.state.password} onChange={this.handlePassword} />
                    </label>
                    <label id="confirmPasswordSignUpLabel" className="fieldLabel">
                        Confirm Password:
                        <input id="confirmPasswordSignUp" className="textInput" type="text" value={this.state.confirmPassword} onChange={this.handleConfirmPassword} />
                    </label>
                    <input id="submitSignUp" type="submit" value="Sign Up" />
                </form>
            </div>
        );
    }
}

var menuState = "SIGN_IN";

const menuComponent = (
    <form id="formMenu" className="menu">
        <div id="SignInItem" className="menuItem" onClick={setMenuSignInState}>Sign In</div>
        <div id="SignUpItem" className="menuItem" onClick={setMenuSignUpState}>Sign Up</div>
    </form>
);

function setMenuSignInState() {
    menuState = "SIGN_IN";

    UpdateDOM();
}

function setMenuSignUpState() {
    menuState = "SIGN_UP";

    UpdateDOM();
}

function GetMenuState() {
    switch (menuState) {
        case "SIGN_IN":
            return <SignInForm />;
        case "SIGN_UP":
            return <SignUpForm />;
        default:
            throw "Unexpected menu state encountered. Please reload the page and try again."
    }
}

function UpdateDOM() {
    ReactDOM.render(
        [menuComponent, <GetMenuState />],
        document.getElementById('formContainer')
    );
}

UpdateDOM();