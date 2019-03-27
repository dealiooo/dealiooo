import NotFound from "./NotFound";

const ErrorRoute = [
  {
    path: "/404",
    exact: true,
    component: NotFound
  }
];

export default ErrorRoute;
