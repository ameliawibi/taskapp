SELECT task_statuses.status,tasks.id,tasks.due_date,tasks.name AS task_name,tasks.description,tasks.assigned_to,users.name AS user_name FROM tasks INNER JOIN task_statuses ON tasks.task_status_id=task_statuses.id INNER JOIN users ON tasks.assigned_to=users.id ORDER BY task_statuses.id;

SELECT COUNT(comments.id), tasks.id FROM comments
INNER JOIN tasks ON comments.task_id = tasks.id
GROUP BY tasks.id;

SELECT users.id, users.avatar, messages.message FROM messages INNER JOIN users ON users.id = messages.sender_id;