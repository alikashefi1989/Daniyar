// module
import { useContext } from 'react';
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { BsSunFill, BsMoonStars } from 'react-icons/bs';
// custom
import { Store } from "../models/store";
import getPageTitle from '../util/get-page-title';
import { AppContext } from '../App';

const Header = () => {
    const { darkMode, setDarkMode } = useContext<Store>(AppContext);
    const { pathname } = useLocation();

    return (
        <HeaderWrapper>
            <Path>
                <span>task management</span>
                <span>{`>`}</span>
                <span>{getPageTitle(pathname)}</span>
            </Path>
            <UserActions>
                <DarkMode onClick={() => setDarkMode!(!darkMode)}>
                    {darkMode ? <BsSunFill size='25px' /> : <BsMoonStars size='25px' />}
                </DarkMode>
            </UserActions>
        </HeaderWrapper>
    );
};

export default Header;

const Path = styled.div(() => ({
    boxSizing: 'border-box',
    width: 'max-content',
    height: 'max-content',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '5px',
    textTransform: 'capitalize',
}))

const HeaderWrapper = styled.div<any>(({ theme }) => ({
    position: 'fixed',
    top: 0,
    width: '100%',
    height: theme.styleConfig.headerHeight,
    backgroundColor: theme.palette.headerBgColor,
    color: theme.palette.headerColor,
    paddingBlock: '10px',
    paddingInline: '35px',
    margin: 0,
    zIndex: 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    transition: 'all 1s linear',
}));

const UserActions = styled.div(() => ({
    boxSizing: 'border-box',
    height: 'max-content',
    width: 'max-content',
    display: 'inline-flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '15px',
}))

const DarkMode = styled.div(() => ({
    boxSizing: 'border-box',
    width: 'max-content',
    height: '100%',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
}))