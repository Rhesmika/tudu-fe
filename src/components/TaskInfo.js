import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

import styles from "../styles/Task.module.css"
import btnStyles from "../styles/Button.module.css";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Uploaded from "../assets/uploaded.png";



const TaskInfo = (props) => {
  const { title, description, duedate, priority, status, attachment,  } = props;
  const [message, setMessage] = useState();

  const attachmentCheck = (attachment) => {
    if ( attachment !== null) {
      setMessage(
        <Link >
        <p>{attachment}</p>
        </Link>
      );
    }
    else {
      setMessage('Attachment not currently available');
    }
  };


  const StatusNums = ["To Do", "In Progress", "Complete"];
  const PriorityNums = ["Low", "Medium", "High"];

  return (
    <>

    <Card className={styles.Task}>

      <Row>
      <Col xs={6}>
          <Card.Body>
            <Row className={styles.Title}><h5>{title}</h5></Row>
            <Row className={styles.Details}>{description}</Row>
            <div>
              <button
              onClick={() => attachmentCheck(attachment)}
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Light}`}
              >
              See Attachment Link
              <Image src={Uploaded} className={styles.Paperclip}/>
              </button>
              <p>{message}</p>
            </div>
          </Card.Body>
      </Col>

      <Col xs={6}>
        <Card.Body>


          <Col className={styles.Details}><b>Due: </b>{ duedate}</Col>
          <Col className={styles.Details}><b>Priority: </b> {PriorityNums[priority]}</Col>
          <Col className={styles.Details}><b>Status: </b>{StatusNums[status]}</Col>
        </Card.Body>
      </Col>
      </Row>

    </Card>
    </>
  );
};

export default TaskInfo;