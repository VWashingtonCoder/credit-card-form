import React from "react";
import InputBase from "../InputBase/InputBase";
import './Form.css';

class Form extends React.Component {

    render() {
        return (
            <div>
                <h1>Add New Card</h1>
                <form>
                    <InputBase />
                    <InputBase />
                    <InputBase />
                    <InputBase />
                    <div className="btn-wrapper">
                        <InputBase type="submit" value="Add Card"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default Form;