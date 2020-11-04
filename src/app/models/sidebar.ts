interface Tag {
    _id: string;
    count: number;
}

interface Archive {
    _id: string;
}

export interface Sidebar {
    tag: [Tag];
    archive: [Archive];
}
