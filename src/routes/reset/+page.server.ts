import { reset } from "$lib/server/db";
import type { PageServerLoad } from "./$types";

export const load = (() => {
    reset();
}) satisfies PageServerLoad;
