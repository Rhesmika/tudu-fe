import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";

import appStyles from "../../App.module.css";
import styles from "../../styles/Boards.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Board } from "./Board";
import TaskCreateForm from "../tasks/TaskCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Task from "../tasks/Task";


function BoardPage() {
    const {id} = useParams();
    const [board, setBoard] = useState({ results: [] });
    const history = useHistory()
    const currentUser = useCurrentUser();
    const [tasks, setTasks] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
          try {
            const [{ data: board }, { data: tasks }] = await Promise.all([
              axiosReq.get(`/boards/${id}`),
              axiosReq.get(`/tasks/?board=${id}`),
            ]);
            if(board.is_owner){
              setBoard({ results: [board] });
              setTasks(tasks);
            } else {
              history.push("/boards/")
            }            
            console.log(board);
          } catch (err) {
            console.log(err);
          }
        };

        handleMount();
    }, [id, history]); 
    
    return (
        <Container className={appStyles.Container}>
            <Row>
                <Col className={styles.Title}>
                    <Board {...board.results[0]} setBoard={setBoard} boardPage />
                </Col>
            </Row>
            <Row>
              {currentUser ? (
                <TaskCreateForm
                  board={id}
                  setBoard={setBoard}
                  setTasks={setTasks}
                />
              ) : tasks.results.length ? (
                "tasks"
              ) : null}
              {tasks.results.length ? (
                tasks.results.map(task => (
                  <Task key={tasks.id} {...tasks} />
                ))
              ) : currentUser ? (
                <span>No tasks yet, why not create a task?!</span>
              ) : (
                <span>No tasks... yet</span>
              )}
            </Row>
        </Container>
    );
}

export default BoardPage;