import React, { useEffect } from "react";
import { Cloudinary, CloudinaryUploadWidget } from "@cloudinary/base";

const CloudinaryUploadWidget = ({ setPublicId, cloudName, uploadPreset }) => {
  useEffect(() => {
    const cld = new Cloudinary({
      cloud: {
        cloudName,
      },
    });

    const uwConfig = {
      cloudName,
      uploadPreset,
    };

    const cloudinaryWidget = CloudinaryUploadWidget(uwConfig);

    cloudinaryWidget.on('success', (result) => {
      const uploadedPublicId = result.info.public_id;
      setPublicId(uploadedPublicId);
      cloudinaryWidget.close(); // Cerrar el widget después de la carga exitosa
    });

    cloudinaryWidget.open();

    // Cleanup function
    return () => {
      cloudinaryWidget.close();
    };
  }, [setPublicId, cloudName, uploadPreset]);

  return null; // No rendering needed for this component
};

export default CloudinaryUploadWidget;
