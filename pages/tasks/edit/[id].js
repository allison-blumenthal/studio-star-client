/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
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
    <>
      <Head>
        <title>Edit Task</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-start items-center">
        <h1 className="text-4xl p-4 font-semibold mt-4 text-center text-gray-800 bevan">Edit Task</h1>
        <TaskForm taskObj={editTask} />
      </div>
    </>
  );
};

export default EditTask;
