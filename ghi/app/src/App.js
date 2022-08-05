import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import NewCustomerForm from './NewCustomerForm';
import NewSalesRepForm from './NewSalesRepForm';
import CreateSalesRecord from './CreateSalesRecord';
import SalesList from './ListAllSales';
import SalesByRep from './SalesRepHistory';

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="customers">
            <Route path="new" element={<NewCustomerForm />} />
          </Route>
          <Route path="salesreps">
            <Route path="new" element={<NewSalesRepForm />} />
          </Route>
          <Route path="salesrecord">
            <Route path="new" element={<CreateSalesRecord />} />
          </Route>
          <Route path="salesrecord">
            <Route path="list" element={<SalesList />} />
          </Route>
          <Route path="salesreps">
            <Route path="history" element={<SalesByRep />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;