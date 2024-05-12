<template>
    <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
    <div v-else>Loading chart...</div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    components: { Bar },
    props: {
        history: Object
    },
    data() {
        return {
            chartData: {
                labels: [],
                datasets: []
            },
            chartOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    },
                    title: {
                        display: true,
                        text: 'Loading...'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Price (USD)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    }
                }
            }
        }
    },
    mounted() {
        this.setupChart()
    },
    methods: {
        setupChart() {
            if (this.history) {
                this.chartOptions.plugins.title.text = this.history.name || 'Market Price (USD)'
                this.formatChartData()
            }
        },
        formatChartData() {
            const labels = this.history.values.map(item => {
                return item.x ? new Date(item.x * 1000).toLocaleDateString("en-US") : "Invalid Date"
            })
            const data = this.history.values.map(item => item.y || 0)

            this.chartData = {
                labels,
                datasets: [{
                    label: this.history.name || 'Market Price (USD)',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    data
                }]
            }
        }
    }
}
</script>
