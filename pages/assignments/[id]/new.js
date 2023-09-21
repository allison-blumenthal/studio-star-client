import React from 'react';
import Head from 'next/head';
import TaskForm from '../../../components/task/TaskForm';

export default function NewTask() {
  return (
    <>
      <Head>
        <title>New Task</title>
      </Head>
      <div className="min-h-screen p-4 flex flex-col justify-start items-center">
        <h1 className="text-4xl p-4 font-semibold text-center text-gray-800 bevan">Add A Task</h1>
        <TaskForm />
      </div>
    </>
  );
}
