import React from "react";
import auth from "./authService.js";

const { Consumer, Provider } = React.createContext();
// HOC para crear Consumer
// el componente withAuth recibe un componente como argumento y nos devuelve un componente con el mismo componente dentro de un <Consumer /> con las propiedades user e isLoggedin (state), y los métodos login, signup y logout (this)
const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          {({ login, signup, user, logout, isLoggedin, refetchSession }) => {
            return (
              <WrappedComponent
                login={login}
                signup={signup}
                user={user}
                logout={logout}
                isLoggedin={isLoggedin}
                refetchSession={refetchSession}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

// Provider
class AuthProvider extends React.Component {
  state = {
    isLoggedin: false,
    user: null,
    isLoading: true,
  };

  componentDidMount() {
    // luego de que se monte el componente, llama a auth.me() que nos devuelve el usuario y setea los valores para loguearlo
    auth
      .me()
      .then((user) =>
        this.setState({ isLoggedin: true, user: user, isLoading: false })
      )
      .catch((err) =>
        this.setState({ isLoggedin: false, user: null, isLoading: false })
      );
  }

  signup = (user) => {
    const { username, password, namegroup } = user;
    return auth
      .signup({ username, password, namegroup })
      .then((user) => this.setState({ isLoggedin: true, user }))
      .catch(({ response }) =>
        this.setState({ message: response.data.statusMessage })
      );
  };

  login = (user) => {
    const { username, password } = user;
    return auth
      .login({ username, password })
      .then((user) => this.setState({ isLoggedin: true, user }))
      .catch((err) => console.log(err));
  };

  logout = () => {
    return auth
      .logout()
      .then(() => this.setState({ isLoggedin: false, user: null }))
      .catch((err) => console.log(err));
  };

  refetchSession = () => {
    return auth
      .me()
      .then((user) =>
        this.setState({ isLoggedin: true, user: user, isLoading: false })
      )
      .catch((err) =>
        this.setState({ isLoggedin: false, user: null, isLoading: false })
      );
  };

  render() {
    // destructuramos isLoading, isLoggedin y user de this.state y login, logout y signup de this
    const { isLoading, isLoggedin, user } = this.state;
    const { login, logout, signup, refetchSession } = this;
    return isLoading ? (
      // si está loading, devuelve un <div> y sino devuelve un componente <Provider> con un objeto con los valores: { isLoggedin, user, login, logout, signup}
      // el objeto pasado en la prop value estará disponible para todos los componentes <Consumer>
      <div
        style={{
          margin: "auto",
          width: "400px",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Loading
      </div>
    ) : (
      <Provider
        value={{ isLoggedin, user, login, logout, signup, refetchSession }}
      >
        {this.props.children}
      </Provider>
    ); /*<Provider> 'value={}' datos que estarán disponibles para todos los componentes <Consumer> */
  }
}

export { Consumer, withAuth }; //  <--  RECUERDA EXPORTAR  ! ! !
export default AuthProvider; //  <--  RECUERDA EXPORTAR  ! ! !
