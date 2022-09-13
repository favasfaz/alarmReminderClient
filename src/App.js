import "./App.css";
import UserLogin from "./Components/UserLogin";
import Header from './Components/Header'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import DeteilsPage from "./Components/DeteilsPage";
import BasicTable from "./Components/BasicTable";
import SetTimout from "./Components/SetTimout";

function App() {
  return (
    <>
    
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path='/home' element={<Home />}/>
          <Route path="/deteilsPage" element={<DeteilsPage />} />
          <Route path='/tableView' element={<BasicTable />}/>
          <Route path="/timout/:id" element={<SetTimout />}/>
          {/* <Route exact path="*" element={<PageNotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
