export const useAppState = () => {
    return useState<{ 
        activeDialog: string,
        activeListId: string,
        myLists: Array<string>,
        dbExists: boolean,
        isPending: boolean,
        leftHand: boolean,
        message: {
            type: string,
            text: string
        }
    }>('appState', 
        () => ({ 
            activeDialog: '',
            activeListId: '',
            myLists: [],
            dbExists: false,
            isPending: false,
            leftHand: false,
            message: {
                type: '',
                text: ''
            }
        })
    );
}