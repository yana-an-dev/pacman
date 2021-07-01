const width = 28;
const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
let squares = []
let score = 0

// or getElementId('score')
// 28*28 =784
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair(귀신)
// 3 - power-pellet(큰 공)
// 4 - empty
const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
  1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
  1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]

// create board 
//let squares = []
function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    // create square (div)
    const square = document.createElement('div')
    // append to grid
    grid.appendChild(square)
    // push array
    squares.push(square)

    if (layout[i] === 0) {
      squares[i].classList.add('pac-dot');
    } else if (layout[i] === 1) {
      squares[i].classList.add('wall');
    } else if (layout[i] === 3) {
      squares[i].classList.add('power-pellet')
    } //else if (layout[i] === 2) {
    //squares[i].classList.add('ghost-lair')
    //}
  }

}
createBoard();
//console.log(squares)

//Starting position of pacman
let pacmanCurrentIndex = 364
squares[pacmanCurrentIndex].classList.add('pacman')

//https://keycode.info/ =>press any key to get the JS event keycode
// <- : 37(event.key= ArrowLeft)
// up: 38 (up arrow)
// -> : 39
// down: 40( down arrow)

function control(e) {
  // if (e.keyCode === 40) {//keyCode is deprecated..
  //   console.log('pressed down')
  // } else if (e.keyCode === 39) {
  //   console.log('pressed right')
  // } else if (e.keyCode === 38) {
  //   console.log('pressed up')
  // } else if (e.keyCode === 37) {
  //   console.log('pressed left')
  // }
  squares[pacmanCurrentIndex].classList.remove('pacman')

  switch (e.key) {
    case "Down"://IE/Edge
    case "ArrowDown": //Chrome
      console.log('pressed down')
      if (
        !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
        !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
        pacmanCurrentIndex + width < layout.length
      )
        pacmanCurrentIndex += width
      break;

    case "Up"://IE/Edge
    case "ArrowUp":
      console.log('pressed up')
      if (
        !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
        !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
        pacmanCurrentIndex - width >= 0)
        pacmanCurrentIndex -= width
      //pacmanCurrentIndex -= 28 , >0
      break;

    case "Left"://IE/Edge
    case "ArrowLeft":
      console.log('pressed left')
      if (
        !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
        !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
        pacmanCurrentIndex % width !== 0)
        pacmanCurrentIndex -= 1
      // pacmanCurrentIndex = pacmanCurrentIndex % 28 -1 
      if (pacmanCurrentIndex === 364) {
        pacmanCurrentIndex = 391
      }
      break;

    case "Right"://IE/Edge
    case "ArrowRight":
      console.log('pressed right')
      if (
        !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
        !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
        pacmanCurrentIndex % width < width - 1)
        pacmanCurrentIndex += 1
      // if (pacmanCurrentIndex % width !== width - 1) pacmanCurrentIndex += 1(이것도 동일하네)
      if (pacmanCurrentIndex === 391) {
        pacmanCurrentIndex = 364
      }
      break;

  }
  squares[pacmanCurrentIndex].classList.add('pacman');
  pacDotEaten()
  powerPelletEation()
  checkForWin()
  checkForGameOver()
}
console.log(pacmanCurrentIndex);
document.addEventListener('keyup', control)

function pacDotEaten() {
  if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
    squares[pacmanCurrentIndex].classList.remove('pac-dot')
    score++
    scoreDisplay.innerHTML = score

  }
}


function powerPelletEation() {
  //if square pacman is in contains a power pellet
  if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
    squares[pacmanCurrentIndex].classList.remove('power-pellet')
    // add a score of 10
    score += 10
    scoreDisplay.innerHTML = score

    // change each of the four ghosts to isSacards
    ghosts.forEach(ghost => { ghost.isScared = true })

    // use setTimeout to unscare ghosts after 10 seconds
    setTimeout(unScareGhosts, 10000)

  }
}


function unScareGhosts() {
  ghosts.forEach(ghost => ghost.isScared = false)

}

class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className
    this.startIndex = startIndex
    this.speed = speed
    this.currentIndex = startIndex
    this.isScared = false
    this.timerId = NaN
  }
}
// Class Ghost
const ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500)
]

// draw my ghosts onto my grid
ghosts.forEach(ghost => {
  squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
  // 각자의 클래스네임 + ghost 클래스도 더해줌
})
//move ghosts
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
  //console.log('moved ghosts')
  const directions = [-1, +1, width, -width]
  let direction = directions[Math.floor(Math.random() * directions.length)]
  //[random = 0.0~0.9 ] * 4(length) = 0 ~ 3.9 => 0,1,2,3 출력!
  //console.log(direction)

  ghost.timerId = setInterval(function () {
    //if the next square does NOT contain a wall and does not contain a ghost
    if (
      !squares[ghost.currentIndex + direction].classList.contains('wall') &&
      !squares[ghost.currentIndex + direction].classList.contains('ghost')
    ) {// remove any ghost
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      // add direction to current index
      ghost.currentIndex += direction
      // add ghost class
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    } else direction = directions[Math.floor(Math.random() * directions.length)]


    //if the ghost is currently scared
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add('scared-ghost')
    }
    //if the ghost is currently scared AND pacman is on it
    if (ghost.isScared &&
      squares[ghost.currentIndex] === squares[pacmanCurrentIndex])
    // squares[ghost.currentIndex].classList.contains('pacman'))
    {
      //remove classnames - ghost.className '
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      //change ghosts currentIndex back to its startIndex
      ghost.currentIndex = ghost.startIndex
      //add a score of 100
      score += 100
      scoreDisplay.innerHTML = score
      //re-add classnames of ghost.className and 'ghost' to the ghosts new postion
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')

    }


  }, ghost.speed)
}
//check for gameover

function checkForGameOver() {
  //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost
  if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
    !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
    //for each ghost - we need to stop it moving clear interval
    ghosts.forEach(ghost => {
      clearInterval(ghost.timerId)
      //remove eventlistenr from our control function
      document.removeEventListener('keyup', control)
      //tell uesr 
      scoreDisplay.innerHTML = 'GAME OVER, Try again!'

    })
  }
}
//check for win
function checkForWin() {
  if (score === 300) {
    //stop the ghost
    ghosts.forEach(ghost => {
      clearInterval(ghost.timerId)
      document.removeEventListener('keyup', control)
      scoreDisplay.innerHTML = 'You WON!🥳'
    })
  }
}