<template>
    <h1>Home</h1>
    <section v-if="loggedInUser">
        <p>{{ loggedInUser.fullname }}</p>
        <p v-if="bitcoins">{{ bitcoins }}</p>
        <p v-else>Loading bitcoins...</p>
    </section>
</template>

<script>
import { bitcoinService } from '@/services/bitcoin.service'

export default {
    data() {
        return {
            bitcoins: null
        }
    },
    created() {
        this.fetchBitcoins()
    },
    methods: {
        async fetchBitcoins() {
            if (this.loggedInUser && this.loggedInUser.balance) {
                this.bitcoins = await bitcoinService.getRate(this.loggedInUser.balance)
            } else {
                this.bitcoins = 'No balance available'
            }
        }
    },
    computed: {
        loggedInUser() {
            return this.$store.getters.getUser
        }
    }
}
</script>

<style scoped></style>
