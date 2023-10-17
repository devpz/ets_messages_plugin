// a little function to help us with reordering the result
import { v4 as uuidv4 } from "uuid";

export function reorder(list: any, startIndex: number, endIndex: number) {
  console.log(list, startIndex, endIndex);
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}
/**
 * Moves an item from one list to another list.
 */
export function copy(
  source,
  destination,
  droppableSource,
  droppableDestination
) {
  console.log("===> dest", destination);

  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
}

export function move(
  source,
  destination,
  droppableSource,
  droppableDestination
) {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
}
