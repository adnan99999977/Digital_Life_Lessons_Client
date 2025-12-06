import { Outlet } from "react-router-dom"
import Navbar from "../components/shared/Navbar"
import Footer from "../components/shared/Footer"

const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar/>
     <div className="flex-1 md:py-25 py-10 px-10">
      <Outlet/>
     </div>
     <Footer/>
    </div>
  )
}

export default DashboardLayout