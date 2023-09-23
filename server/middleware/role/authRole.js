const authRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.body.role;
    if (!allowedRoles.includes(userRole)) {
      console.log("unauthorized user");
      res.status(403).json({
        code: 403,
        data: {
          message: "Forbidden route : You don't have any access to this path!"
        },
      });
      }
    else {
        next()
      }
  };
};
