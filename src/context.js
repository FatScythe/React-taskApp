import { useRef } from "react";
import { useEffect } from "react";
import { useState, createContext, useContext } from "react";

const TaskContext = createContext();
const getLocalStorage = () => {
  const data = localStorage.getItem("list");
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

const TaskProvider = ({ children }) => {
  const [list, setList] = useState(getLocalStorage);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCompletedOpen, setisCompletedOpen] = useState(false);
  const [isInputOpen, setisInputOpen] = useState(false);
  const inputContainer = useRef(null);
  const completedContainer = useRef(null);
  useEffect(() => {
    getLocalStorage();
  }, []);
  useEffect(() => {
    if (!searchText) {
      setFilteredList(list);
    }
    const localList = localStorage.setItem("list", JSON.stringify(list));
  }, [list, searchText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      e.target.children[0].style.border = "2px solid red";
      return;
    } else if (task && isEditing) {
      e.target.children[0].style.border = "2px solid blue";
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, id: editId, text: task };
          }
          return item;
        })
      );
      setTask("");
      setIsEditing(false);
    } else {
      e.target.children[0].style.border = "2px solid green";
      setList([
        ...list,
        {
          completed: false,
          text: task,
          id: new Date().getTime().toString(),
        },
      ]);

      setTask("");
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    const newList = list.filter((item) => item.text.includes(searchText));
    setFilteredList(newList);
  };
  const handleDelete = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };
  const handleEdit = (id, text) => {
    setisInputOpen(true);
    setTask(text);
    setIsEditing(true);
    setEditId(id);
    inputContainer.current.children[0].focus();
  };
  const handleToggleCompleted = (id, completed) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !completed };
        }
        return item;
      })
    );
  };
  const handleToggleInputContainer = (e) => {
    setisInputOpen(!isInputOpen);
  };
  return (
    <TaskContext.Provider
      value={{
        list,
        setList,
        task,
        setTask,
        isEditing,
        setIsEditing,
        editId,
        setEditId,
        isDarkMode,
        setIsDarkMode,
        isCompletedOpen,
        setisCompletedOpen,
        handleSubmit,
        handleDelete,
        handleEdit,
        handleSearch,
        handleToggleCompleted,
        searchText,
        setSearchText,
        filteredList,
        setFilteredList,
        inputContainer,
        handleToggleInputContainer,
        isInputOpen,
        completedContainer,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};

export default TaskProvider;
