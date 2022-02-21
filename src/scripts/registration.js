const {
    ipcRenderer
} = require('electron');

import {
    signUp,
    logIn,
    logOut
} from '../scripts/firebase/auth.js';

const title = document.querySelector('#title');
const subtitle = document.querySelector('#subtitle');
const cta = document.querySelector('#cta');
const switchButton = document.querySelector('#switch-type');
const row1 = document.querySelector('#row-1');
const row3 = document.querySelector('#row-3');

const firstNameField = document.querySelector('#firstName');
const lastNameField = document.querySelector('#lastName');
const emailField = document.querySelector('#email');
const passwordField = document.querySelector('#password');
const confirmPasswordField = document.querySelector('#confirmPassword');

const texts = {
    true: {
        'title': 'Sign Up for Dare Not Bend',
        'subtitle': 'Fill out the fields below to create your Dare Not Bend account.',
        'cta': 'Sign Up',
        'switchText': 'Already have an account? Log In'
    },
    false: {
        'title': 'Log into Dare Not Bend',
        'subtitle': 'Enter your email and password to sign into your Dare Not Bend account.',
        'cta': 'Log In',
        'switchText': 'No account yet? Sign Up'
    }
}

var isSignUp = false;

function registrationLogIn() {
    const email = emailField.value;
    const password = passwordField.value;
    const userData = {email, password} ;
    ipcRenderer.send('registered', userData);
    // logIn(email, password, function(userData) {
    //     console.log('Successfully logged in ', userData);
    //     ipcRenderer.send('registered', userData);
    // });
}

function registrationSignUp() {
    const firstName = firstNameField.value;
    const lastName = lastNameField.value;
    const email = emailField.value;
    const password = passwordField.value;
    const passwordConfirmation = confirmPasswordField.value;

    if (password != passwordConfirmation) {
        alert('Passwords do not match');
        return;
    }
    const userData = {email, password};
    ipcRenderer.send('registered', userData);

    // signUp(email, password, {
    //     firstName,
    //     lastName
    // }, function(userData) {
    //     console.log('Succesfully signed up ', userData);
    //     ipcRenderer.send('registered', userData);
    // })
}

switchButton.addEventListener('click', function () {
    isSignUp = !isSignUp;
    title.innerHTML = texts[isSignUp]['title'];
    subtitle.innerHTML = texts[isSignUp]['subtitle'];
    cta.innerHTML = texts[isSignUp]['cta'];
    switchButton.innerHTML = texts[isSignUp]['switchText'];
    row1.style.display = isSignUp ? 'flex' : 'none';
    row3.style.display = isSignUp ? 'flex' : 'none';
    console.log(isSignUp);
});

cta.addEventListener('click', function () {
    console.log("Signup clicked");
    if (isSignUp) {
        registrationSignUp();
    } else {
        registrationLogIn();
    }
})