const cartActions = {
  open: 'open',
  close: 'close',
  sync: 'sync',
  notSyncing: 'not_syncing',
  error: 'error',
  dismissError: 'dismiss_error',
  updateCart: 'update',
  addItem: 'add_item',
};

const initialState = {
  cart: [],
  isCartOpen: false,
  isCartSyncing: false,
  error: '',
};

function cartReducer(state, action) {
  switch (action.type) {
    case cartActions.open:
      return {
        ...state,
        isCartOpen: true,
      };
    case cartActions.close:
      return {
        ...state,
        isCartOpen: false,
      };
    case cartActions.sync:
      return {
        ...state,
        isCartSyncing: true,
      };
    case cartActions.notSyncing:
      return {
        ...state,
        isCartSyncing: false,
      };
    case cartActions.updateCart: {
      return {
        ...state,
        cart: action.cart,
      };
    }
    case cartActions.addItem: {
      const inventoryItem = action.inventory.find(
        (item) => item.id === action.id
      );
      if (!inventoryItem) {
        return state;
      }
      const itemToUpdate = state.cart.find(
        (item) => item.productId === action.id
      );
      let updatedCartItem;
      if (itemToUpdate) {
        updatedCartItem = {
          ...itemToUpdate,
          quantity: itemToUpdate.quantity + 1,
        };
      } else {
        updatedCartItem = {
          ...inventoryItem,
          quantity: 1,
          productId: inventoryItem.id,
        };
      }
      return {
        ...state,
        cart: [
          ...state.cart.filter((item) => item.productId !== action.id),
          updatedCartItem,
        ],
      };
    }
    case cartActions.reset:
      return {
        ...initialState,
      };
    case cartActions.error:
      return {
        ...state,
        error: action.message,
        isCartSyncing: false,
      };
    case cartActions.dismissError:
      return {
        ...state,
        error: '',
      };
  }
}

export { cartActions, initialState, cartReducer };
