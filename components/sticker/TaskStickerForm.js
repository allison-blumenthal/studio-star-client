import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createTaskSticker } from '../../utils/data/taskStickerData';
import StickerCard from './StickerCard';
import { getStickers } from '../../utils/data/stickerData';

const initialState = {
  id: 0,
};

export default function TaskStickerForm() {
  const [currentSticker, setCurrentSticker] = useState(initialState);
  const [stickers, setStickers] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getAllStickers = () => {
    getStickers().then((data) => setStickers(data));
  };

  useEffect(() => {
    getAllStickers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSticker((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTaskSticker = {
      taskId: id,
      stickerId: currentSticker.id,
    };

    createTaskSticker(newTaskSticker).then(router.push(`/tasks/${id}`));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-4">
      <div className="flex flex-wrap justify-center items-center">
        {stickers.map((sticker) => (
          <div key={`sticker--${sticker.id}`} className="relative">
            <input
              type="radio"
              name="id"
              id={`sticker--${sticker.id}`}
              value={sticker.id}
              onChange={handleChange}
              className="sr-only peer"
            />
            <label
              htmlFor={`sticker--${sticker.id}`}
              className="block mb-3 p-2 rounded-lg cursor-pointer hover:bg-blue-300 peer-checked:bg-blue-400"
            >

              <StickerCard stickerObj={sticker} onUpdate={getAllStickers} />
            </label>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button type="submit" className="bg-blue-700 hover:bg-blue-900 text-white text-2xl rounded-lg py-3 px-6 mb-4 transition duration-200 ease-in-out coustard my-4">Stick It
        </button>
      </div>
    </form>
  );
}
