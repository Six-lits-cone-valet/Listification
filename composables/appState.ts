export const useAppState = () => {
    return useState<{ 
        activeDialog: string,
        activeListId: string,
        myLists: Array<string>,
        dbExists: boolean,
        isPending: boolean,
        leftHand: boolean
    }>('appState', 
        () => ({ 
            activeDialog: '',
            activeListId: '',
            myLists: [],
            dbExists: false,
            isPending: false,
            leftHand: false
        })
    );
}