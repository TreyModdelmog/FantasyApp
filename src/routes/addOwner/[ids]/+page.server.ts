import { addOwner } from "$lib/server/db";
import type { PageServerLoad } from "./$types";

export const load = (({ params }) => {
    const idStrs = params.ids.split("-");
    addOwner(parseInt(idStrs[0]), idStrs[1]);
}) satisfies PageServerLoad;
