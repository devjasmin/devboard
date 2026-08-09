import React from "react";

type CardProps = {
  text: string;
  id: number;
};

const TaskCard = (props: CardProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(`id`, props.id.toString());
  };

  return (
    <div draggable={true} className="card" onDragStart={handleDragStart}>
      {props.text}
    </div>
  );
};

export default TaskCard;
