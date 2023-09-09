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
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <Link passHref href="/">
          <a className="text-white text-lg">
            <div className="flex items-center">
              <Logo />
            </div>
          </a>
        </Link>

        <button
          className="lg:hidden bg-blue-500 text-white p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#responsive-navbar-nav"
          aria-controls="responsive-navbar-nav"
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div
          className="collapse lg:flex lg:items-center"
          id="responsive-navbar-nav"
        >
          <ul className="flex items-center space-x-4 ml-auto">
            {user.is_teacher ? (
              <li>
                <Link passHref href={`/studios/${teacherStudio.id}`}>
                  <a className="text-white flex items-center">
                    <Image src={teacher} alt="teacher icon" />
                  </a>
                </Link>
              </li>
            ) : (
              <li>
                <Link passHref href={`/students/${user.id}`}>
                  <a className="text-white flex items-center">
                    <Image src={assignment} alt="assignment icon" />
                  </a>
                </Link>
              </li>
            )}

            <li>
              <Link passHref href={`/profile/${user.id}`}>
                <a className="text-white flex items-center">
                  <Image src={profile} alt="profile icon" />
                </a>
              </Link>
            </li>

            <li>
              <button
                type="button"
                className="bg-red-500 text-white p-2 rounded-md focus:outline-none focus:ring focus:ring-red-200"
                onClick={signOut}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
