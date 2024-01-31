import React, { useRef, useEffect, useState } from "react";
import PencilIcon from "./PencilIcon";
import Modal from "./Modal";
import CoverImage from "../img/photo_frame_ukraine2.png";
import "./Profile.css"; // Import the new stylesheet

const Profile = () => {
  const [textTitle, setTextTitle] = useState("Overlay text");
  const [modalOpen, setModalOpen] = useState(false);
  const imageLoaderRef = useRef(null);
  const canvasRef = useRef(null);

  const updateAvatar = (newDataUrl) => {
    avatarUrl.current = newDataUrl;
    handleImage(newDataUrl);
  };
  const avatarUrl = useRef(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/View_of_Podil_from_Kiev.jpg/800px-View_of_Podil_from_Kiev.jpg"
  );
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";

    // const imageLoader = imageLoaderRef.current;

    // imageLoader.addEventListener("change", handleImage);

    window.addEventListener("load", drawPlaceholder);

    function drawPlaceholder() {
      img.onload = function () {
        drawOverlay(img);
        drawText();
        dynamicText(img);
      };
      img.src = "https://unsplash.it/400/400/?random";
    }

    function drawOverlay(img) {
      ctx.drawImage(img, 0, 0);
      ctx.fillStyle = "rgba(30, 144, 255, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    return () => {
      window.removeEventListener("load", drawPlaceholder);
      // imageLoader.removeEventListener("change", handleImage);
    };
  }, [textTitle]);

  const handleImage = (newDataUrl) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        drawOverlay(img);
        drawText();
        dynamicText(img);
      };

      img.src = event.target.result;
      const canvas = canvasRef.current;
      canvas.classList.add("show");
    };

    // Convert the newDataUrl to a Blob and read as data URL
    const blob = dataURLtoBlob(newDataUrl);
    reader.readAsDataURL(blob);
  };

  // Helper function to convert data URL to Blob
  const dataURLtoBlob = (dataURL) => {
    const parts = dataURL.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  };

  const convertToImage = () => {
    const canvas = canvasRef.current;
    window.open(canvas.toDataURL("png"));
  };

  return (
    <div className="flex flex-col items-center pt-12">
      <div className="page-wrap">
        <div className="controls">
          {/* <input
            className="controls__input"
            type="file"
            id="imageLoader"
            name="imageLoader"
            ref={imageLoaderRef}
          /> */}
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
          <label className="controls__label" htmlFor="name">
            First, choose an image.
          </label>
        </div>
        <div id="canvas-wrap">
          <canvas
            style={{ display: "block" }}
            id="imageCanvas"
            width="400"
            height="400"
            ref={canvasRef}
          ></canvas>
        </div>
      </div>
      <button onClick={convertToImage}>Download Image</button>
    </div>
  );
};

export default Profile;
