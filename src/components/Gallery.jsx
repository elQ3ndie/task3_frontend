import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {UserAuth} from '../context/AuthContext'
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

import {Grid} from './Grid';
import {SortablePhoto} from './SortablePhoto';
import {Photo} from './Photo';
import photos from '../assets/photos.json';

const Gallery = () => {
  const {user, logout} = UserAuth()
  const navigate = useNavigate()
  

  const [items, setItems] = useState(photos);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));


  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const {active, over} = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }


  const handleLogout = async () => {
    try{
      await  logout()
      navigate('/')
      console.log('You are logged out')
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className='max-w[680px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4 m-4'>Gallery</h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <Grid columns={4}>
            {items.map((url, index) => (
              <SortablePhoto key={url} url={url} index={index} />
            ))}
          </Grid>
        </SortableContext>

        <DragOverlay adjustScale={true}>
          {activeId ? (
            <Photo url={activeId} index={items.indexOf(activeId)} />
          ) : null}
        </DragOverlay>
      </DndContext>

      <button onClick={handleLogout} className='text-white border px-6 py-2 m-2 bg-slate-500 hover:bg-slate-400'>Logout</button>
    </div>
  )
}

export default Gallery