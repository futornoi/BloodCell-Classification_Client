import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { ModelContainer } from './Models/Initializer';
import { config } from "./routers";

const App = () => {
  const router = useRoutes(config)

  return (
    <div id="layout">
      {router}
    </div>
  )
};

export default App;
