const json = {
  ejsData: {
    id: '1',
    task_status_id: 1,
    due_date: '05/05/2022',
    name: 'UX research on Onboarding workflow',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    assigned_to: 1
  },
  active_user: 'bird.png',
  ejsLabel: [ '2', '4' ],
  ejsUser: [
    {
      id: 4,
      avatar: 'bird.png',
      name: 'birdie',
      email: 'birdie@email.com',
      password: 'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86'
    },
    {
      id: 1,
      avatar: 'user1.jpeg',
      name: 'Nina Simpson',
      email: 'nina@email.com',
      password: 'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86'
    },
    {
      id: 2,
      avatar: 'user2.jpeg',
      name: 'Sofia Johnson',
      email: 'sofia@email.com',
      password: 'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86'
    },
    {
      id: 3,
      avatar: 'user3.jpeg',
      name: 'Norman Freeman',
      email: 'norman@email.com',
      password: 'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86'
    }
  ],
  ejsStatusOptions: [
    { id: 1, status: 'To do' },
    { id: 2, status: 'In progress' },
    { id: 3, status: 'In review' },
    { id: 4, status: 'Done' }
  ],
  ejsLabelOptions: [
    { id: 1, label: 'Design' },
    { id: 2, label: 'UX' },
    { id: 3, label: 'Front end' },
    { id: 4, label: 'Back end' }
  ],
  ejsComment: [
    {
      id: 1,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      task_id: 1,
      user_id: 1,
      created_at: '2022-03-21T13:39:46.343Z',
      due_date: '05/05/2022',
      name: 'UX research on Onboarding workflow',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      assigned_to: 1,
      task_status_id: 1
    },
    {
      id: 1,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      task_id: 1,
      user_id: 2,
      created_at: '2022-03-21T13:39:46.343Z',
      due_date: '05/05/2022',
      name: 'UX research on Onboarding workflow',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      assigned_to: 1,
      task_status_id: 1
    },
    {
      id: 1,
      comment: 'Test comment',
      task_id: 1,
      user_id: 4,
      created_at: '2022-03-21T13:39:46.343Z',
      due_date: '05/05/2022',
      name: 'UX research on Onboarding workflow',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      assigned_to: 1,
      task_status_id: 1
    },
    {
      id: 1,
      comment: 'Test comment',
      task_id: 1,
      user_id: 4,
      created_at: '2022-03-21T13:39:46.343Z',
      due_date: '05/05/2022',
      name: 'UX research on Onboarding workflow',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      assigned_to: 1,
      task_status_id: 1
    }
  ],
  error: []
}

json.ejsComment.forEach((data) => {
  const avatar = json.ejsUser.filter(user => user.id === data.user_id).map(user => user.avatar);
  const name = json.ejsUser.filter(user => user.id === data.user_id).map(user => user.name)
console.log(`${avatar},${name},${data.created_at}`);
})