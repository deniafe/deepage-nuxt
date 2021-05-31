
importScripts(
  'https://www.gstatic.com/firebasejs/8.4.0/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/8.4.0/firebase-messaging.js'
)
firebase.initializeApp({"apiKey":"AIzaSyCsbbz4P4VJcfKvRBbVZ3dYfWyH7rz81Ic","authDomain":"deeviral-c24fe.firebaseapp.com","databaseURL":"https:\u002F\u002Fdeeviral-c24fe.firebaseio.com","projectId":"deeviral-c24fe","storageBucket":"deeviral-c24fe.appspot.com","messagingSenderId":"302883626344","appId":"1:302883626344:web:7f0b91b469a8dca6430add","fcmPublicVapidKey":"BEaAGpCuS8lq07Wl8iDVbl5iOkirfCQxLusypX3ayXqWPpfFAj-UQk03R04Z50QlZQaTqcoKIbIXkfzAe_hQkoI"})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
          console.log(
            '[firebase-messaging-sw.js] Received background message ',
            payload
          )
          // Customize notification here
          const notificationTitle = 'Background Message Title'
          const notificationOptions = {
            body: 'Background Message body.',
            icon: '/firebase-logo.png',
          }

          self.registration.showNotification(
            notificationTitle,
            notificationOptions
          )
        })
