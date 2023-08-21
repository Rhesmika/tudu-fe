import React, { useEffect, useState } from "react";

// import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { Board } from "./Board";
import Asset from "../../components/Asset.js";

import appStyles from "../../App.module.css";
// import styles from "../../styles/BoardsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.jpg";

function BoardsPage({ message, filter = "" }) {
  const [boards, setBoards] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const { data } = await axiosReq.get(`/boards`);
        setBoards(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchBoards();
  }, [filter, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <h1>My Boards</h1>
        {hasLoaded ? (
          <>
            {boards.results.length ? (
              boards.results
              .filter(board => board.is_owner)
              .map((board) => (
                <Board key={board.id} {...board} setBoards={setBoards} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
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
  );
}

export default BoardsPage;