---
title: View interface
order: 1
---

# Footnote

Explain some words used in the document, avoid the wrong case, understand the wrong idea.

| Name            | Explain                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| Event time      | Use to refer to the time of the event has been created, full of information and displayed on Timeline.       |
| Scheduling time | Use to indicate uncreated event when creating new, at the time selection field (Này/ hours)                  |
| Event type      | Use to refer to 3 types of channel: Live/ SCTE 35/VOD                                                        |
| Publish Type    | Used to refer to two types: OneTime/Schedule                                                                 |
| Current Time    | Current Time                                                                                                 |
| Start Date      | The start date, the year/month format, the first case in use from the English language to match the formula. |
| Start Time      | Time to begin, 24 hours.                                                                                     |
| Stop Date       | Date of end, format year/month/day                                                                           |
| Stop Date       | Time to end, format 24 hours :phút:seconds                                                                   |

## View the event editor interface
Default view at channel List interface

The system displays **"Detail"** when **moves the mouse** into the **icon**.

CMS users click on **icon Details** at action column


The event interface display system with the Title **the channel is selected by**

![](../../images/Ui_Event_channel.png)

Channel information: The channel information will be displayed in this section and the default display.

* Details include 2 Tab: **Tab Event** and **Tab Set Schedule**.
   * Event tab: Includes **Event Timeline of** running from 00:00:00 to 23:59:59 displaying all programs, types of events during the day and **List of events** respectively in the day below (including 2 types of events).

   * Event scheduling tab: The event scheduling list.

 ***Event tab***

 This is the **area that displays all the events**(including one event and scheduling) in 1 day (starting from 00:00:00 to 23:59:59)

### Event timeline
The event timeline includes information in the top-down order as follows:
* **Status**: Each event after being created will have prepared/ready/complete/error states (except the VOD case is always in a ready state) specified based on the event time timeline compared to real time.
* **Add**.
* **Select date**: search-per-day search filter with more generalized view.
* **Icon synchronous**: always refreshing the system in 10s.
* **The slime** runs from 00:00 to 24:00 of 1 day and 6 hours away from each other, helping to generalized time on the expected line, the user can perform time-slip operations.
* Main Content:
    * **Program**: Original shows with the duration running throughout the day, there are milestones to mark the time.
    * **Category**: SCTE35/Live/VOD
    * **A hyphen stands** indicating **axial time**.
    * **Scroll bar**
    * There are two types of events: **The event is about** (with no icons of the above and **scheduling events**(there are **icons of the** attached above) including:
       * Event Name
       * Time range: Display now :phút:second-month-in-year
       * Multimedia content (only available in a available state)

    *Note:* When mouse moves into the event, the mouse turns into a hand shape with detailed information
* **Move to the present**: **Only use with the current date**, click on the icon, the timeline moves to the current time marker (current Time)
* **Launched** degrees from 50% to 200% for the distance are all time to view more detailed events.

### Event List

This is a list of events that show all the events that include **events a** and **Event scheduling event** corresponding to the date in the Event Timeline,
* The angle of display on the corner must correspond to the time selection selection at the event timeline.
* **ID**: Due to the birth system after creating event
* **Name**: the name was previously booked
* **Type**: previously selected users
* **Type**: displays both publishing and scheduling during the day.
* **Range time**: Display to date: minutes: days-month-year
* **Exclusion**: the channel excluded will not be shown instead.
* **Multimedia Content**: configuration only with VOD/ Live event type
* **Description**: short description of the channel, not shown to the viewer.
* Edit action, delete (**correct display only for the event type of a interval, disable with a scheduling event**).