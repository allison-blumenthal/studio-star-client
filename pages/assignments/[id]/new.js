import React from 'react';
import Head from 'next/head';
import TaskForm from '../../../components/task/TaskForm';

export default function NewTask() {
  return (
    <>
      <Head>
        <title>New Task</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-start items-center">
        <h1 className="text-4xl font-semibold text-center text-gray-800 bevan bg-gray-100 rounded shadow-lg p-3 m-4">Add A Task</h1>
        <TaskForm />
      </div>
    </>
  );
}
