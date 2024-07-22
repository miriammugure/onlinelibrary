import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import "./Book.css";
function Image({ uploadImg }) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dwoqknzzj",
    },
  });

  const myImage = cld.image(uploadImg);
  return (
    <div>
      <div className="showimg">
        <AdvancedImage cldImg={myImage} />
      </div>
    </div>
  );
}

export default Image;
