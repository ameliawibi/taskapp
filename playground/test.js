const ejsData =
{
  Done: [
    {
      status: 'Done',
      id: 1,
      due_date: '05/05/2022',
      task_name: 'UX research on Onboarding workflow',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      assigned_to: 1,
      user_avatar: 'user1.jpeg'
    }
  ],
  'In progress': [
    {
      status: 'In progress',
      id: 2,
      due_date: '04/04/2022',
      task_name: 'Implement Onboarding page layout',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      assigned_to: 2,
      user_avatar: 'user2.jpeg'
    }
  ],
  'In review': [
    {
      status: 'In review',
      id: 3,
      due_date: '01/01/2022',
      task_name: 'Create wireframe',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      assigned_to: 1,
      user_avatar: 'user1.jpeg'
    }
  ],
  'To do': [
    {
      status: 'To do',
      id: 4,
      due_date: '03/03/2022',
      task_name: 'Create DB model for Onboarding',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      assigned_to: 3,
      user_avatar: 'user3.jpeg'
    },
    {
      status: 'To do',
      id: 5,
      due_date: '04/05/2022',
      task_name: 'Implement logic for onboarding page',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      assigned_to: 2,
      user_avatar: 'user2.jpeg'
    }
  ]
}

const ejsLabel = [
  { id: 1, label: 'Design' },
  { id: 1, label: 'UX' },
  { id: 2, label: 'Front end' },
  { id: 3, label: 'Design' },
  { id: 3, label: 'UX' },
  { id: 4, label: 'Front end' },
  { id: 5, label: 'Back end' }
]

for (const [key, value] of Object.entries(ejsData)) {
  console.log(key);
  console.log(value.length);
  value.forEach(element => {
    ejsLabel.forEach(item => {
      if(element.id === item.id) {
        console.log(item.label);
      }
    });
    console.log(element.due_date);
    console.log(element.task_name);
    console.log(element.user_avatar);
  });
}
