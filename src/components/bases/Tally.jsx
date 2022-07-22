import React from "react";

export default function Tally(props) {
  const [tallies, setTallies] = React.useState(props.tallies);
  const [categories, setCategories] = React.useState(["other", "work", "home"]);
  const minusCount = (id) => {
    setTallies(
      tallies.map((tally) => {
        if (tally.id === id) {
          tally.val > 0 && tally.val--;
        }
        return tally;
      })
    );
  };
  const deleteTally = (id) => {
    setTallies(tallies.filter((tally) => tally.id !== id));
  };
  const addCount = (id) => {
    setTallies(
      tallies.map((tally) => {
        if (tally.id === id) {
          tally.val++;
        }
        return tally;
      })
    );
  };
  const newTally = (e) => {
    if (e.keyCode === 13 && e.target.value !== "") {
      setTallies([
        ...tallies,
        {
          id: tallies.length + 1,
          val: 0,
          name: e.target.value,
        },
      ]);
    }
  };
  const addCategory = (e) => {
    if (e.keyCode === 13 && e.target.value !== "") {
      setCategories([...categories, e.target.value]);
    }
  };
  const deleteCategory = (category) => {
    setCategories(categories.filter((cat) => cat !== category));
    setTallies(
      tallies.map((tally) => {
        if (tally.category === category) {
          tally.category = "other";
        }
        return tally;
      })
    );
  };
  const returnTallyOfCategory = (category) => {
    return tallies.filter((tally) => tally.category === category);
  };
  const addTallyOfCategory = (e, category) => {
    if (e.keyCode === 13 && e.target.value !== "") {
      setTallies([
        ...tallies,
        {
          id: tallies.length + 1,
          category: category,
          val: 0,
          name: e.target.value,
        },
      ]);
    }
  };
  const moveCategory = (id, category) => {
    setTallies(
      tallies.map((tally) => {
        if (tally.id === id) {
          tally.category = category;
        }
        return tally;
      })
    );
  };
  const renameTally = (e, id) => {
    if (e.keyCode === 13 && e.target.value !== "") {
      setTallies(
        tallies.map((tally) => {
          if (tally.id === id) {
            tally.name = e.target.value;
          }
          return tally;
        })
      );
    }
  };
  return (
    <div>
      <h1>Tally Counter.</h1>
      <div>
        <h2>All Tallies:</h2>
        <input type="text" onKeyDown={newTally} placeholder="Add tally." />
        <ul>
          {tallies.map((tally) => (
            <li key={tally.id}>
              <button onClick={() => minusCount(tally.id)}>➖</button>
              {tally.val}
              <button onClick={() => addCount(tally.id)}>➕</button>
              <button onClick={() => deleteTally(tally.id)}>🗑️</button>
              {tally.name}
              <input
                type="text"
                onKeyDown={(e) => renameTally(e, tally.id)}
                placeholder="Rename..."
              />
              <select
                onChange={(e) => moveCategory(tally.id, e.target.value)}
                value={tally.category}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Tallies of Category:</h2>
        {categories.map((category) => (
          <div key={category}>
            <h3>
              # {categories.indexOf(category) + 1} | {category} | (
              {returnTallyOfCategory(category).length} Tallies.){" "}
            </h3>
            {category !== categories.slice(0, 1)[0] && (
              <div>
                <button onClick={() => deleteCategory(category)}>🗑️</button>
                <input
                  type="text"
                  onKeyDown={(e) => addTallyOfCategory(e, category)}
                  placeholder="Add tally."
                />
              </div>
            )}
            <p>
              {returnTallyOfCategory(category).length === 0 &&
                "You dont have any tallies in this category."}
            </p>
            <ul>
              {returnTallyOfCategory(category).map((tally) => (
                <li key={tally.id}>
                  <button onClick={() => minusCount(tally.id)}>➖</button>
                  {tally.val}
                  <button onClick={() => addCount(tally.id)}>➕</button>
                  <button onClick={() => deleteTally(tally.id)}>🗑️</button>
                  {tally.name}
                  <input
                    type="text"
                    onKeyDown={(e) => renameTally(e, tally.id)}
                    placeholder="Rename..."
                  />
                  <select
                    onChange={(e) => moveCategory(tally.id, e.target.value)}
                    value={tally.category}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <h3>
        Add Category:
        <br />
        <input
          type="text"
          onKeyDown={addCategory}
          placeholder="Add category."
        />
      </h3>
    </div>
  );
}
