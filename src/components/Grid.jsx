import React from 'react';

export function Grid({children, columns}) {
  return (
    <div 
      className='grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-3 p-2'

    >
      {children}
    </div>
  );
}