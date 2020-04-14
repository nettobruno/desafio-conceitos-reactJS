import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Olá Mundo ${Date.now()}`,
      url: "http://github.com/nettobruno",
      techs: "NodeJS, ReactJS, React Native"
    });

    const repository = await response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const addRepositories = repositories.filter(
      repository => repository.id !== id
    )

    setRepositories(addRepositories);
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>

      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <div className="block" key={repo.id}>
            <li key={repo.id}>{repo.title}</li>
          
            <button className="btnRemove" onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
