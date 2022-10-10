import React from 'react';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <switch>
          <route exact path="/" component={ login } />
        </switch>
      </BrowserRouter>
    );
  }
}

export default App;
