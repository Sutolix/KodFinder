import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  //keys
}

class Firebase {
  constructor () {
    // Initialize Firebase
    app.initializeApp(firebaseConfig)
    // app.analytics();

    this.app = app
    this.database = app.database()
  }

  sendVerification () {
    const user = app.auth().currentUser

    if (!user) return null

    return user.sendEmailVerification()
  }

  isVerified () {
    const user = app.auth().currentUser

    if (!user) return false

    return user.emailVerified
  }

  register (email, password) {
    return app.auth().createUserWithEmailAndPassword(email, password)
  }

  login (email, password) {
    return app.auth().signInWithEmailAndPassword(email, password)
  }

  logout () {
    localStorage.removeItem('user')
    window.location.href = '/'
    return app.auth().signOut()
  }

  getCurrentUser () {
    return app.auth().currentUser
  }

  getUserInformations (callback) {
    const user = app.auth().currentUser

    if (!user) return null

    return app.database().ref('users').child(user.uid).once('value', callback)
  }

  liveUser (callback) {
    return app.auth().onAuthStateChanged(callback)
  }

  async incrementCountUser () {
    let count_users = 0

    try {
      await app.database().ref('count_users').once('value', snapshot => {
        count_users = snapshot.val()
      })

      count_users++

      await app.database().ref('count_users').set(count_users)

      return true
    } catch ($e) {
      console.log('Erro: ' + $e)
      return false
    }
  }
}

export default new Firebase()
