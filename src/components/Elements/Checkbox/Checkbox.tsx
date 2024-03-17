import styled from "styled-components";
import React, {ReactNode} from "react";


const Container = styled.div`
  display: flex;
  align-items: center;
`
const Input = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;

  &:checked + label::before {
    border-color: gray;
    background-color: darkgray;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }

  & + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
    max-width: 450px;
    overflow: hidden;

    &:before {
      content: '';
      display: inline-block;
      width: 1em;
      height: 1em;
      flex-shrink: 0;
      flex-grow: 0;
      border: 1px solid #adb5bd;
      border-radius: 0.25em;
      margin-right: 0.5em;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 50% 50%;
    }
  }
`

interface InputProps {
    id: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    checked: boolean;
    text: ReactNode;
}


const Checkbox:React.FC<InputProps> = ({id, checked, onChange, text} ) => {
    return (
        <Container>
            <Input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                id={id}
            />
            <label htmlFor={id}>{text}</label>
        </Container>
    );
};

export default Checkbox;