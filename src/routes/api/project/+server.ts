import { db } from '$lib/db.server.js';
import { json, redirect } from '@sveltejs/kit';

export async function POST(event) {
    const data = await event.request.formData();
    const techstack: string = data.get('techstack') as string;
    const techstackArray: string[] = techstack.split(' ')
    const userId: string | undefined = event.cookies.get('userId');

    if (!userId) {
        throw redirect(303, '/');
    }

    try {   
        const project = await db.project.create({
            data: {
                userId: userId,
                title: data.get('title') as string,
                description: data.get('description') as string,
                github: data.get('github') as string,
                about: data.get('about') as string,
                techStacks: {
                    connectOrCreate: techstackArray.map(ts => {
                        return {
                            where:{ name: ts },
                            create: { name: ts },
                        }
                    })
                }
            }
        });

        return json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        return json({ error: 'Failed to create project' });
    }
}