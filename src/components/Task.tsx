import Clipboard from "../assets/Clipboard.png";
import styles from "./task.module.css";
import { PlusCircle } from "@phosphor-icons/react";
import TaskList from "./TaskList";
import { FormEvent, useState, ChangeEvent } from "react";

interface Task {
  text: string;
  isCompleted: boolean;
}

export default function Task() {
  const [tasks, setTasks] = useState<Task[]>([
    { text: "Minha primeira tarefa", isCompleted: false },
  ]);
  const [newTaskText, setNewTaskText] = useState("");

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    if (newTaskText.trim() === "") {
      return;
    }

    setTasks([...tasks, { text: newTaskText, isCompleted: false }]);
    setNewTaskText("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter(
      (task) => task.text !== taskToDelete
    );
    setTasks(tasksWithoutDeletedOne);
  }

  function toggleTaskCompletion(taskToToggle: string) {
    const updatedTasks = tasks.map((task) =>
      task.text === taskToToggle
        ? { ...task, isCompleted: !task.isCompleted }
        : task
    );
    setTasks(updatedTasks);
  }

  const completedTasksCount = tasks.filter((task) => task.isCompleted).length;

  return (
    <div className={styles.container}>
      <form onSubmit={handleCreateNewTask} className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTaskText}
          onChange={handleNewTaskChange}
        />
        <button type="submit" className={styles.button}>
          Criar <PlusCircle size={16} />
        </button>
      </form>

      <div className={styles.taskContainer}>
        <div className={styles.taskData}>
          <div className={styles.created}>
            <p>Tarefas criadas</p>
            <p className={styles.createdNumber}>{tasks.length}</p>
          </div>
          <div className={styles.finished}>
            <p>Concluídas</p>
            <p className={styles.finishedNumber}>
              {completedTasksCount} de {tasks.length}
            </p>
          </div>
        </div>
        {tasks.length === 0 && (
          <div className={styles.taskListEmpty}>
            <img src={Clipboard} alt="Icone de tarefas" />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        )}
        {tasks.length !== 0 && (
          <div className={styles.taskList}>
            {tasks.map((task) => (
              <TaskList
                key={task.text}
                content={task.text}
                isChecked={task.isCompleted}
                onDeleteTask={deleteTask}
                onToggleTaskCompletion={toggleTaskCompletion}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
