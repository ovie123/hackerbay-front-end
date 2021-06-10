import React, { useState, useEffect, useRef } from 'react';
import Box from './box';
import randomPoints from './points';
import mario from '../assets/mario.jpg';
import sprite from '../assets/sprite.png';

function Game(props) {
  const [valX, setValX] = useState(null);
  const [valY, setValY] = useState(null);
  //get the half of the rows and column in other to position the player at the middle point when the game starts
  const xP = Math.floor(valX / 2) - 1;
  const yP = Math.floor(valY / 2) - 1;

  const [x, setX] = useState('');
  const [y, setY] = useState('');
  //update the x and y coordinates when available
  useEffect(() => {
    if (valX && valY) {
      setX(xP);
      setY(yP);
    }
  }, [valX, valY, xP, yP]);

  //prompt the user to enter colum and rows
  useEffect(() => {
    let valueX = prompt('enter colums: ');
    let valueY = prompt('enter rows: ');
    if (
      valueX === 0 ||
      valueX === undefined ||
      valueX.trim() === '' ||
      valueX === isNaN
    ) {
      valueX = 10;
    }
    if (
      valueY === 0 ||
      valueY === undefined ||
      valueY.trim() === '' ||
      valueY === isNaN
    ) {
      valueY = 10;
    }

    setValX(parseInt(valueX, 10));
    setValY(parseInt(valueY, 10));
  }, []);

  //random coordinate state
  const [xCord, setXCord] = useState([]);
  const [yCord, setYCord] = useState([]);

  //creating the game board
  let arr = [];
  for (let i = 0; i < valX; i++) {
    arr.push([]);
    for (let j = 0; j < valY; j++) {
      arr[i][j] = null;
    }
  }
  //get random x and y coordinates using the useEffect hook and make it run once during a game
  useEffect(() => {
    if (valX && valY) {
      const xCord = randomPoints(valX, valX);
      const yCord = randomPoints(valY, valX);
      console.log(xCord, yCord);
      setXCord(xCord);
      setYCord(yCord);
    }
  }, [xP, yP, valX, valY]);

  //watch user moves
  let score = useRef(0);

  //handles the player movement using the arrow keys and then increment the score on any movement
  useEffect(() => {
    function handleKey(e) {
      switch (e.key) {
        case 'ArrowRight':
          if (x < valX - 1) {
            score.current += 1;
            setX(x + 1);
          }
          break;
        case 'ArrowLeft':
          if (x > 0) {
            score.current += 1;
            setX(x - 1);
          }
          break;
        case 'ArrowUp':
          if (y > 0) {
            score.current += 1;
            setY(y - 1);
          }
          break;
        case 'ArrowDown':
          if (y < valY - 1) {
            score.current += 1;
            setY(y + 1);
          }
          break;
        default:
          console.log('unknown');
          break;
      }
    }

    window.addEventListener('keydown', handleKey);
    //removing event listener to prevent memory leakage
    return () => window.removeEventListener('keydown', handleKey);
  }, [y, x, valX, valY]);

  //create and array to hold the game sprites
  const [alp, gh] = useState([]);

  useEffect(() => {
    let array1 = [];

    if (valX) {
      for (let i = 0; i < valX; i++) {
        array1.push(i);
      }
      array1.fill(<img className="img" src={sprite} alt="food" />);
      gh(array1);
    }
  }, [valX]);

  //it tracks the number of food remaing on the game
  let tracker = useRef(0);

  //Assigns 4 food to a position on the game using the random coordinates

  if (xCord.length > 0) {
    for (let i = 0; i < xCord.length; i++) {
      arr[xCord[i]][yCord[i]] = <div>{[alp[i]]}</div>;
    }

    //removes food if player gets to the point of the food and also track if food has been remove
    for (let i = 0; i < xCord.length; i++) {
      if (x === yCord[i] && y === xCord[i]) {
        alp[i] = <p className="me">Faa</p>;
        tracker.current += 1;
      }
    }
  }

  //check if theres no food on the board and ends game and display the number of moves taken by the user to collect all foods
  if (xCord.length > 0 && tracker.current === xCord.length) {
    setTimeout(() => {
      alert(`Game over, You completed game in ${score.current} moves`);
      window.location.reload();
    });
  }
  //check if the coordinate are returned and place the player on the middle point of the game
  //the extra check for x or y = 0 is because x = 0 or y == 0 is a falsy value hence the position will not be updated

  if ((x && y) || x === 0 || y === 0) {
    arr[y][x] = <img className="img" src={mario} alt="player" />;
  }

  return (
    <div>
      {valX && valY
        ? arr.map((item, i) => <Box data={item} key={i} />)
        : 'Loading...'}
    </div>
  );
}

export default Game;
