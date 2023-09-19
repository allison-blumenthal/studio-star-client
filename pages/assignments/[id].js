import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import Image from 'next/image';
import { deleteAssignment, getSingleAssignment } from '../../utils/data/assignmentData';
import { getTasksByAssignmentId } from '../../utils/data/taskData';
import TaskCard from '../../components/task/TaskCard';
import editIcon from '../../src/assets/images/edit-icon.png';
import deleteIcon from '../../src/assets/images/delete-icon.png';
import { getUserByAssignmentId } from '../../utils/data/userData';
import { useAuth } from '../../utils/context/authContext';

export default function AssignmentDetails() {
  const [assignment, setAssignment] = useState({});
  const [tasks, setTasks] = useState([]);
  const [student, setStudent] = useState({});
  const router = useRouter();
  const { user } = useAuth();

  const { id } = router.query;

  const getCurrentAssignment = () => {
    getSingleAssignment(id).then((data) => setAssignment(data));
  };

  const getAssignmentTasks = () => {
    getTasksByAssignmentId(id).then((data) => setTasks(data));
  };

  const getAssignmentStudent = () => {
    getUserByAssignmentId(id).then((data) => setStudent(data[0]));
  };

  useEffect(() => {
    getCurrentAssignment();
    getAssignmentTasks();
    getAssignmentStudent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const deleteThisAssignment = () => {
    if (window.confirm('Delete this assignment?')) {
      deleteAssignment(id).then(() => router.push(`/students/${student.id}`));
    }
  };

  const handleEditClick = () => {
    router.push(`/assignments/edit/${id}`);
  };

  const handleTaskClick = () => {
    router.push(`/assignments/${id}/new`);
  };

  const formattedDate = moment(assignment.date).format('MM/DD/YYYY');

  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <h1 className="text-4xl p-4 font-semibold mt-4 text-center text-gray-800 bevan">{formattedDate}</h1>
      {user.is_teacher === true ? (
        <div>
          <div className="space-x-2 text-center">
            <button onClick={handleEditClick} type="button">
              <Image src={editIcon} alt="edit icon" width={40} height={40} />
            </button>
            <button onClick={deleteThisAssignment} type="button">
              <Image src={deleteIcon} alt="delete icon" width={40} height={40} />
            </button>
          </div>
          <div className="p-4">
            <button onClick={handleTaskClick} className="bg-blue-700 hover:bg-blue-900 text-white rounded-lg py-3 px-6 mb-4 transition duration-200 ease-in-out coustard my-4" type="button">New Task
            </button>
          </div>
        </div>
      ) : ('')}

      {tasks.length > 0 && (
        <div className="p-4 md:p-6 bg-white rounded-lg shadow-lg mt-4 justify-center">
          {tasks.map((task) => (
            <section key={`task--${task.id}`} className="task">
              <TaskCard taskObj={task} onUpdate={getAssignmentTasks} />
              <br />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
