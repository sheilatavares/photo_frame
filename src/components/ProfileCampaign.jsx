import { useRef, useState, useEffect } from "react";
import PencilIcon from "./PencilIcon";
import Modal2 from "./Modal2";
import CoverImage1 from "../img/frame_harris_trust.png";
import CoverImage2 from "../img/frame_harris_for_people.png";
import CoverImage3 from "../img/frame_harris_ukraine_strips.png";
import CoverImage4 from "../img/frame_harris_ukraine.png";
import CoverImage5 from "../img/frame_harris_win.png";
import "./Profile.css";

const ProfileCampaign = () => {
  const avatarUrl = useRef(null); // Começa vazio
  const [step, setStep] = useState(0); // Controle das etapas: 0 = Start, 1 = Escolher Frame, 2 = Escolher Foto, 3 = Combinado
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [combinedImageUrl, setCombinedImageUrl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const frames = [
    CoverImage1,
    CoverImage2,
    CoverImage3,
    CoverImage4,
    CoverImage5,
  ];

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
    setStep(3); // Avança para o próximo passo (combinar e cortar)
  };

  useEffect(() => {
    if (avatarUrl.current && selectedFrame) {
      const avatarImage = new Image();
      const coverImage = new Image();

      avatarImage.src = avatarUrl.current;
      coverImage.src = selectedFrame;

      avatarImage.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Ajusta o tamanho do canvas
        const canvasWidth = Math.min(coverImage.width, 300);
        const canvasHeight = Math.min(coverImage.height, 300);

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Define o raio para o recorte circular
        const radius = Math.min(canvasWidth, canvasHeight) / 2;

        // Desenha a imagem do avatar com um recorte circular
        ctx.save();
        ctx.beginPath();
        ctx.arc(canvasWidth / 2, canvasHeight / 2, radius - 28, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();

        const avatarSize = (radius - 28) * 2;
        const avatarX = canvasWidth / 2 - avatarSize / 2;
        const avatarY = canvasHeight / 2 - avatarSize / 2;

        ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);
        ctx.restore();

        // Desenha a imagem de fundo (frame)
        ctx.drawImage(coverImage, 0, 0, canvasWidth, canvasHeight);

        // Gera a URL do blob
        canvas.toBlob((blob) => {
          const combinedImageURL = URL.createObjectURL(blob);
          setCombinedImageUrl(combinedImageURL);
        }, "image/png");
      };
    }
  }, [avatarUrl.current, selectedFrame]);

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
    <div className="flex flex-col items-center pt-12 row">
      {step === 0 && (
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setStep(1)}
        >
          Start
        </button>
      )}

      {step === 1 && (
        <div className="flex flex-col items-center col-6">
          <h2 className="mb-4">Choose a Frame</h2>
          <div className="flex gap-4">
            {frames.map((frame, index) => (
              <img
                key={index}
                src={frame}
                alt={`Frame ${index + 1}`}
                className="w-32 h-32 cursor-pointer border-2 border-gray-300 hover:border-gray-500"
                onClick={() => {
                  setSelectedFrame(frame);
                  setStep(2); // Avança para a etapa de selecionar a foto
                }}
              />
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center col-12">
          <button
            className="m-auto flex items-center justify-center gap-2 p-2 md:p-4 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
            style={{ marginTop: "3rem" }}
            title="Change photo"
            onClick={() => setModalOpen(true)}
          >
            <PencilIcon className="w-6 h-6" />{" "}
            <span className="ml-2">Select your photo</span>
          </button>

          {modalOpen && (
            <Modal2
              updateAvatar={updateAvatar}
              closeModal={() => setModalOpen(false)}
            />
          )}
        </div>
      )}

      {step === 3 && combinedImageUrl && (
        <div className="flex flex-col items-center col-12">
          <h2 className="mb-4">Preview & Download</h2>
          <img src={combinedImageUrl} alt="Combined Image" className="mb-4" />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDownload}
          >
            Download Combined Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCampaign;
