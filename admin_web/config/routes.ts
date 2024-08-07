import React from 'react'

export default [
  {
    path: '/',
    redirect: '/user/login'
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: '../pages/User/Login'
      }
    ]
  },
  {
    name: 'home',
    path: '/home',
    component: '../pages/Home'
  },
  {
    name: 'table',
    path: '/table',
    component: '../pages/Table'
  },
  {
    name: 'access',
    path: '/access',
    component: '../pages/Access'
  },
  {
    path: '*',
    layout: false,
    component: '../pages/User/404'
  },
]
