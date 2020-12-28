import { domManipulationFunctions } from './hbFunctionality.js';

const { elContainsClass, removeClassFromEl, addClassToEl } = domManipulationFunctions;

//  DOM ELEMENTS
const formInputs = {
    email: document.querySelector('#email'),
    phone: document.querySelector('#phone'),
    name: document.querySelector('#name'),
    message: document.querySelector('#message')
};
const errMssg = document.querySelector('#validation-error-msg');
const form = document.querySelector('form');

//  UTILITY FUNCTIONS
const removePrevErrClass = inputField => elContainsClass(inputField, 'validation-error') ? removeClassFromEl(inputField, 'validation-error') : null;
const removeErrMssgHide = () => elContainsClass(errMssg, 'hide') ? removeClassFromEl(errMssg, 'hide') : null;
const addHideToErrMssg = () => !elContainsClass(errMssg, 'hide') ? addClassToEl(errMssg, 'hide') : null;
const inputsStillWithError = () => {
    const errInputs = Array.from(Object.values(formInputs)).filter(input => elContainsClass(input, 'validation-error') ? input : null);
    return errInputs.length;
}
const hideErrMssgIfNoErrs = () => {
    if(!inputsStillWithError()){
        addHideToErrMssg();
    };
};

//  PREVENT FORM SUBMIT IF VALIDATION ERRORS
const preventFormSubmitAndShowError = (inputField, e) => {
    addClassToEl(inputField, 'validation-error');
    removeErrMssgHide();
    e.preventDefault();
};

//  REMOVE PREV ERROR CLASSES & ERROR MESSAGE IF FOCUSED
const formInputsArr = Array.from(Object.values(formInputs));
formInputsArr.forEach(input => input.addEventListener('focus', () => {
    removePrevErrClass(input);
    hideErrMssgIfNoErrs();
}));

//  REGEX TESTING & FUNCTIONS
const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
const phoneRegex = /^\+?(?:\d\s?){10,12}$/;
const testValueWithRegex = ({value}, regex) => regex.test(value);

//  VALIDATE INPUT FIELDS BEFORE SUBMIT TO SERVER
form.addEventListener('submit', e => {
    const { email, phone, name, message } = formInputs;
    const validateEmail = testValueWithRegex(email, emailRegex);
    const validatePhone = testValueWithRegex(phone, phoneRegex);
    if(!validateEmail){
        preventFormSubmitAndShowError(email, e);
    };
    if(!validatePhone){
        preventFormSubmitAndShowError(phone, e);
    };
    if(name.value.length < 2 || name.value.length > 30){
        preventFormSubmitAndShowError(name, e);
    };
    if(message.value.length < 10 || message.value.length > 150){
        preventFormSubmitAndShowError(message, e);
    }; 
});
