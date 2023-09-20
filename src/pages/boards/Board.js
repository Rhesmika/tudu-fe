import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from "../../styles/Boards.module.css";
import { MoreDropdown } from '../../components/MoreDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosRes } from '../../api/axiosDefaults';

export const Board = (props) => {
    const {
        id,
        name,
        tasks_count,
    } = props;

    // const currentUser = useCurrentUser();
    const history = useHistory();


    const handleEdit = () => {
      history.push(`/boards/${id}/edit`);
    };
  
    const handleDelete = async () => {
      try {
        await axiosRes.delete(`/boards/${id}/`);
        history.push(`/boards`)
        window.location.reload()
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <Card className={styles.Card}>
      <Card.Body>
        <div
        className={styles.More}>
          <MoreDropdown
            handleEdit={handleEdit}
            handleDelete={handleDelete}

            />
        </div>
        <div>
          <Link to={`/boards/${id}`} className={styles.Title}>
            {name && <Card.Title><h3>{name}</h3></Card.Title>
            }
          </Link>
        </div>

        <Link to={`/boards/${id}`}>
        <div  className={styles.TaskCount}>
            <i className="fa-solid fa-square-check"></i>
          {tasks_count} tasks
        </div>
        </Link>
      </Card.Body> 
    </Card>
  )
}
