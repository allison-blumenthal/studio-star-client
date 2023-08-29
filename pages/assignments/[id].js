import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { getSingleAssignment } from '../../utils/data/assignmentData';
import { getTasksByAssignmentId } from '../../utils/data/taskData';
import TaskCard from '../../components/task/TaskCard';

export default function AssignmentDetails() {
  const [assignment, setAssignment] = useState({});
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  const { id } = router.query;

  const getCurrentAssignment = () => {
    getSingleAssignment(id).then((data) => setAssignment(data));
  };

  const getAssignmentTasks = () => {
    getTasksByAssignmentId(id).then((data) => setTasks(data));
  };

  useEffect(() => {
    getCurrentAssignment();
    getAssignmentTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const formattedDate = moment(assignment.date).format('MM/DD/YYYY');

  return (
    <div>
      <h1>{formattedDate} Assignment</h1>
      {tasks.map((task) => (
        <section key={`task--${task.id}`} className="task">
          <TaskCard taskObj={task} onUpdate={getAssignmentTasks} />
          <br />
        </section>
      ))}

    </div>
  );
}
