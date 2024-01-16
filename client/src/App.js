//fetch
//axios

import { useEffect, useState } from 'react';

function App() {
  // 객체로 설정된 초기 상태값을 배열로 변경
  const [todoList, setTodoList] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/todo')
      .then((response) => response.json())
      .then((data) => setTodoList(data));
  }, []);

  return (
    <div className="App">
      <h1>TodoList</h1>
      {todoList &&
        todoList.map((todo) => (
          <div key={todo.id}>
            <div>{todo.id}</div>
            <div>{todo.text}</div>
            <div>{todo.done ? 'Y' : 'N'}</div>
          </div>
        ))}
    </div>
  );
}

export default App;

// import React, { useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   useEffect(() => {
//     // useEffect를 활용하여 컴포넌트가 마운트될 때 데이터를 가져오도록 합니다.
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/todo');
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []); // 빈 배열을 전달하여 한 번만 실행되도록 합니다.

//   return (
//     <div className="App">
//       <h1>TodoList</h1>
//     </div>
//   );
// }

// export default App;
