/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TaskForm from '../../../components/task/TaskForm';
import { getSingleTask } from '../../../utils/data/taskData';

const EditTask = () => {
  const [editTask, setEditTask] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getTaskDetails = () => {
    getSingleTask(id).then(setEditTask);
  };

  useEffect(() => {
    getTaskDetails();
  }, [id]);

  return (
    <div>
      <br />
      <h1>Edit Task</h1>
      <TaskForm taskObj={editTask} />
    </div>
  );
};

export default EditTask;
