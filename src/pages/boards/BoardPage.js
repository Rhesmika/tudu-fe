import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";

import appStyles from "../../App.module.css";
// import styles from "../../styles/BoardsPage.module.css";

import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Board } from "./Board";
import TaskCreateForm from "../tasks/TaskCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Task from "../tasks/Task";
import InfiniteScroll from "react-infinite-scroll-component";
// import { Spinner } from "react-bootstrap";
import { fetchMoreData } from "../../utils/utils";
// import { Form } from "react-bootstrap";


function BoardPage({ filter = "" }) {
    const {id} = useParams();
    const [board, setBoard] = useState({ results: [] });
    const history = useHistory()
    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;

    const [tasks, setTasks] = useState({ results: [] });
    // const [query, setQuery] = useState("");

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
    }, [id, history, filter, ]); 
    
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
              
              {/* <Row>
                <Col className="py-2 p-0 p-lg-2" lg={8}>
                  <i className={`fa-solid fa-magnifying-glass ${styles.SearchIcon}`} />
                  <Form
                    className={styles.SearchBar}
                    onSubmit={(event) => event.preventDefault()}
                    >
                    <Form.Control
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                      type="text"
                      className="mr-sm-2"
                      placeholder="Search tasks"
                    />
                  </Form>
                </Col>
              </Row> */}

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