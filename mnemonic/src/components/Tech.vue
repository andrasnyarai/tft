<template>
    <div class="tech">
        <div v-for="tech in techs">
            {{ tech.icon }}
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
// Required for side-effects
require('firebase/firestore');

// Initialize Firebase
const config = require('../../firebase.json');

firebase.initializeApp(config);
const storage = firebase.storage();
const storageRef = storage.ref();

let iconRef;

const db = firebase.firestore();

const docRef = db.collection('icons').doc('Iw5G9ewKHEZ37qmIomaR');

docRef.get().then((doc) => {
  if (doc.exists) {
    console.log('Document data:', doc.data());
    iconRef = doc.data().paths;
    console.log(iconRef);
    iconRef.forEach((imgName) => {
      const tangRef = storageRef.child(`icons/${imgName}`);
      firebase.auth().signInAnonymously().then(() => {
        tangRef.getDownloadURL().then((url) => {
          console.log(url);
        });
      });
    });
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
}).catch((error) => {
  console.log('Error getting document:', error);
});
export default {
  name: 'Tech',
  data() {
    return {
      techs: [
        { icon: 'aaa' },
        { icon: 'bbb' },
        { icon: 'bbb' },
        { icon: 'bbb' },
        { icon: 'ggg' },
        { icon: 'fff' },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>
