import React, { Component } from "react";

class App extends Component {
  state = {
    data: [
      { id: 1, name: "Hello" },
      { id: 2, name: "adsff" },
      { id: 3, name: "component" },
      { id: 4, name: "react" },
      { id: 5, name: "title" },
      { id: 7, name: "ref" },
      { id: 8, name: "target" },
      { id: 9, name: "enter" },
    ],
    selected: null,
    newName: "",
  };
  render() {
    const inputRef = React.createRef("");

    const onEdit = (value) => {
      this.setState({ selected: value });
    };

    const onSave = ({ target }) => {
      console.log(inputRef.current.value);
      let res = this.state.data.map((value) =>
        value.id === this.state.selected?.id
          ? { ...value, name: inputRef.current.value }
          : value
      );
      this.setState({ data: res, selected: null });
    };

    const onCancel = () => {
      this.setState({ selected: null });
    };

    const onkeydown = (e) => {
      if (e.key === "Enter") {
        let obj = {
          id: Date.now(),
          name: e.target.value,
        };
        console.log(obj);
        this.setState({ data: this.state.data.concat(obj) });
        e.target.value = "";
      }
    };

    const onchange = ({ target }) => {
      this.setState({ newName: target.value });
    };

    return (
      <div className="App flex items-center justify-center flex-col mt-6">
        <h1 className="text-3xl font-bold underline">CRUD</h1>
        <div className="flex items-center justify-center">
          <input
            onKeyDown={onkeydown}
            onChange={onchange}
            maxLength={100}
            className="border-green-500 text-black border-4 mt-7 outline-none rounded-md px-2 py-2"
            type="text"
          />
        </div>
        <div>
          {this.state.data.map((value) => (
            <div key={value.id}>
              <div className="flex mt-2 justify-between gap-4 w-full items-center">
                {this.state.selected?.id === value.id ? (
                  <>
                    <input
                      ref={inputRef}
                      className="text-black"
                      type="text"
                      defaultValue={this.state.selected.name}
                    />
                  </>
                ) : (
                  <p>{value.name}</p>
                )}
                <div className="flex gap-3">
                  {this.state.selected?.id === value.id ? (
                    <>
                      <button onClick={onSave}>Save</button>
                      <button onClick={onCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => onEdit(value)}
                        className="border border-green-700 px-2"
                      >
                        Edit
                      </button>
                      <button className="border border-red-700 px-2">x</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
