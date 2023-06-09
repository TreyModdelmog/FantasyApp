<script lang="ts">
    import type { PageData } from "./$types";
    import type { Player, Owner } from "$lib/server/db/types";
    import Navbar from "$lib/components/Navbar.svelte";
    import { goto } from "$app/navigation";
    export let data: PageData;

    // draft index
    var draftingIndex = data.draftingIndex;
    var draftingOwner: Owner = data.owners[draftingIndex];

    // search
    let search = "";
    $: visiblePlayers =
        search == ""
            ? data.players
            : data.players.filter((p) => {
                  return (
                      p.player_name.toUpperCase().includes(search.toUpperCase()) ||
                      p.player_nfl_team.toUpperCase().includes(search.toUpperCase()) ||
                      p.player_position.toUpperCase().includes(search.toUpperCase())
                  );
              });

    function draftPlayer(player: Player, owner: Owner) {
        if (confirm(`Draft ${player.player_name} to ${owner.owner_name}'s team?`)) {
            // draft player
            goto(`/draftPlayer/${owner.owner_pick}-${player.player_ranking}`);

            // update draft index
            draftingIndex++;
            if (data.owners.length == draftingIndex) {
                draftingIndex = 0;
            }
            draftingOwner = data.owners[draftingIndex];
            goto(`/updateDraftIndex/${draftingIndex}`);
        }
    }
</script>

<Navbar owners={data.owners} />

<br />

<div class="px-4">
    <div class="is-size-3">{`On the Clock: ${draftingOwner.owner_name}`}</div>
</div>

<br />
<br />

<div class=" container">
    <input type="search" class="input is-info" bind:value={search} placeholder="search" />
    <br /><br />
    <table class="table is-centered is-fullwidth is-hoverable is-striped">
        <thead>
            <th>Rank</th>
            <th>Name</th>
            <th>Position</th>
            <th>Team</th>
            <th>Bye</th>
        </thead>
        <tbody>
            {#each visiblePlayers as player}
                <tr class="is-clickable" on:click={() => draftPlayer(player, draftingOwner)}>
                    <td>{player.player_ranking}</td>
                    <td>{player.player_name}</td>
                    <td>{player.player_position}</td>
                    <td>{player.player_nfl_team}</td>
                    <td>{player.player_bye_week}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
