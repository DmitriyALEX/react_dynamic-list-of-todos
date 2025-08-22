/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

// import { getTodos, getUser } from './api';

import { Todo } from './types/Todo';
// import { User } from './types/User';

import { useFetchData } from './hooks/useFetchData';
import { useFetchUser } from './hooks/useFetchUser';

export const App: React.FC = () => {
  const [selectedQuery, setSelectedQuery] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [clickedTodoId, setClikedTodoId] = useState<number | null>(null);

  const [userTodo, setUserTodo] = useState<Todo | null>(null);

  const {
    fetchedData,
    // setFetchedData,
    renderedData,
    setRenderedData,
    // fetchError,
    // setFetchError,
    isLoader,
    // setIsLoader,
  } = useFetchData();

  const { fetchedUser, fetchError, isUserLoader } = useFetchUser(clickedTodoId);

  const handleSelectedQuery = (query: string) => {
    setSelectedQuery(query);
    switch (query) {
      case 'all':
        return setRenderedData(fetchedData);
      case 'active':
        const notCompleted = fetchedData.filter(x => x.completed === false);

        return setRenderedData(notCompleted);
      case 'completed':
        const completed = fetchedData.filter(x => x.completed === true);

        return setRenderedData(completed);
      default:
        return 0;
    }
  };

  const handleSearchedQuery = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const queryString = query.trim().toLowerCase();
      const filtered = renderedData.filter(x =>
        x.title.toLowerCase().includes(queryString),
      );

      setRenderedData(filtered);
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedQuery={selectedQuery}
                handleSelectedQuery={handleSelectedQuery}
                searchQuery={searchQuery}
                handleSearchedQuery={handleSearchedQuery}
              />
            </div>

            <div className="block">
              {isLoader && <Loader />}
              {/* <Loader /> */}
              {fetchError && <>{fetchError}</>}
              <TodoList
                renderedData={renderedData}
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                clickedTodoId={clickedTodoId}
                setClikedTodoId={setClikedTodoId}
                setUserTodo={setUserTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {isOpenModal && (
        <TodoModal
          user={fetchedUser}
          userTodo={userTodo}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isUserLoader={isUserLoader}
        />
      )}
    </>
  );
};
