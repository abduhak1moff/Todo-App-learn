import { useRef, useState } from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import TodoItem from "../components/TodoItem";

const HomePage = () => {
  const todosJSON = localStorage.getItem("todos");

  const todoInputRef = useRef();
  const timeInputRef = useRef();

  const [todos, setTodos] = useState(JSON.parse(todosJSON) || []);
  const [selected, setSelected] = useState(null);

  const submit = (e) => {
    e.preventDefault();

    const title = todoInputRef.current.value.trim();
    const time = timeInputRef.current.value;

    if (title && time) {
      const todo = {
        id: Date.now(),
        title,
        time,
        done: false,
      };
      let newTodos;
      if (selected === null) {
        // add todo
        newTodos = [todo, ...todos];
      } else {
        // edit todo
        newTodos = todos.map((el) =>
          el.id === selected ? { ...el, title, time } : el
        );
        setSelected(null);
      }

      setTodos(newTodos);

      localStorage.setItem("todos", JSON.stringify(newTodos));

      todoInputRef.current.focus();

      e.target.reset();
    } else {
      window.alert("Please fill !");
    }
  };

  const doneTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: true } : todo
    );
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const editTodo = (id) => {
    const { title, time } = todos.find((todo) => todo.id === id);
    todoInputRef.current.value = title;
    timeInputRef.current.value = time;
    setSelected(id);
  };

  const mappingTodos = todos.map((todo, i) => (
    <TodoItem
      order={i + 1}
      key={i}
      {...todo}
      doneTodo={doneTodo}
      deleteTodo={deleteTodo}
      editTodo={editTodo}
    />
  ));

  const doneTodos = todos
    .filter((todo) => todo.done)
    .map((todo, i) => (
      <TodoItem
        order={i + 1}
        key={i}
        {...todo}
        doneTodo={doneTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    ));

  const unDoneTodos = todos
    .filter((todo) => !todo.done)
    .map((todo, i) => (
      <TodoItem
        order={i + 1}
        key={i}
        {...todo}
        doneTodo={doneTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    ));

  return (
    <section>
      <div className="container">
        <h1 className="text-center my-3">TODO PROJECT</h1>
        <form onSubmit={submit} className="d-flex mb-3 gap-3">
          <input ref={todoInputRef} type="text" className="form-control" />
          <input ref={timeInputRef} type="time" className="form-control" />
          <button className="btn btn-success">
            {selected === null ? "Add" : "Save"}
          </button>
        </form>
        <Tabs
          variant="pills"
          defaultActiveKey="all"
          transition={true}
          id="todo"
          className="mb-3"
          justify
        >
          <Tab eventKey="all" title={`All todos (${todos.length})`}>
            {mappingTodos}
          </Tab>
          <Tab eventKey="undone" title={`Undone todos (${unDoneTodos.length})`}>
            {unDoneTodos}
          </Tab>
          <Tab eventKey="done" title={`Done todos (${doneTodos.length})`}>
            {doneTodos}
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};

export default HomePage;
