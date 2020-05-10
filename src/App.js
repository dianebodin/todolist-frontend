import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Form from './components/Form';
import Task from './components/Task';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faCheck, faTrash); 

const App = () => {

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]); //données récupérées
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(0);

  const handleChange = e => { setInput(e.target.value); }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://todolist-backend-db.herokuapp.com/");
        setTasks(response.data);
        setIsLoading(false);
      } catch (error) { console.log(error.message); }
    };
    fetchData(); 
  }, []);


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const titles = tasks.map(e => { return e.title }); //on récupère tous les titres
      if (!input || input.trim().length === 0) setError(1);
      else if (titles.includes(input)) setError(2);
      else if (input.length > 30) setError(3);
      else {
        await axios.post("https://todolist-backend-db.herokuapp.com/create", {
          title: input,
          done: "false"
          }
        ).then(() => {
          axios.get("https://todolist-backend-db.herokuapp.com/")
          .then((response) => {
            setTasks(response.data);
            setInput(""); //vider
            setError(0);
          })
        })
      }
    } catch (error) { console.log(error.message); }
  }


  const handleClickCheck = async (i) => {
    try {
      await axios.put(`https://todolist-backend-db.herokuapp.com/check/${i}`)
      .then(() => {
        axios.get("https://todolist-backend-db.herokuapp.com/")
        .then((response) => {
          setTasks(response.data);
        })
      })
    } catch (error) { console.log(error.message); }
  }


  const handleClickRemove = async (i) => {
    try {
      await axios.delete(`https://todolist-backend-db.herokuapp.com/delete/${i}`)
      .then(() => {
        axios.get("https://todolist-backend-db.herokuapp.com/")
        .then((response) => {
          setTasks(response.data);
        })
      })
    } catch (error) { console.log(error.message); }
  }
    

  return (
    <>
      {isLoading ? (<span className="empty">.</span>) : (
        <div className="body">
          <div className="container">

            <header><h1>TodoList</h1></header>
            <Task tasks={tasks} handleClickCheck={handleClickCheck} handleClickRemove={handleClickRemove} />
            <Form input={input} handleChange={handleChange} handleSubmit={handleSubmit} error={error} />

          </div>
        </div>
      )}
    </>
  );
}

export default App;
