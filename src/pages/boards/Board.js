import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from "../../styles/Boards.module.css";

export const Board = (props) => {
    const {
        id,
        name,
        is_owner,
        tasks_count,
        boardPage,
    } = props;

    const currentUser = useCurrentUser();

  return (
    <Card>
      <Card.Body>
          <Link to={`/boards/${id}`} className={styles.Title}>
            {name && <Card.Title>{name}</Card.Title> }
          </Link>
        <div  className={styles.TaskNames}>
          <Link to={`/boards/${id}`}>
            <i class="fa-solid fa-square-check"></i>
          </Link>
          {tasks_count} tasks
        </div>
        <div  className={styles.Edit}>
          {is_owner && boardPage && "..."}
        </div>
      </Card.Body> 
    </Card>
  )
}
