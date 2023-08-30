import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
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
    console.warn(currentTask);
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
        assignmentId: currentTask.assignmentId,
        title: currentTask.title,
        description: currentTask.description,
        stickerGoal: Number(currentTask.stickerGoal),
        currentStickers: Number(currentTask.currentStickers),
        isCompleted: currentTask.isCompleted,
      };

      updateTask(updatedTask).then((task) => router.push(`/tasks/${task.id}`));
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
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title:</Form.Label>
          <Form.Control name="title" required value={currentTask.title} onChange={handleChange} type="text" />

          <Form.Label>Description:</Form.Label>
          <Form.Control name="description" required value={currentTask.description} onChange={handleChange} type="textarea" />

          <Form.Label>Goal number of stickers: </Form.Label>
          <Form.Control name="stickerGoal" required value={currentTask.stickerGoal} onChange={handleChange} type="number" />

        </Form.Group>

        <Button variant="primary" type="submit">
          {taskObj.id ? 'Update' : 'Create'} Task
        </Button>
      </Form>
    </>
  );
}

TaskForm.propTypes = {
  taskObj: PropTypes.shape({
    id: PropTypes.number,
    assignment_id: PropTypes.number,
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
