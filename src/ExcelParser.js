import XLSX from 'xlsx';

class Parser {

    constructor() {

    }

    getCount(cell) {
        let r = this._getRow(cell.split(''))+2;
        let start = r;
        let c = this._getColumn(cell.split(''));
        let next = `${c}${r}`;
        while (this.sheet[next]) {
            r++;
            next = `${c}${r}`;
        }
        return (r-start);
    }

    _getRow(arr) {
        arr.shift();
        return parseInt(arr.join(''));
    }

    _getColumn(arr) {
        return arr.shift();
    }

    setWorkbook(file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let data = new Uint8Array(e.target.result);
            this.workbook = XLSX.read(data, {type: 'array'});
            this.sheet = this.workbook.Sheets[this.workbook.SheetNames[0]];
        }.bind(this);
        reader.readAsArrayBuffer(file);
    }

    findColumn(matching) {
        let col = '';
        for (let cell in this.sheet) {
            if (matching.includes(this.sheet[cell].v)) {
                col = cell;
            }
        }
        return col;
    }


    nextPoint(cells, index) {
        let point = {};
        cells.forEach(function (item) {
            let column = item.col.split('').shift();
            let cell = `${column}${index}`;
            if (item.name === 'dateCheck' || item.name === 'lastDateCheck') {
                point[item.name] = this.convertDateExceltoJS(this.sheet[cell].v);
                return
            }
            point[item.name] = this.sheet[cell].v;
        }.bind(this));
        return point;
    }

    convertDateExceltoJS(n) {
        return (n-(25567)-2)*86400*1000;
    }


}

export {Parser}