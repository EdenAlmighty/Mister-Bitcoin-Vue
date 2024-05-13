<template>
    <RouterLink to="/contact"><button class="btn">Back</button></RouterLink>
    <h2 v-if="!contact">Loading...</h2>
    <section v-else class="contact-details">
        <img :src="contact.imgUrl" alt="contact" />
        <div contenteditable="true" @input="updateContact('name', $event.target.innerText)" class="editable"
            :text-content.prop="contact.name">
            {{ contact.name }}
        </div>
        <div contenteditable="true" @input="updateContact('email', $event.target.innerText)" class="editable"
            :text-content.prop="contact.email">
            {{ contact.email }}
        </div>
        <span contenteditable="true" @input="updateContact('phone', $event.target.innerText)" class="editable"
            :text-content.prop="contact.phone">
            {{ contact.phone }}
        </span>
        <!-- <span>{{ contact.phone }}</span> -->
        <TransferFunds :contact="contact" />
        <button class="btn" @click="saveContact">Save Changes</button>
    </section>
</template>


<script>
    import { contactService } from '@/services/contact.service'
    import TransferFunds from '@/cmps/TransferFunds.vue'
    import { showErrorMsg, showSuccessMsg } from '@/services/event-bus.service';

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
            updateContact(field, value) {
                this.contact[field] = value;
            },
            async saveContact() {
                try {
                    await this.$store.dispatch('saveContact', this.contact)
                    this.$router.push('/contact')
                    showSuccessMsg('Contact saved.')
                } catch (err) {
                    showErrorMsg('Couldn\'t save contact', err)
                }
            }
        }
    }
</script>

<style lang="scss">
    .contact-details {
        display: flex;
        flex-direction: column;
        gap: 1em;

        .editable {
            min-height: 20px;
            border: 1px solid #ccc;
            padding: 4px;
            margin-bottom: 10px;
            display: block;
            background-color: $bg-clr-dark;
            color: white;
        }

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
