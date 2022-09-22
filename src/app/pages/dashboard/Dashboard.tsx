import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiException } from "../../shared/services/api/ApiException";
import {
  ITask,
  TasksService,
} from "../../shared/services/api/tarefas/TasksService";

export const Dashboard = () => {
  const [lista, setLista] = useState<ITask[]>([]);

  useEffect(() => {
    TasksService.getAll().then((result) => {
      if (result instanceof ApiException) {
        alert(result.message);
      } else {
        setLista(result);
      }
    });
  }, []);

  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        if (e.key === "Enter") {
          if (e.currentTarget.value.trim().length === 0) return;

          const value = e.currentTarget.value;

          e.currentTarget.value = "";

          if (lista.some((listItem) => listItem.title === value)) return;

          TasksService.create({ title: value, isCompleted: false }).then(
            (result) => {
              if (result instanceof ApiException) {
                alert(result.message);
              } else {
                setLista((oldLista) => [...oldLista, result]);
              }
            }
          );
        }
      },
      [lista]
    );

  const handleToggleComplete = useCallback(
    (id: number) => {
      const taskToUpdate = lista.find((task) => task.id === id);
      if (!taskToUpdate) return;

      TasksService.updateById(id, {
        ...taskToUpdate,
        isCompleted: !taskToUpdate.isCompleted,
      }).then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
        } else {
          setLista((oldLista) => {
            return oldLista.map((oldListItem) => {
              if (oldListItem.id === id) return result;
              return oldListItem;
            });
          });
        }
      });
    },
    [lista]
  );

  const handleDelete = useCallback((id: number) => {
    TasksService.deleteById(id).then((result) => {
      if (result instanceof ApiException) {
        alert(result.message);
      } else {
        setLista((oldLista) => {
          return oldLista.filter((oldListItem) => oldListItem.id !== id);
        });
      }
    });
  }, []);

  return (
    <div>
      <p>Dashboard</p>
      <Link to={"/login"}>Login</Link>
      <p>Lista de Tarefas</p>
      <input onKeyDown={handleInputKeyDown} />
      <p>{lista.filter((listItem) => listItem.isCompleted).length}</p>
      <ul>
        {lista.map((listItem) => {
          return (
            <li key={listItem.id}>
              <input
                type="checkbox"
                checked={listItem.isCompleted}
                onChange={() => handleToggleComplete(listItem.id)}
              />
              {listItem.title}
              <button onClick={() => handleDelete(listItem.id)}>Excluir</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
