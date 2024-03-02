export interface Action {
    label?: string;
    actionId?: string;
}

export interface PromptItem {
    id: string;
    title: string;
    group: string;
    icon: string;
    action?: Action;
}
