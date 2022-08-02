import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ApptList from './appts';
import NewTechForm from './newtech';
import VinList from './byvin';
import ApptForm from './newappt';

function App() {
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
