import React from 'react';
import Image from 'next/image';
import star from '../../src/assets/images/ss-star.png';

export default function LogStar() {
  return (
    <>
      <Image src={star} alt="Logo Star" />
    </>
  );
}
