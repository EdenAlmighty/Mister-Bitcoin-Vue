<template>
    <RouterLink to="/contact"><button class="btn">Back</button></RouterLink>
    <h2 v-if="!contact">Loading...</h2>
    <section v-else class="contact-details">
        <img :src="contact.imgUrl" alt="contact" />
        <span>{{ contact.name }}</span>
        <span>{{ contact.email }}</span>
        <span>{{ contact.phone }}</span>
        <TransferFunds :contact="contact" />
    </section>
</template>

<script>
    import { contactService } from '@/services/contact.service'
    import TransferFunds from '@/cmps/TransferFunds.vue'
    export default {
        components: { TransferFunds },
        data() {
            return {
                contact: null,
            }
        },
        async created() {
            try {
                const { contactId } = this.$route.params
                this.contact = await contactService.getById(contactId)
            } catch (err) {
                console.error(err)
            }
        },
        methods: {
            onTransfer(contactId, amount) {
                
            }
        }
    }
</script>

<style lang="scss">
    .contact-details {
        display: flex;
        flex-direction: column;
        gap: 1em;

        span {
            padding: em(8px) 1em;
            background-color: $bg-clr-dark;
        }

        img {
            height: 200px;
            width: 200px;
            align-self: center;
            padding: 1em;
            background-color: $bg-clr-dark;
            border-radius: 20em;
        }
    }
</style>