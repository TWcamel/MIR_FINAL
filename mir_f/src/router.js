import Login from './components/Login.vue';
import Home from './components/Home.vue';
import UserInfo from './components/UserInfo.vue';
import Header from './components/Header.vue';

export const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        components: {
            default: Home,
            nav: Header
        }
    },
    {
        path: '/UserInfo',
        components: {
            default: UserInfo,
            nav: Header
        }
    },
    {
        path: '*',
        redirect: '/'
    }
];