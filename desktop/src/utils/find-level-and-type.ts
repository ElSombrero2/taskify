export type SpecificTag = {
    icon: string;
    background: string;
    color: string;
    label: string;
    border?: string;
    key?: string;
}

export type SpecificTagMap = {
    [key: string]: SpecificTag,
}

const PriorityLevel: SpecificTagMap = {
    blocker: {
        icon: 'fa-solid fa-circle-exclamation',
        background: 'bg-red-500',
        color: 'text-red-500 dark:text-rose-400',
        label: 'Blocker',
    },
    high: {
        icon: 'fa-solid fa-arrow-up',
        background: 'text-red-500 dark:text-rose-400',
        color: 'text-red-500',
        label: 'High',
    },
    medium: {
        icon: 'fa-solid fa-arrow-up',
        background: 'bg-orange-500',
        color: 'text-orange-500',
        label: 'Medium',
    },
    low: {
        icon: 'fa-solid fa-arrow-down',
        background: 'bg-blue-500',
        color: 'text-blue-500',
        label: 'Low',
    },
    trivial: {
        icon: 'fa-solid fa-grip-lines',
        background: 'bg-green-500',
        color: 'text-green-500',
        label: 'Trivial',
    },
}

const TicketType: SpecificTagMap = {
    task: {
        icon: 'fa-solid fa-check',
        background: 'bg-blue-500',
        color: 'text-blue-500',
        border: 'border-blue-500 dark:border-sky-600',
        label: 'Task',
    },
    bug: {
        icon: 'fa-solid fa-circle',
        background: 'bg-red-500',
        color: 'text-red-500',
        border: 'border-red-500 dark:border-rose-800',
        label: 'Bug',
    },
    feature: {
        icon: 'fa-solid fa-bookmark',
        background: 'bg-red-500',
        color: 'text-green-500',
        border: 'border-green-500 dark:border-emerald-600',
        label: 'Feature',
    },
    improvement: {
        icon: 'fa-solid fa-arrow-up',
        background: 'bg-green-500',
        color: 'text-green-500',
        border: 'border-green-500 dark:border-emerald-600',
        label: 'Improvement',
    },
}

const findFromTag = (tags: string[], obj: SpecificTagMap) => {
    const keys = Object.keys(obj);
    for (const key of keys) {
        if (tags.includes(key)) {
            return obj[key];
        }
    }
}

export const findLevelAndType = (tags: string[]) => {  
    const priority = findFromTag(tags, PriorityLevel);
    const type = findFromTag(tags, TicketType);
    return { priority, type }
}

export const PriorityLevels = () => {
    return Object.keys(PriorityLevel).map((key) => ({ ...PriorityLevel[key], key }));
}

export const TicketTypes = () => {
    return Object.keys(TicketType).map((key) => ({ ...TicketType[key], key }));
}
