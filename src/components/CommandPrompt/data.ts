import { v4 as randomUuid } from 'uuid';
import type { PromptItem } from './types';

export const MEMBERS_KEY = 'Members';
export const membersItems: PromptItem[] = [
    {
        id: randomUuid(),
        title: 'Agnes Gaschitz',
        icon: { type: 'Img', value: 'AgnesGaschitz' },
        group: MEMBERS_KEY
    },
    {
        id: randomUuid(),
        title: 'Alexandru Popovici',
        icon: { type: 'Img', value: 'AlexandruPopovici' },
        group: MEMBERS_KEY
    },
    {
        id: randomUuid(),
        title: 'Andrew Wallace',
        icon: { type: 'Img', value: 'AndrewWallace' },
        group: MEMBERS_KEY
    },
    {
        id: randomUuid(),
        title: 'Benjamin Ottensten',
        icon: { type: 'Img', value: 'BenjaminOttensten' },
        group: MEMBERS_KEY
    },
    {
        id: randomUuid(),
        title: 'Dimitrie Stefanescu',
        icon: { type: 'Img', value: 'DimitrieStefanescu' },
        group: MEMBERS_KEY
    },
    {
        id: randomUuid(),
        title: 'Gergo Jedlicska',
        icon: { type: 'Img', value: 'GergoJedlicska' },
        group: MEMBERS_KEY
    },
    {
        id: randomUuid(),
        title: 'Iain Sproat',
        icon: { type: 'Img', value: 'IainSproat' },
        group: MEMBERS_KEY
    },
    {
        id: randomUuid(),
        title: 'Kristaps Fabians Geikins',
        icon: { type: 'Img', value: 'KristapsFabiansGeikins' },
        group: MEMBERS_KEY
    },
    {
        id: randomUuid(),
        title: 'Matteo Cominetti',
        icon: { type: 'Img', value: 'MatteoCominetti' },
        group: MEMBERS_KEY
    }
];

export const MEMBERS_SETTINGS_KEY = 'Settings';
export const membersSettingsItems: PromptItem[] = [
    {
        id: randomUuid(),
        title: 'Invite to project…',
        icon: { type: 'Svg', value: 'IconPeople' },
        group: MEMBERS_SETTINGS_KEY
    }
];

export const membersViewItems: PromptItem[] = [...membersItems, ...membersSettingsItems];

export const PROJECT_SETTINGS_KEY = 'Project settings';
export const projectSettingsItems: PromptItem[] = [
    {
        id: randomUuid(),
        title: 'Manage members…',
        icon: { type: 'Svg', value: 'IconPeople' },
        group: PROJECT_SETTINGS_KEY,
        action: { actionId: 'ManageMembers' }
    },
    {
        id: randomUuid(),
        title: 'Invite to project…',
        icon: { type: 'Svg', value: 'IconUserPlus' },
        group: PROJECT_SETTINGS_KEY
    },
    {
        id: randomUuid(),
        title: 'Set permissions…',
        icon: { type: 'Svg', value: 'IconEye' },
        group: PROJECT_SETTINGS_KEY
    }
];

export const MODELS_KEY = 'Models';
export const modelsItems: PromptItem[] = [
    {
        id: randomUuid(),
        title: 'Create new model…',
        icon: { type: 'Svg', value: 'IconSquarePlus' },
        group: MODELS_KEY
    },
    {
        id: randomUuid(),
        title: 'base design',
        icon: { type: 'Svg', value: 'IconModel' },
        group: MODELS_KEY,
        action: { label: 'Open' }
    },
    {
        id: randomUuid(),
        title: 'landscaping',
        icon: { type: 'Svg', value: 'IconModel' },
        group: MODELS_KEY,
        action: { label: 'Open' }
    },
    {
        id: randomUuid(),
        title: 'building wrapper',
        icon: { type: 'Svg', value: 'IconModel' },
        group: MODELS_KEY,
        action: { label: 'Open' }
    },
    {
        id: randomUuid(),
        title: 'furniture',
        icon: { type: 'Svg', value: 'IconModel' },
        group: MODELS_KEY,
        action: { label: 'Open' }
    }
];

export const PROJECTS_KEY = 'Projects';
export const projectsItems: PromptItem[] = [
    {
        id: randomUuid(),
        title: 'Create new project…',
        icon: { type: 'Svg', value: 'IconSquarePlus' },
        group: PROJECTS_KEY
    },
    {
        id: randomUuid(),
        title: 'My First Project',
        icon: { type: 'Svg', value: 'IconProject' },
        group: PROJECTS_KEY,
        action: { label: 'Open' }
    },
    {
        id: randomUuid(),
        title: 'NYC Headquarters',
        icon: { type: 'Svg', value: 'IconProject' },
        group: PROJECTS_KEY,
        action: { label: 'Open' }
    },
    {
        id: randomUuid(),
        title: 'Snowden Towers',
        icon: { type: 'Svg', value: 'IconProject' },
        group: PROJECTS_KEY,
        action: { label: 'Open' }
    }
];

export const HELP_KEY = 'Help';
export const helpItems: PromptItem[] = [
    {
        id: randomUuid(),
        title: 'Join the community',
        icon: { type: 'Svg', value: 'IconHeart' },
        group: HELP_KEY,
        action: { label: 'Open' }
    },
    {
        id: randomUuid(),
        title: 'Search docs…',
        icon: { type: 'Svg', value: 'IconHeart' },
        group: HELP_KEY
    },
    {
        id: randomUuid(),
        title: 'Send feedback…',
        icon: { type: 'Svg', value: 'IconHeart' },
        group: HELP_KEY
    },
    {
        id: randomUuid(),
        title: 'Contact support…',
        icon: { type: 'Svg', value: 'IconHeart' },
        group: HELP_KEY
    }
];

export const mainItems: PromptItem[] = [...projectSettingsItems, ...modelsItems, ...projectsItems, ...helpItems];
