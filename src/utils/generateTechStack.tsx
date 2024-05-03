import { TECH_STACK } from "../constants";

export const generateTechStack = () => {
  const selectedTechStack = [];
  // Select 3 or 4 elements
  const numElements = Math.floor(Math.random() * 2) + 3;
  const shuffledTechStack = TECH_STACK.sort(() => 0.5 - Math.random());
  const uniqueTechStack = [...new Set(shuffledTechStack)];

  for (let i = 0; i < numElements && i < uniqueTechStack.length; i++) {
    selectedTechStack.push(uniqueTechStack[i]);
  }

  return selectedTechStack;
};
