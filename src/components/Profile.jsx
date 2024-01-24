import { useRef, useState, useEffect } from "react";
import PencilIcon from "./PencilIcon";
import Modal from "./Modal";
import CoverImage from "../img/foto_frame_ukraine.png";
import kiev from "../img/kiev.jpg";

const Profile = () => {
  const [avatarUrl, setAvatarUrl] = useState(kiev);
  const [modalOpen, setModalOpen] = useState(false);
  const [combinedImageUrl, setCombinedImageUrl] = useState(null);

  const updateAvatar = (imgSrc) => {
    setAvatarUrl(imgSrc);
  };

  useEffect(() => {
    if (avatarUrl) {
      const avatarImage = new Image();
      const coverImage = new Image();

      avatarImage.src = avatarUrl;
      coverImage.src = CoverImage;

      avatarImage.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas dimensions to match the cover image
        canvas.width = coverImage.width;
        canvas.height = coverImage.height;

        // Calculate the radius for the circular clip path
        const radius = coverImage.width / 2;

        // Draw avatar image with a circular clip path
        ctx.save();
        ctx.beginPath();
        ctx.arc(
          coverImage.width / 2,
          coverImage.height / 2,
          radius,
          0,
          2 * Math.PI
        );
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(
          avatarImage,
          (coverImage.width - avatarImage.width) / 2,
          (coverImage.height - avatarImage.height) / 2,
          avatarImage.width,
          avatarImage.height
        );
        ctx.restore();

        // Draw cover image
        ctx.drawImage(coverImage, 0, 0, coverImage.width, coverImage.height);

        // Get data URL from canvas
        const combinedImageURL = canvas.toDataURL("image/png");

        // Set the combined image URL
        setCombinedImageUrl(combinedImageURL);
      };
    }
  }, [avatarUrl]);

  const handleDownload = () => {
    if (combinedImageUrl) {
      const link = document.createElement("a");
      link.href = combinedImageUrl;
      link.download = "combined_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const openInstagramApp = () => {
    // Replace with the Instagram URL scheme for sharing
    window.open("instagram://app");
  };

  const openFacebookApp = () => {
    // Replace with the Facebook URL scheme for sharing
    window.open("fb://facewebmodal/f?href=YOUR_URL");
  };

  const openTwitterApp = () => {
    // Replace with the Twitter URL scheme for sharing
    window.open("twitter://post?message=Your+tweet+text+here");
  };

  return (
    <div className="flex flex-col items-center pt-12">
      <div className="relative flex justify-center items-center px-10">
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-[450px] h-[450px] rounded-full top-10"
        />
        <img
          src={CoverImage}
          alt="Cover Image"
          className="w-[530px] h-[530px] absolute object-cover"
        />
      </div>

      <button
        className="left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
        style={{ marginTop: "70px" }}
        title="Change photo"
        onClick={() => setModalOpen(true)}
      >
        <PencilIcon />
      </button>

      {modalOpen && (
        <Modal
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}

      {combinedImageUrl && (
        <div className="flex mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleDownload}
          >
            Download Combined Image
          </button>
          <button
            className="bg-purple-500 hover.bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={openInstagramApp}
          >
            Share on Instagram
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            onClick={openFacebookApp}
          >
            Share on Facebook
          </button>
          <button
            className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={openTwitterApp}
          >
            Share on Twitter
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
