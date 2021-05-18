import './BoardSide.css';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AddBoardColumn } from './Actions/action';
import CoinLocation from './CoinLocation';

function BoardSide(props) {
    
    const handleColumnClick = (event) => {
        const clickEvent = props.click;
        clickEvent(event.target);
    }

    const rowsTop= [];

    for (var i = 0; i < 6; i++) {
        const locations = [];
        for (let x = 0; x < 9; x++) {
            locations.push(<CoinLocation></CoinLocation>)
        }
        {//TODO: Add numeric id to div}
        rowsTop.push(<div className="game-single-column" onClick={handleColumnClick}> 
            {locations}
        </div>);
    }

    const rowsBottom= [];

    for (var i = 0; i < 6; i++) {
        const locations = [];
        for (let x = 0; x < 9; x++) {
            locations.push(<CoinLocation></CoinLocation>)
        }
        {//TODO: Add numeric id to div}
        rowsBottom.push(<div className="game-single-column" onClick={handleColumnClick}>
            {locations}
        </div>);
    }


    return (
        <div className="game-board-side">
            <div id={props.id + 'Top'} className="game-side-columns">
                {rowsTop}
            </div>
            <div id={props.id + 'Bottom'} className="game-side-columns">
               {rowsBottom}
            </div>
        </div>
    );
}

export default BoardSide;