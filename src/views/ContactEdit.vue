<template>
    <h2 v-if="!contact">Loading...</h2>
    <form v-else @submit.prevent="save" class="contact-edit">
        <input v-model="contact.name" type="text" placeholder="Name" />
        <input v-model="contact.email" type="email" placeholder="Email" />
        <button class="btn">Save</button>
    </form>
</template>

<script>
import { contactService } from '@/services/contact.service';
import { showErrorMsg, showSuccessMsg } from '@/services/event-bus.service'

export default {
    data() {
        return {
            contact: null
        }
    },
    methods: {
        async save() {
            try {
                await this.$store.dispatch('saveContact', this.contact)
                this.$router.push('/contact')
                showSuccessMsg('Contact saved.')
            } catch {
                showErrorMsg('Couldn\'t save contact')
            }
        }
    },
    async created() {
        const { contactId } = this.$route.params
        if (contactId) {
            // this.contact = await this.$store.dispatch('getById', contactId)
            this.contact = await contactService.getById(contactId)
        } else {
            this.contact = await contactService.getEmptyContact()
        }
    }
}
</script>

<style></style>
