<script lang="ts">
    let totalSeconds: number = 0;
    $: minutes = `00${parseInt((totalSeconds / 60).toString())}`.slice(-2);
    $: secs = `00${totalSeconds % 60}`.slice(-2);

    setInterval(setTime, 1000);
    function setTime() {
        ++totalSeconds;
    }
</script>

<div class="is-size-3">{minutes}:{secs}</div>
