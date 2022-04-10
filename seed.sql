INSERT INTO users (avatar,name,email,password) VALUES ('user1.jpeg','Nina Simpson','nina@email.com','b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86'),('user2.jpeg','Sofia Johnson','sofia@email.com','b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86'),('user3.jpeg','Norman Freeman','norman@email.com','b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86');

INSERT INTO messages (sender_id,message) VALUES (1,'Test message from user 1'),(2,'Test message from user 2'),(3,'Test message from user 3');

INSERT INTO task_statuses (status) VALUES ('To do'),('In progress'),('In review'),('Done');

INSERT INTO tasks (due_date,name,description,assigned_to,task_status_id) VALUES ('05/05/2022','UX research on Onboarding workflow', '{"ops":[{"insert":"payload = req.body;"},{"attributes":{"code-block":true},"insert":"\n"},{"insert":"  payload.description = JSON.parse(req.body.description);"},{"attributes":{"code-block":true},"insert":"\n"}]}',1,4);

INSERT INTO tasks (due_date,name,description,assigned_to,task_status_id) VALUES ('04/04/2022','Implement Onboarding page layout', '{"ops":[{"insert":"payload = req.body;"},{"attributes":{"code-block":true},"insert":"\n"},{"insert":"  payload.description = JSON.parse(req.body.description);"},{"attributes":{"code-block":true},"insert":"\n"}]}',2,2);

INSERT INTO tasks (due_date,name,description,assigned_to,task_status_id) VALUES ('01/01/2022','Create wireframe', '{"ops":[{"insert":"payload = req.body;"},{"attributes":{"code-block":true},"insert":"\n"},{"insert":"  payload.description = JSON.parse(req.body.description);"},{"attributes":{"code-block":true},"insert":"\n"}]}',1,3);

INSERT INTO tasks (due_date,name,description,assigned_to,task_status_id) VALUES ('03/03/2022','Create DB model for Onboarding', '{"ops":[{"insert":"payload = req.body;"},{"attributes":{"code-block":true},"insert":"\n"},{"insert":"  payload.description = JSON.parse(req.body.description);"},{"attributes":{"code-block":true},"insert":"\n"}]}',3,1);

INSERT INTO tasks (due_date,name,description,assigned_to,task_status_id) VALUES ('04/05/2022','Implement logic for onboarding page', '{"ops":[{"insert":"payload = req.body;"},{"attributes":{"code-block":true},"insert":"\n"},{"insert":"  payload.description = JSON.parse(req.body.description);"},{"attributes":{"code-block":true},"insert":"\n"}]}',2,1);

INSERT INTO comments (comment,task_id,user_id) VALUES ('Lorem ipsum dolor sit amet, consectetur adipiscing elit',1,1),('Lorem ipsum dolor sit amet, consectetur adipiscing elit',2,1),('Lorem ipsum dolor sit amet, consectetur adipiscing elit',3,1),('Lorem ipsum dolor sit amet, consectetur adipiscing elit',4,1),('Lorem ipsum dolor sit amet, consectetur adipiscing elit',1,2),('Lorem ipsum dolor sit amet, consectetur adipiscing elit',2,2),('Lorem ipsum dolor sit amet, consectetur adipiscing elit',3,2),('Lorem ipsum dolor sit amet, consectetur adipiscing elit',4,2);

INSERT INTO labels (label) VALUES ('Design'),('UX'),('Front end'),('Back end');

INSERT INTO task_labels (task_id,label_id) VALUES (1,1),(1,2),(2,3),(3,1),(3,2),(4,3),(5,4);