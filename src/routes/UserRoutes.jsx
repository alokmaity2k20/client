import { Route, Redirect } from "react-router-dom";
import HodDash from "../components/hod/HodDash";
import Login from "../components/Login";
import Logout from "../components/Logout";
import StudentDash from "../components/student/StudentDash";
import TeacherDash from "../components/teacher/TeacherDash";

const UserRoutes = ({ user }) => {
  return (
    <>
      <Route
        exact
        path="/login"
        render={() =>
          !user ? <Login /> : <Redirect from="/login" to="/dash" />
        }
      />
      <Route exact path="/logout" component={Logout} />

      <Route
        exact
        path="/dash"
        render={() => {
          if (user && user !== undefined && user.role === "student") {
            return <StudentDash />;
          }
          if (user && user !== undefined && user.role === "teacher") {
            return <TeacherDash />;
          }
          if (user && user !== undefined && user.role === "hod") {
            return <HodDash />;
          }
          if (user && user !== undefined && user.role === "admin") {
            return <Redirect from="/dash" to="/admin/dash" />;
          }
          if (!user || user === undefined) {
            return <Redirect to="/login" />;
          }
        }}
      />
    </>
  );
};

export default UserRoutes;
