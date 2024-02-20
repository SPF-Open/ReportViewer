<script lang="ts">
    import { CSV } from "@lv00/toolkit";
    import { report } from "../Store";

    let files;
    let previousFiles;

    $: if (files && files !== previousFiles && files.length > 0) {
        previousFiles = files;
        const file = files[0];
        file.text().then((text) => {
            const csv = CSV.readString(text, ",", null, false);
            report.set(csv);
            console.log($report);
        });
    }
</script>

<input type="file" name="" id="" accept=".csv" bind:files />
