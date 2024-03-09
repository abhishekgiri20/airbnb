import React, { useState, createRef } from "react";
import Cropper from "react-cropper";
import { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../../styles/Home.module.css";

const Index = () => {
  const [image, setImage] = useState<any>("");
  const [cropData, setCropData] = useState<any>(null);
  const cropperRef = createRef<ReactCropperElement>();
 console.log("crop data....",cropData)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImage(reader.result as string);
          // Clear previous crop data
          setCropData(null);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const getCropData = () => {
    if (cropperRef?.current && cropperRef?.current.cropper) {
      setCropData(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
    }
  };

  const onCropComplete = () => {
    getCropData();
  };

  return (
    <div>
      <div className=" pt-3 d-flex flex-column align-items-center justify-content-center" style={{ width: "100%" }}>
        <div>
          <label className="btn btn-success" htmlFor="cropImage">Select Image</label>
          <input id="cropImage" type="file" onChange={onChange} hidden/><br/><br/>
        </div>
        <div>
          <Cropper
            ref={cropperRef}
            style={{ height: "300px", width: "300px" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
            onCrop={onCropComplete} // Add this event listener
          />
        </div>
      </div>
      <div>
        <div className="box" style={{ width: "50%", float: "right" }}>
          <h1>Preview</h1>
          <div className="img-preview" style={{ width: "100%", float: "left", height: "300px",overflow:"hidden",objectFit:"cover" }}/>
        </div>
        <div className="box" style={{ width: "50%", float: "right", height: "300px",display:"inline-block", padding:"10px",boxSizing:"border-box" }}>
          <div><button className="px-3 py-2 rounded" style={{ float: "right" }} onClick={getCropData}>Crop Image</button></div>
          <div className="text-center pt-5"><img style={{height:"300px", width: "300px",objectFit:"cover" }} src={cropData} alt="cropped" /></div>
        </div>
      </div>
      <br style={{ clear: "both" }} />
    </div>
  );
};

export default Index;
