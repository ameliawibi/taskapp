import path from 'path';
const __dirname = path.resolve();

export const getSignup = (req,res) => {
  let ejsData = {
    error: "",
  }
  res.render("signup",ejsData);
};

export const postSignup = (req,res) => {
  let avatar;
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  avatar = req.files.avatar;

  uploadPath = __dirname + '/uploads/' + avatar.name;

  avatar.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded to ' + uploadPath);
  });
};

export const getLogin = (req,res) => {
  res.send('NOT IMPLEMENTED: get login');
};

export const postLogin = (req,res) => {
  res.send('NOT IMPLEMENTED: post login');
};
export const getLogout = (req,res) => {
  res.send('NOT IMPLEMENTED: get logout');
};