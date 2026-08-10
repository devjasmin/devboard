import { useState } from "react";

type DropzoneProps = {
  text: string;
  status: string;
  changeTaskStatus: (id: number, newStatus: string) => void;
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
    const id = Number(e.dataTransfer.getData("id"));

    props.changeTaskStatus(id, props.status);

    console.log(id, props.status);

    setIsDraggingOver(false);
  };

  return (
    <div
      className={`dropzone ${isDraggingOver ? `border-2` : ``}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {props.text}
    </div>
  );
};

export default Dropzone;
