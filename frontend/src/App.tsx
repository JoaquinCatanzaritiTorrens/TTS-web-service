import { useRoutes } from 'react-router-dom';
import routes from './router';
import { ApplicationProvider } from './context/application-context';

function App() {
  const content = useRoutes(routes);

  return (
    <ApplicationProvider>
      {content}
    </ApplicationProvider>
  );
}

export default App;