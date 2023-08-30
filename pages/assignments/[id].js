import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { deleteAssignment, getSingleAssignment } from '../../utils/data/assignmentData';
import { getTasksByAssignmentId } from '../../utils/data/taskData';
import TaskCard from '../../components/task/TaskCard';
import editIcon from '../../src/assets/images/edit-icon.png';
import deleteIcon from '../../src/assets/images/delete-icon.png';
import getSingleUser from '../../utils/data/userData';
import { useAuth } from '../../utils/context/authContext';
import taskIcon from '../../src/assets/images/checked-checkbox-icon.png';

export default function AssignmentDetails() {
  const [assignment, setAssignment] = useState({});
  const [tasks, setTasks] = useState([]);
  const [student, setStudent] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const { id } = router.query;

  const getCurrentAssignment = () => {
    getSingleAssignment(id).then((data) => setAssignment(data));
  };

  const getAssignmentTasks = () => {
    getTasksByAssignmentId(id).then((data) => setTasks(data));
  };

  const getCurrentStudent = () => {
    getSingleUser(assignment.student_id.id).then((data) => setStudent(data));
  };

  useEffect(() => {
    getCurrentAssignment();
    getAssignmentTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const deleteThisAssignment = () => {
    getCurrentStudent();
    if (window.confirm('Delete this assignment?')) {
      deleteAssignment(assignment.id).then(() => router.push(`/students/${student.id}`));
    }
  };

  const handleEditClick = () => {
    router.push(`/assignments/edit/${assignment.id}`);
  };

  const handleTaskClick = () => {
    router.push('/tasks/new');
  };

  const formattedDate = moment(assignment.date).format('MM/DD/YYYY');

  return (
    <div>
      <h1>{formattedDate} Assignment</h1>
      {user.is_teacher === true ? (
        <>
          <Button onClick={handleEditClick}>
            <Image src={editIcon} alt="edit icon" />
          </Button>
          <Button onClick={deleteThisAssignment}>
            <Image src={deleteIcon} alt="delete icon" />
          </Button>
          <Button onClick={handleTaskClick}>
            <Image src={taskIcon} alt="task icon" />
          </Button>
        </>
      ) : ('')}
      {tasks.map((task) => (
        <section key={`task--${task.id}`} className="task">
          <TaskCard taskObj={task} onUpdate={getAssignmentTasks} />
          <br />
        </section>
      ))}

    </div>
  );
}
