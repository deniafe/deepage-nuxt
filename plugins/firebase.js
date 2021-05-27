import firebase from 'firebase'
// import 'firebase/messaging'

if (!firebase.apps.length) {
  // Initialize firebase
  const firebaseConfig = {
    apiKey: 'AIzaSyCsbbz4P4VJcfKvRBbVZ3dYfWyH7rz81Ic',
    authDomain: 'deeviral-c24fe.firebaseapp.com',
    databaseURL: 'https://deeviral-c24fe.firebaseio.com',
    projectId: 'deeviral-c24fe',
    storageBucket: 'deeviral-c24fe.appspot.com',
    messagingSenderId: '302883626344',
    appId: '1:302883626344:web:7f0b91b469a8dca6430add',
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()

export { db, firebase }
