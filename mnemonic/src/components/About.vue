<template>
    <div class="about">
        <h1>/me</h1>
        <p>not yet a describe</p>
      <div class="chart-container">
        <doughnut-chart
          v-if="this.$parent.loaded"
          :chart-labels="this.$parent.chartLabels"
          :chart-data="this.$parent.languageChartData"
          :chart-colors="this.$parent.colors"/>
      </div>
    </div>
</template>

<script>
import DoughnutChart from './DoughnutChart';

export default {
  components: { DoughnutChart },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
  .chart-container {
    width: 60%;
  }

  @media (max-width:450px) {
    .chart-container {
      width: 90%;
    }
  }
</style>
