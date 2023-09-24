import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import { Link } from 'react-router-dom';

import { Board } from "./Board";
import Asset from "../../components/Asset.js";

import appStyles from "../../App.module.css";
import styles from "../../styles/BoardsPage.module.css";

import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useRedirect } from "../../hooks/useRedirect";

import { useCurrentUser } from "../../contexts/CurrentUserContext";


function BoardsPage({ message, filter = "" }) {
  useRedirect("loggedOut");
  const [boards, setBoards] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();


  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const { data } = await axiosReq.get(`/boards/?${filter}search=${query}`);
        setBoards(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchBoards();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <Container  className={appStyles.Container}>
      <Row className={appStyles.Row}>
        <h1
        className={styles.Header}
        >My Boards</h1>
      </Row>
      <Row className={appStyles.Row}>
        <div>
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
        </div>
        <div
        class="grid" className={styles.AddBoard}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        >
        <Link to={`/boards/create`}>
          <i className="fa-solid fa-plus" ></i>
        </Link>s
          {isHovering && (
            <Link to={`/boards/create`}>
              <h5 className={styles.AddBoardText} >Add New Board</h5>
            </Link>
        )}
        </div>
      </Row>


      <Row>
        <Col lg={12}>
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

      <div class="grid">
        <Link to={`/boards/create`}>
          <i className="fa-solid fa-plus" ></i>
        </Link>
        </div>
    </Container>
  );
}

export default BoardsPage;