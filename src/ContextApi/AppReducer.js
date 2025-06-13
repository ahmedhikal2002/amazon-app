export const rate = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 !== 0;
  for (let i = 0; i < fullStars; i++) {
    stars.push(<i className="fa-solid fa-star" key={i}></i>);
  }
  if (halfStars) {
    stars.push(<i className="fa-solid fa-star-half" key="half"></i>);
  }
  return stars;
};
export const totalQuantity = (basket) => {
  return basket.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
};
export const totalPrice = (basket) => {
  return basket.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
};

export const initialstate = {
  user: null,
  basket: [],
};

export const AppReducer = (state = initialstate, action) => {
  const findItem = state?.basket?.find(
    (item) => item?.id === action?.basket?.id
  );
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "ADD_TO_BASKET":
      if (findItem) {
        const update = state.basket.map((item) => {
          if (item.id === action.basket.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        return {
          ...state,
          basket: update,
        };
      } else {
        return {
          ...state,
          basket: [...state.basket, { ...action.basket, quantity: 1 }],
        };
      }
    case "DECREASE_QUANTITY":
      if (findItem) {
        const updateBasket = state.basket.map((item) => {
          if (item.id === action.basket.id) {
            if (item.quantity > 1) {
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            } else {
              return item;
            }
          } else {
            return item;
          }
        });
        return {
          ...state,
          basket: updateBasket,
        };
      } else {
        return state;
      }
    case "REMOVE_BASKET":
      const filterBasket = state.basket.filter(
        (item) => item.id !== action.basket.id
      );
      return {
        ...state,
        basket: filterBasket,
      };
    case "CLEAR_BASKET":
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};
