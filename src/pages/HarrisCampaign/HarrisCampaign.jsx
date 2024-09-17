import "react-image-crop/dist/ReactCrop.css";
import ProfileCampaign from "../../components/ProfileCampaign";
import logoCoding from "../../../public/assets/img/logo_cfu_white.png";
import { NavLink } from "react-router-dom";

function HarrisCampaign() {
  return (
    <div className="bg-gray-900 text-gray-400 min-h-screen">
      <div className="flex flex-col items-center w-full pt-2 px-4 mb-5">
        <a
          href="https://codingforukraine.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logoCoding} width={100} alt="Logo" />
        </a>
      </div>

      <h1
        className="text-3xl font-bold mb-0 text-white text-center text-uppercase"
        style={{ textTransform: "uppercase" }}
      >
        Show your support for Kamala Harris
      </h1>
      <ProfileCampaign />
      <div className="flex flex-col items-center w-full mt-5 pt-5 px-4">
        <small className="text-xs text-white mb-2 text-center">
          This page was made by the participants of the project Coding for
          Ukraine. You can join us here:
        </small>
        <NavLink
          to="https://donorbox.org/codingforukraine"
          className="btn rounded-full text-center bg-blue-500 mb-5 text-white px-4 py-2 hover:bg-blue-600 transition-colors"
          style={{ width: "150px" }}
        >
          Donate
        </NavLink>
      </div>
    </div>
  );
}

export default HarrisCampaign;
