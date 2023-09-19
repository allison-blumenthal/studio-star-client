import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
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
    <div className="min-h-screen p-4 flex flex-col justify-start items-center">
      <h1 className="text-4xl p-4 font-semibold text-center text-gray-800 bevan">{task.title}</h1>
      {user.is_teacher === true ? (
        <div className="space-x-2 text-center">
          <button onClick={handleEditClick} type="button">
            <Image src={editIcon} alt="edit icon" width={40} height={40} />
          </button>
          <button onClick={deleteThisTask} type="button">
            <Image src={deleteIcon} alt="delete icon" width={40} height={40} />
          </button>
        </div>
      ) : (
        <button onClick={handleStickerClick} className="bg-yellow-300 hover:bg-yellow-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          <Image src={stickerIcon} alt="sticker icon" width={40} height={40} />
        </button>
      )}
      <div className="p-4 coustard">
        <h3 className="text-lg mb-2">Description: {task.description}</h3>
        <h3 className="text-lg mb-2">Sticker Goal: {task.sticker_goal}</h3>
        <h3 className="text-lg mb-2">Stickers earned so far: {task.current_stickers}</h3>
      </div>
      <div className="flex space-x-4">
        {taskStickers.map((taskSticker) => (
          <div key={`taskSticker--${taskSticker.id}`}>
            <TaskStickerCard taskStickerObj={taskSticker} onUpdate={() => { getTaskStickers(); getCurrentTask(); }} />
          </div>
        ))}
      </div>
      <div className="flex bevan p-4">
        <h3 className="text-lg mt-4">Completion Status:</h3>
        <div className="pl-2 m-2">
          <Image src={task.is_completed === true ? checkboxIcon : uncheckedBoxIcon} alt={task.is_completed === true ? 'checkbox icon' : 'unchecked box icon'} width={40} height={40} />
        </div>
      </div>
    </div>
  );
}
