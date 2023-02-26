import React from 'react';
import styles from './App.module.css';
import { HomePage, Register, SignIn, DetailPage, NotFound } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/detail/:touristRouteId' element={<DetailPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
