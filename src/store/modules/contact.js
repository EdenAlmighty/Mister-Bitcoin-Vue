import { contactService } from '@/services/contact.service'

export default {
    state() {
        return {
            contacts: [],
        }
    },
    mutations: {
        setContacts(state, contacts) {
            state.contacts = contacts
        },
        removeContact(state, contactId) {
            const idx = state.contacts.findIndex(contact => contact._id === contactId)
            if (idx !== -1) {
                state.contacts.splice(idx, 1)
            }
        },
        saveContact(state, contact) {
            const index = state.contacts.findIndex(contact => contact._id === contact._id)
            if (index !== -1) {
                state.contacts[index] = contact
            } else {
                state.contacts.push(contact)
            }
        },
    },
    actions: {
        async loadContacts({ commit }, filterBy) {
            try {
                const contacts = await contactService.query(filterBy)
                commit('setContacts', contacts)
            } catch (err) {
                console.log(err);
                throw `Couldn't load contacts`
            }
        },
        //! NOT GOOD MUTATING STATE
        async getById(state, contactId) {
            try {
                let contact = state.contacts.find(contact => contact._id === contactId)
                // if (!contact) contact = await contactService.getById(contactId)
                return contact
            } catch (err) {
                console.log(err);
                throw `Couldn't get contact`
            }
        },
        async saveContact({ commit }, contact) {
            try {
                const savedContact = await contactService.save(contact)
                commit('saveContact', savedContact)
            } catch (err) {
                console.log(err);
                throw `Couldn't save contact`
            }
        },
        async deleteContact({ commit }, contactId) {
            try {
                await contactService.remove(contactId)
                commit('removeContact', contactId)
            } catch (err) {
                console.log(err);
                throw `Couldn't delete contact`
            }
        },
    },
    getters: {
        getContacts(state) {
            return state.contacts
        },
        getEmptyContact() {
            return contactService.getEmptyContact()
        },
    },
}
