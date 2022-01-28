// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc7iwc8cAq6TCYr3rF8vGLUZaIfOD89ms",
  authDomain: "hirehubs-bd5d2.firebaseapp.com",
  databaseURL: "https://hirehubs-bd5d2-default-rtdb.firebaseio.com",
  projectId: "hirehubs-bd5d2",
  storageBucket: "hirehubs-bd5d2.appspot.com",
  messagingSenderId: "168272291681",
  appId: "1:168272291681:web:e22e6d3dae8ddab04f8720"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
// Only allow Admins to login
const ADMIN_UID_LIST = ['VMbwYy9fj3MPIfK7j5Z9sAZBKGi1']
const authPages = ['index']
  

// Check if Authentcated User
firebase.auth().onAuthStateChanged((user) => {
    var currentPage = window.location.pathname.split('/')
    var currentPage = currentPage[currentPage.length-1].split('.')[0]

    // Allow only if authenticated Admin is logged in
    if (user && authPages.includes(currentPage)) {
      const currentUserUID = user.uid;
      if (ADMIN_UID_LIST.includes(currentUserUID)) {
        window.location.href = './candidates.html'
      } else {
        logout()
      }      
    }
    // Unauthorised user signed in
    else if (user) {
      const currentUserUID = user.uid;
      if (!ADMIN_UID_LIST.includes(currentUserUID)) {
        logout()
      }      
    }
    // User is NOT signed in
    else if(!user && !authPages.includes(currentPage)) {
      window.location.href = './index.html'
    }
});  

function login(){
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    // console.log(email, password)
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
        // Sign-in successful.
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${errorCode} ${errorMessage}`,
        }).then(
          () => { location.reload() }
        )
    });

    // Update the button description after click
    const button = document.getElementById('loginButton')
    button.disabled = true
    button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`
}

function logout(){
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(`${errorCode} ${errorMessage}`)
  });
}

String.prototype.format = function () {
  var i = 0, args = arguments;
  return this.replace(/{}/g, function () {
  return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};