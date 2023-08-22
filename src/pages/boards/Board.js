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
        history.goBack();
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <Card>
      <Card.Body>
        <div>
          <Link to={`/boards/${id}`} className={styles.Title}>
            {name && <Card.Title>{name}</Card.Title>
            }
          </Link>
        </div>
        <div>
          <MoreDropdown
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            />
        </div>

        <div  className={styles.TaskNames}>
          <Link to={`/boards/${id}`}>
            <i class="fa-solid fa-square-check"></i>
          </Link>
          {tasks_count} tasks
        </div>
        {/* <div  className={styles.Edit}>
          {boardPage}
        </div> */}
      </Card.Body> 
    </Card>
  )
}
