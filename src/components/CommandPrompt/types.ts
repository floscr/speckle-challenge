export interface Action {
    label?: string;
    actionId?: string;
}

export type Icon = { type: 'Svg'; value: string } | { type: 'Img'; value: string };

export interface PromptItem {
    id: string;
    title: string;
    group: string;
    icon: Icon;
    action?: Action;
}
