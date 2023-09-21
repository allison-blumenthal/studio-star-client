import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';
import Logo from './logo/Logo';
import { useAuth } from '../utils/context/authContext';
import students from '../src/assets/images/students-icon.png';
import assignment from '../src/assets/images/assignment-icon.png';
import profile from '../src/assets/images/profile-icon.png';
import { getStudioByTeacher } from '../utils/data/studioData';
import teachers from '../src/assets/images/music-teachers-icon.png';

export default function NavBar() {
  const [teacherStudio, setTeacherStudio] = useState({});
  const { user } = useAuth();
  const router = useRouter();

  const getTeacherStudio = () => {
    getStudioByTeacher(user.uid, user.id).then((studio) => setTeacherStudio(studio[0]));
  };

  useEffect(() => {
    getTeacherStudio();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const signOutSendHome = () => {
    signOut();
    router.push('/');
  };

  return (
    <nav className="bg-blue-400">
      <div className="mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          <div className="h-10 w-40 md:h-14 md:w-56 lg:h-16 lg:w-64">
            <Link passHref href="/">
              <button type="button">
                <Logo />
              </button>
            </Link>
          </div>

          <div className="flex space-x-4 items-center">
            {teacherStudio ? (
              <button type="button" className="pt-1">
                <Link passHref href={`/studios/${teacherStudio.id}`}>
                  <Image src={students} alt="students icon" width={40} height={40} />
                </Link>
              </button>
            ) : (
              <button type="button">
                <Link passHref href={`/students/${user.id}`}>
                  <Image src={assignment} alt="assignment icon" width={40} height={40} />
                </Link>
              </button>
            )}

            <button type="button" className="">
              <Link passHref href="/studios">
                <Image src={teachers} alt="music teachers icon" width={50} height={50} />
              </Link>
            </button>

            <button type="button" className="">
              <Link passHref href={`/profile/${user.id}`}>
                <Image src={profile} alt="profile icon" width={40} height={40} />
              </Link>
            </button>

            <button
              type="button"
              onClick={signOutSendHome}
              className="bg-black hover:bg-gray-700 text-white py-3 px-3 md:py-2 lg:py-2  rounded transition duration-200 ease-in-out text-xs md:text-lg lg:text-xl coustard"
            >
              Log Out
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
