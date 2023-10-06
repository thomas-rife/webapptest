import './App.css';
import SpotData from './SpotData';
import Background from './Background.js';

function App() {
  return (
    <div className="App">
      <Background />
      <header className="App-header">
          <main>
            <SpotData />
          </main>
      </header>
    </div>
  );
}

export default App;
