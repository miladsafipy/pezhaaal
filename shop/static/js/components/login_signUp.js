// =============================
//          ELEMENTS
// =============================
const authSlider = document.querySelector(".auth-slider");
const loginTab = document.querySelector(".login-choice");
const signupTab = document.querySelector(".signup-choice");



// =============================
//          FUNCTIONS
// =============================
function choiceLogIn(){
    loginTab.classList.add("active");
    signupTab.classList.remove("active");

    authSlider.classList.remove("signup-active");
}

function choiceSignUp(){
    signupTab.classList.add("active");
    loginTab.classList.remove("active");

    authSlider.classList.add("signup-active");
}


// =============================
//          ELEMENTS
// =============================
loginTab.addEventListener("click", choiceLogIn);

signupTab.addEventListener("click", choiceSignUp);