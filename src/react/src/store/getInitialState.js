function getInitialState() {
    const initialState = JSON.parse(sessionStorage.getItem('store'));
    return initialState || {};
}

export default getInitialState;
