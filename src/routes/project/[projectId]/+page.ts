import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async (event) => {
    const response = await event.fetch(`/api/project/${event.params.projectId}`);
    const project = await response.json();
    return { project };
}