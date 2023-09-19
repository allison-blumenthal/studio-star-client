import React from 'react';
import Head from 'next/head';
import TaskStickerForm from '../../../components/sticker/TaskStickerForm';

export default function NewSticker() {
  return (
    <>
      <Head>
        <title>New Sticker</title>
      </Head>
      <div>
        <h1 className="text-4xl p-4 font-semibold text-center text-gray-800 bevan">Choose a Sticker</h1>
        <TaskStickerForm />
      </div>
    </>
  );
}
