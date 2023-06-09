<script>
    /**
     * @type {import("$lib/server/db/types").Player[]}
     */
    export let players = [];
    export let position = "";
    $: visiblePlayers = players.filter((p) => {
        return p.player_position.includes(position);
    });
</script>

{#if visiblePlayers.length > 0}
    <div class="box">
        <h2 class="is-size-2">{position}</h2>
        <table class="table is-centered is-fullwidth">
            <tbody>
                {#each visiblePlayers as player}
                    <tr>
                        <td>{player.player_ranking}</td>
                        <td>{player.player_name}</td>
                        <td>{player.player_nfl_team}</td>
                        <td>{player.player_bye_week}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <br />
{/if}
