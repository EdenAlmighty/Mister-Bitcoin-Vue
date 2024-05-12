import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ContactIndex from '@/views/ContactIndex.vue'
import ContactDetails from '@/views/ContactDetails.vue'
import ContactEdit from '@/views/ContactEdit.vue'
import StatisticsPage from '@/views/StatisticsPage.vue'
// import LoginSignup from '@/views/LoginSignup.vue'


// router.beforeEach((to, from, next) => {
//     if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//     else next()
// })
const routerOptions = {
    history: createWebHistory(import.meta.env.BASE_URL),
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

export default router;
