import React, {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

interface IInitState {
  user: {
    isAuthenticated: boolean;
    email: string;
  };
  totalScore: number;
  currentQuestion: null | IQuestion;
}

export const SET_USER = "SET_USER";

export const SET_TOTAL = "SET_TOTAL";

export const SET_QUESTION = "SET_QUESTION";

export interface ISetUser {
  type: typeof SET_USER;
  payload: {
    isAuthenticated: boolean;
    email: string;
  };
}

export interface ISetTotal {
  type: typeof SET_TOTAL;
}

export interface ISetQuestion {
  type: typeof SET_QUESTION;
  payload: {
    question: null;
  };
}

type RootActionType = ISetQuestion | ISetUser | ISetTotal;

const initState: IInitState = {
  user: {
    isAuthenticated: false,
    email: "",
  },
  totalScore: 0,
  currentQuestion: null,
};

function reducer(state = initState, action: RootActionType): IInitState {
  switch (action.type) {
    case SET_USER: {
      const { payload } = action;

      console.log({ payload });
      return {
        ...state,
        user: {
          isAuthenticated: payload.isAuthenticated,
          email: payload.email,
        },
      };
    }

    case SET_TOTAL: {
      return {
        ...state,
        totalScore: state.totalScore + 1,
      };
    }

    case SET_QUESTION: {
      const { payload } = action;

      return {
        ...state,
        currentQuestion: payload.question,
      };
    }

    default:
      return state;
  }
}

// actions

const actions = {
  setUser(payload: ISetUser["payload"]): ISetUser {
    return {
      type: SET_USER,
      payload: {
        isAuthenticated: payload.isAuthenticated,
        email: payload.email,
      },
    };
  },
  setTotal(): ISetTotal {
    return {
      type: SET_TOTAL,
    };
  },
  setQuestion(question: any): ISetQuestion {
    return {
      type: SET_QUESTION,
      payload: {
        question,
      },
    };
  },
};

// export default function useTriviaStore(): {
//   state: IInitState;
//   dispatch: Dispatch<RootActionType>;
//   actions: typeof actions;
// } {
//   const [state, dispatch] = useReducer(reducer, initState);

//   console.log({ state });

//   return { state, dispatch, actions };
// };

const TriviaContext = createContext({
  state: initState,
  dispatch: (k: RootActionType) => {},
  actions,
});

interface ITriviaStoreProps {
  children: ReactNode;
}

export function TriviaStore(props: ITriviaStoreProps) {
  const [state, dispatch] = useReducer(reducer, initState);

  console.log({ state });

  return (
    <TriviaContext.Provider
      value={{
        state: {
          user: state.user,
          totalScore: state.totalScore,
          currentQuestion: state.currentQuestion,
        },
        dispatch,
        actions,
      }}
    >
      {props.children}
    </TriviaContext.Provider>
  );
}

export const useTriviaStore = () => useContext(TriviaContext);
