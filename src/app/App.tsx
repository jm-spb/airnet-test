import { Suspense } from 'react';
import { AppRouter } from './providers/router';

const App = () => (
  <div className="app">
    <Suspense fallback="">
      <AppRouter />
    </Suspense>
  </div>
);

export default App;
