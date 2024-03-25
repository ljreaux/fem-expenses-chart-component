import { useEffect, useState } from "react";
import data from "../data.json";

function Total({ total }) {
  const lastMonth = 200;
  const [percentage, setPercentage] = useState("");
  function calcPercentage(lastMonth) {
    if (total < lastMonth) {
      return `-${Math.abs(100 - Math.round((lastMonth / total) * 100))}%`;
    } else {
      return `+${Math.abs(100 - Math.round((total / lastMonth) * 100))}%`;
    }
  }

  useEffect(() => {
    const percentage = calcPercentage(lastMonth);
    setPercentage(percentage);
  }, [total]);

  return (
    <div className="total">
      <div>
        <p className="subheading total2">Total this month</p>
        <h3>{`$${total}`}</h3>
      </div>
      <div>
        <p className="percentage">{percentage}</p>
        <p className="subheading text">from last month</p>
      </div>
    </div>
  );
}

function addAmounts(arr) {
  const amounts = arr.map((obj) => obj.amount);
  return amounts.reduce((acc, cur) => acc + cur);
}

export default function MainCard({ total, setTotal }) {
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
            paddingTop: "1rem",
            gridTemplateColumns: `repeat(${data.length}, 1fr)`,
          }}
        >
          {data.map((obj, idx) => {
            return (
              <div className="chart-div">
                <div
                  style={{
                    backgroundColor: `${
                      idx + 1 === today
                        ? "var(--clr-cyan)"
                        : "var(--clr-sft-red)"
                    }`,
                    height: `${(obj.amount / total) * height}px`,
                    width: "40px",
                    borderRadius: "5px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      background: "var(--clr-dark-brown)",
                      color: "var(--clr-pale-orange)",
                      position: "absolute",
                      top: "-.5rem",
                      left: 0,
                      translate: "-25% -100%",
                      padding: ".25em",
                      margin: ".25em",
                      borderRadius: ".25em",
                      zIndex: '10'
                    }}
                  >
                    {`$${obj.amount}`}
                  </div>
                </div>

                <p className="subheading days">{obj.day}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Total total={total} />
    </div>
  );
}
