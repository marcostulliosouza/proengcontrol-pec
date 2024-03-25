import { useState, useEffect } from "react";
import axios from 'axios';

export function App() {
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api/users");
    setArray(response.data.users);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <h1 className="text-cinza-light font-bold underline">
      Hello World
      <div className="content">
        <p>
          {
            array.map((user, index) => (
              <div key={index}>
                <span>{user}</span>
                <br></br>
              </div>
            ))
          }
        </p>
      </div>
    </h1>
  )
}
