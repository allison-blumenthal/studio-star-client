import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createTask } from '../../utils/data/taskData';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(currentTask).then((task) => router.push(`/tasks/${task.id}`));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Task Title</Form.Label>
          <Form.Control name="title" required value={currentTask.title} onChange={handleChange} type="text" />
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
  }),
};

TaskForm.defaultProps = {
  taskObj: initialState,
};

export default TaskForm;
