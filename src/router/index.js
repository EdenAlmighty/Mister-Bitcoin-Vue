import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ContactIndex from '@/views/ContactIndex.vue'
import ContactDetails from '@/views/ContactDetails.vue'
import ContactEdit from '@/views/ContactEdit.vue'
import StatisticsPage from '@/views/StatisticsPage.vue'
import store from '@/store/store'
// import LoginSignup from '@/views/LoginSignup.vue'

const routerOptions = {
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path: '/contact',
            name: 'contact',
            component: ContactIndex,
            meta: {requiresAuth: true}

        },
        {
            path: '/contact/:contactId',
            name: 'details',
            component: ContactDetails,
        },
        {
            path: '/contact/edit/:contactId',
            name: 'edit',
            component: ContactEdit,
        },
        {
            path: '/stats',
            name: 'stats',
            component: StatisticsPage,
        },
        // {
        //     path: '/login',
        //     name: 'login',
        //     component: LoginSignup
        // }
    ]
}
const router = createRouter(routerOptions)

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const exists = router.getRoutes().some(route => route.name === to.name)

    console.log('store.state.isAuth: ',store.state.user.isAuth )
    if (requiresAuth && !store.state.user.isAuth || !exists) {
        next({ name: 'home' })
    } else {
        next()
    }
})
export default router
