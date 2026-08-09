import { useState } from "react";

type DropzoneProps = {
  text: string;
};

const Dropzone = (props: DropzoneProps) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("id");

    console.log(id);

    setIsDraggingOver(false);
  };

  return (
    <div
      className={`dropzone ${isDraggingOver ? `is-dragging` : ``}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {props.text}
    </div>
  );
};

export default Dropzone;
