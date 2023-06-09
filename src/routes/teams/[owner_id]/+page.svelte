<script lang="ts">
    import type { PageData } from "./$types";
    import PositionTable from "$lib/components/PositionTable.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    export let data: PageData;
</script>

<Navbar owners={data.owners} />

<div class="px-4">
    <div class="is-size-2 is-underlined">{data.owner.owner_name}</div>
</div>

<br />

<div class="container">
    <PositionTable position={"QB"} players={data.players} />
    <PositionTable position={"RB"} players={data.players} />
    <PositionTable position={"WR"} players={data.players} />
    <PositionTable position={"TE"} players={data.players} />
    <PositionTable position={"DST"} players={data.players} />
    <PositionTable position={"K"} players={data.players} />
</div>
