import React from "react";

const Form = (props) => {

  const { input, handleChange, handleSubmit, error } = props;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleChange} placeholder="new task" style={{border: error === 0 ? "1px solid #5c47d3" : "1px solid red"}} />
        <input type="submit" value="add" />
      </form>

      {error === 1 ? <div className="err-msg">Champs à remplir</div> : null}
      {error === 2 ? <div className="err-msg">Tâche déjà existante</div> : null}
    </>
  );
}

export default Form;