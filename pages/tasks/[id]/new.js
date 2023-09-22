import React from 'react';
import Head from 'next/head';
import TaskStickerForm from '../../../components/sticker/TaskStickerForm';

export default function NewSticker() {
  return (
    <>
      <Head>
        <title>New Sticker</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-start items-center">
        <h1 className="text-4xl mt-4 text-center text-gray-800 bevan bg-gray-100 rounded shadow-lg m-4 p-3">Choose a Sticker</h1>
        <TaskStickerForm />
      </div>
    </>
  );
}
