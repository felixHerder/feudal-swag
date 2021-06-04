import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users').doc('6SwWkiXKZF9VDKQzSC7q').collection('cartItems').doc('0wVdIddxfRqNiD0BYW4F');

firestore.doc('/users/6SwWkiXKZF9VDKQzSC7q/cartItems/0wVdIddxfRqNiD0BYW4F')
firestore.collection('/users/6SwWkiXKZF9VDKQzSC7q/cartItems');