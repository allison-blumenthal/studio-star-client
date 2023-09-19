import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from '../utils/auth';
import Logo from './logo/Logo';
import { useAuth } from '../utils/context/authContext';
import teacher from '../src/assets/images/teacher-icon.png';
import assignment from '../src/assets/images/assignment-icon.png';
import profile from '../src/assets/images/profile-icon.png';
import { getStudioByTeacher } from '../utils/data/studioData';

export default function NavBar() {
  const [teacherStudio, setTeacherStudio] = useState({});
  const { user } = useAuth();

  const getTeacherStudio = () => {
    getStudioByTeacher(user.uid, user.id).then((studio) => setTeacherStudio(studio[0]));
  };

  useEffect(() => {
    getTeacherStudio();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <nav className="bg-blue-400">
      <div className="mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          <div className="h-16 w-16 md:h-16 md:w-16 lg:h-20 lg:w-20">
            <Link passHref href="/">
              <button type="button">
                <Logo />
              </button>
            </Link>
          </div>

          <div className="flex space-x-4 items-center">
            {teacherStudio ? (
              <button type="button">
                <Link passHref href={`/studios/${teacherStudio.id}`}>
                  <Image src={teacher} alt="teacher icon" />
                </Link>
              </button>
            ) : (
              <button type="button">
                <Link passHref href={`/students/${user.id}`}>
                  <Image src={assignment} alt="assignment icon" />
                </Link>
              </button>
            )}

            <button type="button">
              <Link passHref href={`/profile/${user.id}`}>
                <Image src={profile} alt="profile icon" />
              </Link>
            </button>

            <button
              type="button"
              onClick={signOut}
              className="bg-black hover:bg-gray-700 text-white py-2 px-4 rounded"
            >
              Log Out
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
