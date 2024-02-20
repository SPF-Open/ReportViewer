<script lang="ts">
  import { report } from "../Store";

  let groupedObj = [];

  $: if ($report) {
    const obj = $report.toObject();

    // Sort obj by ProcedureCode, EventDate, EventStartTime
    obj.sort((a, b) => {
      if (a.EventLabel !== b.EventLabel) {
        return a.EventLabel.localeCompare(b.EventLabel);
      } else if (a.EventDate !== b.EventDate) {
        return a.EventDate.localeCompare(b.EventDate);
      } else {
        return a.EventStartTime.localeCompare(b.EventStartTime);
      }
    });

    // Group obj if they have the same ProcedureCode, EventDate, EventStartTime
    groupedObj = [];
    let currentGroup = [];
    for (let i = 0; i < obj.length; i++) {
      if (
        i === 0 ||
        obj[i].EventLabel !== obj[i - 1].EventLabel ||
        obj[i].EventDate !== obj[i - 1].EventDate ||
        obj[i].EventStartTime !== obj[i - 1].EventStartTime
      ) {
        if (currentGroup.length > 0) {
          groupedObj.push(currentGroup);
        }
        currentGroup = [obj[i]];
      } else {
        currentGroup.push(obj[i]);
      }
    }
    if (currentGroup.length > 0) {
      groupedObj.push(currentGroup);
    }

    console.log(groupedObj); 

  }
</script>

{#if groupedObj.length > 0}
  {#each groupedObj as group, i}
    <div>
      <h2>{group[0].EventLabel}</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Test</th>
            <th>Status</th>
            <th>Lastname</th>
            <th>Firstname</th>
          </tr>
        </thead>
        <tbody>
          {#each group as event, j}
            <tr>
              <td>{event.EventDate}</td>
              <td>{event.BeginTime}</td>
              <td>{event.EnrollmentStatus}</td>
              <td>{event.LastName}</td>
              <td>{event.FirstName}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/each}
{:else}
  <p>No interview scheduled</p>
{/if}
