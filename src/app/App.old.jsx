import Header from "../features/Header/Header";
import SubReddits from "../features/SubReddits/SubReddits";
import './App.css';

function App() {

  return (
    <div className="app">
      <Header />
      <main>
        <SubReddits />
      </main>
    </div>
  )
}

export default App
