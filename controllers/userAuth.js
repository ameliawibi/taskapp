import path from 'path';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();

export const getSignup = (req, res) => {
  const ejsData = {
    error: '',
  };
  res.render('signup', ejsData);
};

export const postSignup = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  const { avatar } = req.files;
  res.cookie("avatar", `${avatar.name}`);

  const uploadPath = `${__dirname}/uploads/${avatar.name}`;

  avatar.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.redirect("/task");
    //res.send(`File uploaded to ${uploadPath}`);
  });
};

export const getLogin = (req, res) => {
  res.send('NOT IMPLEMENTED: get login');
};

export const postLogin = (req, res) => {
  res.send('NOT IMPLEMENTED: post login');
};
export const getLogout = (req, res) => {
  res.send('NOT IMPLEMENTED: get logout');
};
