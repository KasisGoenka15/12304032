Stage 1
It about building a Priority Inbox system where the goal is to help students find the most important notifications quickly without getting lost in a flood of updates. 
The approach fetches all notifications from the server using an authentication token, then applies a priority ranking system where Placement notifications are considered most critical since they directly affect a student's career,
followed by Result notifications which are academically important, and finally Event notifications which are the least urgent.
Once the notifications are ranked by type, if two notifications belong to the same type then the newer one is shown first based on its timestamp.
After sorting by both priority and recency, only the top 10 notifications are picked from the entire list
since the product manager specifically asked for the most important unread notifications to always be visible at the top. 
Each notification is displayed as a clickable card with color coding so students can instantly recognize the type, and clicking a card marks it as read by changing its appearance,
helping students track what they have already seen and what still needs their attention.


Stage2
<img width="1668" height="813" alt="image" src="https://github.com/user-attachments/assets/9b53bd62-965c-477f-b981-1e16ef047398" />
The code fetches all notifications from the server using your token for authentication,
then sorts them by priority where Placement is most important, 
followed by Result, then Event,
and if two notifications have the same type it shows the newest one first.
After sorting, it picks only the top 10 notifications using slice.
When the page loads it shows a loading spinner,
and if something goes wrong it shows an error message.
Each notification is shown as a card with a color coded chip showing its type,
and when you click on a card it marks it as read by turning it grey and removing the "New" badge,
while unread notifications have a blue border to stand out.

