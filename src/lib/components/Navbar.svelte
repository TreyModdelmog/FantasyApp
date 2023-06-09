<script>
    import { goto } from "$app/navigation";

    /**
     * @type {import("$lib/server/db/types").Owner[]}
     */
    export let owners = [];

    let ownerPick;
    let ownerName;
    function getOwnerInfo() {
        ownerName = prompt("Enter Owner Name: ");
        ownerPick = owners.length + 1;
        goto(`/addOwner/${ownerPick}-${ownerName}`);
    }

    function deleteOwner() {
        ownerPick = parseInt(prompt("Enter Owner Pick: ") || "-1");
        goto(`/deleteOwner/${ownerPick}`);
    }
</script>

<nav class="navbar has-background-dark">
    <div id="navbarId" class="navbar-menu">
        <div class="navbar-start">
            <a class="navbar-item is-size-5 has-text-white has-background-dark" href="/">Board</a>
            <div class="navbar-item has-dropdown is-hoverable">
                <!-- svelte-ignore a11y-missing-attribute -->
                <a class="navbar-link is-size-5 has-text-white has-background-dark">Teams</a>
                <div class="navbar-dropdown has-background-dark">
                    {#each owners as owner}
                        <a class="navbar-item has-text-white has-background-dark" href="/teams/{owner.owner_pick}">
                            {owner.owner_name}
                        </a>
                    {/each}
                </div>
            </div>
        </div>
        <div class="navbar-end">
            <div class="navbar-item has-dropdown is-hoverable">
                <!-- svelte-ignore a11y-missing-attribute -->
                <a class="navbar-link is-size-5 has-text-white has-background-dark">Settings</a>
                <div class="navbar-dropdown has-background-dark">
                    <a class="navbar-item has-text-white has-background-dark" on:click={() => getOwnerInfo()} href="/">Add Owner</a>
                    <a class="navbar-item has-text-white has-background-dark" on:click={() => deleteOwner()} href="/">Delete Owner</a>
                    <hr class="navbar-divider" />
                    <a class="navbar-item has-text-white has-background-dark" href="/reset">Reset</a>
                </div>
            </div>
        </div>
    </div>
</nav>
