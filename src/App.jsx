import Card from "./components/Card";
import Checkout from "./components/Checkout";

import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";

function App() {
  return (
    <>
      <CartContextProvider>
        <UserProgressContextProvider>
          <Header />
          <Meals />
          <Card />
          <Checkout/>
        </UserProgressContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
