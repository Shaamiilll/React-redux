const createSlice = require("@reduxjs/toolkit").createSlice;
const initialState = {
  numOfCake: 10,
};
const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfCake--;
    },
    restocked: (state, action) => {
      state.numOfCake += action.payload;
    },
  },
});

module.exports = cakeSlice.reducer
module.exports.cakeActions = cakeSlice.actions
