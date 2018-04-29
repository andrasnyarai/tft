

<template>
    <div class="about">
        <h1>/me</h1>
        <p>not yet a describe</p>
      <line-chart v-if="loaded"
                  :chart-labels="chartLabels"
                  :chart-data="languageChartData" />
      <div v-for="lang in lrepr">
        {{ lang }}
      </div>
    </div>
</template>

<script>
import LineChart from './LineChart';

export default {
  components: { LineChart },
  data() {
    return {
      loaded: false,
      chartLabels: [],
      languageChartData: [],
      lrepr: [],
    };
  },
  methods: {
    async fetchStatistics() {
      fetch('https://api.github.com/users/andrasnyarai/repos', { method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
        }) })
        .then(res => res.json())
        .then((statistics) => {
          const promisesPending = [];
          statistics.forEach((repo) => {
            promisesPending.push(this.fetchLanguagesData(repo.languages_url));
            // console.log(this.languageChartData);
            // console.log(this.chartLabels);
          });
          return Promise.all(promisesPending);
        })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('ALL is WELL'));
    },
    fetchLanguagesData(languageUrl) {
      fetch(languageUrl, { method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
        }) })
        .then(res => res.json())
        .then((languageStatistics) => {
          this.lrepr.push(languageStatistics);
          Object.keys(languageStatistics).forEach((value) => {
            // if (!this.chartLabels.contains(value)) {
            this.chartLabels.push(value);
            // }
            // this.chartLabels.push(value);
          });
          Object.values(languageStatistics).forEach((value) => {
            this.languageChartData.push(value);
          });
        })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
    },
  },
  mounted() {
    this.fetchStatistics();
    setTimeout(()=> {
          this.loaded = true;

    }, 2000)
    // console.log('this', this.chartLabels)
  },
};
</script>
