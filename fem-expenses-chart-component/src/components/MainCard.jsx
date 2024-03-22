import { useEffect, useState } from "react";
import data from "../data.json";

function Total({total}) {
  return (
    <div className="total">
      <div>
        <p className="subheading">Total this month</p>
        <h3>{`$${total}`}</h3>
      </div>
      <div>
        <p>+2.4%</p>
        <p className="subheading">from last month</p>
      </div>
    </div>
  );
}

function addAmounts(arr) {
  const amounts = arr.map((obj) => obj.amount);
  return amounts.reduce((acc, cur) => acc + cur);
}

export default function MainCard({total, setTotal}) {
  const height = 200;
 
  const [today, setToday] = useState(0);
  useEffect(() => {
    const total = addAmounts(data);
    setTotal(total);
    const d = new Date();
    const day = d.getDay();
    setToday(day);
  }, []);
  useEffect(() => console.log(total), [total]);
  return (
    <div className="main-card">
      <div>
        <h3>Spending - Last 7 days</h3>
        <div
          className="days-chart"
          style={{
            display: "grid",
            width: "100%",
            height: `${height}px`,
            gridTemplateColumns: `repeat(${data.length}, 1fr)`,
          }}
        >
          {data.map((obj, idx) => {
            return (
              <div className="chart-div">
                <div
                  style={{
                    backgroundColor: `${(idx +1 === today)? 'var(--clr-cyan)': "var(--clr-sft-red)"}`,
                    height: `${(obj.amount / total) * height * 2}px`,
                    width: "40px",
                    borderRadius: "5px",
                  }}
                ></div>
                <p className="subheading">{obj.day}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Total total={total}/>
    </div>
  );
}
