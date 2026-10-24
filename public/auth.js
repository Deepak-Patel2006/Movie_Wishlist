
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginTab = document.querySelector("#loginTab");
const signupTab = document.querySelector("#signupTab");
const nameField = document.querySelector("#nameField");
const formTitle = document.querySelector("#formTitle");
const formSubtitle = document.querySelector("#formSubtitle");
const submitBtn = document.querySelector("#submitBtn");
const switchPrompt = document.querySelector("#switchPrompt");
const switchMode = document.querySelector("#switchMode");
const authForm = document.querySelector("#authForm");
const togglePassword = document.querySelector("#togglePassword");
const formMessage = document.querySelector("#formMessage");

let currentMode = "login";

function setMode(mode) {
  currentMode = mode;

  const isSignup = mode === "signup";

  loginTab.classList.toggle("active", !isSignup);
  signupTab.classList.toggle("active", isSignup);

  nameField.hidden = !isSignup;

  formSubtitle.textContent = isSignup
    ? "Join Movie Wishlist and build your collection."
    : "Sign in to continue your movie journey.";

  submitBtn.innerHTML = isSignup
    ? 'Create Account <span>→</span>'
    : 'Sign In <span>→</span>';

  switchPrompt.textContent = isSignup
    ? "Already have an account?"
    : "Don't have an account?";

  switchMode.textContent = isSignup ? "Sign In" : "Sign Up";

  /*Ternary opr me agar condition satisfy hoga to just bagal waala code 
   execute hoga nahi to default me last waala .*/

  formMessage.textContent = "";
}

loginTab.addEventListener("click", () => {
  email.value = "";
  password.value = ""
  setMode("login")
});
signupTab.addEventListener("click", () => {
  email.value = "";
  name.value = "";
  password.value = "";
  setMode("signup")
});

switchMode.addEventListener("click", () => {
  setMode(currentMode === "login" ? "signup" : "login");
});

togglePassword.addEventListener("click", () => {
  const isHidden = password.type === "password";

  password.type = isHidden ? "text" : "password";
  togglePassword.textContent = isHidden ? "Hide" : "Show";
});

//Movie api calling here 

const call_login = async(data)=>{
// Login backend api call =>
  // console.log("login");

  const login = await fetch("/auth/login",{
    method : 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      email:data.email,
      password:data.password
    })
  });
  let answer = await login.json();
  console.log(answer);
  
  if(answer.success === true){
    formMessage.textContent = `${answer.loging.message} you are logged in successfully`;
    setTimeout(() => {
      window.location.replace(answer.redirectUrl);
    }, 1000);   
  }else{
    formMessage.textContent = `${answer.message}`;
  }

  email.value='';
  password.value='';

}

const call_signup = async(data)=>{
// Signup backend api call =>
//  console.log("signup");

  const signup = await fetch('/auth/register',{
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      name:data.name,
      email:data.email,
      password:data.password
    })
  });

  let answer = await signup.json();
  console.log(answer);
  
  if(answer.success === true){
    formMessage.textContent = 'User registered sucessfully !!!';
  }else{
    formMessage.textContent = 'Email already in use !!!';
  }

  name.value='';
  email.value='';
  password.value='';
  
}

//Form request different api's =>
authForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = {
    name : name.value.trim(),
    email : email.value.trim(),
    password: password.value.trim()
  };
  formMessage.style.color = "#f5b942";

  // console.log("Form mode:", currentMode);
  // console.log("Form data:", {
  //   formData
  // });

  if (currentMode === 'signup'){

    if(!formData.name || !formData.email || !formData.password){
        console.log("null");
        return;
    }
    call_signup(formData);

  }else{

    if(!formData.email || !formData.password ){
        console.log('null');
        return;
    }
    call_login(formData);


  }

  // formMessage.textContent = "UI ready. Connect your authentication API next.";
});
