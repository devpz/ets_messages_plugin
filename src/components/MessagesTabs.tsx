import { FC } from "react";
import { Categories, Messages } from "../types/types";
import * as Tabs from "@radix-ui/react-tabs";
import getMessagesOfCategory from "../utils/getMesagesOfCategory";
import { Draggable, Droppable } from "react-beautiful-dnd";
import DraggableMessage from "./DraggableMessage";

interface TabsProps {
  categories: Categories;
  messages: Messages;
}

const MessagesTabs: FC<TabsProps> = ({ categories, messages }) => {
  console.log(categories, messages);
  return (
    <Tabs.Root className="TabsRoot" defaultValue={categories[0].id}>
      <Tabs.List className="TabsList" aria-label="Choose category">
        {categories.map((category) => {
          return (
            <Tabs.Trigger className="TabsTrigger" value={category.id}>
              {category.name}
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>
      {categories.map((category) => {
        const categoryMessages = getMessagesOfCategory(messages, category);
        return (
          <Tabs.Content className="TabsContent" value={category.id}>
            <Droppable droppableId={category.id} isDropDisabled={false}>
              {(provided) => {
                return (
                  <div>
                    {categoryMessages.map((msg, index) => {
                      return (
                        <div
                          key={msg.id}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="my-4"
                        >
                          <DraggableMessage
                            heading={msg.title}
                            id={msg.id}
                            text={msg.message}
                            index={index}
                          />
                        </div>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
};

export default MessagesTabs;
