import React from 'react';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { signIn } from '../utils/auth';
import LogoStar from './logo/LogoStar';
import LogoWords from './logo/LogoWords';

function Signin() {
  return (
    <>
      <Head>
        <title>Studio Star</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <h1 className="text-4xl font-semibold bevan mb-2 text-center text-gray-800">Welcome to</h1>
        <div className="max-w-md">
          <LogoStar />
        </div>
        <div className="max-w-md">
          <LogoWords />
        </div>
        <Button
          type="button"
          size="lg"
          className="bg-blue-700 hover:bg-blue-900 text-white rounded-lg py-3 px-6 mb-4 transition duration-200 ease-in-out coustard"
          onClick={signIn}
        >
          Log In
        </Button>
        <p className="text-center text-gray-600 mb-4 text-xl coustard">Click to log in or get started!</p>
      </div>
    </>
  );
}

export default Signin;
