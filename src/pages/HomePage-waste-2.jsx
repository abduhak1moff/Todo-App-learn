import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import TodoItem from "../components/TodoItem";

const HomePage = () => {
  const todos = [
    { title: "Playing football", time: "14:00", done: true },
    { title: "Reading book", time: "16:00", done: false },
    { title: "Doing sport", time: "18:00", done: false },
    { title: "Working", time: "21:00", done: true },
    { title: "Sleeping", time: "23:00", done: true },
  ];

  const mappingTodos = todos.map((todo, i) => (
    <TodoItem key={i} done={todo.done} title={todo.title} time={todo.time} />
  ));

  const doneTodos = todos
    .filter((todo) => todo.done)
    .map((todo, i) => (
      <TodoItem key={i} done={todo.done} title={todo.title} time={todo.time} />
    ));

  const unDoneTodos = todos
    .filter((todo) => !todo.done)
    .map((todo, i) => (
      <TodoItem key={i} done={todo.done} title={todo.title} time={todo.time} />
    ));
  return (
    <section>
      <div className="container">
        <h1 className="text-center my-3">TODO PROJECT</h1>
        <Tabs
          variant="pills"
          defaultActiveKey="all"
          transition={true}
          id="todo"
          className="mb-3"
          justify
        >
          <Tab eventKey="all" title="All todos">
            {mappingTodos}
          </Tab>
          <Tab eventKey="undone" title="Undone todos">
            {unDoneTodos}
          </Tab>
          <Tab eventKey="done" title="Done todos">
            {doneTodos}
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};

export default HomePage;
