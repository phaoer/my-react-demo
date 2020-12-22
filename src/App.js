import React, {useEffect, createContext, useContext, useReducer} from 'react';
import {initStatus, reducer} from './component/reducer';

const _STATE = createContext();
const _DISPATCH = createContext();

const creator = (type, payload, error) => {
  return {
      type: type,
      payload,
      error
  }
}

function App (){
  const [state, dispatch] = useReducer(reducer, initStatus);

  return <React.Fragment>
          <_STATE.Provider value={state}>
            <_DISPATCH.Provider value={dispatch}>
                <Child />
            </_DISPATCH.Provider>
          </_STATE.Provider>
        </React.Fragment>
}

function Child(){
  const state = useContext(_STATE);
  const dispatch = useContext(_DISPATCH);

  const getList = async () => {
    try {
      const res = await fetch('http://www.web.com/test.php').then((res) => res.json());
      dispatch(creator("getList", {
        list:res
      }));
    } catch (error) {
      alert(error);
    }
  }

  return <React.Fragment>
          <div>{state.count}</div>
          <button onClick = {() => dispatch(creator("add"))}>增加</button>
          <button onClick = {() => dispatch(creator("reduce"))}>减少</button>
          <div><button onClick = {() => getList()}>获取我的github仓库</button></div>
          <table style={{textAlign: 'center'}}>
            <tr>
              <th>
                仓库名
              </th>
              <th>
                仓库地址
              </th>
            </tr>
            {
              state.list.map((item, index) => {
                return <tr key={'line' + index}>
                    <td>
                      {item.name}
                    </td>
                    <td>
                      {item.html_url}
                    </td>
                  </tr>
              })
            }
          </table>
        </React.Fragment>
}
export default App;
