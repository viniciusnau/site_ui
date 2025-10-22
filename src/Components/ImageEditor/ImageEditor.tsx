import React, { useState, useRef, useEffect } from "react";
import ReactCrop, {
    PixelCrop,
    PercentCrop,
    centerCrop,
    makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import style from "./ImageEditor.module.css";
import Snackbar from "../../Components/Snackbar/Snackbar";
import { handleTypeService } from "../Consts";

interface ImageEditorProps {
    file: File | string | null;
    onSave: (editedFile: File) => void;
    onClose: () => void;
    aspectRatio?: number;
    minWidth?: number;
    minHeight?: number;
    initialWidthPercent?: number;
}

const ImageEditor: React.FC<ImageEditorProps> = ({
    file,
    onSave,
    onClose,
    aspectRatio = 3 / 2,
    minWidth = 500,
    minHeight = 333,
    initialWidthPercent = 100,
}) => {
    const [crop, setCrop] = useState<PercentCrop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [objectUrl, setObjectUrl] = useState<string | null>(null);
    type SnackbarTypes = keyof typeof handleTypeService | null;
    const [snackbarType, setSnackbarType] = useState<SnackbarTypes>(null);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (file instanceof File) {
            const url = URL.createObjectURL(file);
            setObjectUrl(url);
            return () => URL.revokeObjectURL(url);
        } else if (typeof file === "string") {
            setObjectUrl(file);
        } else {
            setObjectUrl(null);
        }
    }, [file]);

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height, naturalWidth, naturalHeight } = e.currentTarget;

        if (naturalWidth < minWidth || naturalHeight < minHeight) {
            setSnackbarType("imageError");
            setSnackbarMessage(
                `Aconselhamos que a imagem tenha pelo menos ${minWidth}×${minHeight} pixels.`
            );
            setObjectUrl(null);
            return;
        }

        const initialCrop = centerCrop(
            makeAspectCrop(
                {
                    unit: "%",
                    width: initialWidthPercent,
                },
                aspectRatio,
                width,
                height
            ),
            width,
            height
        );

        setCrop(initialCrop);
    };

    const getCroppedImage = async () => {
        const image = imgRef.current;
        if (!image || !completedCrop) return;

        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const canvasWidth = completedCrop.width * scaleX;
        const canvasHeight = completedCrop.height * scaleY;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            canvas.width,
            canvas.height
        );

        return new Promise<File>((resolve) => {
            canvas.toBlob((blob) => {
                if (blob) {
                    let fileName = "edited-image.png";
                    let type = blob.type;
                    if (file instanceof File) {
                        fileName = file.name;
                        type = file.type;
                    }
                    resolve(new File([blob], fileName, { type }));
                }
            }, file instanceof File ? file.type : "image/png");
        });
    };

    const handleSave = async () => {
        const croppedFile = await getCroppedImage();
        if (croppedFile) onSave(croppedFile);
    };

    return (
        <div>
            {snackbarType ? (
                <Snackbar
                    type={snackbarType}
                    setSnackbarType={setSnackbarType}
                    customMessage={snackbarMessage}
                />
            ) : (
                <>
                    {objectUrl && (
                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={aspectRatio}
                            locked
                        >
                            <img
                                ref={imgRef}
                                alt="Prévia"
                                src={objectUrl}
                                onLoad={onImageLoad}
                                style={{ maxWidth: "100%" }}
                            />
                        </ReactCrop>
                    )}

                    {objectUrl && (
                        <div className={style.actions}>
                            <button className={style.button} onClick={handleSave}>
                                Salvar
                            </button>
                            <button className={style.cancel} onClick={onClose}>
                                Cancelar
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ImageEditor;
