import React from "react";
import { OTHERCARDS } from "../constants";
import InputBase from "../InputBase/InputBase";
import { 
  cardExpireValidation, 
  cardNumberValidation, 
  onlyTextValidation, 
  securityCodeValidation 
} from "../validations";
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
      maxLength: OTHERCARDS.length,
      error: {},
      cardType: null,
    };
  }

  findDebitCardType = (cardNumber) => {
    const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
      // AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/
    };
    for(const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) return card;
    }
    return '';
  }

  handleValdations = (type, value) => {
    let errorText;

    switch(type) {
      case 'card':
        errorText = cardNumberValidation(value);
        this.setState((prevState) => ({ 
          cardType: this.findDebitCardType(value),
          error: {
            ...prevState.error,
            cardError: errorText
          }, 
        }));
        break;
      case 'cardHolder':
        errorText = onlyTextValidation(value)
        this.setState((prevState) => ({ error: { ...prevState.error, cardHolderError: errorText }}));
        break;
      case 'expiry':
        errorText = cardExpireValidation(value);
        this.setState((prevState) => ({ error: { ...prevState.error, expiryError: errorText }}));
        break;
      case 'securityCode':
        errorText = securityCodeValidation(3, value);
        this.setState((prevState) => ({ error: { ...prevState.error, securityCodeError: errorText }}));
        break;
      default:
        break;
    }
  }

  handleBlur = ({ target: {name, value} }) => this.handleValdations(name, value)

  handleInputData = ({ target: {name, value} }) => {
    if (name === "card") {
      let mask = value.split(" ").join("");
      if (mask.length) {
        mask = mask.match(new RegExp(".{1,4}", "g")).join(" ");
        this.setState((prevState) => ({
          cardData: {
            ...prevState.cardData,
            [name]: mask,
          },
        }));
      } else {
        this.setState((prevState) => ({
          cardData: {
            ...prevState.cardData,
            [name]: "",
          },
        }));
      }
    } else {
      this.setState((prevState) => ({
        cardData: {
          ...prevState.cardData,
          [name]: value,
        },
      }));
    }
  };

  checkErrorBeforeSave = () => {
    const { cardData } = this.state;
    let errorValue = {};
    let isError = false;
    Object.keys(cardData).forEach((val) => {
      if (!cardData[val].length) {
        errorValue = { ...errorValue, [`${val}Error`] : 'Required' };
        isError = true;
      }
    });
    Object.keys(errorValue).forEach((val) => {
      this.setState((prevState) => ({
        error: {
          ...prevState.error, 
          [val]: errorValue[val]
        }
      }));
    });
    
    return isError;
  }

  handleAddCard = (e) => {
    e.preventDefault();
    const errorCheck = this.checkErrorBeforeSave();
    console.log(errorCheck)
    if (!errorCheck || !Object.keys(this.state.error).length) {
      this.setState({
        cardData: INIT_CARD,
        cardType: null
      });
    }
  }
  render() {
    const { cardData, error, cardType, maxLength } = this.state;
    const inputData = [
      { label: "Card Number", name: "card", type: "text", error: 'cardError' },
      { label: "CardHolder's Name", name: "cardHolder", type: "text", error: 'cardHolderError' },
      { label: "Expiry Date (MM/YY)", name: "expiry", type: "text", error: 'expiryError' },
      { label: "Security Code", name: "securityCode", type: "text", error: 'securityCodeError' },
    ];

    return (
      <div>
        <h1>Add New Card</h1>
        <form onSubmit={this.handleAddCard}>
          {inputData.length
            ? inputData.map((item) => (
                <InputBase
                  placeholder={item.label}
                  type={item.type}
                  value={cardData && cardData[item.name]}
                  onChange={this.handleInputData}
                  autoComplete="off"
                  maxLength={maxLength}
                  name={item.name}
                  onBlur={this.handleBlur}
                  error={error}
                  cardType={cardType}
                  isCard={item.name === 'card'}
                  errorM={
                    (error
                    && error[item.error]
                    && error[item.error].length > 1)
                      ? error[item.error]
                      : null
                  }
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
