/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TaskForm from '../../../components/task/TaskForm';
import { getSingleTask } from '../../../utils/data/taskData';

const EditTask = () => {
  const [editTask, setEditProduct] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getTaskDetails = async () => {
    try {
      const details = await getSingleTask(id);
      setEditProduct(details);
    } catch (error) {
      console.error('Error fetching product details: ', error);
    }
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
