import TodoItem from "../components/TodoItem";

const HomePage = () => {
  return (
    <section>
      <div className="container">
        <h1 className="text-center my-3">TODO PROJECT</h1>
        <TodoItem time="14:00" title="Playing football" />
        <TodoItem time="16:00" title="Reading book" />
        <TodoItem time="18:00" title="Doing sport" />
        <TodoItem time="21:00" title="Working" />
      </div>
    </section>
  );
};

export default HomePage;
