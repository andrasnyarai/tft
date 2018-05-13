<template>
  <div id="app">
    <div class="intro">{{introduction}}</div>

    <nav>
      <router-link to="/">About</router-link>
      <router-link to="/tech">Tech</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import firebase from 'firebase';
import About from './components/About';

// Required for side-effects
require('firebase/firestore');

// Initialize Firebase
const config = require('../firebaseConfig.json');

firebase.initializeApp(config);
const storage = firebase.storage();
const storageRef = storage.ref();

let iconRef;

const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

export default {
  name: 'app',
  data() {
    return {
      introduction: 'welcome to ...',
      techs: [],
      loaded: false,
      chartLabels: [],
      languageChartData: [],
      colors: [],
      sumLang: {},
      counter: -1,
    };
  },
  components: {
    About,
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
                this.counter += 1;
                this.techs.push({ path: url, text: techDataObject.picture.split('.')[0], activeEl: false, offsetY: Math.floor(this.techs.length / 4), offsetX: this.counter });
                if (this.counter === 3) {
                  this.counter = -1;
                }
                console.log(this.techs)
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
    fetchStatistics() {
      fetch('https://api.github.com/users/andrasnyarai/repos', { method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
        }) })
        .then(res => res.json())
        .then((statistics) => {
          const languageUrls = [];
          const promises = [];
          statistics.forEach(repo => languageUrls.push(repo.languages_url));
          languageUrls.forEach(lang => promises.push(this.fetchLanguagesData(lang)));
          return Promise.all(promises);
        })
        .catch(error => console.error('Error:', error))
        .then(() => {
          Object.entries(this.sumLang).forEach((sumPerLang) => {
            this.chartLabels.push(sumPerLang[0]);
            this.languageChartData.push(sumPerLang[1]);
          });
          this.loaded = true;
        });
    },
    fetchLanguagesData(languageUrl) {
      return fetch(languageUrl, { method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
        }) })
        .then(res => res.json())
        .then((languageStatistics) => {
          const repoLanguages = Object.entries(languageStatistics);
          repoLanguages.reduce((acc, oneLanguage) => {
            if (!acc[oneLanguage[0]]) {
              acc[oneLanguage[0]] = oneLanguage[1];
            } else {
              acc[oneLanguage[0]] += oneLanguage[1];
            }
            this.colors.push(`#${(`${Math.random().toString(16)}000000`).substring(2, 8)}`);
            return acc;
          }, this.sumLang);
        })
        .catch(error => console.error('Error:', error))
        .then(() => console.log('successfully fetched data from one repo'));
    },
  },
  beforeMount() {
    this.fetchStatistics();
    this.firebaseInit();
  },
};

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
  }
  img {
    width: 500px
  }
  #app > .intro {
    color: #42b983;
    text-decoration: underline;
  }
</style>
