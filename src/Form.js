import { useTaskContext } from "./context";

const Form = () => {
  const {
    handleSubmit,
    task,
    setTask,
    isEditing,
    inputContainer,
    handleToggleInputContainer,
    isInputOpen,
  } = useTaskContext();
  return (
    <div className='form'>
      <button title='toggle input'>
        {isInputOpen ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={3.0}
            stroke='currentColor'
            onClick={(e) => handleToggleInputContainer(e)}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 12h-15'
            />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={3.0}
            stroke='currentColor'
            onClick={(e) => handleToggleInputContainer(e)}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
        )}
      </button>

      <form
        className={`${isInputOpen ? "input" : "input hidden"}`}
        onSubmit={(e) => handleSubmit(e)}
        ref={inputContainer}
      >
        <input
          type='text'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          title='task'
        />
        <button type='submit' title='submit task'>
          {isEditing ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default Form;
