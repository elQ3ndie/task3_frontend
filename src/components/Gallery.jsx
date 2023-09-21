import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import { Grid } from './Grid';
import { SortablePhoto } from './SortablePhoto';
import { Photo } from './Photo';
import photos from '../assets/photos';

const Gallery = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const [items, setItems] = useState(photos);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter((item) => {
    if (searchTerm === '') {
      return true;
    }

    return item.tags.some((tag) => tag.includes(searchTerm));
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.url === active.id);
        const newIndex = items.findIndex((item) => item.url === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out');
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className='max-w-screen-xl mx-auto my-16 p-4 text-center'>
      <h1 className='text-2xl font-bold py-4 m-4'>Gallery</h1>

      <input
        type="text"
        placeholder="Search by tag..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="border p-2 mb-4 mx-auto w-1/2"
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={filteredItems} strategy={rectSortingStrategy}>
          <Grid columns={4}>
            {filteredItems.map((item) => (
              <div key={item.url} className="relative">
                <SortablePhoto url={item.url} tags={item.tags} />

                <div className="absolute bottom-0 left-0 right-0 bg-gray-800 text-white p-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="mr-2 text-sm bg-blue-500 text-white rounded-full px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Grid>
        </SortableContext>

        <DragOverlay adjustScale={true}>
          {activeId ? (
            <Photo url={activeId} index={items.findIndex((item) => item.url === activeId)} />
          ) : null}
        </DragOverlay>
      </DndContext>

      <button onClick={handleLogout} className='text-white border px-6 py-2 m-2 bg-slate-500 hover:bg-slate-400'>Logout</button>
    </div>
  );
};

export default Gallery;
