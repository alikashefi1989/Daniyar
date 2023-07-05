// module
import styled from "@emotion/styled";
import { FC } from "react";

interface SubmitButtonProps {
    type: 'contained' | 'outlined'
    title: string
    icon?: JSX.Element
    onClick: () => void
}

const Button: FC<SubmitButtonProps> = ({ type, title, icon, onClick }) => {
    return (
        <SubmitButtonWrapper type={type} onClick={onClick}>
            <span>{icon}</span>
            <span>{title}</span>
        </SubmitButtonWrapper>
    )
}

export default Button

const SubmitButtonWrapper = styled.div<Pick<SubmitButtonProps, 'type'>>(({ type }) => ({
    boxSizing: 'border-box',
    width: '100%',
    height: '50px',
    color: '#b5b5b5',
    fontSize: '20px',
    position: 'relative',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: type === 'contained' ? 'none' : '1px solid #b5b5b5',
    backgroundColor: type === 'contained' ? '#1775B9' : 'transparent',
    '> span': {
        width: 'max-content',
        height: 'max-content',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))
