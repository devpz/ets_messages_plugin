import { useQuery } from "@tanstack/react-query";
import { getCategories, getMessages } from "./utils/dataGetters";
import { Categories, Messages } from "./types/types";
import Loading from "./components/Loading";
import MessagesTabs from "./components/MessagesTabs";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { copy, move, reorder } from "./utils/dndFunctions";
import { useState } from "react";
import MessageCombiner from "./components/MessageCombiner";
import { myDropContainerID } from "./contants";

function App() {
  const [localState, setLocalState] = useState([]);

  // updateMap(uuidv4(), []);
  //FETCHING DATA

  const {
    status: statusCategories,
    error: errorCategories,
    data: fetchedCategories,
  } = useQuery({ queryKey: ["categories"], queryFn: getCategories });

  const {
    status: statusMessages,
    error: errorMessages,
    data: fetchedMessages,
  } = useQuery({ queryKey: ["messages"], queryFn: getMessages });

  if (statusCategories === "loading" || statusMessages === "loading") {
    return <Loading />;
  }

  if (statusCategories === "error" || statusMessages === "error") {
    console.log(errorCategories, errorMessages);
  }
  const categories = fetchedCategories.categories as Categories;
  const messages = fetchedMessages.messages as Messages;
  // END OF FETCHING DATA (ADD CHROME SETTINGS // MANUAL REFETCH LATER)

  function onDragEnd(result: any) {
    const { source, destination } = result;

    console.log("==> result", result);

    // dropped outside the list
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        console.log(source.droppableId, source.index, destination.index);

        setLocalState(
          reorder(source.droppableId, source.index, destination.index)
        );

        break;
      case myDropContainerID:
        setLocalState(
          copy(myDropContainerID, destination.droppableId, source, destination)
        );

        break;
      default:
        setLocalState(
          move(source.droppableId, destination.droppableId, source, destination)
        );

        break;
    }
  }

  function addList(e) {
    setLocalState([]);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex min-w-[800px] px-10">
        <div className="w-1/2 pr-5 border-r-2 border-black">
          <MessagesTabs categories={categories} messages={messages} />
        </div>
        <div className="w-1/2 pl-5 border-l-2 border-black">
          <MessageCombiner list={localState} />
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
