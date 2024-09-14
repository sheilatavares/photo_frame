import "react-image-crop/dist/ReactCrop.css";
import ProfileCampaign from "../../components/ProfileCampaign";

function HarrisCampaign() {
  return (
    <div className="bg-gray-900 text-gray-400 min-h-screen p-4">
      <h1
        className="text-3xl font-bold mb-4 text-white text-center text-uppercase"
        style={{ textTransform: "uppercase" }}
      >
        Show your support for Kamala Harris
      </h1>
      <ProfileCampaign />
    </div>
  );
}

export default HarrisCampaign;
