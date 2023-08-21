import {initializeApp} from 'firebase/app'
import {
  getFirestore, collection, getDocs,onSnapshot,
  addDoc,deleteDoc,doc,
  query,where,
  orderBy, serverTimestamp
} from 'firebase/firestore'
import{
  getAuth ,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDUnKqOGkAtMJdg0BdLhP9WpoH2SD9niG8",
    authDomain: "fir-tutorial-fcf76.firebaseapp.com",
    projectId: "fir-tutorial-fcf76",
    storageBucket: "fir-tutorial-fcf76.appspot.com",
    messagingSenderId: "525019038371",
    appId: "1:525019038371:web:14f719b54f1820ac2a3516"
  };

  initializeApp(firebaseConfig)

  // init services
const db = getFirestore()
const auth=getAuth()
// var provider = new firebase.auth.GoogleAuthProvider();

// function googleSignin() {
//    firebase.auth()
   
//    .signInWithPopup(provider).then(function(result) {
//       var token = result.credential.accessToken;
//       var user = result.user;
		
//       console.log(token)
//       console.log(user)
//    }).catch(function(error) {
//       var errorCode = error.code;
//       var errorMessage = error.message;
		
//       console.log(error.code)
//       console.log(error.message)
//    });
// }

function googleSignout() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}
// collection ref
const colRef = collection(db, 'Books')

// get collection data
// getDocs(colRef)
//   .then(snapshot => {
//     // console.log(snapshot.docs)
//     let books = []
//     snapshot.docs.forEach(doc => {
//       books.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(books)
//   })
//   .catch(err => {
//     console.log(err.message)
//   })

//queries 
const q=query(colRef,where("author","==","Mainak"),orderBy('Price','desc'))

  // realtime collection data
onSnapshot(q, (snapshot) => {
  let books = []
  snapshot.docs.forEach(doc => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})

  // adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    Price: addBookForm.Price.value,
    author: addBookForm.author.value,
  })
  .then(() => {
    addBookForm.reset()
  })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'Books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})

// signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user created:', cred.user)
      signupForm.reset()
    })
    .catch((error) => {
      // Handle sign-in error and display error message
      const errorCode = error.code;
      const errorMessage = error.message;
      
      // Display the error message on your website
      const errorMessageElement = document.getElementById("error-message1");
      errorMessageElement.textContent = errorMessage;
      
      console.error("Sign-in error:", errorCode, errorMessage);
    })
})

// logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('user signed out')
    })
    .catch(err => {
      console.log(err.message)
    })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user logged in:', cred.user)
      loginForm.reset()
    })
   .catch((error) => {
      // Handle sign-in error and display error message
      const errorCode = error.code;
      const errorMessage = error.message;
      
      // Display the error message on your website
      const errorMessageElement = document.getElementById("error-message");
      errorMessageElement.textContent = errorMessage;
      console.error("Sign-in error:", errorCode, errorMessage);
    })
})