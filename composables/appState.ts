export const useAppState = () => {
    return useState<{ 
        activeDialog: string,
        activeList: string,
        myLists: Array<string>,
        dbExists: boolean,
        isPending: boolean,
        leftHand: boolean
    }>('appState', 
        () => ({ 
            activeDialog: '',
            activeList: '',
            myLists: [],
            dbExists: false,
            isPending: false,
            leftHand: false
        })
    );
}