
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/** v-form start-- */
import { Form, HasError, AlertError } from 'vform' 

window.Form=Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

/** v-form --end */

/** Date modifying start-- */
import moment from 'moment'; 

Vue.filter('myDate',function(date){                //Function to convert the date in desired format.
    return moment(date).format('MMMM Do YYYY');
});

/** Date modifying --end */

/** ProgressBar start-- */

import VueProgressBar from 'vue-progressbar'; 

const options = {
    color: '#bffaf3',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
      speed: '0.2s',
      opacity: '0.6s',
      termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
  }

Vue.use(VueProgressBar, options);

/** ProgressBar --end */

/** Sweetalert  start-- */

import swal from 'sweetalert2';                     

window.swal=swal;                                   //To use sweet alert
const toast = swal.mixin({                          //Defining toast from swal
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
 window.toast=toast;                                //Use toast

/** Sweetalert --end */

/** Handle Vue Routes start-- */

import VueRouter from 'vue-router'

Vue.use(VueRouter)

//Vue -Routes:
const routes =[
    {path: '/dashboard',component: require('./components/Dashboard.vue').default},
    {path: '/profile',component: require('./components/Profile.vue').default},
    {path: '/users',component: require('./components/Users.vue').default},
]
const router=new VueRouter({
    mode: 'history',    //for changing the url
    routes              //shortcut for routes:routes
})

/** Handle Vue Routes --end */



/** Global Functions start-- */

Vue.filter('upText',function(text){                         //To Change the first letter to uppercase
    return text.charAt(0).toUpperCase() + text.slice(1);
});

/** Global Functions --end */


/** Global Listener start-- */

window.Fire= new Vue();     

/** Global Listeners --end */


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
