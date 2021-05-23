import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/user/Users.vue'
import Right from '../components/Power/Rights'
import Role from '../components/Power/Roles'
import Report from '../components/report/Report'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [
                { path: '/welcome', component: Welcome },
                { path: '/user', component: User },
                { path: '/right2', component: Right },
                { path: '/right1', component: Role },
                { path: '/right3', component: Report },
            ]
        },
    ]
})

export default router
