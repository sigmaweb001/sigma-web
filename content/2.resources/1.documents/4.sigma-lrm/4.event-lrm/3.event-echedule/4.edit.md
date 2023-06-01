---
title: Edit
order: 4
---

# Edit scheduling event
Allow editing of the scheduling event at the Event Tab. Event: The event was created earlier.

 **Step 1:** Open to Event scheduling Tab, displaying a list of scheduling events

 **Step 2:** Display line **Editing** while moving the mouse into the **Edit** at the action column ![](../../images/Action_edit_Schedule.png)

 **Step 3:** User click icon **Edit** The Pop-up display system updates the right-screen angular event with previously imported information. ![](../../images/Popup_edit_event_Schedule.png)

* **Unable to edit fields:**

    * Event type
    * Multimedia content (except for the VOD and SCTE3/Live standard status preparation states).
    * Publish Type
    * Calendar Type
    * Time interval
* **Edit content:**

   * Name
   * Description
   * Exclude
   * Tags
   * Time interval (end date)
   * Scheduling details



## Table describing the event editing rules A interval

<table>
<thead>
  <tr>
    <th>Event Type</th>
    <th>Status</th>
    <th>Allowed to edit</th>
    <th>Delete Permission</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="4">SCTE35</td>
    <td>Complete</td>
    <td>No!</td>
    <td>Only Delete Scheduling</td>
  </tr>
  <tr>
    <td>Ready.</td>
    <td>No.</td>
    <td>Only Delete Scheduling</td>
  </tr>
  <tr>
    <td>Error</td>
    <td>N/A</td>
    <td>Do not change</td>
  </tr>
  <tr>
    <td>Get ready!</td>
    <td>Yes.</td>
    <td>Allow modification, delete all</td>
  </tr>
  <tr>
    <td>VOD</td>
    <td>Ready.</td>
    <td>Yes.</td>
    <td>Allow modification, delete all</td>
  </tr>
</tbody>
</table>

## Exceptions (With the Type of Event: SCTE3/Live)

* At the time the user clicks **Editing**, the test system, the start date has run over (Start date < current date) → **disable field date starting**

* At the time the user clicks **Save**, the scheduling check system ran out of schedule (24h00 of stopDate < current date) and moved the completed state → **disables all fields/button Save**

 **Step 4:** The CMS User performs editing the appropriate information

→ Press **Save**

 The system does save new information that has just been updated, displaying successful update notifications in the right corner of the screen and automatically closed in 5s.

  ![](../../images/Notice_success_edit_schedule.png)

 * **Title:** Updated event scheduling!
 * Icon Check: Notice.

