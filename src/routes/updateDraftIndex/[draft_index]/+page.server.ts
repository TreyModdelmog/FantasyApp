import { updateDraftingIndex } from "$lib/server/db";
import type { PageServerLoad } from "./$types";

export const load = (({ params }) => {
    const draftingIndex = parseInt(params.draft_index);
    updateDraftingIndex(draftingIndex);
}) satisfies PageServerLoad;
