import { useState } from "react";

type DropzoneProps = {
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

    setIsDraggingOver(false);
  };

  return (
    <div
      className={`dropzone min-h-8 px-2 ${isDraggingOver ? `bg-blue-400 border-dashed border-b p-20` : ``}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    ></div>
  );
};

export default Dropzone;
