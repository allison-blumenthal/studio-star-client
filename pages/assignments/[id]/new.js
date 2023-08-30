import React from 'react';
import Head from 'next/head';
import TaskForm from '../../../components/task/TaskForm';

export default function NewTask() {
  return (
    <>
      <Head>
        <title>New Task</title>
      </Head>
      <div>
        <h2>Add a Task</h2>
        <TaskForm />
      </div>
    </>
  );
}
