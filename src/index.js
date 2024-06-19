import React from 'react'
import ReactDOM from 'react-dom/client'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import {
  Home,
  Product,
  Products,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound
} from './pages'
import AdminDashboard from './admin/components/pages/admin-dashboard/AdminDashboard'
import ChangePassword from './admin/components/pages/change-password/ChangePassword'
import UpdateProfile from './admin/components/pages/update-profile/UpdateProfile'
import ViewUser from './admin/components/pages/users/ViewUser'
import Authenticator from './admin/authenticator'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Products />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/product/*' element={<PageNotFound />} />
        {[
          {
            path: '/dashboard',
            element: <Authenticator child={<AdminDashboard />} />
          },

          {
            path: '/update-password',
            element: <Authenticator child={<ChangePassword />} />
          },

          {
            path: '/update-profile',
            element: <Authenticator child={<UpdateProfile />} />
          },

          {
            path: '/view-users',
            element: <ViewUser />
          }
        ].map((route) => {
          return (
            <Route key={route.path} path={route.path} element={route.element} />
          )
        })}
      </Routes>
    </Provider>
  </BrowserRouter>
)
