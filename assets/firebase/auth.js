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

/*
// Only Login page is accessible to vistor who're not signed in
firebase.auth().onAuthStateChanged((user) => {
    if (user && window.location.href.includes('login.html')) {
        // Storing UID in local storage
        const UID = firebase.auth().currentUser.uid;
        localStorage.setItem('storeUID', UID);
        window.location.href = './select-screen.html'
    }
    else if (!user && !window.location.href.includes('login.html')) {
        window.location.href = './login.html'
    }

    // Logout Screen if logged out from Admin Screen
    if (user) {
        const screenId = localStorage.getItem('screenID');
        const UID = localStorage.getItem('storeUID');
        firebase.database().ref(`Teqmo/Stores/${UID}/screens/${screenId}/loggedinStatus`).on('value', snapshot => {
            let loggedinStatus = snapshot.val()
            if (!loggedinStatus) {
                logoutScreen()
            }
        })
    }
});  

// Login Function
function login() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
    })
    .catch((error) => {
        let errorMessage = error.message;
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${errorMessage}`
        }).then(() => {
            window.location.reload()
        })
    });

    // Update the button description after click
    const button = document.getElementById('loginButton')
    button.disabled = true
    button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`
}

// Remove screen Id from local storage and signout user
async function logoutScreen() {
    const screnId = localStorage.getItem('screenID');
    const UID = localStorage.getItem('storeUID');
    if(!UID || !screnId) {return}
    await firebase.database().ref(`Teqmo/Stores/${UID}/screens/${screnId}`).update({
        'lockStatus': 1,
        'loggedinStatus': 0
    });
    localStorage.removeItem('screenID')
    localStorage.removeItem('storeUID');
    logout();
}

// Logout Function
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href="index.html";
    }).catch((error) => {
        let errorMessage = error.message;
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${errorMessage}`
        })
    });
}
*/