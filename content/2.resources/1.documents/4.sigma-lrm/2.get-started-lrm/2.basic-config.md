---
title: Basic Configuration
order: 2
---

# Basic Configuration Guide
## Import Action
A few notes, as well as the general description information when the user is adding, edit the data in form: ![](..\images\Field.png)

In a form that will include multiple data fields, each data field will consist of 2 components: *Title and Automotive/select data*.

Section *header* displays information .Some note the display rules of the program/system:

- The screen with the required content has a * red front, then the data field is not vacated, forcing the user to enter the data before saving form.
- The date is known as YYYY/MM/DD HH:mm:ss.

Section *The data/select* data allows the user to enter/select the desired data.

Showing **limit of** permitted in some schools, e.g. limit 0/50, do not display 51 characters.

 ![](..\images\Limit_field.png)

User data can sometimes be authenticated to make sure valid, when the user input is not valid for **, the** red error message is shown below.

![](..\images\error_field1.png)

The error message content depends on each specific case. The following examples include a few other types of notifications:
<center>

! [in] \images\special_charater.png)

*Figure 1. Misentry error * 

! [is] \images\error_field2.png)

*Figure 2. Error entering time error * 

! [is] \images\error_field3.png)

*Figure 3. Incorrect entry error date * 

! [is] \images\error_field4.png)

*Figure 4. Failed to import field 

</center>

## Data Submit
When the user does confirm the data stored in the form by pressing the **Submit** or **Save**. The task execution system and then return the message to the user.

If the task is successful, there will be a blue message showing the top of the browser screen. ![](..\images\Notice_success_delete_channel.png)

If the execs failed, there will be a red message, with a bug content showing the top of the browser screen. Depending on the error case, it is shown with different content.
<center>

! [in] \images\Data_invalid.png)

*Figure 5. Enter unvalid information * 

! [is] \images\Data_invalid1.png)

*Figure 6. Enter unvalid information * 
</center>