import { Fragment } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import ErrorBoundary from './routes/ErrorBoundary'
import NotFound from './routes/NotFound'
import Dashboard from './routes/Dashboard'
import Register from './routes/Register'
import Login from './routes/Login'
import Home from './routes/Home'
import Employee from './routes/Employee'
import AdminLogin from './routes/AdminLogin'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} errorElement={<ErrorBoundary />} />
      <Route
        path="/dash"
        element={<Dashboard />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/employee/:id"
        element={<Employee />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/register"
        element={<Register />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/login"
        element={<Login />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/admin-login"
        element={<AdminLogin />}
        errorElement={<ErrorBoundary />}
      />
      <Route path="*" element={<NotFound />} errorElement={<ErrorBoundary />} />
    </>
  )
)

const Routes = () => {
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  )
}

export default Routes
