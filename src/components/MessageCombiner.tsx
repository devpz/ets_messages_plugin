import { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { myDropContainerID } from "../contants";

interface MessageCombinerProps {
  list: any;
}

const MessageCombiner: FC<MessageCombinerProps> = ({ list }) => {
  return (
    <div className="h-full border-8">
      <Droppable droppableId={myDropContainerID} isDropDisabled={false}>
        {(provided) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="hover:bg-gray-500 h-full"
            >
              {list.map((element) => {
                return <>{element}</>;
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default MessageCombiner;
