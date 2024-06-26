import { useRef, useState, useEffect } from "react";
import PencilIcon from "./PencilIcon";
import Modal2 from "./Modal2";
import CoverImage from "../img/photo_frame_ukraine2.png";
import "./Profile.css"; // Import the new stylesheet

const Profile = () => {
  const avatarUrl = useRef(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/View_of_Podil_from_Kiev.jpg/800px-View_of_Podil_from_Kiev.jpg"
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [combinedImageUrl, setCombinedImageUrl] = useState(null);

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  useEffect(() => {
    if (avatarUrl.current) {
      const avatarImage = new Image();
      const coverImage = new Image();

      avatarImage.src = avatarUrl.current;
      coverImage.src = CoverImage;

      avatarImage.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas dimensions to a smaller size
        const canvasWidth = Math.min(coverImage.width, 300); // Adjust the width as needed
        const canvasHeight = Math.min(coverImage.height, 300); // Adjust the height as needed

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Calculate the radius for the circular clip path
        const radius = Math.min(canvasWidth, canvasHeight) / 2;

        // Draw avatar image with a circular clip path
        ctx.save();
        ctx.beginPath();
        ctx.arc(
          canvasWidth / 2,
          canvasHeight / 2,
          radius - 28, // Adjusting the radius to make the avatar 56px smaller
          0,
          2 * Math.PI
        );
        ctx.closePath();
        ctx.clip();

        // Adjust the position of the avatar image to fit within the canvas
        const avatarSize = (radius - 28) * 2; // Adjusting the size to make the avatar 56px smaller
        const avatarX = canvasWidth / 2 - avatarSize / 2;
        const avatarY = canvasHeight / 2 - avatarSize / 2;

        ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);
        ctx.restore();

        // Draw cover image
        ctx.drawImage(coverImage, 0, 0, canvasWidth, canvasHeight);

        // Get blob URL from canvas
        canvas.toBlob((blob) => {
          const combinedImageURL = URL.createObjectURL(blob);
          setCombinedImageUrl(combinedImageURL);
        }, "image/png");
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
        <img
          src={avatarUrl.current}
          alt="Avatar"
          className="w-48 h-48 md:w-64 md:h-64 rounded-full top-10" // Responsive sizing
        />
        <div className="w-60 h-60 md:w-80 md:h-80 absolute">
          <img
            src={CoverImage}
            alt="Cover Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <button
        className="m-auto flex items-center justify-center gap-2 p-2 md:p-4 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
        style={{ marginTop: "3rem" }}
        title="Change photo"
        onClick={() => setModalOpen(true)}
      >
        <PencilIcon className="w-6 h-6" />{" "}
        {/* Adicionando classe de tamanho para o ícone */}
        <span className="ml-2">Select your photo</span>{" "}
        {/* Adicionando margem à esquerda do texto */}
      </button>

      {modalOpen && (
        <Modal2
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
        </div>
      )}
    </div>
  );
};

export default Profile;
