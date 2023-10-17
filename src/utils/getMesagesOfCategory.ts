import { Category, Messages } from "../types/types";

export default function getMessagesOfCategory(
  messages: Messages,
  category: Category
): Messages {
  const retArr: Messages = [];

  for (let i = 0; i < messages.length; i++) {
    if (messages[i].categoryID === category.id) {
      retArr.push(messages[i]);
    }
  }

  return retArr;
}
