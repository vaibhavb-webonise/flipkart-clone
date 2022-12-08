import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AdminAdd } from './AdminAdd';
import { useUserValue } from './helpers/ContextInfo';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { fetchAPIResponse } from './Utils';
import { CircularProgress } from '@mui/material';
import HomeComponent from './components/HomeComponent';

const App = () => {
  const [, dispatch] = useUserValue();
  const [cookie] = useCookies(['user']);
  const { userId, AuthToken } = cookie ?? {};
  const [loading, setLoading] = useState();

  const getUser = async () => {
    if (!AuthToken) {
      const data = {
        user: null,
        isLoggedIn: false
      }
      dispatch({ type: 'SET_USER', data })
      return;
    }

    try {
      const resp = await fetchAPIResponse('getuser', null, { userId, AuthToken });
      if (resp.status !== 200) {
        const data = {
          user: null,
          isLoggedIn: false
        }
        dispatch({ type: 'SET_USER', data })
        return;
      }
      const data = {
        user: resp.data,
        isLoggedIn: true
      }
      dispatch({ type: 'SET_USER', data });

    } catch (err) {
      //
    }

  }

  const getArticles = async () => {
    try {
      const resp = await fetchAPIResponse('getad');
      dispatch({
        type: 'SET_ADS',
        ads: resp.data
      })
    } catch {
      //
    }
  }

  const getOfferCardData = async () => {
    try {
      const resp = await fetchAPIResponse('getoffer');
      dispatch({
        type: 'SET_OFFERS',
        offer: resp.data
      })
    } catch {
      //nothing to do 
    }
  }
  useEffect(() => {
    setLoading(true);
    getUser();
    getArticles();
    getOfferCardData();
    setLoading(false);
  }, []);


  return (
    loading ? <CircularProgress /> :
      <>
        <Router>
          <Routes>
            <Route path="/" element={< HomeComponent />}
            />
            <Route path="/admin/add" element={<AdminAdd />} />
          </Routes>
        </Router></>
  )
}

export default App;
