import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ApptList from './appts';
import NewTechForm from './newtech';
import VinList from './byvin';
import ApptForm from './newappt';
import ManuList from './manufacturers';
import ModelList from './vehicmodels';
import AutoList from './autos';
import ManuForm from './newmanu';
import ModelForm from './newmodel';
import AutoForm from './newauto';
import NewCustomerForm from './NewCustomerForm';
import NewSalesRepForm from './NewSalesRepForm';
import CreateSalesRecord from './CreateSalesRecord';
import SalesList from './ListAllSales';
import SalesByRep from './SalesRepHistory';


function App(props) {

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/appts/" element={<ApptList />} />
          <Route path="/appts/new" element={<ApptForm />} />
          <Route path="/appts/byvin/" element={<VinList />} />
          <Route path="/techs/new/" element={<NewTechForm />} />
          <Route path="/manufacturers/" element={<ManuList manufacturers={props.manufacturers} />} />
          <Route path="/manufacturers/new/" element={<ManuForm />} />
          <Route path="/models/" element={<ModelList models={props.models} />} /> 
          <Route path="/models/new/" element={<ModelForm />} />
          <Route path="/autos/" element={<AutoList autos={props.autos} />} /> 
          <Route path="/autos/new/" element={<AutoForm />} /> 
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