import type { Project } from '@prisma/client';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async (event) => {
    const response = await event.fetch('/api/project');
    const projects:Project[] = await response.json();
    return { projects };
};