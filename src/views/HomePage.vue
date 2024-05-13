<template>
    <h1>Home</h1>
    <section class="user-container" v-if="loggedInUser">
        <img src="https://robohash.org/'{{loggedInUser._id}}'?size=200x200&set=set5" alt="User Image">
        <h2>{{ loggedInUser.fullname }}</h2>
        <p v-if="bitcoins">BTC$: {{ bitcoins }}</p>
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

<style lang="scss">

    .user-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1em;

        img {
            height: 200px;
        }
    }
</style>
