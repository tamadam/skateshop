import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_BILLBOARDS_UPLOAD_PRESET_NAME, CLOUDINARY_DESTROY_API, CLOUDINARY_UPLOAD_API } from "@/app/constants";
import crypto from "crypto";

export type CldOptionsType = {
    publicId: string;
    signature: string;
    timestamp: number;
};

const generateSHA1 = (data: string) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
};

const generateSignature = (
    publicId: string,
    apiSecret: string,
    timestamp: number
  ) => {
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export const getCldOptions = (url: string | null | undefined, regex: RegExp) => {
    const cldOptions: CldOptionsType = {
        publicId: "",
        signature: "",
        timestamp: new Date().getTime()
    }

    if (!url) {
        return cldOptions;
    }
    
    const match = url.match(regex);
    if (match) {
        cldOptions.publicId = match?.[0];
    }
    

    if (cldOptions.publicId) {
        cldOptions.signature = generateSHA1(
        generateSignature(cldOptions.publicId, CLOUDINARY_API_SECRET, cldOptions.timestamp)
      );
    }

    return cldOptions;
};

export const deleteCldImage = async (cldOptions: CldOptionsType | undefined) => {
    if (cldOptions) {
      try {
        const formData = new FormData();
        formData.append("public_id", cldOptions.publicId);
        formData.append("signature", cldOptions.signature);
        formData.append("api_key", CLOUDINARY_API_KEY);
        formData.append("timestamp", cldOptions.timestamp.toString());

        const response = await fetch(CLOUDINARY_DESTROY_API, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Response was not ok");
        }

        const data = await response.json();
        //console.log(data);
      } catch (error) {
        console.error("Something went wrong", error);
      }
    }
};

export const uploadCldImage = async (rawImageInput: string | File, uploadPresetName: string) => {
    try {
        const formData = new FormData();
        formData.append("file", rawImageInput);
        formData.append(
            "upload_preset",
            uploadPresetName
        );
    
        // Upload the image to Cloudinary
        const uploadResponse = await fetch(CLOUDINARY_UPLOAD_API, {
            method: "POST",
            body: formData,
        });
    
        if (!uploadResponse.ok) {
            throw new Error("Image upload failed");
        }
    
        const imageData = await uploadResponse.json();
        //console.log(imageData);
        const imageUrl = imageData.secure_url;
    
        return imageUrl;
    } catch (error) {
        console.log("Something went wrong", error);
        return "";
    }
}