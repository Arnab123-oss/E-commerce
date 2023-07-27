import { server } from '../store';
import axios from 'axios';

export const getAllProducts = (category = '', keyword = '') =>
  async dispatch => {
    try {
      dispatch({ type: 'getAllProductRequest' });
      const { data } = await axios.get(
        `${server}/products?keyword=${keyword}&category=${category}`
      );
      dispatch({ type: 'getAllProductSuccess', payload: data });
    } catch (error) {
      dispatch({
        type: 'getAllProductFail',
        payload: error.response.data.message,
      });
    }
  };