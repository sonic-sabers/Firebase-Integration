import {Alert} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as firebase from '@react-native-firebase/app';
import firebaseConfig from './FirebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

// const Registration = async (fullName, email, password) => {
//   if (!fullName || !email || !password) {
// 	Alert.alert('Error', 'Please enter all fields');
//   }
//   try {
// 	await firebase.auth().createUserWithEmailAndPassword(email, password);
// 	const currentUser = firebase.auth().currentUser;
// 	const db = firebase.firestore();
// 	db.collection('users').doc(currentUser.uid).set({
// 	  email: currentUser.email,
// 	  displayName: fullName,
// 	});
//   } catch (err) {
// 	Alert.alert('There is something wrong!!!!', err.message);
//   }
// };

// signup handling
const signUp = (fullName, email, password) => {
  if (!fullName || !email || !password) {
	Alert.alert('Error', 'Please enter all fields');
  }

  return auth()
	.createUserWithEmailAndPassword(email, password)
	.then(cred => {
	  const {uid} = cred.user;

	  auth().currentUser.updateProfile({
		displayName: fullName,
	  });

	  return uid;
	})
	.then(uid => createUserInDb(uid, fullName, email))
	.catch(err => Alert.alert(err.code, err.message));
};

const signIn = (email, password) => {
  if (!email || !password) {
	Alert.alert('Error', 'Please enter all fields');
  }

  return auth()
	.signInWithEmailAndPassword(email, password)
	.then(() => {})
	.catch(err => Alert.alert(err.code, err.message));
};

const forgetPassword = email => {
  if (!email) {
	Alert.alert('Error', 'Please enter email');
  }

  return auth().sendPasswordResetEmail(email);
};

const signOut = () => {
  return auth().signOut();
};

// const sendOtp = (number) => {
//     if(!number){
//         Alert.alert('Error', 'Please Enter number')
//     }

//     return auth().signInWithPhoneNumber(number)
// }

// const confirmCode = (state, code) => {
//     return state.confirm(code)
//     .then(() => {})
//     .catch(err => Alert.alert(err.code, err.message))
// }

const Auth = {
  signUp,
  signIn,
  forgetPassword,
  signOut,
  Registration,
  // inviteUser,
  // facebookSignIn,
  // googleLogin,
  // sendOtp,
  // confirmCode
};

export default Auth;
