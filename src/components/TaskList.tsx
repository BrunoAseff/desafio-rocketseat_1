import styles from "./taskList.module.css";
import { Trash, Check } from "@phosphor-icons/react";

interface TaskListProps {
  content: string;
  isChecked: boolean;
  onDeleteTask: (task: string) => void;
  onToggleTaskCompletion: (task: string) => void;
}

export default function TaskList({
  content,
  isChecked,
  onDeleteTask,
  onToggleTaskCompletion,
}: TaskListProps) {
  function handleDeleteTask() {
    onDeleteTask(content);
  }

  function handleCheckboxChange() {
    onToggleTaskCompletion(content);
  }

  return (
    <div className={styles.container}>
      <div className={styles.radioWrapper}>
        <input
          className={isChecked ? styles.checkedInput : styles.input}
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        {isChecked && (
          <Check className={styles.checkIcon} weight="bold" size={15} />
        )}
      </div>
      <p className={isChecked ? styles.checkedText : styles.text}>{content}</p>
      <Trash className={styles.trash} onClick={handleDeleteTask} size={24} />
    </div>
  );
}
