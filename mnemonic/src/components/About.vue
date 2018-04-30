<template>
    <div class="about">
        <h1>/me</h1>
        <p>not yet a describe</p>
      <div class="chart-container">
        <doughnut-chart
          v-if="loaded"
          :chart-labels="chartLabels"
          :chart-data="languageChartData"
          :chart-colors="colors"/>
      </div>
    </div>
</template>

<script>
import DoughnutChart from './DoughnutChart';

export default {
  components: { DoughnutChart },
  data() {
    return {
      loaded: false,
      chartLabels: [],
      languageChartData: [],
      colors: [],
      sumLang: {},
    };
  },
  methods: {
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
            this.colors.push(`#${(Math.random() * 0xFFFFFF << 0).toString(16)}`);
            return acc;
          }, this.sumLang);
        })
        .catch(error => console.error('Error:', error))
        .then(() => console.log('successfully fetched data from one repo'));
    },
  },
  mounted() {
    this.fetchStatistics();
  },
};
</script>

<style scoped>
  .chart-container {
    width: 60%;
  }
</style>
