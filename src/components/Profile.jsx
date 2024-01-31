import React, { useRef, useEffect, useState } from "react";

const Profile = () => {
  const [textTitle, setTextTitle] = useState("Overlay text");
  const imageLoaderRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";

    const imageLoader = imageLoaderRef.current;
    imageLoader.addEventListener("change", handleImage);

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

    function drawText() {
      ctx.fillStyle = "white";
      ctx.textBaseline = "middle";
      ctx.font = "50px 'Montserrat'";
      ctx.fillText(textTitle, 50, 50);
    }

    function dynamicText(img) {
      document.getElementById("name").addEventListener("keyup", function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawOverlay(img);
        drawText();
        setTextTitle(this.value);
        ctx.fillText(textTitle, 50, 50);
      });
    }

    return () => {
      window.removeEventListener("load", drawPlaceholder);
      imageLoader.removeEventListener("change", handleImage);
    };
  }, [textTitle]);

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
      img.src = event.target.result;
      const canvas = canvasRef.current;
      canvas.classList.add("show");
      drawOverlay(img);
      drawText();
      dynamicText(img);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const convertToImage = () => {
    const canvas = canvasRef.current;
    window.open(canvas.toDataURL("png"));
  };

  return (
    <div className="flex flex-col items-center pt-12">
      <h1>Overlay text on canvas image and save as base64</h1>
      <div className="page-wrap">
        <div className="controls">
          <input
            className="controls__input"
            type="file"
            id="imageLoader"
            name="imageLoader"
            ref={imageLoaderRef}
          />
          <label className="controls__label" htmlFor="name">
            First, choose an image.
          </label>

          <input
            className="controls__input"
            id="name"
            type="text"
            value={textTitle}
            onChange={(e) => setTextTitle(e.target.value)}
          />
          <label className="controls__label" htmlFor="name">
            Overlay Text
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
