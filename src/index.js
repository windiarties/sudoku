import React from 'react'
import ReactDOM from 'react-dom'
import Sudoku from './Sudoku'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Sudoku />
    </BrowserRouter>,
    document.getElementById("Sudoku")
)
