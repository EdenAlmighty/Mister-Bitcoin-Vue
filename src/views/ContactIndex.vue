<template>
    <div>
        <h1>Contacts</h1>
        <ContactFilter @filter="onFilter" />
        <ContactList @remove="removeContact" :contacts="contacts" />
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import ContactList from '../cmps/ContactList.vue'
    import ContactFilter from '../cmps/ContactFilter.vue'
    import { showErrorMsg, showSuccessMsg } from '@/services/event-bus.service';

    export default {
        computed: {
            ...mapGetters({
                contacts: 'getContacts'
            })
        },
        methods: {
            ...mapActions(['loadContacts', 'deleteContact']),
            async removeContact(contactId) {
                try {
                    this.deleteContact(contactId)
                    showSuccessMsg('Contacts deleted:', contactId)
                } catch (err) {
                    showErrorMsg('Couldn\'t delete contact', err)
                }
            },
            onFilter(filterBy) {
                this.loadContacts(filterBy)
            }
        },
        created() {
            try {
                this.loadContacts()
            } catch (err) {
                showErrorMsg('Couldn\'t load contacts', err)
            }
        },
        components: {
            ContactList,
            ContactFilter
        }
    }
</script>


<style></style>
