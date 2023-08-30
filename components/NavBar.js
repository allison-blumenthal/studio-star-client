/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
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
    <Navbar collapseOnSelect expand="lg" className="navbar-style">
      <Container>

        <Link passHref href="/">
          <Navbar.Brand>
            <div className="logo">
              <Logo />
            </div>
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            {user.is_teacher ? (
              <Link passHref href={`/studios/${teacherStudio.id}`}>
                <Nav.Link>
                  <div className="nav-icon">
                    <Image src={teacher} alt="teacher icon" />
                  </div>
                </Nav.Link>
              </Link>
            ) : (
              <Link passHref href={`/students/${user.id}`}>
                <Nav.Link>
                  <div className="nav-icon">
                    <Image src={assignment} alt="assignment icon" />
                  </div>
                </Nav.Link>
              </Link>
            )}
            <Link passHref href={`/profile/${user.id}`}>
              <Nav.Link>
                <div className="nav-icon">
                  <Image src={profile} alt="profile icon" />
                </div>
              </Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>
              Log Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
