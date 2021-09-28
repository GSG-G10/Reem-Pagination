import React, { useEffect, useState,useReducer } from 'react'
import { Pagination } from 'antd'
import Cards from './Cards';
import { Empty } from 'antd';
import { Spin } from 'antd';
import 'antd/dist/antd.css'

const initialState = {
  data: [],
  loading: false,
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "fetching":
      return { loading: false, error: "", data: action.payload };
    case "loading":
      return { loading: true, error: "", data: [] };
    case "error":
      return { loading: false, error: action.payload, data: [] };
    default:
      throw new Error();
  }
}
function Page() {
  const [page, setpage] = useState(0)
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (e) => {
    setpage(e)
  }
  useEffect(() => {
    const abortController = new AbortController()
    const getData = () => {
      dispatch({ type: "loading" })
      return fetch(
        `https://api.unsplash.com/search/collections?page=${page}&limit=10&query=cat&client_id=kQ_rA8Dd9Tb-JZ80Nx6RyFBtaoIFyaP5kdLn5EmGkVM`,
      ).then((res) => res.json())
    }
    getData().then((res) =>  dispatch({ type: "fetching", payload: res.results }))
    .catch((error)=> dispatch({ type: "error", payload: error}))
    return () => {
      abortController.abort()
    }
  }, [page])
  return (
    <div>
     <header > <h2 className='title'> Cats Lovers </h2>
     <p className='quote'>“There are two means of refuge from the miseries of life: music and cats.” – Albert Schweitzer</p>
     </header>
   {
     state.loading? <div className='loading'>   <Spin size="large"/> </div>: (state.error?<div> </div>: 
      (state.data.length>0?<Cards data={state.data} />:<Empty />))
   }
   <div className='pagination'>
     <Pagination
        defaultCurrent={1}
        defaultPageSize={1} //default size of page
        onChange={handleChange}
        total={5} //total number of card data available
      />
      </div>
    </div>
  )
}

export default Page
