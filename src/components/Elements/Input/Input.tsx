    import styled from "styled-components";
    import React from "react";


    const InputItem = styled.input<{ isActive?: boolean }>`
        padding: 10px;
        margin: 5px;
        border: none;
        width: 433px;
    `;

    interface InputProps {
        onChange: React.ChangeEventHandler<HTMLInputElement>;
        value?: string;
    }

    const Input:React.FC<InputProps> = ({onChange, value }) => {
        return (
            <InputItem
                type="text"
                value={value}
                onChange={onChange}
            />
        );
    };

    export default Input;