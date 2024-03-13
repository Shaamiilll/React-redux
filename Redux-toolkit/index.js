const store = require("./app/store");
const cakeActions  = require('./features/cake/cakeSlice').cakeActions
console.log("initial State", store.getState());
const unsubscribe = store.subscribe(() => {
  console.log("updated State", store.getState());
});

store.dispatch(cakeActions.ordered())
store.dispatch(cakeActions.ordered())
store.dispatch(cakeActions.ordered())

store.dispatch(cakeActions.restocked(10))
unsubscribe()