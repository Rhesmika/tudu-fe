import React, { useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import styles from "../../styles/Task.module.css";
import btnStyles from "../../styles/Button.module.css";
import { MoreDropdown } from '../../components/MoreDropdown';

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Uploaded from "../../assets/uploaded.png";
import { axiosRes } from '../../api/axiosDefaults';

const Task = (props) => {
  const { id, title, description, duedate, priority, status, attachment } = props;

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


  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tasks/${id}/`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  // const StatusNums = ["To Do", "In Progress", "Complete"];
  // const PriorityNums = ["Low", "Medium", "High"];


  return (
    <Card className={styles.Task}>
      <Row>
      <Col xs={6}>
        <div>
          <MoreDropdown
            // handleEdit={handleEdit}
            handleDelete={handleDelete}
            />
        </div>
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

          <Col className={styles.Details}>{priority}</Col>
          <Col className={styles.Details}>{status}</Col>
        </Card.Body>
      </Col>
      </Row>
    </Card>
  );
};

export default Task;