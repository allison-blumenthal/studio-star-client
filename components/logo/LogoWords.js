import React from 'react';
import Image from 'next/image';
import words from '../../src/assets/images/ss-words.png';

export default function LogoWords() {
  return (
    <>
      <Image src={words} alt="Logo" />
    </>
  );
}
