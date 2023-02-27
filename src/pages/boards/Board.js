import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from "../../styles/Boards.module.css";

export const Board = (props) => {
    const {
        id,
        created_at,
        name,
        owner,
        is_owner,
        tasks_count,
    } = props;

    const currentUser = useCurrentUser();

  return (
    <Card>
      <Card.Body>
        <Card.Title>Title</Card.Title>
        <Card.Text className={styles.TaskNames}>
            <p>tasks</p>
        </Card.Text>

        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  )
}
