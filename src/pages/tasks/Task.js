import React from "react";
import { Media } from "react-bootstrap";
import styles from "../../styles/Task.module.css";

const Task = (props) => {
  const { owner, title, duedate } = props;

  return (
    <div>
      <hr />
      <Media>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <p>
            {title}
            {duedate}
          </p>
        </Media.Body>
      </Media>
    </div>
  );
};

export default Task;