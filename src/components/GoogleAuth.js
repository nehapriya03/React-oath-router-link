import React, { useEffect } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

const GoogleAuth = ({ isSignedIn, signIn, signOut }) => {
  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "322514743586-jegbh99qiu4bijqse8qg1onp0uee716l.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();
          onAuthChange(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  });

  const onAuthChange = (isSignedIn) => {
    const auth = window.gapi.auth2.getAuthInstance();

    if (isSignedIn) {
      signIn(auth.currentUser.get().getId());
    } else {
      signOut();
    }
  };

  const onSignInClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const onSignOutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  const renderAuthButton = () => {
    if (!isSignedIn) {
      return (
        <button className="ui red google button" onClick={onSignInClick}>
          <i className="google icon " />
          Sign In with Google
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={onSignOutClick}>
          <i className="google icon " />
          Sign Out
        </button>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
