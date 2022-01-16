window.GRID_MAP = [];

const SELECTED_VALUE = '1';
const UNSELECTED_VALUE = '0';
const FONT_WIDTH = 8;
const FONT_HEIGHT = 8;
const BIT = 8;
const SCALE = 1

function createGridMap(w, h, val = UNSELECTED_VALUE) {
  const colLen = Math.ceil(w);
  const rowLen = Math.ceil(h);

  GRID_MAP = [...new Array(rowLen)].map(() => new Array(colLen).fill(UNSELECTED_VALUE));
  const fragment = document.createDocumentFragment();

  const elmOffset = document.documentElement.clientHeight / rowLen / 2;
  // const elmWidth = elmHeight = elmOffset;
  // const elmMargin = 0;
  const elmWidth = elmHeight = elmOffset * 15/16;
  const elmMargin = elmOffset * 1/40;
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

    const binElm = document.createElement('span');
    const binVal = Array(colLen).fill('0').join('');
    binElm.textContent = binVal;
    binElm.setAttribute('style', 'margin-left: 20px; width: 80px;');
    binElm.setAttribute('id', `bin-${rowIndex}`);
    row.appendChild(binElm);

    const hexElm = document.createElement('span');
    let hexVal = parseInt(binVal, 2).toString(16);
    hexVal = hexVal.length === 1 ? `0${hexVal}` : hexVal;
    hexElm.textContent = `0x${hexVal}`;
    hexElm.setAttribute('style', 'margin-left: 20px;');
    hexElm.setAttribute('id', `hex-${rowIndex}`);
    row.appendChild(hexElm);

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

      const binElm = document.getElementById(`bin-${rowIndex}`);
      const binVal = GRID_MAP[rowIndex].join('');
      binElm.textContent = binVal;

      const hexElm = document.getElementById(`hex-${rowIndex}`);
      let hexVal = parseInt(binVal, 2).toString(16);
      hexVal = hexVal.length === 1 ? `0${hexVal}` : hexVal;
      hexElm.textContent = `0x${hexVal}`;
    }
  });
}

function geneRateFontData() {
  const resultArr = [];
  let fontDataStr = ``;

  for (let row = 0; row < FONT_HEIGHT; row++) {
    fontDataStr += '\n';

    const rowData = GRID_MAP[row];
    let realRowData = [];
    for (let i = 0; i < rowData.length / BIT; i++) {
      const groupData = rowData.slice(i * BIT, (i + 1) * BIT);
      let bin = groupData.join('');
      let hex = parseInt(bin, 2).toString(16);
      if (hex.length === 1) {
        hex = `0${hex}`;
      }
      realRowData.push(`0x${hex}`);
    }

    // rowData.map((data, col) => {
    //   realRowData = realRowData.concat(new Array(SCALE).fill(data));
    // });

    resultArr[row] = [...realRowData];
    resultArr[row].map((item) => {
      fontDataStr += `${item},`
    });
  }

  console.log(fontDataStr);
}

createGridMap(FONT_WIDTH, FONT_HEIGHT);