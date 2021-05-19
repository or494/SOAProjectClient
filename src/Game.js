import './Game.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BoardSide from './BoardSide';

const Game = (props) => {
    const gameData = useSelector(state => state.gameObject);
    const socket = useSelector(state => state.socketIO);
    let number = -1;
    const [isPreGame, setIsPreGame] = useState(true);
    const [isThrowDices, setIsThrowDices] = useState(false);
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [rivalDice, setRivalDice] = useState();
    const [dice, setDice] = useState();
    const [dices, setDices] = useState([]);
    const [chosenColumnIndexSrc, setChosenColumnIndexSrc] = useState(undefined);


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
        return element;
    }

    useEffect(() => {
        InitializeSocketGameEvents();
        InitializeBoard();

    }, []);

    const throwOneDice = () => {
        socket.emit('throwOneDice');
        setIsPreGame(false);
    }

    const throwDices = () => {
        socket.emit('throwDices');
    }

    const InitializeSocketGameEvents = () => {
        socket.on('oneDiceRivalSucceed', dice => setRivalDice(dice));
        socket.on('oneDiceSucceed', dice => setDice(dice));
        socket.on('throwOneDiceAgain', () => {
            setIsPreGame(true);
            setRivalDice(false);
            setDice(false);
        })
        socket.on('start', whoStarts => {
            console.log('start')
            setIsPreGame(false);
            setRivalDice(false);
            setDice(false);
            if(gameData.color == whoStarts){
                setIsMyTurn(true);
                setIsThrowDices(true);
            } else{
                setIsMyTurn(false);
                setIsThrowDices(false);
            }
            setDices([]);
        });
        socket.on('throwTwoDicesSucceed', dices => {
            setDices(dices)
            setIsThrowDices(false);
        });
        socket.on('moveCoins', (result) => {
            console.log(result);
        });
        socket.on('winner', (data) => {
            console.log(data);
        })
    }

    const InitializeBoard = () => {
        gameData.game.ds.board.forEach((column, index) => {
            column.forEach(coin => {
                const element = mapIndexToColumn(index);
                if(coin.color == false) element.innerHTML += `<div class="black-coin coin"></div>`;
                else element.innerHTML += `<div class="white-coin coin"></div>`;
            })
        });
    }

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
        return number;
    }

    const handleSendMovement = (elementId) => {
        console.log(chosenColumnIndexSrc);
        console.log(mapperColumnToIndex(elementId));
        if(chosenColumnIndexSrc === undefined){
            setChosenColumnIndexSrc(mapperColumnToIndex(elementId));
        } else {
            if(chosenColumnIndexSrc != mapperColumnToIndex(elementId)) 
                socket.emit('move', {src: chosenColumnIndexSrc, dst: mapperColumnToIndex(elementId)});
            setChosenColumnIndexSrc(undefined);
        }
    }

    const moveCoin = (src, dst) => {
        const removeFromElement = mapIndexToColumn(src);
        const coin = removeFromElement.removeChild(removeFromElement.childNodes[removeFromElement.childNodes.length - 1]);
        const addToElement = mapIndexToColumn(dst);
        addToElement.appendChild(coin);
    }

    const clearCoins = () => {
        for (let index = 0; index < 5; index++) {
            document.getElementById("RightBottom" + index).innerHTML = '';
            document.getElementById("RightTop" + index).innerHTML = '';
            document.getElementById("LeftBottom" + index).innerHTML = '';
            document.getElementById("LeftTop" + index).innerHTML = '';
        }
    }

    return (
        <div className="game-main-grid">
            <div className="game-board">
                <div className="game-board-row">
                    <div></div>
                    <div className="game-board-column">
                        <div></div>
                        <BoardSide id="Left" click={handleSendMovement}></BoardSide>
                        <div></div>
                        <BoardSide id="Right" click={handleSendMovement}></BoardSide>
                    </div>
                </div>
            </div>
            <div>
                <div>Your color: {gameData.color ? 'white' : 'black'}</div>
                {isPreGame ? <button onClick={throwOneDice}>Throw one dice</button> : null}
                {isPreGame == false &&  isThrowDices ? <button onClick={throwDices}>Throw dices</button> : null}
                {isPreGame == false ? (isMyTurn ?  <div>its your turn</div>: <div>its rival's turn</div>) : null}
                {rivalDice ? <div>rival dice {rivalDice}</div> : null}
                {dice ? <div>yout dice: {dice}</div> : null}
                {dices.length > 0 ? <div>dices: {dices[0]} {dices[1]}</div>: null}
            </div>
        </div>
    );
}
// TODO: add whos turn, 

export default Game;