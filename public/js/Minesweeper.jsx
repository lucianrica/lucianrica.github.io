

class Cells extends React.Component {


  revealCell = (row, col) => {

    const { boardState } = this.props
    const seen = {};


    function getMineCount(i, j) {

      let count = 0;
      for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
          const ni = i + di;
          const nj = j + dj;
          if (ni >= boardState.squares || nj >= boardState.squares || ni < 0 || nj < 0) continue;
          const id = `${ni} ${nj}`;
          const cell = document.getElementById(id)
          if (cell.className.includes('mine')) count++;
        }
      }
      return count;
    }




    function helper(i, j) {
      if (i >= boardState.squares || j >= boardState.squares || i < 0 || j < 0) return;
      const id = `${i} ${j}`;
      seen.i = j;
      if (seen[id]) return;

      const cell = document.getElementById(id);
      let mineCount = getMineCount(i, j);
      if (!cell.className.includes('hidden') || cell.className.includes('mine')) return;

      cell.classList.remove('hidden')

      if (mineCount) {
        // cell.innerText = mineCount;
        cell.innerText = mineCount;
        return;
      }

      for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
          helper(i + di, j + dj);
        }
      }
    }
    helper(row, col)



  }


  handleClick = (e) => {
    if (e.target.innerText == '🚩') return
    const cell = e.target;
    if (cell.getAttribute('class').includes('mine')) {
      this.props.gameOver(false);
      return
    }
    const row = parseInt(e.target.getAttribute('x'))
    const col = parseInt(e.target.getAttribute('y'))
    this.revealCell(row, col);

    const revealBoard = document.getElementsByClassName('hidden')
    const leftMines = document.getElementsByClassName('mine')
    if (revealBoard.length === leftMines.length) {
      this.props.gameOver(true);

    }

  }

  handleRightClick = (e) => {
    event.preventDefault();
    if (!e.target.className.includes('hidden')) return;
    if (e.target.innerText == '🚩') {
      e.target.innerText = ''
    } else {
      e.target.innerText = '🚩'
    }

  }




  render() {


    const { boardState } = this.props
    const cells = [];

    (() => {

      for (let row = 0; row < boardState.squares; row++) {
        for (let col = 0; col < boardState.squares; col++) {
          const id = `${row} ${col}`;
          let className = 'hidden';
          if (Math.random() < boardState.bombs) { className += ' mine' }
          const div = <div className={className} id={id} x={row} y={col} key={id} onClick={this.handleClick} onContextMenu={this.handleRightClick}></div>
          cells.push(div);
        }
      }


      return (cells);
    })();
    return (cells);
  }

}


class Board extends React.Component {
  state = {
    squares: 5,
    bombs: 0.18,
    gameOver: false
  };

  restart = (difficulty) => {

    var c = document.getElementById('bbb').children;
    for (let i = 0; i < c.length; i++) {
      c[i].innerText = ''
      c[i].className = 'hidden'
    }
    const title = document.querySelector('.title')
    const info = document.querySelector('.info-board')
    title.innerText = 'Game On'
    info.style = 'background: #fff'

    this.setState({
      squares: difficulty,
      gameOver: true
    })
  }

  gameOver = (bol) => {
    const revealBoard = document.getElementsByClassName('hidden')
    while (revealBoard[0]) {
      revealBoard[0].classList.remove('hidden')
    }

    const leftMines = document.getElementsByClassName('mine');

    for (let mine of leftMines) mine.innerText = '💣';


    const title = document.querySelector('.title')
    const info = document.querySelector('.info-board')

    if (bol) {
      title.innerText = 'You Won'
      info.style = 'background: #aad68877'
    } else {
      title.innerText = 'Game Lost'
      info.style = 'background: #d15c4d7a'

    }
  }

  render() {
    const styles = { '--rows-cols': this.state.squares };
    return (
      <div>
        <div className="info-board">
          <button onClick={() => { this.restart(10) }}>S</button>
          <button className="hide-on-mobile" onClick={() => { this.restart(15) }}>M</button>
          <h3 className="title">System Ready</h3>
          <button className="hide-on-mobile" onClick={() => { this.restart(20) }}>L</button>
          <button className="hide-on-mobile" onClick={() => { this.restart(25) }}>XL</button>
        </div>


        <div id="bbb" className="board" style={styles} >
          <Cells boardState={this.state} gameOver={this.gameOver} />
        </div>

      </div>
    );
  }
}

ReactDOM.render(<Board />, document.getElementById('game-board'));
