import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PetitionsPage from "./pages/PetitionsPage";
import CustomerPage from "./pages/CustomerPage";
import PetitionDetail from "./components/PetitionDetail";
import MyPostulationsPage from "./pages/MyPostulationsPage";
import DashboardLayout from "./components/Layout"; 
import DashboardCustomerLayout from "./components/CustomerLayout";
import PetitionListWithPostulations from "./components/PetitonListWithPostulation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/customer" element={<DashboardCustomerLayout />}>
          <Route path="petitions" element={<CustomerPage/>} />
        </Route>
        
        <Route path="/" element={<DashboardLayout />}>
          <Route path="petitions" element={<PetitionsPage />} />
          <Route path="petitions/:id" element={<PetitionDetail />} />
          <Route path="postulation-list" element={<MyPostulationsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
