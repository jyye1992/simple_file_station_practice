import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
import FileStation from "../components/FileStation";

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'Login',
            path: '/login',
            component: Login,
        },
        {
            name: 'FileStation',
            path: '/f_stn',
            component: FileStation,
        },
    ]
})