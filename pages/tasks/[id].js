import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import { deleteTask, getSingleTask } from '../../utils/data/taskData';
import { useAuth } from '../../utils/context/authContext';
import editIcon from '../../src/assets/images/edit-icon.png';
import deleteIcon from '../../src/assets/images/delete-icon.png';
import stickerIcon from '../../src/assets/images/star-icon.png';
import { getAssignmentByTaskId } from '../../utils/data/assignmentData';
import { getTaskStickersByTaskId } from '../../utils/data/taskStickerData';
import TaskStickerCard from '../../components/sticker/TaskStickerCard';
import checkboxIcon from '../../src/assets/images/check-icon.png';
import uncheckedBoxIcon from '../../src/assets/images/unchecked-icon.png';

export default function TaskDetails() {
  const [task, setTask] = useState({});
  const [assignment, setAssignment] = useState({});
  const [taskStickers, setTaskStickers] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const { id } = router.query;

  const getCurrentTask = () => {
    getSingleTask(id).then((data) => setTask(data));
  };

  const getTaskAssignment = () => {
    getAssignmentByTaskId(id).then((data) => setAssignment(data[0]));
  };

  const getTaskStickers = () => {
    getTaskStickersByTaskId(id).then((data) => setTaskStickers(data));
  };

  useEffect(() => {
    getCurrentTask();
    getTaskAssignment();
    getTaskStickers();
    console.warn(user);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const deleteThisTask = () => {
    if (window.confirm('Delete this task?')) {
      deleteTask(id).then(() => router.push(`/assignments/${assignment.id}`));
    }
  };

  const handleEditClick = () => {
    router.push(`/tasks/edit/${id}`);
  };

  const handleStickerClick = () => {
    router.push(`/tasks/${id}/new`);
  };

  return (
    <>
      <Head>
        <title>Task Details</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-start items-center">
        <h1 className="text-4xl font-semibold text-center text-gray-800 bevan bg-gray-100 rounded shadow-lg p-3 m-4">Task</h1>
        {user.is_teacher === true ? (
          <div className="space-x-2 text-center bg-gray-100 rounded shadow-lg p-3 mb-4">
            <button onClick={handleEditClick} type="button">
              <Image src={editIcon} alt="edit icon" width={40} height={40} />
            </button>
            <button onClick={deleteThisTask} type="button">
              <Image src={deleteIcon} alt="delete icon" width={40} height={40} />
            </button>
          </div>
        ) : ('')}
        <div className="bg-gray-100 rounded px-4 shadow-lg">
          <h2 className="text-2xl p-4 text-center text-gray-800 bevan"> {task.title}</h2>
          <div className="pb-4">
            <div className="flex flex-wrap items-center">
              <h3 className="bevan text-xl">Description: </h3>
              <h2 className="coustard m-2 text-xl">{task.description}</h2>
            </div>
            <div className="flex items-center">
              <h3 className="bevan text-xl">Sticker Goal: </h3>
              <h2 className="coustard m-2 text-xl">{task.sticker_goal}</h2>
            </div>
            <div className="flex items-center">
              <h3 className="bevan text-xl">Stickers earned so far: </h3>
              <h2 className="coustard m-2 text-xl">{task.current_stickers}</h2>
            </div>
            <div className=" flex bevan">
              <h3 className="text-xl">Completion Status:</h3>
              <div className="ml-2">
                <Image src={task.is_completed === true ? checkboxIcon : uncheckedBoxIcon} alt={task.is_completed === true ? 'checkbox icon' : 'unchecked box icon'} width={40} height={40} />
              </div>
            </div>
          </div>
        </div>
        {user.is_teacher === false ? (
          <button onClick={handleStickerClick} className="bg-yellow-400 hover:bg-yellow-200 text-white text-3xl font-bold py-2 px-3 rounded shadow-md mt-4" type="button">
            <h2 className="text-black coustard pb-1">Add</h2>
            <h2 className="text-black coustard pb-1">Sticker</h2>
            <Image src={stickerIcon} alt="sticker icon" width={60} height={60} />
          </button>
        ) : ('')}
        <h1 className="text-2xl font-semibold text-center text-blue-700 bevan bg-gray-100 rounded -shadow-lg m-4 p-3">Current Stickers</h1>
        <div className="mb-6 flex flex-wrap justify-center items-center gap-3">
          {taskStickers.map((taskSticker) => (
            <div key={`taskSticker--${taskSticker.id}`}>
              <TaskStickerCard taskStickerObj={taskSticker} onUpdate={() => { getTaskStickers(); getCurrentTask(); }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
