<script>
import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  props: {
    chartData: {
      type: Array,
      required: false,
    },
    chartLabels: {
      type: Array,
      required: true,
    },
    chartColors: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      options: {
        rotation: -Math.PI,
        legend: {
          position: 'left',
        },
        animation: {
          animateRotate: true,
          animateScale: true,
        },
        responsive: true,
      },
    };
  },
  mounted() {
    this.renderChart({
      labels: this.chartLabels,
      datasets: [
        {
          pointBackgroundColor: 'white',
          backgroundColor: this.chartColors,
          borderColor: 'black',
          borderWidth: 2,
          data: this.chartData,
        },
      ],
    }, this.options);
  },
};
</script>
