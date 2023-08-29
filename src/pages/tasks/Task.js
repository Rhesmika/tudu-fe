import React, { useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import styles from "../../styles/Task.module.css";
import btnStyles from "../../styles/Button.module.css";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Upload from "../../assets/upload.png";
import Uploaded from "../../assets/uploaded.png";


const Task = (props) => {
  const { title, description, duedate, priority, status, attachment } = props;

  // const [attachment] = useState();
  const [message, setMessage] = useState();

  const attachmentCheck = (attachment) => {
    console.log(attachment)
    if ( attachment !== null) {
      setMessage(
        <Link>
        <p>{attachment}</p>
        </Link>
      );
    }
    else {
      setMessage('No attachment');
    }
  };


  return (
    <Card className={styles.Task}>
      <Row>
      <Col xs={6}>
          <Card.Body>
            <Row className={styles.Title}>{title}</Row>
            <Row className={styles.Details}>{description}</Row>
            <Row className={styles.Date}>{duedate}</Row>
          </Card.Body>
      </Col>


      <Col xs={6}>
        <Card.Body>


            <div>
              <button
              onClick={() => attachmentCheck(attachment)}
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Light}`}
              >
              See attachment
              <Image src={Uploaded} className={styles.Paperclip}/>
              </button>
              <p>{message}</p>
            </div>


          {/* <Col className={styles.Details}>{attachment}</Col> */}


          <Col className={styles.Details}>{priority}</Col>
          <Col className={styles.Details}>{status}</Col>
        </Card.Body>
      </Col>
      </Row>
    </Card>
  );
};

export default Task;