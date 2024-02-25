import { SvelteKitAuth } from '@auth/sveltekit';
import GoogleProvider from '@auth/core/providers/google';
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
} from '$env/static/private';
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from '$lib/db.server';
import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import type { User } from '@prisma/client';

async function authorization({ event, resolve }: { event: RequestEvent, resolve: any }) {
	if (event.url.pathname !== '/') {
        const session = await event.locals.auth();
		if (!session) {
			throw redirect(303, '/');
        }
        const foundUser: User = await db.user.findFirst({ where: { email: session.user?.email } }) as User;
        if (foundUser) {
            event.cookies.set('userId', foundUser.id, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
            });
        } else {
            throw redirect(303, '/');
        }
	}
	return resolve(event);
}

export const handle:Handle = sequence(SvelteKitAuth({
    providers: [GoogleProvider({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })],
    adapter: PrismaAdapter(db),
}), authorization);