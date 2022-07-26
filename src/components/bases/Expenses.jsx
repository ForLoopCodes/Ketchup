import React from "react";

export default function Expenses(props) {
  const [symbol, setSymbol] = React.useState("$");
  const [expenses, setExpenses] = React.useState([
    {
      id: 1,
      name: "Rent",
      amount: 1000,
      category: "monthly",
      date: "01-01-2020",
    },
    {
      id: 2,
      name: "Milk",
      amount: 100,
      category: "daily",
      date: "01-02-2020",
    },
    {
      id: 3,
      name: "Lambo",
      amount: 10,
      category: "daily",
      date: "01-01-2020",
    },
    {
      id: 4,
      name: "Bread",
      amount: 10000,
      category: "daily",
      date: "01-02-2020",
    },
  ]);
  const [dates, setDates] = React.useState(["01-01-2020", "01-02-2020"]);
  const addExpense = (e) => {
    if (
      e.key === "Enter" &&
      e.target.value !== "" &&
      e.target.value.slice(e.target.value.indexOf(" ")).length > 1 &&
      e.target.value.slice(1, e.target.value.indexOf(" ")) !== "" &&
      parseFloat(
        parseFloat(
          e.target.value.slice(symbol.length, e.target.value.indexOf(" ") + 1)
        ).toFixed(2)
      ) > 0
    ) {
      setExpenses([
        ...expenses,
        {
          id: expenses.length + 2,
          name: e.target.value.slice(e.target.value.indexOf(" ") + 1),
          amount: parseFloat(
            parseFloat(
              e.target.value.slice(
                symbol.length,
                e.target.value.indexOf(" ") + 1
              )
            ).toFixed(2)
          ),
          category: "other",
          date: `${new Date().getDate().toString().padStart(2, "0")}-${(
            new Date().getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${new Date().getFullYear()}`,
        },
      ]);
      if (
        !dates.includes(
          `${new Date().getDate().toString().padStart(2, "0")}-${(
            new Date().getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${new Date().getFullYear()}`
        )
      ) {
        setDates([
          ...dates,
          `${new Date().getDate().toString().padStart(2, "0")}-${(
            new Date().getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${new Date().getFullYear()}`,
        ]);
      }
    }
  };
  const returnTotalOfDate = (date) => {
    let total = 0;
    expenses.forEach((expense) => {
      if (expense.date === date) {
        total += expense.amount;
      }
    });
    return total;
  };
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };
  const renameExpense = (e, expenseid) => {
    if (
      e.key === "Enter" &&
      e.target.value !== "" &&
      e.target.value.slice(e.target.value.indexOf(" ")).length > 1 &&
      e.target.value.slice(1, e.target.value.indexOf(" ")) !== "" &&
      parseFloat(
        parseFloat(
          e.target.value.slice(symbol.length, e.target.value.indexOf(" ") + 1)
        ).toFixed(2)
      ) > 0
    ) {
      console.log(
        parseFloat(
          parseFloat(
            e.target.value.slice(symbol.length, e.target.value.indexOf(" ") + 1)
          ).toFixed(2)
        )
      );
      setExpenses(
        expenses.map((expense) => {
          expenseid === expense.id &&
            (expense.amount = parseFloat(
              parseFloat(
                e.target.value.slice(
                  symbol.length,
                  e.target.value.indexOf(" ") + 1
                )
              ).toFixed(2)
            ));
          expenseid === expense.id &&
            (expense.name = e.target.value.slice(
              e.target.value.indexOf(" ") + 1
            ));
          return expense;
        })
      );
    }
  };
  const returnExpensesOfDate = (date) => {
    return expenses.filter((expense) => expense.date === date);
  };
  return (
    <div>
      <h1>Expenses</h1>
      <div>
        <input
          type="text"
          placeholder={"Set Currency..."}
          maxLength="3"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value !== "") {
              setSymbol(e.target.value);
            }
          }}
        />
        <br />
        <input
          onFocus={(e) =>
            e.target.value === "" ? (e.target.value = symbol) : null
          }
          onBlur={(e) => (e.target.value = "")}
          type={"text"}
          onKeyDown={(e) => addExpense(e)}
          placeholder={symbol + "2000 elon musk"}
        />
      </div>
      {expenses.length === 0 && (
        <div>
          <h2>No Expenses</h2>
        </div>
      )}
      {dates.map((date) =>
        returnExpensesOfDate(date).length > 0 ? (
          <div key={date}>
            <h3>{date}</h3>
            <div>
              <table>
                {returnExpensesOfDate(date).map((expense) => (
                  <tbody key={expense.id}>
                    <tr key={date.indexOf(expense.date)}>
                      <td>{symbol}</td>
                      <td>{expense.amount}</td>
                      <td>{expense.name}</td>
                      <td>
                        <button onClick={() => deleteExpense(expense.id)}>
                          Delete
                        </button>
                        <input
                          onFocus={(e) =>
                            e.target.value === ""
                              ? (e.target.value = symbol + expense.amount + " ")
                              : null
                          }
                          onBlur={(e) => (e.target.value = "")}
                          type={"text"}
                          onKeyDown={(e) => renameExpense(e, expense.id)}
                          placeholder={
                            symbol + expense.amount + " " + expense.name
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                ))}
                <tfoot>
                  <tr>
                    <td style={{ borderTop: "1px solid black" }}>{symbol}</td>
                    <td style={{ borderTop: "1px solid black" }}>
                      {returnTotalOfDate(date)}
                    </td>
                    <td style={{ borderTop: "1px solid black" }}>Total</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}
