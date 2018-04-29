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
        // cutoutPercentage: 30,
        // circumference: Math.PI,
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
          // label: 'downloads',
          // borderColor: '#249EBF',
          pointBackgroundColor: 'white',
          // borderWidth: 1,
          pointBorderColor: '#249EBF',
          backgroundColor: this.chartColors,

          // backgroundColor: [
          //   "#FF6384",
          //   "#63FF84",
          //   "#84FF63",
          //   "#8463FF",
          //   "#6384FF"
          // ],
          borderColor: 'black',
          borderWidth: 2,

          data: this.chartData,
        },
      ],
    }, this.options);
  },
};
</script>
