import { Fragment } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Dashboard from './routes/Dashboard'
import ErrorBoundary from './routes/ErrorBoundary'
import NotFound from './routes/NotFound'
import AllEmployees from './routes/AllEmployees'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Dashboard />} errorElement={<ErrorBoundary />} />
      <Route
        path="/employees"
        element={<AllEmployees />}
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
