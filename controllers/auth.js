exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req.get("Cookie").split(";")[4].trim().split("=")[1] === 'true';
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect("/");
};
