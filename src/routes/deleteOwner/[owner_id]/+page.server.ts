import { deleteOwner } from "$lib/server/db";
import type { PageServerLoad } from "./$types";

export const load = (({ params }) => {
    const id = parseInt(params.owner_id);
    deleteOwner(id);
}) satisfies PageServerLoad;
