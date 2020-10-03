import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginLayout from "@/layouts/LoginLayout";
import Login from "@/views/LoginLayout/Login";
import SignUp from "@/views/LoginLayout/SignUp";
import MainLayout from "@/layouts/MainLayout";
import Job from "@/views/MainLayout/Job";
import Dashboard from "@/views/MainLayout/Dashboard";

import store from '../store'
import Upload from "@/views/MainLayout/Upload";
import NotifyJornal from "@/views/MainLayout/NotifyJornal";
import ResultsCheck from "@/views/MainLayout/ResultCheck/ResultsCheck";

Vue.use(VueRouter)

  const routes = [
    {
    path: '/auth',
    redirect: '/auth/login',
    component: LoginLayout,
    children: [
        {
            path: 'login',
            name: 'login',
            component: Login,
            beforeEnter: (to, from ,next)  => {
                if (store.state.Auth.isAuth) {
                    next('/dashboard');
                } else {
                    next();
                }
            }
        },
        {
            path: 'signup',
            name: 'signup',
            component: SignUp,
            beforeEnter: (to, from ,next)  => {
                if (store.state.Auth.isAuth) {
                    next('/dashboard');
                } else {
                    next();
                }
            }
        }
    ]
    },
    {
     path: '/',
     redirect: '/dashboard',
     component: MainLayout,
      children: [
          {path: 'job', component: Job},
          {path: 'dashboard', component: Dashboard},
          {path: 'upload', component:  Upload},
          {path: 'notification', component: NotifyJornal},
          {path: 'results-check', component: ResultsCheck}
      ]
    }
]

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
        if (store.state.Auth.isAuth) {
            if (!(to.name === 'login' || to.name=== 'signup')) {
                next();
            } else {
                next('/');
            }
        } else {
            if (to.name === 'login' || to.name === 'signup') {
                next();
            } else {
                next({name: 'login'});
            }
        }
});



export default router
