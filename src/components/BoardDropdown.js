import React, { useEffect, useState } from "react";
import axios from "axios";

function BoardDropdown() {
    const [boards, setBoards] = useState({ results: [] });

    useEffect(function () {
        axios
            .get("/boards/")
            .then((response) => setBoards({ ...boards, results: response.data.results }))
            .then((error) => console.log(error))
        // eslint-disable-next-line
    }, []);

    return (
        <select>
            {boards.results
            .filter(board => board.is_owner)
            .map((board) => (
                <option key={`board_id-${board.id}`} value={board.id}>
                    {board.name}
                </option>
            ))}
        </select>
    );

}
export default BoardDropdown;
