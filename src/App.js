import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as get from "./components/index";
import WithNav from "./WithNav";
import WithoutNav from "./WithoutNav";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/" element={<get.LoginForm />} />
            <Route path="/login" element={<get.LoginForm />} />
          </Route>
          <Route element={<WithNav />}>
            <Route path="/dashboard" element={<get.Dashboard />} />
            <Route path="/bookings" element={<get.Bookings />} />
            <Route path="/editBooking" element={<get.EditBooking />} />
            <Route path="/booking/viewBooking" element={<get.ViewBooking />} />
            <Route path="/override" element={<get.Override />} />
            <Route path="/goaxled" element={<get.GoAxled />} />
            <Route path="/creditplan" element={<get.CreditPlan />} />
            <Route path="/services" element={<get.Services />} />
            <Route path="/users" element={<get.Users />} />
            <Route path="/salesperson" element={<get.SalesPerson />} />
            <Route
              path="/salesperson/addSalesPerson"
              element={<get.AddSalesPerson />}
            />
            <Route path="/editSalesPerson" element={<get.EditSalesPerson />} />
            <Route path="/modal" element={<get.Model />} />
            <Route path="/editVehicleType" element={<get.EditVehicleType />} />
            <Route path="/modal/addModal" element={<get.AddModal />} />
            <Route path="/partners" element={<get.Partner />} />
            <Route path="/partners/addPartner" element={<get.AddPartner />} />
            <Route path="/partners/editPartner" element={<get.EditPartner />} />
            <Route path="/banners" element={<get.Banner />} />
            <Route path="/banners/addBanner" element={<get.AddBanner />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
