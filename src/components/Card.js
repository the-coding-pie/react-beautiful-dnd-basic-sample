import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => {
        
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`card border w-full p-2 mb-4 ${
              snapshot.isDragging ? "bg-green-200" : "bg-white"
            }`}
          >
            {card.content}
          </div>
        );
      }}
    </Draggable>
  );
};

export default Card;
