import React, { useEffect, useState } from "react";

// import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link } from 'react-router-dom';


import { Board } from "./Board";
import Asset from "../../components/Asset.js";

import appStyles from "../../App.module.css";
import styles from "../../styles/BoardsPage.module.css";

import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

// import NoResults from "../../assets/no-results.jpg";
import { Form } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";


function BoardsPage({ message, filter = "" }) {
  const [boards, setBoards] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");


  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const { data } = await axiosReq.get(`/boards/?${filter}search=${query}`);
        setBoards(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchBoards();
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
        >My Boards</h1>
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
              placeholder="Find Board"
            />
          </Form>
        </Col>
        <Col className="py-2 p-0 p-lg-2" lg={2}>
        <Link to={`/boards/create`}>
          <i className="fa-solid fa-plus"></i>
        </Link>
        </Col>
      </Row>


      <Row>
        <Col className={styles.Boards} lg={12}>
          {hasLoaded ? (
            <>
              {boards.results.length ? (
                <InfiniteScroll
                  children={boards.results
                    .filter(board => board.is_owner)
                    .map((board) => (
                    <Board
                    key={board.id} {...board}
                    setBoards={setBoards}
                    />
                  ))}
                  dataLength={boards.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!boards.next}
                  next={() => fetchMoreData(boards, setBoards)}
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

export default BoardsPage;