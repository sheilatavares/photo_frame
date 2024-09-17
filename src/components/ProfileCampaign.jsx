import { useRef, useState, useEffect } from "react";
import PencilIcon from "./PencilIcon";
import Modal2 from "./Modal2";
import CoverImage1 from "../img/frame_harris_trust.png";
import CoverImage2 from "../img/frame_harris_for_people.png";
import CoverImage3 from "../img/frame_harris_ukraine_strips.png";
import CoverImage4 from "../img/frame_harris_ukraine.png";
import CoverImage5 from "../img/frame_harris_win.png";
import frameModel1 from "../img/models/frame_model_1.png";
import frameModel2 from "../img/models/frame_model_2.png";
import frameModel3 from "../img/models/frame_model_3.png";
import frameModel4 from "../img/models/frame_model_4.png";
import frameModel5 from "../img/models/frame_model_5.png";
import styles from "./Profile.module.css";

const ProfileCampaign = () => {
  const avatarUrl = useRef(null);
  const [step, setStep] = useState(0);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [combinedImageUrl, setCombinedImageUrl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const frameModels = [
    frameModel1,
    frameModel2,
    frameModel3,
    frameModel4,
    frameModel5,
  ];
  const frames = [
    CoverImage1,
    CoverImage2,
    CoverImage3,
    CoverImage4,
    CoverImage5,
  ];

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
    setStep(1);
  };

  // Combinar a foto recortada com um frame selecionado
  // const combineImageWithFrame = (frameSrc, callback) => {
  //   if (avatarUrl.current) {
  //     const avatarImage = new Image();
  //     const frameImage = new Image();

  //     avatarImage.src = avatarUrl.current;
  //     frameImage.src = frameSrc;

  //     avatarImage.onload = () => {
  //       const canvas = document.createElement("canvas");
  //       const ctx = canvas.getContext("2d");

  //       const canvasWidth = 150; // Tamanho do preview
  //       const canvasHeight = 150;

  //       canvas.width = canvasWidth;
  //       canvas.height = canvasHeight;

  //       const frameSize = Math.min(canvasWidth, canvasHeight);
  //       const radius = frameSize / 2 - 28;
  //       const avatarSize = radius * 2;
  //       const avatarX = canvasWidth / 2 - avatarSize / 2;
  //       const avatarY = canvasHeight / 2 - avatarSize / 2;

  //       // Desenha o avatar recortado em círculo
  //       ctx.save();
  //       ctx.beginPath();
  //       ctx.arc(canvasWidth / 2, canvasHeight / 2, radius, 0, 2 * Math.PI);
  //       ctx.closePath();
  //       ctx.clip();
  //       ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);
  //       ctx.restore();

  //       // Desenha o frame
  //       ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);

  //       // Gera a URL da imagem combinada
  //       canvas.toBlob((blob) => {
  //         const combinedImageURL = URL.createObjectURL(blob);
  //         callback(combinedImageURL);
  //       }, "image/png");
  //     };
  //   }
  // };

  // const handleFrameSelection = (frameSrc) => {
  //   combineImageWithFrame(frameSrc, (combinedUrl) => {
  //     setCombinedImageUrl(combinedUrl); // Guarda a imagem finalf
  //     setSelectedFrame(frameSrc); // Marca o frame selecionado
  //     setStep(2); // Avança para o passo final
  //   });
  // };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = combinedImageUrl;
    link.download = "frame_support.png";
    link.click();
  };

  const drawCanvas = () => {
    const canvas = document.getElementById("finalCanvas");
    const context = canvas.getContext("2d");

    const avatarImage = new Image();
    const frameImage = new Image();

    avatarImage.src = avatarUrl.current;
    frameImage.src = selectedFrame;

    avatarImage.onload = () => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const radius = Math.min(canvasWidth, canvasHeight) / 2 - 35; // Ajuste para o recorte circular
      const avatarSize = radius * 2;
      const avatarX = canvasWidth / 2 - avatarSize / 2;
      const avatarY = canvasHeight / 2 - avatarSize / 2;

      // Recorte circular para o avatar
      context.save();
      context.beginPath();
      context.arc(canvasWidth / 2, canvasHeight / 2, radius, 0, 2 * Math.PI);
      context.closePath();
      context.clip();
      context.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);
      context.restore();

      // Desenha o frame sobre o avatar
      frameImage.onload = () => {
        context.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

        // Converter o canvas para uma URL de imagem e atualizar o estado
        canvas.toBlob((blob) => {
          const combinedImageURL = URL.createObjectURL(blob);
          setCombinedImageUrl(combinedImageURL);
        }, "image/png");
      };
    };
  };

  useEffect(() => {
    if (step === 2) {
      drawCanvas();
    }
  }, [step]);

  return (
    <div className="flex flex-col items-center pt-12 row p-4 sm:p-8">
      {step === 0 && (
        <div className="flex flex-col items-center col-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {frameModels.map((frame, index) => (
              <img
                key={index}
                src={frame}
                alt={`Frame ${index + 1}`}
                className="w-24 h-24 sm:w-32 sm:h-32"
              />
            ))}
          </div>
          <button
            className="m-auto flex items-center justify-center gap-2 p-2 md:p-4 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
            style={{ marginTop: "3rem" }}
            onClick={() => setModalOpen(true)}
          >
            <PencilIcon className="w-6 h-6" />
            <span className="ml-2 text-sm sm:text-base">Select your photo</span>
          </button>
          {modalOpen && (
            <Modal2
              updateAvatar={updateAvatar}
              closeModal={() => setModalOpen(false)}
            />
          )}
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col items-left col-12">
          <h2 className="mb-4 text-lg sm:text-2xl text-white text-center">
            Choose a Frame
          </h2>
          <div className="relative w-full flex flex-wrap justify-center gap-4 mb-5">
            {frames.map((frame, index) => (
              <div
                key={index}
                className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center"
                onClick={() => {
                  setSelectedFrame(frame);
                  setStep(2); // Avança para o próximo passo
                }}
              >
                <img
                  src={avatarUrl.current}
                  alt="Avatar"
                  className={`${styles.imgAvatar} absolute object-cover`}
                />
                <img
                  src={frame}
                  alt={`Frame ${index}`}
                  width="128px"
                  className="relative w-full h-full object-cover cursor-pointer border-2 border-gray-300 hover:border-gray-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center col-12">
          <h2 className="mb-4 text-lg sm:text-2xl text-white">Your Frame:</h2>
          <canvas
            id="finalCanvas"
            width="300"
            height="300"
            style={{ display: "none" }}
          ></canvas>
          <img
            src={combinedImageUrl}
            alt="Combined Frame"
            className="mb-4"
            style={{ width: "300px", height: "300px" }}
          />
          <div className="flex gap-4 px-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDownload}
            >
              Download
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setStep(1)}
            >
              Choose another frame
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setStep(0)}
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCampaign;
