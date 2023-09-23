import React, { useEffect, useState } from "react";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/BoardsPage.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useLocation } from "react-router";

import { Col, Form } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset.js";
import { fetchMoreData } from "../../utils/utils";
import TaskInfo from "../../components/TaskInfo";


function TasksPage({ message, filter = ""}) {
    const [tasks, setTasks] = useState({ results: [] });
    const [query, setQuery] = useState("");
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    // const [showEditForm, setShowEditForm] = useState(false);


    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const { data } = await axiosReq.get(`/tasks/?${filter}search=${query}`);
            setTasks(data);
            setHasLoaded(true);
          } catch (err) {
            console.log(err);
          }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchTasks();
        }, 500);
    
        return () => {
          clearTimeout(timer);
        };
      }, [filter, query, pathname]);
    


  return (
    <Container  className={appStyles.Container}>
      <Row>
        <h1
        className={styles.Header}
        >My Tasks</h1>
      </Row>
      <Row>
        <Col className="py-2 p-0 p-lg-2" lg={4}>
          <i className={`fa-solid fa-magnifying-glass ${styles.SearchIcon}`} />
          <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}>
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              placeholder="Find Task"
            />
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className={styles.Boards} lg={12}>
          {hasLoaded ? (
            <>
              {tasks.results.length ? (
                <InfiniteScroll
                  children={tasks.results
                    .filter(task => task.is_owner)
                    .map((task) => (

                    <TaskInfo
                    key={task.id} {...task}
                    setTasks={setTasks}
                    // handleEdit={(props) => setShowEditForm(false)}
                    />
                  ))}
                  dataLength={tasks.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!tasks.next}
                  next={() => fetchMoreData(tasks, setTasks)}
                />
              ) : (
                <Container className={appStyles.Content}>
                  <Asset  message={message} />
                </Container>
              )}
            </>

            
          ) : (
            <Container className={appStyles.Content}>
              <Asset spinner />
            </Container>
          )}
        </Col>
        <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        </Col>
      </Row>

    </Container>
  );
}

export default TasksPage;