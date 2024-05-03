import { TECH_STACK } from "../constants";

export const generateTechStack = () => {
  // TODO: no repeatative tech
  const selectedTechStack = [];
  const numElements = Math.floor(Math.random() * 2) + 3; // Select 3 or 4 elements
  for (let i = 0; i < numElements; i++) {
    const randomIndex = Math.floor(Math.random() * TECH_STACK.length);
    selectedTechStack.push(TECH_STACK[randomIndex]);
  }
  return selectedTechStack;
};
