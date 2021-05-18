import './Game.css';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import configurations from './configurations';
import BoardSide from './BoardSide';

const Game = (props) => {
    const gameData = useSelector(state => state.gameObject);
    let number = -1;

    const mapIndexToColumn = (index) => {
        let element;
        if(index >= 0 && index <= 5){
            element = document.getElementById("RightBottom" + (5 - index));
        } else if(index >= 6 && index <= 11){
            element = document.getElementById("LeftBottom" + (11 - index));
        }else if(index >= 12 && index <= 17){
            element = document.getElementById("LeftTop" + (index - 12));
        }else if(index >= 18 && index <= 23){
            element = document.getElementById("RightTop" + (index - 18));
        }
        console.log(element);
        return element;
    }

    useEffect(() => {
        console.log(gameData);
        gameData.game.ds.board.forEach((column, index) => {
            column.forEach(coin => {
                const element = mapIndexToColumn(index);
                if(coin.color == false) element.innerHTML += `<div class="black-coin coin"></div>`;
                else element.innerHTML += `<div class="white-coin coin"></div>`;
            })
        });
    }, []);

    const mapperColumnToIndex = (elementId) => {
        if(elementId.includes('LeftTop')){
            number = parseInt(elementId[elementId.length - 1]) + 12;
        }
        else if(elementId.includes('LeftBottom')){
            number = 11 - parseInt(elementId[elementId.length - 1]);
        }
        else if(elementId.includes('RightBottom')){
            number = 5 - parseInt(elementId[elementId.length - 1]);
        }
        else if(elementId.includes('RightTop')){
            number = parseInt(elementId[elementId.length - 1]) + 18;
        }
        console.log(number);
    }



    return (
        <div>
            <div className="game-board">
                <div className="game-board-row">
                    <div></div>
                    <div className="game-board-column">
                        <div></div>
                        <BoardSide id="Left" click={mapperColumnToIndex}></BoardSide>
                        <div></div>
                        <BoardSide id="Right" click={mapperColumnToIndex}></BoardSide>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;

// const mapIndexToColumn = (index) => {
//     let parentElement;
//     if(index >= 0 && index <= 5){
//         parentElement = document.getElementById("RightBottom");
//     } else if(index >= 6 && index <= 11){
//         parentElement = document.getElementById("LeftBottom");
//     }else if(index >= 12 && index <= 17){
//         parentElement = document.getElementById("LeftTop");
//     }else if(index >= 18 && index <= 23){
//         parentElement = document.getElementById("RightTop");
//     }
//     TakeFromColumn(parentElement);
//     console.log(parentElement.id);
// }

// const TakeFromColumn = (element) => {
//     if(element.id.includes('Top')) {
//         for(let x = 0;x<element.childNodes.length;x++){
//             if(element.childNodes[x] == undefined) return element.childNodes[x - 1] == undefined ? undefined : element.childNodes[x - 1];
//         }
//     } else if(element.id.includes('Bottom')){
//         for(let x = element.childNodes.length - 1;x>=0;x--){
//             if(element.childNodes[x] == undefined) return element.childNodes[x + 1] == undefined ? undefined : element.childNodes[x + 1];
//         }
//     }
// }
