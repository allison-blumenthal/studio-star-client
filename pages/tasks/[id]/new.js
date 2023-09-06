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
        <h2>Choose a Sticker</h2>
        <TaskStickerForm />
      </div>
    </>
  );
}
