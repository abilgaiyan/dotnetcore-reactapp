import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
const useEndpoint = (req: any) => {
  const [res, setRes] = useState({
    data: null,
    pending: false,
    completed: false,
    error: false
  });
  useEffect(() => {
    setRes({
      data: null,
      pending: true,
      completed: false,
      error: false
    });
    axios(req)
      .then(res =>
        setRes({
          data: res.data,
          pending: false,
          error: false,
          completed: true
        })
      )
      .catch(() =>
        setRes({
          data: null,
          pending: false,
          error: true,
          completed: true
        })
      );
  }, [req.url]);
  return res;
};
