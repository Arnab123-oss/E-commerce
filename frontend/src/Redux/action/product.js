import { server } from '../store';
import axios from 'axios';


export const getAllProducts = () =>
  async dispatch => {
    try {
      dispatch({ type: 'getAllProductRequest' });
      const { data } = await axios.get(
        `${server}/products`
      );
      // console.log(data);
      dispatch({ type: 'getAllProductSuccess', payload: data});
    } catch (error) {
      // console.log(response.message)
      dispatch({
        type: 'getAllProductFail',
        payload: error.response.data.message,
      });
    }
  };


  export const getSingleProducts = (id) =>
  async dispatch => {
    try {
      dispatch({ type: 'productDetailsRequest' });
      const { data } = await axios.get(
        `${server}/product/${id}`
      );
      // console.log(data);
      dispatch({ type: 'productDetailsSuccess', payload: data.product});
    } catch (error) {
      // console.log(error)
      dispatch({
        type: 'productDetailsFail',
        payload: error.response.data.message,
      });
    }
  };

