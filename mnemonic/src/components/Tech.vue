<template>
    <div class="tech">
        <div v-for="tech in techs">
            <!--<p>{{ tech.text }}<p/>-->
          <div v-bind:style="{ backgroundImage: `url(${tech.path})` }" />
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


export default {
  name: 'Tech',
  data() {
    return {
      techs: [],
    };
  },
  methods: {
    firebaseInit() {
      const docRef = db.collection('icons').doc('Iw5G9ewKHEZ37qmIomaR');

      docRef.get().then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          iconRef = doc.data().paths;
          console.log(iconRef);
          iconRef.forEach((techDataObject) => {
            const tangRef = storageRef.child(`icons/${techDataObject.picture}`);
            firebase.auth().signInAnonymously().then(() => {
              tangRef.getDownloadURL().then((url) => {
                console.log(url);
                this.techs.push({ path: url, text: techDataObject.picture.split('.')[0] });
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
    },
  },
  mounted() {
    this.firebaseInit();
  },
};
</script>

<style scoped>
  .tech {
    margin: 10%;
  }
  .tech div {
    margin: 5px;
    display: inline-block;
  }
  .tech > div > div {
    width: 150px;
    height: 150px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  img {
    width: 150px;
    max-height: 150px;
  }
</style>
