import MyBalance from "./components/MyBalance";
import MainCard from "./components/MainCard";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(1000);
  const [total, setTotal] = useState(0);
  return (
    <>
      <MyBalance balance={balance} setBalance={setBalance} total={total}></MyBalance>
      <MainCard total={total} setTotal={setTotal}></MainCard>
    </>
  );
}

export default App;
