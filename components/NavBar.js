/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import Logo from './Logo';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
            <Link passHref href="/students">
              <Nav.Link>Teacher-Icon</Nav.Link>
            </Link>
            <Link passHref href="/students/[id]">
              <Nav.Link>Assignment-Icon</Nav.Link>
            </Link>
            <Link passHref href="/profile/[id]">
              <Nav.Link>Profile-Icon</Nav.Link>
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
