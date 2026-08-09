import { useState } from "react";

type DropzoneProps = {
  text: string;
};

const Dropzone = (props: DropzoneProps) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };
  const handleDragOver = () => {
    setIsDraggingOver(true);
  };

  const handleDrop = () => {
    setIsDraggingOver(false);
  };

  return (
    <div
      className={`dropzone ${isDraggingOver ? `is-dragging` : ``}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    ></div>
  );
};

export default Dropzone;
