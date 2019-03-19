var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

//const size = window.innerWidth / 2;
const dpr = window.devicePixelRatio;
const STEP = 40;

canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
context.scale(dpr, dpr);

context.lineCap = 'square';
context.lineWidth = 2;
const MAX_DISTANCE = Math.sqrt((window.innerWidth * window.innerWidth) + (window.innerHeight * window.innerHeight));

// Angle is measured from the x axis clockwise

const getAllParallelLines = (startLine) => {
  const { x, y, angle } = startLine;
  var listOfLines =  [startLine];
  for(var i=0; i<MAX_DISTANCE; i+= STEP){
    const leftPoint = findLeftPoint({
      ...startLine,
      angle: startLine.angle + Math.PI/2
    }, i);
    const rightPoint = findRightPoint({
      ...startLine,
      angle: startLine.angle + Math.PI/2
    }, i);
    listOfLines.push({...leftPoint, angle: startLine.angle});
    listOfLines.push({...rightPoint, angle: startLine.angle});
  }
  // how many lines do I need to actually return?
  //   actually it's diagonal distance
  //   screenSize/step * 2?
  //   max possible on the screen in each direction
  // I'm thinking of the idea of recursing over all of the lines
  return listOfLines;
}

const findLeftPoint = (line, radius) =>{
  const xDiff = Math.cos(line.angle + Math.PI) * radius;
  const yDiff = Math.sin(line.angle + Math.PI) * radius;
  return {
    x: xDiff + line.x,
    y: yDiff + line.y
  };
}

const findRightPoint = (line, radius) =>{
  const xDiff = Math.cos(line.angle) * radius;
  const yDiff = Math.sin(line.angle) * radius;
  return {
    x: xDiff + line.x,
    y: yDiff + line.y
  };
}
 
const toRadians = (angle) => {
  return angle * (Math.PI / 180);
}

const drawLine = (line) => {
  const radAngle = toRadians(line.angle);
  var newLine = {...line, angle: radAngle};
  const leftPoint = findLeftPoint(newLine, MAX_DISTANCE);
  const rightPoint = findRightPoint(newLine, MAX_DISTANCE);
  context.moveTo(leftPoint.x, leftPoint.y);
  context.lineTo(rightPoint.x, rightPoint.y);
  context.stroke();
}


const drawLineSetFromCenterpoint = (startLine) => {
  const allLines = getAllParallelLines(startLine)
  allLines.map(drawLine);
}

for(var i=0; i<5; i++){
  const x = Math.random()*500
  const y = Math.random()*500
  const angle = Math.random()*360
  drawLineSetFromCenterpoint({x, y, angle});
}
// pick a number of line sets
// rotate them at different speeds
// center them at different points:w

// y = m * x + b

// slope 1
// start 0,0
// point 1,1
// slope 2
// start 0,0
// point 2,1
