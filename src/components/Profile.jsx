import { useRef, useState, useEffect } from "react";
import PencilIcon from "./PencilIcon";
import Modal from "./Modal";
import CoverImage from "../img/photo_frame_ukraine2.png";
import "./Profile.css";

const Profile = () => {
  const canvasRef = useRef(null);
  const avatarUrl = useRef(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/View_of_Podil_from_Kiev.jpg/800px-View_of_Podil_from_Kiev.jpg"
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [combinedImageUrl, setCombinedImageUrl] = useState(null);

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const avatarImage = new Image();
      const coverImage = new Image();

      avatarImage.src = avatarUrl.current;
      coverImage.src = CoverImage;

      avatarImage.onload = () => {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

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
          radius - 28, // Adjusting the radius to make the avatar 56px smaller
          0,
          2 * Math.PI
        );
        ctx.closePath();
        ctx.clip();

        // Adjust the position of the avatar image to fit within the cover image
        const avatarSize = (radius - 28) * 2; // Adjusting the size to make the avatar 56px smaller
        const avatarX = coverImage.width / 2 - avatarSize / 2;
        const avatarY = coverImage.height / 2 - avatarSize / 2;

        ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);
        ctx.restore();

        // Draw cover image
        ctx.drawImage(coverImage, 0, 0, coverImage.width, coverImage.height);

        // Get data URL from canvas
        const combinedImageURL = canvas.toDataURL("image/png");

        // Set the combined image URL
        setCombinedImageUrl(combinedImageURL);
      };
    }
  }, [avatarUrl.current]);

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

  return (
    <div className="flex flex-col items-center pt-12">
      <div className="relative flex justify-center items-center px-10">
        <canvas
          ref={canvasRef}
          id="canvas"
          className="w-48 h-48 md:w-64 md:h-64 rounded-full top-10"
        ></canvas>
        <img
          src={CoverImage}
          alt="Cover Image"
          className="w-60 h-60 md:w-80 md:h-80 absolute object-cover"
        />
      </div>

      <button
        className="m-auto w-fit p-2 md:p-4 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
        style={{ marginTop: "2rem" }}
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
          {/* Other buttons (commented out for brevity) */}
        </div>
      )}
    </div>
  );
};

export default Profile;
