import jsSHA from "jssha";
import {pool} from "./connect";
export const getHashString = (input) => {
  const shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
  shaObj.update(input);
  return shaObj.getHash("HEX");
};

export const getHashedCookie = (input, salt) => {
  const shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
  const unhashedCookieString = `${input}-${salt}`;
  shaObj.update(unhashedCookieString);
  return shaObj.getHash("HEX");
};

export const restrictToLoggedIn = (request, response, next) => {

  // is the user logged in? Use the other middleware.
  if( request.isUserLoggedIn === false ){
    response.redirect('/auth/login');
    return;
  }else{

    // The user is logged in. Get the user from the DB.
    const userQuery = `SELECT * FROM users WHERE id=$1`;
    pool.query(userQuery, [request.cookies.userID])
      .then(userQueryResult => {

        // can't find the user based on their cookie.
        if( userQueryResult.rows.length === 0 ){
          response.redirect('/auth/login');
          return;
        }

        // attach the DB query result to the request object.
        request.user = userQueryResult.rows[0];

        // go to the route callback.
        next();
      }).catch(_error => {
        response.redirect('/auth/login');
      });
  }
};
