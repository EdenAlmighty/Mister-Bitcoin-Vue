<script>
import AppHeader from './cmps/AppHeader.vue'

import UserMsg from './cmps/UserMsg.vue'
export default {
    components: {
        AppHeader,
        UserMsg,
    }
}
</script>

<template>
    <AppHeader />
    <RouterView />
    <UserMsg />
</template>

<style scoped>
</style>
