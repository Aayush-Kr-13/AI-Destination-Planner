import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from './components/ui/toaster.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import Viewtrip from './view-trip/[tripId]/index.jsx'
import MyTrip from './my-trips/index.jsx'
import { Analytics } from "@vercel/analytics/react"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/> 
  },
  {
    path: "/create-trip",
    element: <CreateTrip/> 
  },
  {
    path: "/view-trip/:tripId",
    element: <Viewtrip/> 
  },
  {
    path: "/my-trips",
    element: <MyTrip/> 
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Analytics/>
      <Header/>
      <Toaster/>
      <RouterProvider router={router}/>
    </ClerkProvider>
  </React.StrictMode>,
)
