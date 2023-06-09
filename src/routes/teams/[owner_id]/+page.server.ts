import type { PageServerLoad } from "./$types";
import { getOwners, getOwnerById, getPlayersByIdList, getPlayersByOwnerId } from "$lib/server/db";

export const load = (({ params }) => {
    const ownerId = parseInt(params.owner_id);
    const owner = getOwnerById(ownerId);
    const owners = getOwners();
    const playerIds = getPlayersByOwnerId(ownerId);
    const players = getPlayersByIdList(playerIds);

    return {
        owner,
        owners,
        players,
    };
}) satisfies PageServerLoad;
