// Add your import statements for View and Game here
import View from "./ttt-view";
import Game from "../ttt_node/game";

document.addEventListener("DOMContentLoaded", () => {
  // Your code here
  const figure = document.querySelector(".ttt")
  const game = new Game();
  // debugger
  const view = new View(game, figure);
});