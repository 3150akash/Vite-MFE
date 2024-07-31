import React, { lazy, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
// import ButtonModule from "vite_Remote/Button";
// const Button = ButtonModule.Button;
// console.log(ButtonModule);
const ButtonModule = await import("vite_Remote/Button");
const Button = ButtonModule.default.Button;
console.log(Button)
function App() {
  return (
      <div className="App">
         {/* <header className="App-header"> */}
        <img src={logo} className="App-logo" alt="logo" />
        <Button/>
        {/* </header> */}
        {/* <Suspense>
          <ButtonModule/>
        </Suspense> */}
      </div>
  );
}

export default App;
