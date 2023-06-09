import type { PageServerLoad } from "./$types";
import { getDraftingIndex, getOwners, getUndraftedPlayers, updateDraftingIndex } from "$lib/server/db";

var draftingIndex: number;

export const load = (() => {
    const players = getUndraftedPlayers();
    const owners = getOwners();
    draftingIndex = getDraftingIndex();

    return {
        players,
        owners,
        draftingIndex,
    };
}) satisfies PageServerLoad;
