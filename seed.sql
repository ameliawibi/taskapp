INSERT INTO users (avatar,name,email,password) VALUES ('user1.jpeg','Nina Simpson','nina@email.com','password'),('user2.jpeg','Sofia Johnson','sofia@email.com','password'),('user3.jpeg','Norman Freeman','norman@email.com','password');

INSERT INTO task_statuses (status) VALUES ('To do'),('In progress'),('In review'),('Done');

INSERT INTO tasks (due_date,name,description,assigned_to,task_status_id) VALUES ('05/05/2022','UX research on Onboarding workflow', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',1,4);

INSERT INTO tasks (due_date,name,description,assigned_to,task_status_id) VALUES ('04/04/2022','Implement Onboarding page layout', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',2,2);

INSERT INTO tasks (due_date,name,description,assigned_to,task_status_id) VALUES ('01/01/2022','Create wireframe', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',1,3);

INSERT INTO tasks (due_date,name,description,assigned_to,task_status_id) VALUES ('03/03/2022','Create DB model for Onboarding', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',3,1);

INSERT INTO tasks (due_date,name,description,assigned_to,task_status_id) VALUES ('04/05/2022','Implement logic for onboarding page', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',2,1);

INSERT INTO comments (comment,task_id,user_id) VALUES ('Lorem ipsum dolor sit amet, consectetur adipiscing elit',1,1),('Lorem ipsum dolor sit amet, consectetur adipiscing elit',2,1),('Lorem ipsum dolor sit amet, consectetur adipiscing elit',3,1),('Lorem ipsum dolor sit amet, consectetur adipiscing elit',4,1),('Lorem ipsum dolor sit amet, consectetur adipiscing elit',1,2),('Lorem ipsum dolor sit amet, consectetur adipiscing elit',2,2),('Lorem ipsum dolor sit amet, consectetur adipiscing elit',3,2),('Lorem ipsum dolor sit amet, consectetur adipiscing elit',4,2);

INSERT INTO labels (label) VALUES ('Design'),('UX'),('Front end'),('Back end');

INSERT INTO task_labels (task_id,label_id) VALUES (1,1),(1,2),(2,3),(3,1),(3,2),(4,3),(5,4);