<template>
    <header class="app-header">
        <h1>Mister Bitcoin</h1>
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/contact">Contacts</router-link>
            <router-link to="/stats">Statistics</router-link>
        </nav>
        <LoginSignup :loggedInUser="loggedInUser"/>
        <!-- <button class="btn" v-if="loggedInUser">Logout</button>
        <button class="btn" v-else>Login</button> -->

    </header>
</template>

<script>
import LoginSignup from '@/views/LoginSignup.vue';
export default {
    components: { LoginSignup },
    computed: {
        loggedInUser() {
            return this.$store.getters.getUser;
        }
    },
    async created() {
        try {
            await this.$store.dispatch('loadUser');
            console.log('done: ')
        } catch (err) {
            console.error("Error loading user:", err);
        }
    },
}
</script>

<style lang="scss">
.app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;

    nav {
        a {
            display: inline-block;
            padding: 0 1rem;
            text-decoration: none;
            color: black;

            &:hover {
                color: lightgray;
            }

            &:first-of-type {
                border-left: none;
            }
        }

        .router-link-exact-active {
            color: $txt-clr-dark;
        }
    }
}
</style>
