import './BoardColumn.css';
import React from 'react';

function BoardColumns(props) {
    const handleColumnClick = (event) => {
        props.click(event.target.id); // fix later
    }

    const rows = [];

    for (let i = 0; i < 6; i++) {
        if(props.id.includes('Bottom'))
            rows.push(<div className="game-bottom-columns" id={props.id + i} onClick={handleColumnClick}></div>);
        else
            rows.push(<div id={props.id + i} onClick={handleColumnClick}></div>);
    }

    return (
        <>
            {rows}
        </>
    );
    
}

export default BoardColumns;