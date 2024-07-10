import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, saveTodo } from './store/todoSlice/Index';
import { useState } from 'react';
import redd from "./assets/redd.png";


const App = () => {
    const state = useSelector((state) => state.todo);
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = useState(null);
    const [newTitle, setNewTitle] = useState("");

    const submitForm = (e) => {
      e.preventDefault();
      let inputVal = e.target[0].value;
      let todoObj = {
        title: inputVal,
        id: Date.now(),
        checked: false,
      };
      dispatch(addTodo(todoObj));
    };

    const editTodo = (id) => {
      setSelectedId(id);
    };

    const saveTodoFunc = (id, title) => {
      dispatch(saveTodo({ id, title }));
      setSelectedId(null);
    };

  return (
    <div className="mx-auto px-8 bg-gradient-to-r from-purple-500 to-indigo-500 w-full h-screen box-border">
    <img src={redd} alt="" className='w-48  ml-[630px]  cursor-pointer bg-white rounded-3xl hover:bg-purple-200  transition-all duration-500'/>
      <form onSubmit={submitForm} className="flex items-center mb-4 mx-auto w-3/4">
        <input
          type="text"
          placeholder="Add every thing..."
          className="py-6 px-3 border mt-8 border-transparent focus:border-indigo-500 rounded-lg shadow-sm mr-2 w-full focus:outline-none box-border"
        />
        <button
          type="submit"
          className="py-6 px-12 bg-indigo-600 mt-8 text-white text-xl font-bold rounded-lg hover:bg-indigo-700 transition duration-200 focus:outline-none flex items-center justify-center shadow-sm box-border"
        >
          ADD
        </button>
      </form>

      <div className="mx-auto w-3/4">
        {state.list.length > 0 ? (
          state.list.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center justify-between bg-white border border-transparent shadow-sm rounded-lg p-3 mt-2 ${
                todo.checked ? 'opacity-50' : ''
              } box-border`}
            >
              {selectedId === todo.id ? (
                <input
                  onChange={(e) => setNewTitle(e.target.value)}
                  type="text"
                  defaultValue={todo.title}
                  className="py-2 px-4 border-2 border-transparent focus:border-indigo-500 rounded-lg shadow-sm mr-2 focus:outline-none box-border"
                />
              ) : (
                <p className="flex-1 text-2xl font-bold text-green-400">{todo.title}</p>
              )}
              <div className="flex items-center">
                <button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  title="Delete"
                  className="text-red-500 bg-transparent border-4 border-rose-700 p-2 rounded-xl text-xl font-bold mr-2 focus:outline-none box-border hover:bg-red-500 transition-all duration-500 hover:text-white"
                >
                  DELETE
                </button>
                {selectedId === todo.id ? (
                  <button
                    onClick={() => saveTodoFunc(todo.id, newTitle)}
                    title="Save"
                  className="text-green-500 bg-transparent border-4 border-emerald-500 p-2 rounded-xl text-xl font-bold mr-2 focus:outline-none box-border hover:bg-green-500 transition-all duration-500 hover:text-white"
                  >
                    SAVE
                  </button>
                ) : (
                  <button
                    onClick={() => editTodo(todo.id)}
                    title="Edit"
                  className="text-blue-500 bg-transparent border-4 border-indigo-500 p-2 rounded-xl text-xl font-bold mr-2 focus:outline-none box-border hover:bg-blue-500 transition-all duration-500 hover:text-white"
                  >
                    RENAME
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-white mt-4"></p>
        )}
      </div>
    </div>
  );
};

export default App;
