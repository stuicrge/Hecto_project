import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap-grid.min.css';


function App() {
  const [hello, setHello] = useState('')

  useEffect(() => {
    axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
  }, []);

  return (
      <div>
        백엔드에서 가져온 데이터입니다 : {hello}
      </div>
  );
}

export default App;