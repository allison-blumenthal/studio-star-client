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
    <nav className="bg-gray-100">
      <div className="px-8 mx-auto border border-red-400">
        <div className="flex justify-between">

          <div>
            <Link passHref href="/">
              <div className="logo">
                <Logo />
              </div>
            </Link>
          </div>

          {teacherStudio ? (
            <div>
              <Link passHref href={`/studios/${teacherStudio.id}`}>
                <div className="nav-icon">
                  <Image src={teacher} alt="teacher icon" />
                </div>

              </Link>
            </div>
          ) : (
            <div>
              <Link passHref href={`/students/${user.id}`}>
                <div className="nav-icon">
                  <Image src={assignment} alt="assignment icon" />
                </div>
              </Link>
            </div>
          )}
          <div>
            <Link passHref href={`/profile/${user.id}`}>
              <div className="nav-icon">
                <Image src={profile} alt="profile icon" />
              </div>
            </Link>
          </div>
          <div>
            <button type="button" onClick={signOut}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
