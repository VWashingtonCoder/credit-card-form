import React from "react";
import InputBase from "../InputBase/InputBase";
import "./Form.css";

const INIT_CARD = {
  card: "",
  cardHolder: "",
  expiry: "",
  securityCode: "",
};

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      cardData: INIT_CARD,
      maxLength: 19,
    };
  }

  handleInputData = (e) => {
    if (e.target.name === "card") {
      let mask = e.target.value.split(" ").join("");
      if (mask.length) {
        mask = mask.match(new RegExp(".{1,4}", "g")).join(" ");
        this.setState((prevState) => ({
          cardData: {
            ...prevState.cardData,
            [e.target.name]: mask,
          },
        }));
      } else {
        this.setState((prevState) => ({
          cardData: {
            ...prevState.cardData,
            [e.target.name]: "",
          },
        }));
      }
    } else {
      this.setState((prevState) => ({
        cardData: {
          ...prevState.cardData,
          [e.target.name]: e.target.value,
        },
      }));
    }
  };

  render() {
    const inputData = [
      { label: "Card Number", name: "card", type: "text" },
      { label: "CardHolder's Name", name: "cardHolder", type: "text" },
      { label: "Expiry Date (MM/YY)", name: "expiry", type: "text" },
      { label: "Security Code", name: "securityCode", type: "text" },
    ];

    return (
      <div>
        <h1>Add New Card</h1>
        <form>
          {inputData.length
            ? inputData.map((item) => (
                <InputBase
                  placeholder={item.label}
                  type={item.type}
                  value={this.state.cardData && this.state.cardData[item.name]}
                  onChange={this.handleInputData}
                  autoComplete="off"
                  maxLength={this.state.maxLength}
                  name={item.name}
                />
              ))
            : null}
          <div className="btn-wrapper">
            <InputBase type="submit" value="Add Card" />
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
