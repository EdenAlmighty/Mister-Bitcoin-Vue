<template>
    <form class="contact-filter">
        
        <input
            @input="onFilter"
            v-model="filterBy.txt"
            type="text"
            placeholder="Search"
        />
        <!-- <input @input="onFilter" v-model="filterBy.phone" type="number" placeholder="Search" /> -->
    </form>
</template>

<script>
export default {
    data() {
        return {
            filterBy: { txt: '' }
        }
    },
    methods: {
        onFilter() {
            this.$emit('filter', this.filterBy)
        }
    }
}
</script>

<style lang="scss">
.contact-filter {
    // display: flex;
    height: 2em;
    width: 100%;
    // align-items: center;
    // justify-content: start;
    // gap: 10px;

    // padding: 10px;
    // background-color: darkcyan;
    color: whitesmoke;
}
</style>