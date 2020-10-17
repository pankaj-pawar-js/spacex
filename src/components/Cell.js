import React, { useState } from 'react';


const Cell = ({ text, selectCell, type, isSelected }) => {

    const handleClick = () => {
        selectCell(type, text);
    }
    return (
        <button className={isSelected ? "cell cell-active" : "cell"} onClick={handleClick}>
            {text}
        </button>
    );
}

export default Cell;