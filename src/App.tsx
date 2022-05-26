import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { config } from "./routers";

const App = () => {
  const router = useRoutes(config);

  const onMouseMove = (e: MouseEvent) => {
    const bloods = document.querySelectorAll<HTMLElement>('[data-speed]');
    if(!!bloods.length) {
      bloods.forEach((blood) => {
        const speed = blood.getAttribute('data-speed');
        const positionX = e.x / 100 * Number(speed ?? 1);
        const positionY = e.y / 100 * Number(speed ?? 1);
        blood.style.transform = `translate(${positionX}px, ${positionY}px)`;
      })
    }
  }

  useEffect(() => {
    document.body.addEventListener('mousemove', onMouseMove)
    return () => document.body.removeEventListener('mousemove', onMouseMove)
  }, []);


  return (
    <div id="layout">
      <img className="cell-1" data-speed="1" src="/cells/Cell1.png" alt="blood cell"/>
      <img className="cell-2" data-speed="3" src="/cells/Cell2.png" alt="blood cell"/>
      <img className="cell-3" data-speed="4" src="/cells/Cell3.png" alt="blood cell"/>
      <img className="cell-4" data-speed="2" src="/cells/Cell3.png" alt="blood cell"/>
      {router}
    </div>
  )
};

export default App;
