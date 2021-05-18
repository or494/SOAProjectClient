import './Game.css';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import configurations from './configurations';
import BoardSide from './BoardSide';

const Game = (props) => {
    const gameData = useSelector(state => state.gameObject);

    useEffect(() => {
    }, []);

    return (
        <div>
            <div className="game-board">
                <BoardSide></BoardSide>
                <BoardSide></BoardSide>
            </div>
        </div>
    );
}

export default Game;