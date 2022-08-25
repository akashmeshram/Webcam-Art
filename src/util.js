export const getCharactersSize = () => {
  const testElement = document.createElement("pre");
  testElement.style.position = "absolute";
  testElement.style.margin = "0";
  testElement.textContent = "#";
  document.getElementById("app").appendChild(testElement);
  const size = testElement.getBoundingClientRect();
  testElement.remove();
  return size;
};

export const getScreenDimensions = () => {
  const characterSize = getCharactersSize();
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    gridWidth: Math.ceil(window.innerWidth / characterSize.width),
    gridHeight: Math.ceil(window.innerHeight / characterSize.height),
  };
};
