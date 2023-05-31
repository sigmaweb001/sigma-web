---
title: Event of a
order: 2
---

# Edit Event
**Step 1:** Select Type **A**

**Step 2:** The user input information, user clicks button **Save** at the end of the Pop-up Real creation of the event, displays notifications on the right corner of the screen. ![](../../images/Notice_success_create_event.png)

* **Title**: Create successful event!
* Icon check

At the same time **displays information on the** timeline with the Event Name + interval corresponding to . ![](../../images/Status_Event.png)

* **Preparing**: Time's execution time more than the start of the event.
* **Ready:** The event is in running time.
* **Completed:** The current implementation time is greater than the end of the event.
* **Error:** During system testing event testing (loss of signal, disruption, etc.).

 Event Type Descriptions


<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky" style="font-weight:bold" >Event Type</th>
    <th class="tg-0pky" style="font-weight:bold" >Multimedia Content</th>
    <th class="tg-0pky" style="font-weight:bold" >Asset</th>
    <th class="tg-0pky" style="font-weight:bold">Form</th>
    <th class="tg-0pky" style="font-weight:bold">Mode</th>
    <th class="tg-0pky" style="font-weight:bold">Description</th>
    <th class="tg-0pky" style="font-weight:bold">Regulations</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">SCTE35</td>
    <td class="tg-0pky">No!</td>
    <td class="tg-0pky"> Video, image</td>
    <td class="tg-0pky">N/A</td>
    <td class="tg-0pky">N/A</td>
    <td class="tg-0pky">Use to signal all types of program and advertising events in linear transport flows and in newer ABR distribution formats such as HLS and Dash (LES).</td>
    <td class="tg-0pky" rowspan="2" >Only allowed to create with StopTime is larger than the current moment 1 minute Stop Time > current time + 1 minute</td>
  </tr>
  <tr>
    <td class="tg-0pky">Live</td>
    <td class="tg-0pky">Yes.</td>
    <td class="tg-0pky">Video, image</td>
    <td class="tg-0pky">N/A</td>
    <td class="tg-0pky">N/A</td>
    <td class="tg-0pky">Online Content Replacement Threads</td>
  </tr>
  <tr>
    <td class="tg-0pky" rowspan="6">VOD</td>
    <td class="tg-0pky" rowspan="6">Yes.</td>
    <td class="tg-0pky" rowspan="6">Video</td>
    <td class="tg-0pky" colspan="3">Video content replacement by request, replacing the sketch, when the flow is over, can replay, implement, delete event.</td>
    <td class="tg-0pky" rowspan="6">Allowed to create event with time interval (Start Date + Start Time), (Stop date + Stop Time) in the past</td>
  </tr>
  <tr>
    <td class="tg-0pky">Cut</td>
    <td class="tg-0pky">N/A</td>
    <td class="tg-0pky">Delete the original stream, not select the alternate content (the user is not able to see the original content)</td>
  </tr>
  <tr>
    <td class="tg-0pky" rowspan="4">Alternate Content</td>
    <td class="tg-0pky" colspan="2">Video replacing the need to replace the instance example: The alternate video (15 minutes) is shorter than the alternate section (60 minutes).</td>
  </tr>
  <tr>
    <td class="tg-0pky">Replace</td>
    <td class="tg-0pky">Replace the user cms configuring the time of the event (replacing the first 15 minutes) and retaining the remaining content (45 minutes) of the original segment</td>
  </tr>
  <tr>
    <td class="tg-0pky">Repeat</td>
    <td class="tg-0pky">Refill video is consistent with the time of the replacement segment, repeated if not enough time (repeating the 15-minute replacement video until sufficient times are required to replace the 60-minute original).</td>
  </tr>
  <tr>
    <td class="tg-0pky">Replace and Cut</td>
    <td class="tg-0pky">Adjust to match the time, the rest is left (left the original, the available section) the first 15-minute video, the remaining 45 minutes of the abandoned section-> not shown.</td>
  </tr>
</tbody>
</table>

