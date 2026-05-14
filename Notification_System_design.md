Stage 1
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

