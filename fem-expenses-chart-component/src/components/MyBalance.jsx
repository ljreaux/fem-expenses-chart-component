import { useEffect } from "react";
import logo from "../assets/logo.svg";

export default function MyBalance({ balance, setBalance, total }) {
  useEffect(() => {
    setBalance((prev) => {
      return Math.round((prev - total)*100)/100;
    });
  }, [total]);

  return (
    <div className="myBalance">
      <div>
        <p>My balance</p>
        <h3>{`$${balance}`}</h3>
      </div>
      <img src={logo} alt="logo" />
    </div>
  );
}
