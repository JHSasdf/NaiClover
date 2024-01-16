import { TodoItemProp } from '../types/types';

function MainPage(todoList: { todoList: TodoItemProp[] }) {
  console.log(todoList);
  return (
    <>
      <ul>{}</ul>
      <h1>main page!</h1>
    </>
  );
}

export default MainPage;
