import React, { useEffect, useState } from "react";
import axios from "axios";

function BoardDropdown(){
    const [boards, setBoards] = useState({results: []});

    useEffect(function(){
        axios
            .get("https://tudu.herokuapp.com/boards")
            .then((response) => setBoards(response.data))
            .then((error) => console.log(error))
    });

    return (
        <select>
            {boards.results.map((board) => (
                <option value={board.id}>
                    {board.name}
                </option>
            ))}
        </select>
    );
    
}
export default BoardDropdown;
