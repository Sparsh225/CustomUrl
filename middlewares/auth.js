const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const tokencookie = req.cookies?.token; //? stands for null check
  req.user = null;
  if (!tokencookie) {
    return next();
  }
  const token = tokencookie;
  const user = getUser(token);
  req.user = user;
  return next();
}

// async function restrictToLoggedinUserOnly(req, res, next) {
//   //console.log(req);
//   // const userId = req.cookies?.uid;
//   const userId = req.headers["authorization"];
//   // console.log(userId);
//   if (!userId) res.redirect("/login");
//   const token = userId.split("Bearer ")[1]; //Bearer [23u1232ukhdjdh]
//   const user = await getUser(token);
//   //sconsole.log(user);
//   if (!user) res.redirect("/login");
//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   //const userId = req.cookies?.uid;
//   const userId = req.headers["authorization"];
//   const token = userId.split("Bearer ")[1];
//   // const user = await getUser(userId);
//   const user = await getUser(token);
//   req.user = user;
//   next();
// }

//[admin ,normal]
function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) {
      return res.redirect("/login");
    }
    if (!roles.includes(req.user.role)) res.end("UnAuthorized");
    return next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};
