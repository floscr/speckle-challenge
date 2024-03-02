import { v4 as randomUuid } from 'uuid';
import type { PromptItem } from './types';

export const PROJECT_SETTINGS_KEY = 'Project settings';
export const projectSettingsItems: PromptItem[] = [
    {
        id: randomUuid(),
        title: 'Manage members…',
        icon: 'IconPeople',
        group: PROJECT_SETTINGS_KEY,
        action: { label: 'ManageMembers', actionId: 'ManageMembers' }
    },
    {
        id: randomUuid(),
        title: 'Invite to project…',
        icon: 'IconUserPlus',
        group: PROJECT_SETTINGS_KEY
    },
    {
        id: randomUuid(),
        title: 'Set permissions…',
        icon: 'IconEye',
        group: PROJECT_SETTINGS_KEY
    }
];

export const MODELS_KEY = 'Models';
export const modelsItems: PromptItem[] = [
    {
        id: randomUuid(),
        title: 'Create new model…',
        icon: 'IconSquarePlus',
        group: MODELS_KEY
    },
    {
        id: randomUuid(),
        title: 'base design',
        icon: 'IconModel',
        group: MODELS_KEY,
        action: { label: 'Open' }
    },
    {
        id: randomUuid(),
        title: 'landscaping',
        icon: 'IconModel',
        group: MODELS_KEY,
        action: { label: 'Open' }
    },
    {
        id: randomUuid(),
        title: 'building wrapper',
        icon: 'IconModel',
        group: MODELS_KEY,
        action: { label: 'Open' }
    },
    {
        id: randomUuid(),
        title: 'furniture',
        icon: 'IconModel',
        group: MODELS_KEY,
        action: { label: 'Open' }
    }
];

export const PROJECTS_KEY = 'Projects';
export const projectsItems: PromptItem[] = [
    {
        id: randomUuid(),
        title: 'Create new project…',
        icon: 'IconSquarePlus',
        group: PROJECTS_KEY
    },
    {
        id: randomUuid(),
        title: 'My First Project',
        icon: 'IconProject',
        group: PROJECTS_KEY,
        action: { label: 'Open' }
    },
    {
        id: randomUuid(),
        title: 'NYC Headquarters',
        icon: 'IconProject',
        group: PROJECTS_KEY,
        action: { label: 'Open' }
    },
    {
        id: randomUuid(),
        title: 'Snowden Towers',
        icon: 'IconProject',
        group: PROJECTS_KEY,
        action: { label: 'Open' }
    }
];

export const HELP_KEY = 'Help';
export const helpItems: PromptItem[] = [
    {
        id: randomUuid(),
        title: 'Join the community',
        icon: 'IconHeart',
        group: HELP_KEY,
        action: { label: 'Open' }
    },
    {
        id: randomUuid(),
        title: 'Search docs…',
        icon: 'IconHeart',
        group: HELP_KEY
    },
    {
        id: randomUuid(),
        title: 'Send feedback…',
        icon: 'IconHeart',
        group: HELP_KEY
    },
    {
        id: randomUuid(),
        title: 'Contact support…',
        icon: 'IconHeart',
        group: HELP_KEY
    }
];

export const mainItems: PromptItem[] = [...projectSettingsItems, ...modelsItems, ...projectsItems, ...helpItems];
