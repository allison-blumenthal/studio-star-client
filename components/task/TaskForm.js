import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { createTask, updateTask } from '../../utils/data/taskData';

const initialState = {
  assignmentId: 0,
  title: '',
  description: '',
  stickerGoal: 0,
  currentStickers: 0,
  isCompleted: false,
};

function TaskForm({ taskObj }) {
  const router = useRouter();
  const [currentTask, setCurrentTask] = useState(initialState);
  const { id } = router.query;

  useEffect(() => {
    if (taskObj.id) {
      setCurrentTask({
        id: taskObj.id,
        assignmentId: taskObj.assignment_id,
        title: taskObj.title,
        description: taskObj.description,
        stickerGoal: taskObj.sticker_goal,
        currentStickers: taskObj.current_stickers,
        isCompleted: taskObj.is_completed,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskObj.id) {
      const updatedTask = {
        id: currentTask.id,
        assignmentId: currentTask.assignmentId.id,
        title: currentTask.title,
        description: currentTask.description,
        stickerGoal: Number(currentTask.stickerGoal),
        currentStickers: Number(currentTask.currentStickers),
        isCompleted: currentTask.isCompleted,
      };

      updateTask(updatedTask).then(router.push(`/tasks/${id}`));
    } else {
      const newTask = {
        assignmentId: id,
        title: currentTask.title,
        description: currentTask.description,
        stickerGoal: Number(currentTask.stickerGoal),
        currentStickers: Number(currentTask.currentStickers),
        isCompleted: currentTask.isCompleted,
      };

      createTask(newTask).then((task) => router.push(`/tasks/${task.id}`));
    }
  };

  return (
    <div className="max-w-lg mx-auto coustard">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            name="title"
            required
            type="text"
            value={currentTask.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            required
            rows="4"
            value={currentTask.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stickerGoal">
            Goal number of stickers:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="stickerGoal"
            name="stickerGoal"
            required
            type="number"
            value={currentTask.stickerGoal}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {taskObj.id ? 'Update' : 'Create'} Task
          </button>
        </div>
      </form>
    </div>

  );
}

TaskForm.propTypes = {
  taskObj: PropTypes.shape({
    id: PropTypes.number,
    assignment_id: PropTypes.shape({
      id: PropTypes.number,
    }),
    title: PropTypes.string,
    description: PropTypes.string,
    sticker_goal: PropTypes.number,
    current_stickers: PropTypes.number,
    is_completed: PropTypes.bool,
  }),
};

TaskForm.defaultProps = {
  taskObj: initialState,
};

export default TaskForm;
