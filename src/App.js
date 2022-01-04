import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./components/List";
import initialData from "./data";
import "./index.css";

const App = () => {
  const [data, setData] = useState(initialData);

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    // no change
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    // same list
    if (source.droppableId === destination.droppableId) {
      const newCards = data.lists.find(
        (list) => list.id === source.droppableId
      ).cards;

      // remove element from that index
      const el = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, ...el);

      setData((prevValue) => {
        return {
          ...prevValue,
          lists: data.lists.map((list) => {
            if (list.id === source.droppableId) {
              return {
                ...list,
                cards: newCards,
              };
            }
            return list;
          }),
        };
      });
      return;
    }

    // different list
    const sourceCards = data.lists.find(
      (list) => list.id === source.droppableId
    ).cards;
    const destinationCards = data.lists.find(
      (list) => list.id === destination.droppableId
    ).cards;

    const el = sourceCards.splice(source.index, 1);
    destinationCards.splice(destination.index, 0, ...el);


    setData((prevValue) => {
      return {
        ...prevValue,
        lists: data.lists.map((list) => {
          if (list.id === source.droppableId) {
            return {
              ...list,
              cards: sourceCards,
            };
          } else if (list.id === destination.droppableId) {
            return {
              ...list,
              cards: destinationCards,
            };
          }
          return list;
        }),
      };
    });
  };

  return (
    <div className="board flex p-8">
      <DragDropContext onDragEnd={handleDragEnd}>
        {data.lists.map((list) => {
          const cards = list.cards.map((c) => {
            return data.cards.find((card) => card.id === c);
          });

          return <List key={list.id} list={list} cards={cards} />;
        })}
      </DragDropContext>
    </div>
  );
};

export default App;
