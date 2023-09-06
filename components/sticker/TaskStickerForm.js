import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form } from 'react-bootstrap';
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
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Choose a Sticker</Form.Label>
          {stickers.map((sticker) => (
            <Form.Check
              key={`sticker--${sticker.id}`}
              type="radio"
              label={<StickerCard stickerObj={sticker} onUpdate={getAllStickers} />}
              name="id"
              id={`sticker--${sticker.id}`}
              value={sticker.id}
              onChange={handleChange}
            />
          ))}
        </Form.Group>
        <button type="submit" className="btn btn-primary">Submit</button>
      </Form>
    </>
  );
}
