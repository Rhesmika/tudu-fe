import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";

import appStyles from "../../App.module.css";

import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Board } from "./Board";
import TaskCreateForm from "../tasks/TaskCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Task from "../tasks/Task";
import InfiniteScroll from "react-infinite-scroll-component";
// import { Spinner } from "react-bootstrap";
import { fetchMoreData } from "../../utils/utils";


function BoardPage() {
    const {id} = useParams();
    const [board, setBoard] = useState({ results: [] });
    const history = useHistory()
    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;

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
              console.log(tasks)
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
        <Container  className={appStyles.Container} >
            <Row>
                <Col>
                    <Board {...board.results[0]} setBoard={setBoard} boardPage />
                </Col>
            </Row>


            <Container>
              {currentUser ? (
                <Row>
                  <TaskCreateForm
                    profile_id={currentUser.profile_id}
                    profileImage={profile_image}
                    board={id}
                    setBoard={setBoard}
                    setTasks={setTasks}

                  />
                </Row>
              ) : tasks.results.length ? (
                "Tasks"
              ) : null}
              {tasks.results.length ? (
                <InfiniteScroll
                children={tasks.results.map((task) => (
                  <Task
                  key={task.id}
                  {...task}
                  board={board}
                  setTasks={setTasks}
                  />
                ))}
                dataLength={tasks.results.length}
                hasMore={!!tasks.next}
                next={() => fetchMoreData(tasks, setTasks)}
                />
              ) : currentUser ? (
                <span>No tasks yet, why not create a task?!</span>
              ) : (
                <span>No tasks... yet</span>
              )}
            </Container>
        </Container>
    );
}

export default BoardPage;