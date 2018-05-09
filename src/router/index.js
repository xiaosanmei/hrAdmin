import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/page/Container'
import Login from '@/page/Login'
import Employee from '@/page/Employee'
import Appoint from '@/page/Appoint'
import Messages from '@/page/Messages'
import System from '@/page/System'
import Venue from '@/page/Venue'
import TimeSet from '@/page/TimeSet'
import Maintenance from '@/page/Maintenance'
import AppointmentSetUp from '@/page/AppointmentSetUp'
import Notice from '@/page/Notice'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/employee',
      component: Container,
      children:[
        {
          path:'',
          name:'employee',
          component:Employee,
        }
      ]
    },
    {
      path: '/appoint',
      component: Container,
      children:[
        {
          path:'',
          name:'appoint',
          component:Appoint,
        }
      ]
    },
    {
      path:'/messages',
      component:Container,
      children:[
        {
          path:'',
          name:'messages',
          component:Messages,
        }
      ]
    },
    {
      path:'/system',
      component:Container,
      children:[
        {
          path:'',
          name:'system',
          component:System,
        }
      ]
    },
    {
      path:'/venue',
      component:Container,
      children:[
        {
          path:'',
          name:'venue',
          component:Venue,
        }
      ]
    }, {
      path:'/timeSet',
      component:Container,
      children:[
        {
          path:'',
          name:'timeSet',
          component:TimeSet,
        }
      ]
    },
    {
      path:'/maintenance',
      component:Container,
      children:[
        {
          path:'',
          name:'maintenance',
          component:Maintenance,
        }
      ]
    },
    {
      path:'/appointmentSetUp',
      component:Container,
      children:[
        {
          path:'',
          name:'appointmentSetUp',
          component:AppointmentSetUp,
        }
      ]
    },
    {
      path:'/notice',
      component:Container,
      children:[
        {
          path:'',
          name:'notice',
          component:Notice,
        }
      ]
    },

  ]
})
