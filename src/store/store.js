import { createStore } from 'vuex'

import contact from './modules/contact.js'
import user from './modules/user.js'

export default createStore({
    strict: true,
	state() {
		return {
			isDark: true,
		}
	},
    modules: {
        contact,
        user
    }
})
