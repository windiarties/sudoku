import React from 'react'
import { throwStatement } from '@babel/types';

class Sudoku extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gridEasy: [
                ['', '9', '', '', '4', '2', '1', '3', '6'],
                ['', '', '', '9', '6', '', '4', '8', '5'],
                ['', '', '', '5', '8', '1', '', '', ''],
                ['', '', '4', '', '', '', '', '', ''],
                ['5', '1', '7', '2', '', '', '9', '', ''],
                ['6', '', '2', '', '', '', '3', '7', ''],
                ['1', '', '', '8', '', '4', '', '2', ''],
                ['7', '', '6', '', '', '', '8', '1', ''],
                ['3', '', '', '', '9', '', '', '', ''],
            ],
            gridNow: [[], [], [], [], [], [], [], [], []],
            grid: [[], [], [], [], [], [], [], [], []],
            gridMedium: [
                ['1', '', '3', '', '', '', '', '8', '4'],
                ['', '', '6', '', '4', '8', '', '', ''],
                ['', '4', '', '', '', '', '', '', ''],
                ['2', '', '', '', '9', '6', '1', '', ''],
                ['', '9', '', '8', '', '1', '', '4', ''],
                ['', '', '4', '3', '2', '', '', '', '8'],
                ['', '', '', '', '', '', '', '7', ''],
                ['', '', '', '1', '5', '', '4', '', ''],
                ['', '6', '', '', '', '', '2', '', '3']
            ],
            gridHard: [
                ['5', '1', '', '', '', '4', '', '7', ''],
                ['', '', '4', '2', '', '', '', '3', ''],
                ['', '', '', '6', '', '', '', '', '9'],
                ['3', '', '', '', '', '', '', '', ''],
                ['', '5', '', '', '2', '', '7', '', ''],
                ['9', '', '', '3', '7', '', '4', '', ''],
                ['', '', '1', '7', '4', '', '3', '', ''],
                ['', '', '', '', '', '', '', '5', '7'],
                ['', '', '', '', '', '6', '', '', '']
            ],
            gridClear: [
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],

            ],
            isReset: false,
            inputGrid: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
        this.handleChange = this.handleChange.bind(this)
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

    componentDidMount() {
        this.isEasy()
        this.isHard()
        this.isMedium()
    }


    handleChange(e, index) {
        // for (let r = 0; r < 9; r++) {
        //     for (let c = 0; c < 9; c++) {
        //         var tmp = this.state.gridNow;
        //         tmp[r][c] = e.target.value
        //         this.setState({
        //             gridNow: tmp
        //         })
        //     }
        // }
        var tmp = this.state.gridNow;
        tmp[index] = e.target.value;

        this.setState({
            gridNow: tmp
        })
    }

    async resetGrid() {

        this.setState({
            isReset: true
        })

        this.isEasy()
    }

    isValid() {
        // if ((this.validateColumn()) || (this.validateRow()) || (this.validateBox())) {
        //     return false;
        // } else {
        //     return true;
        // }
    }

    solveSudoku() {
        var inputGrid = this.state.inputGrid;
        var gridNow = this.state.gridNow;

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (gridNow[r][c] === 0) {
                    if (this.isValid()) {
                        var index = Math.floor(Math.random() * inputGrid.length);
                        var value = inputGrid[index];
                        gridNow[r][c] = value;
                        this.state.col++;
                    } else {
                        inputGrid.splice(index, 1);
                        console.log(inputGrid);
                        if (inputGrid.length < 1) {
                            console.log('Wrong Number');
                            return;
                        }
                        this.solveSudoku();
                    }
                } else {
                    this.solveSudoku();
                    console.log("Error")
                }
                return this;
            }
        }
    }

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
                                    <td><input type="text" value={row[0]} onChange={(e) => this.handleChange(e, [i])} /></td>
                                    <td><input type="text" value={row[1]} onChange={(e) => this.handleChange(e, [i])} /></td>
                                    <td><input type="text" value={row[2]} onChange={(e) => this.handleChange(e, [i])} /></td>
                                    <td><input type="text" value={row[3]} onChange={(e) => this.handleChange(e, [i])} /></td>
                                    <td><input type="text" value={row[4]} onChange={(e) => this.handleChange(e, [i])} /></td>
                                    <td><input type="text" value={row[5]} onChange={(e) => this.handleChange(e, [i])} /></td>
                                    <td><input type="text" value={row[6]} onChange={(e) => this.handleChange(e, [i])} /></td>
                                    <td><input type="text" value={row[7]} onChange={(e) => this.handleChange(e, [i])} /></td>
                                    <td><input type="text" value={row[8]} onChange={(e) => this.handleChange(e, [i])} /></td>
                                </tr>
                            </React.Fragment>
                        )
                    }

                </table>
                <button type="button" class="btn btn-outline-secondary" onClick={this.isReset}>Reset</button>
            </div>

        )
    }
}

export default Sudoku
