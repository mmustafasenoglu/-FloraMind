import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Home from './pages/Home';
import ConditionDetail from './pages/ConditionDetail';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:slug" element={<ConditionDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
