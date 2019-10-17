import { createStore, combineReducers, applyMiddleware } from "redux";
import { createForms } from "react-redux-form";
import { Dishes } from "./dishes";
import { Leaders } from "./leaders";
import { Promotions } from "./promotions";
import { Comments } from "./comments";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { initialFeedback } from "./forms";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      leaders: Leaders,
      promotions: Promotions,
      comments: Comments,
      ...createForms({
        feedback: initialFeedback
      })
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
