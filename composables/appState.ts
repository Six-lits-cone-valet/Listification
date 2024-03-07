export const useAppState = () => {
    return useState<{ 
        activeDialog: string,
        activeList: string,
        myLists: Array<string>,
    }>('appState', 
        () => ({ 
            activeDialog: '',
            activeList: '',
            myLists: [],
        })
    );
}