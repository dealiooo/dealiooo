import NewPassword from "./NewPassword";

const NewPasswordRoute = [
  {
    path: "/new-password/:sid",
    exact: true,
    component: NewPassword
  }
];

export default NewPasswordRoute;
