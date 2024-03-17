import styled from "styled-components";
import {ReactNode} from "react";

interface BtnProps {
    isActive?: boolean;
}

const Btn = styled(({ isActive, ...props }: BtnProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props} />)<BtnProps>`
  background: none;
  border-radius: 5px;
  padding: 10px;
  border: ${(props) => (props.isActive ? '1px solid #d6d6d6' : '1px solid #ebecf0')};
  margin-left: 5px;
`;

interface ButtonProps extends BtnProps{
    children: ReactNode;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, isActive }) => {

    return (
        <Btn onClick={onClick} isActive={isActive}>{children}</Btn>
    );
};

export default Button;