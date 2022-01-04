import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

const List = ({ list, cards }) => {
  return (
    <div className="list w-72 border mr-4">
      <h3 className="text-center mb-4">{list.title}</h3>

      {/* cards */}
      <Droppable droppableId={list.id}>
        {(provided, snapshot) => {
          
          return (
            <div
              style={{
                minHeight: "300px",
              }}
              className={`cards p-2 ${
                snapshot.isDraggingOver ? "bg-fuchsia-200" : "bg-white"
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {cards.map((c, i) => (
                <Card key={c.id} card={c} index={i} />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default List;
