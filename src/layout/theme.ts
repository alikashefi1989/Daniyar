const styleConfig = {
    headerHeight: '60px',
};

const appTheme = {
    lightMode: {
        palette: {
            backgroundColor: 'white',
            color: 'black',
            headerBgColor: '#1775B9',
            headerColor: 'white',
        },
        styleConfig,
    },
    darkMode: {
        palette: {
            backgroundColor: 'black',
            color: 'white',
            headerBgColor: '#1775B9',
            headerColor: 'black',
        },
        styleConfig,
    },
};

export default appTheme;