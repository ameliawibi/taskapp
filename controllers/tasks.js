export const getTaskPost = (req,res) => {
  res.send('NOT IMPLEMENTED: render add new task form');
};

export const postTask = (req,res) => {
  res.send('NOT IMPLEMENTED: add new task');
};

export const getAllTasks = (req,res) => {
  const ejsData = {
    active_user: req.cookies.avatar
  }
  res.render('board', ejsData);
};

export const getTaskEdit = (req,res) => {
  res.send('NOT IMPLEMENTED: render single task edit form');
};

export const editTask = (req,res) => {
  res.send('NOT IMPLEMENTED: update single task');
};

export const deleteTask = (req,res) => {
  res.send('NOT IMPLEMENTED: delete single task');
};