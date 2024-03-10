export const useAppState = () => {
    return useState<{ 
        activeDialog: string,
        activeList: string,
        myLists: Array<string>,
        dbExists: boolean,
        isPending: boolean
    }>('appState', 
        () => ({ 
            activeDialog: '',
            activeList: '',
            myLists: [],
            dbExists: false,
            isPending: false
        })
    );
}