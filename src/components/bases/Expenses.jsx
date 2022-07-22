import React from "react";

export default function Expenses(props) {
  const [expenses, setExpenses] = React.useState([
    {
      id: 1,
      symbol: "$",
      name: "Rent",
      amount: 1000,
      category: "monthly",
    },
    {
      id: 2,
      symbol: "$",
      name: "Milk",
      amount: 100,
      category: "daily",
    },
  ]);
  const [categories, setCategories] = React.useState(["monthly", "daily"]);
  const addExpense = (e) => {
    if (e.target.value !== "" && e.keyCode === 13) {
      setExpenses([
        ...expenses,
        {
          id: expenses.length + 1,
          symbol: e.target.value.slice(0, 0),
          name: e.target.value.slice(e.target.value.indexOf(" ")),
          amount: parseInt(
            e.target.value.slice(1, e.target.value.indexOf(" "))
          ),
          category: "other",
        },
      ]);
      console.log(1);
    }
  };
  return (
    <div>
      <h1>Expenses</h1>
      <div>
        <input
          type={"text"}
          onChange={(e) => addExpense(e)}
          placeholder={"$2000 elon musk"}
        />
      </div>
      <div>
        <table>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.symbol}</td>
              <td>{expense.amount}</td>
              <td>{expense.name}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
