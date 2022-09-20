import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

interface ITask {
  id: number;
  title: string;
  isCompleted: boolean;
}

export const Dashboard = () => {
  const [lista, setLista] = useState<ITask[]>([]);

  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback((e) => {
      if (e.currentTarget.value.trim().length === 0) return;

      const value = e.currentTarget.value;

      e.currentTarget.value = "";
      setLista((oldLista) => {
        if (oldLista.some((listItem) => listItem.title === value))
          return oldLista;

        return [
          ...oldLista,
          {
            id: oldLista.length,
            title: value,
            isCompleted: false,
          },
        ];
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
        {lista.map((listItem, index) => {
          return (
            <li key={listItem.id}>
              <input
                type="checkbox"
                checked={listItem.isCompleted}
                onChange={() => {
                  setLista((oldLista) => {
                    return oldLista.map((oldListItem) => {
                      const newListCompleted =
                        oldListItem.title === listItem.title
                          ? !oldListItem.isCompleted
                          : oldListItem.isCompleted;
                      return {
                        ...oldListItem,
                        isCompleted: newListCompleted,
                      };
                    });
                  });
                }}
              />
              {listItem.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
