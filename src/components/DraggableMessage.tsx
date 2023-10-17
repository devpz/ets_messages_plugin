import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

interface DraggableMessageProps {
  heading: string;
  text: string;
  id: string;
  index: number;
}

const DraggableMessage: FC<DraggableMessageProps> = ({
  heading,
  text,
  id,
  index,
}) => {
  return (
    <div>
      <Draggable draggableId={id} key={id} index={index}>
        {(provided) => {
          return (
            <div
              className="flex flex-col justify-start p-4 bg-blue-600 hover:cursor-pointer hover:bg-blue-700 rounded-3xl text-white"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <h5 className="font-bold">{heading}</h5>
              <p className="truncate">{text}</p>
            </div>
          );
        }}
      </Draggable>
    </div>
  );
};

export default DraggableMessage;
