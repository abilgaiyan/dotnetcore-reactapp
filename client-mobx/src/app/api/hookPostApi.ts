//https://codesandbox.io/s/zrqw6747rl?from-embed

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useAsyncEndpoint = (fn: Function) => {
  const [res, setRes] = useState({
    data: null,
    complete: false,
    pending: false,
    error: false
  });
  const [req, setReq] = useState();

  useEffect(() => {
    if (!req) return;
    setRes({
      data: null,
      pending: true,
      error: false,
      complete: false
    });
    axios(req)
      .then(res =>
        setRes({
          data: res.data,
          pending: false,
          error: false,
          complete: true
        })
      )
      .catch(() =>
        setRes({
          data: null,
          pending: false,
          error: true,
          complete: true
        })
      );
  }, [req]);

  return [res, (...args: any) => setReq(fn(...args))];
};

const todosApi = 'https://jsonplaceholder.typicode.com/todos';

function postTodoEndpoint() {
  /* eslint-disable react-hooks/rules-of-hooks */
  return useAsyncEndpoint((data: any) => ({
    url: todosApi,
    method: 'POST',
    data
  }));
}
