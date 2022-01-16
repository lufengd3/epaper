window.GRID_MAP = [];

const SELECTED_VALUE = '0xff';
const UNSELECTED_VALUE = '0x00';
const FONT_WIDTH = 160;
const FONT_HEIGHT = 320;
const BIT = 8;
const SCALE = 4

function createGridMap(w, h, val = UNSELECTED_VALUE) {
  const colLen = Math.ceil(w / BIT / SCALE);
  const rowLen = Math.ceil(h / BIT / SCALE);

  GRID_MAP = [...new Array(rowLen)].map(() => new Array(colLen).fill(UNSELECTED_VALUE));
  const fragment = document.createDocumentFragment();

  const elmOffset = document.documentElement.clientHeight / rowLen;
  const elmWidth = elmHeight = elmOffset * 15/16;
  const elmMargin = elmOffset * 1/16;
  const selectedClassName = 'selectedGrid';
  const unSelectedClassName = 'unSelectedGrid';

  GRID_MAP.map((item, rowIndex) => {
    let row = document.createElement('div');
    row.setAttribute('class', 'row');
    item.map((colItem, colIndex) => {
      let elm = document.createElement('div');
      elm.setAttribute('class', unSelectedClassName);
      elm.setAttribute('style', `width:${elmWidth}px;height:${elmHeight}px;margin:0 ${elmMargin}px ${elmMargin}px 0;`);
      elm.dataset.rowIndex = rowIndex;
      elm.dataset.colIndex = colIndex;
      elm.dataset.selected = 'n';
      row.appendChild(elm)
    });

    fragment.appendChild(row);
  });

  app.appendChild(fragment);
  app.addEventListener('click', (e) => {
    // console.log(e.target);
    const {rowIndex, colIndex, selected} = e.target.dataset;
    if (rowIndex !== undefined) {
      if (selected === 'y') {
        e.target.setAttribute('class', unSelectedClassName)
        e.target.dataset.selected = 'n';
        GRID_MAP[rowIndex][colIndex] = UNSELECTED_VALUE;
      } else {
        e.target.setAttribute('class', selectedClassName);
        e.target.dataset.selected = 'y';
        GRID_MAP[rowIndex][colIndex] = SELECTED_VALUE;
      }
    }
  });
}

function geneRateFontData() {
  const resultArr = [];
  let fontDataStr = ``;

  for (let row = 0; row < FONT_HEIGHT; row++) {
    fontDataStr += '\n';
    const rowData = GRID_MAP[Math.floor(row / BIT / SCALE)];
    let realRowData = [];
    rowData.map((data, col) => {
      realRowData = realRowData.concat(new Array(SCALE).fill(data));
    });

    resultArr[row] = [...realRowData];
    resultArr[row].map((item) => {
      fontDataStr += `${item},`
    });
  }

  console.log(fontDataStr);
}

createGridMap(FONT_WIDTH, FONT_HEIGHT);

