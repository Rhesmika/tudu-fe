import React, { useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import styles from "../../styles/Task.module.css";
import btnStyles from "../../styles/Button.module.css";
import { MoreDropdown } from '../../components/MoreDropdown';

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Uploaded from "../../assets/uploaded.png";
import { axiosRes } from '../../api/axiosDefaults';
import TaskEditForm from "../tasks/TaskEditForm";


const Task = (props) => {
  const { id, title, description, duedate, priority, status, attachment, setTasks } = props;
  const [showEditForm, setShowEditForm] = useState(false);

  const [message, setMessage] = useState();

  const attachmentCheck = (attachment) => {
    if ( attachment !== null) {
      setMessage(
        <Link >
        {attachment}
        </Link>
      );
    }
    else {
      setMessage('No Attchament');
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
  const PriorityNums = ["Low", "Medium", "High"];
  const StatusNums = ["To Do", "In Progress", "Complete"];

  return (
    <>

    <Card className={styles.Task}>
    {!showEditForm && (
          <MoreDropdown
            handleEdit={(props) => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
    )}
    {showEditForm ? (
      <TaskEditForm
      id={id}
      title={title}
      description={description}
      duedate={duedate}
      priority={priority}
      status={status}
      attachment={attachment}
      setShowEditForm={setShowEditForm}
      setTasks={setTasks}
      board={props.board}
      />
    ) : (
      <Row>
      <Col xs={6}>
          <Card.Body>
            <Row className={styles.Title}><h4>{title}</h4></Row>
            <Row className={styles.Details}>{description}</Row>
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
      )}
            <div>
              <button
              onClick={() => attachmentCheck(attachment)}
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Light} ${styles.Attachment}`}
              >
              See Attachment Link
              <Image src={Uploaded} className={styles.Paperclip}/>
              </button>
              <p>{message}</p>
            </div>
    </Card>
    </>
  );
};

export default Task;