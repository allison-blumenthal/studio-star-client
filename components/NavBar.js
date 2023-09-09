/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from '../utils/auth';
import Logo from './Logo';
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
    <nav className="bg-blue-100">
      <div className="xl:max-w-6xl mx-auto border border-red-400">
        <div className="flex justify-between">

          {/* logo */}
          <div>
            <Link passHref href="/">
              <a className="text-white text-lg">
                <div className="flex items-center">
                  <Logo className="w-10 h-10" />
                </div>
              </a>
            </Link>
          </div>

          {user.is_teacher ? (
            // teacher view link
            <div>
              <Link passHref href={`/studios/${teacherStudio.id}`}>
                <a className="text-white flex items-center">
                  <Image src={teacher} alt="teacher icon" />
                </a>
              </Link>
            </div>
          ) : (

          // student view link
            <div>
              <Link passHref href={`/students/${user.id}`}>
                <a className="text-white flex items-center">
                  <Image src={assignment} alt="assignment icon" />
                </a>
              </Link>
            </div>
          )}

          {/* profile link */}
          <div>
            <Link passHref href={`/profile/${user.id}`}>
              <a className="text-white flex items-center">
                <Image src={profile} alt="profile icon" />
              </a>
            </Link>
          </div>

          {/* logout button */}
          <div>
            <button
              type="button"
              className="bg-red-500 text-white p-2 rounded-md focus:outline-none focus:ring focus:ring-red-200"
              onClick={signOut}
            >
              Log Out
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
