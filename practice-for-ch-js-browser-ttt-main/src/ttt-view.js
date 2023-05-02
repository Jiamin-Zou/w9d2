// import Game from "../ttt_node/game"
import MoveError from "../ttt_node/moveError";

class View {
  constructor(game, el) {
    this.game = game;
    this.el = el;
    this.handleClick = this.handleClick.bind(this)
    this.setupBoard();
  }
  
  setupBoard() {
    const grid = document.createElement("ul");
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const spot = document.createElement("li");
        spot.dataset.pos = `[${i},${j}]`;
        // spot.dataset.pos = JSON.stringify([i, j])
        // spot.innerText = `${[i, j]}`
        grid.appendChild(spot)
      }
    }
    this.el.appendChild(grid);
    const text = document.createElement("p");
    text.classList.add("message")
    text.innerText = `Welcome to Tic-Tac-Toe\nCurrent Turn: '${this.game.currentPlayer.toUpperCase()}'`
    this.el.appendChild(text)
    document.addEventListener("click", this.handleClick)
  }
  
  handleClick(e) {
    const triggerEl = e.target
    // debugger
    this.makeMove(triggerEl)
  }

  makeMove(square) {
    // debugger
    const player = this.game.currentPlayer;
    const pos = JSON.parse(square.dataset.pos)
    const msg = document.querySelector(".message");
    try {
      this.game.playMove(pos);
    } catch (e) {
      if (e instanceof MoveError) {
        alert(e.msg);
        this.game.playMove(pos)
      } else {
        throw e;
      }
    }
    square.classList.add(player);
    square.innerText = player;
    // debugger
    msg.innerText = `Current Turn: '${this.game.currentPlayer.toUpperCase()}'`
    if (this.game.isOver()) {
      document.removeEventListener("click", this.handleClick)
      this.handleGameOver(msg);
    }
  }
  
  handleGameOver(msg) {
    const winner = this.game.winner();
    // debugger
    if (winner) {
      msg.innerText = `Player '${winner.toUpperCase()}' has won!\n`;
      const winMark = document.getElementsByClassName(winner);
      Object.values(winMark).forEach(li => {
        li.classList.add("winner");
      })
      // debugger
    } else {
      msg.innerText = 'IT WAS A TIE,\n NO ONE WINS!\n';
    }
    const replay = document.createElement("button");
    replay.innerText = "Play Again !";
    replay.classList.add("replay-btn");
    msg.appendChild(replay);
    replay.addEventListener("click", e => location.reload())
  }
}

export default View;