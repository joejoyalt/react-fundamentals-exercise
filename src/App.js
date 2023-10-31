import Form from "./components/Form";
import "./App.css";

function App() {
  return (
    <main className="main">
      <div className="main-wrapper">
        <h1 className="center-text">2023 React Fundamentals Workshop</h1>
        {/* 
          Form seems to have conflicting concerns. It would be better if:
          * form only had form related code;
          * page had api calling, loading, error code.
        */}
        <Form />
      </div>
    </main>
  )
}

export default App;
