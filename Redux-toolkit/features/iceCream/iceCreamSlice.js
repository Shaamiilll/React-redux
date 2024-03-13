const createSlice = require("@reduxjs/toolkit").createSlice;
const initialState = {
  numOfIceCream: 20,
};
const IceCreamSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfIceCream--;
    },
    restocked: (state, action) => {
      state.numOfIceCream += action.payload;
    },
  },
});

module.exports = IceCreamSlice.reducer;
module.exports.icecreamActions = IceCreamSlice.actions;
