---
title: Edit
order: 2
---

# Edit event for a distance
Allow editing of the event a interval at the Event Tab. **Conditions**: The event was created earlier.

 **Step 1**:

 *How 1:* At the time line click on **Event a display interval without a** attached clock. ![](../../images/Event_Onetime.png)

 *How 2:* at the event list, show **Editing "** when **moves mouse** on icon **Edit** at action column

  ![](../../images/Action_edit_event_list.png)

 **Step 2:** User click icon **editing**

 The updated Pop-up display system corrects the right-screen angular event with previously imported information.

 ![](../../images/Popup_edit_event_Onetime.png)

* **Unable to edit fields:**
    * Event type
    * Multimedia content (except for the **VOD and SCTE3/Live standard status prepared for**).
    * Publish Type
    * Time range
* **Edit content:**
   * Name
   * Description
   * Exclude
   * Time interval


## Table descriper rules for scheduling events


<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky"><span style="font-weight:bold">Event Type</span></th>
    <th class="tg-0pky"><span style="font-weight:bold">Status</span></th>
    <th class="tg-0pky"><span style="font-weight:bold">Allowed to edit</span></th>
    <th class="tg-0pky"><span style="font-weight:bold">Delete Permission</span></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky" rowspan="4">SCTE35</td>
    <td class="tg-0pky">Complete</td>
    <td class="tg-0pky">No!</td>
    <td class="tg-0pky">Only Delete Scheduling</td>
  </tr>
  <tr>
    <td class="tg-0pky">Ready.</td>
    <td class="tg-0pky">No.</td>
    <td class="tg-0pky">Only Delete Scheduling</td>
  </tr>
  <tr>
    <td class="tg-0pky">Error</td>
    <td class="tg-0pky">N/A</td>
    <td class="tg-0pky">Do not change</td>
  </tr>
  <tr>
    <td class="tg-0pky">Get ready!</td>
    <td class="tg-0pky">Yes.</td>
    <td class="tg-0pky">Allow modification, delete all</td>
  </tr>
  <tr>
    <td class="tg-0pky">VOD</td>
    <td class="tg-0pky">Ready.</td>
    <td class="tg-0pky">Yes.</td>
    <td class="tg-0pky">Allow modification, delete all</td>
  </tr>
</tbody>
</table>

 **Step 3:** Users perform editing and press **Save**

  The system does save new information that has just been updated, displaying successful update notifications in the right corner of the screen and automatically closed in 5s.

  ![](../../images/Notice_success_edit_schedule.png)

 * **Title:** Updated to success!
 * Icon Check: Notice.