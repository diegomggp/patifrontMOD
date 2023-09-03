import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { AppWrapper } from './context/context';
import { ClientDataProvider } from './context/clientDataContext'
import ProtectedRoute from './utils/ProtectedRoute';
import ErrorMessage from './utils/ErrorMessage';
import Login from './Components/Login';
import Home from './Components/Home';
import AllTrips from './Components/AllTrips';
import Register from './Components/Register';
import LandingPage from './Components/Landing';
import Payments from './Components/Payments';
import NoTrips from './Components/NoTrips';
import Invoice from './Components/TripComponents/Invoice';

function App() {



  return (
    <div className="App">
      <AppWrapper>
      <ClientDataProvider>

        <Routes>
        <Route path="/" element={<LandingPage/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/no-trips" element={<NoTrips/>}/>
          <Route path="/home" element={
            <ProtectedRoute>
                <Home />
              </ProtectedRoute>

          }>
            <Route path="forma_pago" element={<Payments />} />
            <Route path="payments" element={<Invoice />}></Route>
            <Route path='all-trips' element={<AllTrips/>}></Route>
            <Route path='paymentform' element={<Payments/>}></Route>
          </Route>
          <Route path="*" element={<h1>Esta ruta no existe</h1>} />
        </Routes>
        <ErrorMessage />
        </ClientDataProvider>

      </AppWrapper>
    </div>
  );
}

export default App;
