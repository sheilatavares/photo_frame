import React, { useRef, useEffect, useState } from "react";
import { openEditor } from "https://esm.sh/react-profile";

import ReactDOM from "https://esm.sh/react-dom";

const Profile = () => {
  const [dataURL, setDataURL] = useState();

  const open = async (e) => {
    const res = await openEditor(e.target.files[0]);
    const image = res.editedImage;
    if (image) {
      const url = image.getDataURL();
      setDataURL(url);
    }
  };

  return (
    <div>
      <label for="file">Please select your image</label> <br />
      <br />
      <input
        type="file"
        id="file"
        name="file"
        accept="image/jpeg;image/png"
        onChange={open}
      />
      {dataURL && <img src={dataURL} alt="Preview image" />}
    </div>
  );
};

export default Profile;
