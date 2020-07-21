import React from 'react'
import { throwStatement } from '@babel/types';

class Sudoku extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // grid: [
            //     [' ', '9', ' ', ' ', '4', '2', '1', '3', '6'],
            //     [' ', ' ', ' ', '9', '6', ' ', '4', '8', '5'],
            //     [' ', ' ', ' ', '5', '8', '1', ' ', ' ', ' '],
            //     [' ', ' ', '4', ' ', ' ', ' ', ' ', ' ', ' '],
            //     ['5', '1', '7', '2', ' ', ' ', '9', ' ', ' '],
            //     ['6', ' ', '2', ' ', ' ', ' ', '3', '7', ' '],
            //     ['1', ' ', ' ', '8', ' ', '4', ' ', '2', ' '],
            //     ['7', ' ', '6', ' ', ' ', ' ', '8', '1', ' '],
            //     ['3', ' ', ' ', ' ', '9', ' ', ' ', ' ', ' '],
            // ],
            gridEasy: [
                [0, 9, 0, 0, 4, 2, 1, 3, 6],
                [0, 0, 0, 9, 6, 0, 4, 8, 5],
                [0, 0, 0, 5, 8, 1, 0, 0, 0],
                [0, 0, 4, 0, 0, 0, 0, 0, 0],
                [5, 1, 7, 2, 0, 0, 9, 0, 0],
                [6, 0, 2, 0, 0, 0, 3, 7, 0],
                [1, 0, 0, 8, 0, 4, 0, 2, 0],
                [7, 0, 6, 0, 0, 0, 8, 1, 0],
                [3, 0, 0, 0, 9, 0, 0, 0, 0],
            ],
            gridNow: [],
            gridMedium: [
                [1, 0, 3, 0, 0, 0, 0, 8, 4],
                [0, 0, 6, 0, 4, 8, 0, 0, 0],
                [0, 4, 0, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 9, 6, 1, 0, 0],
                [0, 9, 0, 8, 0, 1, 0, 4, 0],
                [0, 0, 4, 3, 2, 0, 0, 0, 8],
                [0, 0, 0, 0, 0, 0, 0, 7, 0],
                [0, 0, 0, 1, 5, 0, 4, 0, 0],
                [0, 6, 0, 0, 0, 0, 2, 0, 3]
            ],
            gridHard: [
                [5, 1, 0, 0, 0, 4, 0, 7, 0],
                [0, 0, 4, 2, 0, 0, 0, 3, 0],
                [0, 0, 0, 6, 0, 0, 0, 0, 9],
                [3, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 5, 0, 0, 2, 0, 7, 0, 0],
                [9, 0, 0, 3, 7, 0, 4, 0, 0],
                [0, 0, 1, 7, 4, 0, 3, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 5, 7],
                [0, 0, 0, 0, 0, 6, 0, 0, 0]
            ],
            gridClear: [],
            supplyGrid: [1, 2, 0, 4, 5, 6, 7, 8, 0],
            row: 0,
            col: 0,
            value: 0,
            index: 0,
            isChange: false
        }
        this.isMedium = this.isMedium.bind(this)
        this.isEasy = this.isEasy.bind(this)
        this.isHard = this.isHard.bind(this)
        this.isClear = this.isClear.bind(this)
    }


    isEasy() {
        var gridEasy = this.state.gridEasy
        this.setState({ gridNow: gridEasy })
    }

    isMedium() {
        var gridMedium = this.state.gridMedium
        this.setState({ gridNow: gridMedium })
    }

    isHard() {
        var gridHard = this.state.gridHard
        this.setState({ gridNow: gridHard })
    }
    isClear() {
        var gridClear = this.state.gridClear
        this.setState({ gridNow: gridClear })
    }
    // solveSudoku(grid, row, col) {
    //     if (col > 8) {
    //         row++;
    //         col = 0;
    //         if (row > 8 && col > 8) {
    //             console.log(grid);
    //             return;
    //         }
    //     }
    //     if (grid[row][col] === 0) { //
    //         index = Math.floor(Math.random() * supplyGrid.length);
    //         value = supplyGrid[index];
    //         if (isValid(row, col, value)) {
    //             grid[row][col] = value;
    //             col++;
    //             supplyGrid = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    //             solveSudoku(grid, row, col);
    //         } else {
    //             supplyGrid.splice(index, 1);
    //             console.log(supplyGrid);
    //             if (supplyGrid.length < 1) {
    //                 //backtrack();
    //                 console.log('Out of numbers');
    //                 return;
    //             }
    //             solveSudoku(grid, row, col);
    //         }
    //     } else { //row = 3, col = 5
    //         solveSudoku(grid, row, ++col);
    //     }
    //     return this;
    // }

    // isValid(row, col, value) {
    //     if ((validateColumn(row, col, value)) || (validateRow(row, col, value)) || (validateBox(row, col, value))) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }

    // validateBox(row, col, value) {
    //     row = Math.floor(row / 3) * 3;
    //     col = Math.floor(col / 3) * 3;
    //     var isFound = false;
    //     for (var i = 0; i < 3; i++) {
    //         for (var j = 0; j < 3; j++) {
    //             if (grid[row + i][col + j] == value) isFound = true;
    //         }
    //     }
    //     return isFound;
    // }

    // validateRow(row, col, value) {
    //     var isFound = false;
    //     for (var i = 0; i < 9; i++) {
    //         if (grid[row][i] === value) isFound = true;
    //     }
    //     return isFound;
    // }

    // validateColumn(row, col, value) {
    //     var isFound = false;
    //     for (var i = 0; i < 9; i++) {
    //         if (grid[i][col] === value) isFound = true;
    //     }
    //     return isFound;
    // }

    render() {

        return (

            <div className="container">
                <button type="button" class="btn btn-primary" onClick={this.isEasy}>Easy</button>
                &nbsp;<button type="button" class="btn btn-success" onClick={this.isMedium}>Medium</button>
                &nbsp;<button type="button" class="btn btn-warning" onClick={this.isHard}>Hard</button>
                &nbsp;<button type="button" class="btn btn-dark" onClick={this.isClear}>Clear Board</button>
                &nbsp;<button type="button" class="btn btn-danger">Hint <span class="glyphicon glyphicon-check"></span></button>

                <table id="table-vertical">

                    {
                        this.state.gridNow.map((row, i) =>
                            <React.Fragment>
                                <tr>
                                    <td><input id="cell" type="text" value={row[0]} /></td>
                                    <td><input id="cell" type="text" value={row[1]} /></td>
                                    <td><input id="cell" type="text" value={row[2]} /></td>
                                    <td><input id="cell" type="text" value={row[3]} /></td>
                                    <td><input id="cell" type="text" value={row[4]} /></td>
                                    <td><input id="cell" type="text" value={row[5]} /></td>
                                    <td><input id="cell" type="text" value={row[6]} /></td>
                                    <td><input id="cell" type="text" value={row[7]} /></td>
                                    <td><input id="cell" type="text" value={row[8]} /></td>
                                </tr>
                            </React.Fragment>
                        )
                    }

                </table>
                <button type="button" class="btn btn-outline-secondary">Reset</button>
            </div>

        )
    }
}

export default Sudoku
