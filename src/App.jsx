import Profile from "./components/Profile";
import "react-image-crop/dist/ReactCrop.css";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HarrisCampaign from "./pages/HarrisCampaign/HarrisCampaign";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/harris" element={<HarrisCampaign />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
