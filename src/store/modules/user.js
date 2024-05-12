import { contactService } from "@/services/contact.service"
import { userService } from "@/services/user.service"

export default {
    state() {
        return {
            loggedInUser: null,
            users: []
        }
    },
    mutations: {
        setUser(state, loggedInUser) {
            state.loggedInUser = loggedInUser
            console.log('state.loggedInUser: ', state.loggedInUser)
        }
    },
    actions: {
        async loadUser({ commit }) {
            await userService.query()
            const user = await userService.getSessionUser()
            console.log('user: ', user)
            if (user !== null) {
                commit('setUser', user);
            } else {
                commit('setUser', null);
            }
        },
        async login({ commit, state }, creds) {
            try {
                console.log(creds);
                const user = await userService.login(creds)
                if (user) {
                    commit('setUser', user)
                    console.log('loggedInUser: ', state.loggedInUser)
                }
            } catch (err) {
                console.error('No User', err)
                throw err
            }
        },
        async signup({ commit, state }, creds) {
            try {
                console.log(creds);
                const user = await userService.signup(creds)
                if (user) {
                    commit('setUser', user)
                    console.log('loggedInUser: ', state.loggedInUser)
                }
            } catch (err) {
                console.error('No User', err)
                throw err
            }
        },
        async logout({ commit }) {
            try {
                await userService.logout()
                commit('setUser', null)
            } catch (err) {
                console.error('No User', err)
                throw err
            }
        },
        async transferFunds({ commit, dispatch }, { contactId, funds }) {
            try {
                const user = await userService.getSessionUser();
                if (!user) {
                    throw new Error('User not found');
                }

                if (funds > user.balance) {
                    throw new Error('Insufficient funds');
                }

                const userToTransfer = await contactService.getById(contactId);
                if (!userToTransfer) {
                    throw new Error('Contact not found');
                }

                user.balance -= funds;
                userToTransfer.balance += funds;

                await Promise.all([
                    userService.addTransaction(user, userToTransfer, funds),
                    contactService.save(userToTransfer)
                ])

                commit('setUser', user);

                return 'Transfer successful!';
            } catch (err) {
                console.error('Error transferring funds:', err);
                throw err;
            }
        }
    },
    getters: {
        getUser(state) {
            return state.loggedInUser
        }
    },
    modules: {

    }
}
