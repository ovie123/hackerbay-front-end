function randomPoints(col, valX) {
  const numbers = new Set();

  while (numbers.size < valX) numbers.add(Math.floor(Math.random() * col));

  return [...numbers];
}

export default randomPoints;
