import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';

export function render() {
  return renderToString(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
