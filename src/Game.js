import './Game.css';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import configurations from './configurations';
import BoardSide from './BoardSide';

const Game = (props) => {
    const gameData = useSelector(state => state.gameObject);

    useEffect(() => {
        
    }, []);

    const mapIndexToColumn = (index) => {
        let parentElement;
        if(index >= 0 && index <= 5){
            parentElement = document.getElementById("RightBottom");
        } else if(index >= 6 && index <= 11){
            parentElement = document.getElementById("LeftBottom");
        }else if(index >= 12 && index <= 17){
            parentElement = document.getElementById("LeftTop");
        }else if(index >= 18 && index <= 23){
            parentElement = document.getElementById("RightTop");
        }
        TakeFromColumn(parentElement);
        console.log(parentElement.id);
    }

    const TakeFromColumn = (element) => {
        if(element.id.includes('Top')) {
            for(let x = 0;x<element.childNodes.length;x++){
                if(element.childNodes[x] == undefined) return element.childNodes[x - 1] == undefined ? undefined : element.childNodes[x - 1];
            }
        } else if(element.id.includes('Bottom')){
            for(let x = element.childNodes.length - 1;x>=0;x--){
                if(element.childNodes[x] == undefined) return element.childNodes[x + 1] == undefined ? undefined : element.childNodes[x + 1];
            }
        }
    }

    return (
        <div>
            <div className="game-board">
                <div className="game-board-row">
                    <div></div>
                    <div className="game-board-column">
                        <div></div>
                        <BoardSide id="Left" click={mapIndexToColumn}></BoardSide>
                        <div></div>
                        <BoardSide id="Right" click={mapIndexToColumn}></BoardSide>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;