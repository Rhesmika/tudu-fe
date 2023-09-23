import React, { useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import styles from "../styles/Task.module.css"
import btnStyles from "../styles/Button.module.css";

import { MoreDropdown } from '../components/MoreDropdown';

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Uploaded from "../assets/uploaded.png";
import { axiosRes } from '../api/axiosDefaults';
import TaskEditForm from "../pages/tasks/TaskEditForm";


const TaskInfo = (props) => {
  const { id, title, description, duedate, priority, status, attachment, setTasks } = props;

  const [message, setMessage] = useState();

  const attachmentCheck = (attachment) => {
    console.log(attachment)
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
              See attachment
              <Image src={Uploaded} className={styles.Paperclip}/>
              </button>
              <p>{message}</p>
            </div>
          </Card.Body>
      </Col>

      <Col xs={6}>
        <Card.Body>


          <Col className={styles.Details}><b>Due: </b>{ duedate}</Col>
          <Col className={styles.Details}><b>Priority: </b> {PriorityNums[status]}</Col>
          <Col className={styles.Details}><b>Status: </b>{StatusNums[priority]}</Col>
        </Card.Body>
      </Col>
      </Row>

    </Card>
    </>
  );
};

export default TaskInfo;