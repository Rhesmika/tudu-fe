import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/Boards.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Board } from "./Board";

function BoardPage() {
    const {id} = useParams();
    const [board, setBoard] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
          try {
            const [{ data: board }] = await Promise.all([
              axiosReq.get(`/boards/${id}`),
            ]);
            setBoard({ results: [board] });
            console.log(board);
          } catch (err) {
            console.log(err);
          }
        };

        handleMount();
    }, [id]); 
    
    return (
        <Container className={appStyles.Container}>
            <Row>
                <Col className={styles.Title}>
                    <Board {...board.results[0]} setBoard={setBoard} />
                </Col>
            </Row>
            {/* <Row>
                <Container className={styles.TaskNames}>
                    <h3>Tasks</h3>
                </Container>
            </Row> */}
        </Container>
    );
}

export default BoardPage;