import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { deleteTask, getSingleTask } from '../../utils/data/taskData';
import { useAuth } from '../../utils/context/authContext';
import editIcon from '../../src/assets/images/edit-icon.png';
import deleteIcon from '../../src/assets/images/delete-icon.png';
import stickerIcon from '../../src/assets/images/star-icon.png';
import { getAssignmentByTaskId } from '../../utils/data/assignmentData';
import { getTaskStickersByTaskId } from '../../utils/data/taskStickerData';
import TaskStickerCard from '../../components/sticker/TaskStickerCard';
import checkboxIcon from '../../src/assets/images/checked-checkbox-icon.png';
import uncheckedBoxIcon from '../../src/assets/images/empty-checkbox-icon.png';

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
    <div>
      <h1>{task.title}</h1>
      {user.is_teacher === true ? (
        <>
          <Button onClick={handleEditClick}>
            <Image src={editIcon} alt="edit icon" />
          </Button>
          <Button onClick={deleteThisTask}>
            <Image src={deleteIcon} alt="delete icon" />
          </Button>
        </>
      ) : (
        <Button onClick={handleStickerClick} onUpdate={getCurrentTask}>
          <Image src={stickerIcon} alt="sticker icon" />
        </Button>
      )}
      <h3>Description: {task.description}</h3>
      <h3>Sticker Goal: {task.sticker_goal}</h3>
      <h3>Stickers earned so far: {task.current_stickers}</h3>
      {taskStickers.map((taskSticker) => (
        <section key={`taskSticker--${taskSticker.id}`} className="taskSticker">
          <TaskStickerCard taskStickerObj={taskSticker} onUpdate={() => { getTaskStickers(); getCurrentTask(); }} />
          <br />
        </section>
      ))}
      <h3>Completion Status:</h3>
      {task.is_completed === true ? (
        <Image src={checkboxIcon} alt="checkbox icon" />
      ) : (
        <Image src={uncheckedBoxIcon} alt="unchecked box icon" />
      )}
    </div>
  );
}
