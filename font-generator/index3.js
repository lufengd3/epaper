const SELECTED_VALUE = '1';
const UNSELECTED_VALUE = '0';
const FONT_WIDTH = 160;
const FONT_HEIGHT = 320;
const BIT = 8;
const SCALE = 1

const ctx = canvas.getContext('2d');
canvas.width = FONT_WIDTH;
canvas.height = FONT_HEIGHT;

ctx.fillStyle = '#c9c9c9';
ctx.fillRect(0, 0, FONT_WIDTH, FONT_HEIGHT);

initPen();

function initPen() {
  let painting = false;
  let lastPoint = { x: undefined, y: undefined };

  canvas.onmousedown = function (e) {
    painting = true;
    let x = e.clientX;
    let y = e.clientY;
    lastPoint = { x, y };
  }

  canvas.onmousemove = function (e) {
    if (painting) {
      let x = e.clientX;
      let y = e.clientY;
      let newPoint = { x, y };
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
      lastPoint = newPoint;
    }
  }

  canvas.onmouseup = function () {
    painting = false;
  }
}

function drawLine(x1, y1, x2, y2) {
  ctx.lineWidth = 20;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

function geneRateFontData() {
  const resultArr = [];
  let fontDataStr = ``;

  for (let y = 0; y < FONT_HEIGHT; y++) {
    fontDataStr += '\n';

    let realRowData = [];
    for (let i = 0; i < FONT_WIDTH / BIT; i++) {
      let bin = '';
      const x1 = i * BIT;
      const x2 = (i + 1) * BIT;
      for (let j = x1; j < x2; j++) {
        const colorR = ctx.getImageData(j, y, 1, 1).data[0];
        bin += colorR === 0 ? '1' : '0';
      }
      let hex = parseInt(bin, 2).toString(16);
      if (hex.length === 1) {
        hex = `0${hex}`;
      }
      realRowData.push(`0x${hex}`);
    }

    resultArr[y] = [...realRowData];
    resultArr[y].map((item) => {
      fontDataStr += `${item},`
    });
  }

  console.log(fontDataStr);
}