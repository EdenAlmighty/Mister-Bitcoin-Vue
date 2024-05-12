<template>
    <div>
        <h1>Stats</h1>
        <Chart v-if="history" :history="history" />
        <div v-else>Loading chart data...</div>
    </div>
</template>

<script>
import Chart from '@/cmps/Chart.vue'
import { bitcoinService } from '@/services/bitcoin.service'

export default {
    components: { Chart },
    data() {
        return {
            history: null
        }
    },
    created() {
        this.onInit()
    },
    methods: {
        async onInit() {
            try {
                this.history = await bitcoinService.getMarketPriceHistory()
            } catch (err) {
                console.error('Error loading data:', err)
            }
        }
    }
}
</script>

<style>
</style>
