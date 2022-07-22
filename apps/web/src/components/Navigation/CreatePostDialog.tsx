import { Dialog } from "@headlessui/react";
import { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaRegImages, FaTimes } from "react-icons/fa";
import { Button } from "../Button";
import { IconButton } from "../IconButton/IconButton";

export interface CreatePostDialogProps {
  open: boolean;
  onPost?: (event: { file: string; caption: string }) => void;
  onClose: () => void;
}

export const CreatePostDialog: FC<CreatePostDialogProps> = (props) => {
  const { open, onClose, onPost = () => {} } = props;
  const [file, setFile] = useState<string>("");
  const [caption, setCaption] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileUrl = e.target?.result as string;

      if (fileUrl) {
        setFile(fileUrl);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleClose = () => {
    setFile("");
    setCaption("");
    onClose();
  };

  return (
    <Dialog
      className="bg-black bg-opacity-25 fixed inset-0 flex justify-center items-center p-4"
      open={open}
      onClose={handleClose}
    >
      <Dialog.Panel className="bg-white rounded-lg w-full max-w-xl">
        <div className="relative border-b-[1px] border-gray-300 p-4">
          <Dialog.Title className="text-center font-semibold">
            Create new post
          </Dialog.Title>

          <IconButton
            className="absolute top-1/2 -translate-y-1/2 right-2"
            onClick={handleClose}
          >
            <FaTimes />
          </IconButton>
        </div>

        <div className="p-4">
          <input
            className="bg-gray-200 w-full p-2"
            placeholder="Write a caption."
            type="text"
            name="Caption"
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        {file ? (
          <div>
            <img src={file} alt="Uploaded image" />
          </div>
        ) : (
          <div
            className="px-14 pt-14 pb-16 text-center text-xl flex flex-col gap-2"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <FaRegImages className="text-4xl self-center" />
            <p>
              Drag photos here, <br />
              or click to select photos
            </p>
          </div>
        )}
        {file.length > 0 && caption.length > 0 && (
          <div className="p-4">
            <Button
              className="w-full"
              onClick={() => {
                onPost({ file, caption });
                handleClose();
              }}
            >
              Post
            </Button>
          </div>
        )}
      </Dialog.Panel>
    </Dialog>
  );
};
