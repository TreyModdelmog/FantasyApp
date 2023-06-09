import { draftPlayer } from "$lib/server/db";
import type { PageServerLoad } from "./$types";

export const load = (({ params }) => {
    const idStrs = params.ids.split("-");
    draftPlayer(parseInt(idStrs[0]), parseInt(idStrs[1]));
}) satisfies PageServerLoad;
