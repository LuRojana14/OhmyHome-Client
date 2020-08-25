import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { withAuth } from "../../utils/AuthProvider";
import { Form, Button, Dropdown, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Route } from "react-router-dom";
import "./group.css";

class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingCreateGroupSection: false,
      showingSelectGroupSection: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { groupName } = this.state;

    return (
      <div
        style={{
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          backgroundColor: "white",
          width: "400px",
          margin: "auto",
          marginTop: "100px",
        }}
      >
        <Helmet>
          <body className="groupSetupPage" />
        </Helmet>
        <Route path="/group-setup" exact component={GroupSetupStartPage} />
        <Route
          path="/group-setup/create-group"
          component={withAuth(GroupCreation)}
        />
        <Route
          path="/group-setup/select-group"
          component={withAuth(GroupSelection)}
        />
      </div>
    );
  }
}

class GroupSetupStartPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <body className="body-creategroup"></body>
        </Helmet>
        <h5 style={{ textAlign: "center" }}>Lets get the group setup!</h5>
        {/* <div style={{ marginTop: "20px" }} /> */}
        <div className="select-group">
          <p>Do you already have a group?</p>
          <div className="container-button-group">
            <button
              className="button-group"
              onClick={() =>
                this.props.history.push("/group-setup/select-group")
              }
              variant="primary"
              type="submit"
            >
              Select an existing one
            </button>
          </div>
        </div>
        {/* <div style={{ marginTop: "20px" }} /> */}
        <div className="create-group">
          <p>Or do you want to create a new one?</p>
          <div className="container-button-creategroup">
            <button
              className="button-creategroup"
              onClick={() =>
                this.props.history.push("/group-setup/create-group")
              }
              variant="primary"
              type="submit"
            >
              Create new group
            </button>
          </div>
        </div>
        {/* <Button
          onClick={() => this.props.history.push("/group-setup/select-group")}
          variant="primary"
          type="submit"
        >
          Select an existing one
        </Button> */}

        {/* <Button
          onClick={() => this.props.history.push("/group-setup/create-group")}
          variant="primary"
          type="submit"
        >
          Create new group
        </Button> */}
      </div>
    );
  }
}

class GroupCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { groupName: "" };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { groupName } = this.state;
    axios
      .post("http://localhost:4000/group/creategroup", {
        groupName,
        userId: this.props.user._id,
      })
      .then((response) => {
        console.log("Group creation successful: ", response);
        this.props.refetchSession().then(() => {
          this.props.history.push("/tasks");
        });
      })
      .catch((error) => {
        console.log("Error when creating group ");
        console.log(error);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button onClick={() => this.props.history.push("/group-setup")}>
          Back
        </button>
        <label>Group Name</label>
        <input
          name="groupName"
          onChange={(event) => this.setState({ groupName: event.target.value })}
          type="text"
          value={this.state.groupName}
          placeholder="Enter group name"
        />
        <button type="submit">Create</button>
      </form>

      // <Form onSubmit={this.handleSubmit}>
      //   <Button
      //     variant="link"
      //     onClick={() => this.props.history.push("/group-setup")}
      //   >
      //     Go back
      //   </Button>
      //   <div style={{ marginTop: "20px" }} />
      //   <Form.Group>
      //     <Form.Label>Group Name</Form.Label>
      //     <Form.Control
      //       name="groupName"
      //       onChange={(event) =>
      //         this.setState({ groupName: event.target.value })
      //       }
      //       type="text"
      //       value={this.state.groupName}
      //       placeholder="Enter group name"
      //     />
      //     <Form.Text className="text-muted">
      //       Enter the name of the group you want to create
      //     </Form.Text>
      //   </Form.Group>
      //   <Form.Group>
      //     <Button variant="primary" type="submit">
      //       Create
      //     </Button>
      //   </Form.Group>
      // </Form>
    );
  }
}

class GroupSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { groups: [], selected: null };
  }

  componentDidMount() {
    axios.get("http://localhost:4000/group").then((response) => {
      this.setState({ groups: response.data });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { selected } = this.state;
    axios
      .post("http://localhost:4000/group/assignUser", {
        groupName: selected,
        userId: this.props.user._id,
      })
      .then((response) => {
        console.log("Group assigning successful: ", response);
        this.props.refetchSession().then(() => {
          this.props.history.push("/tasks");
        });
      })
      .catch((error) => {
        console.log("Error when assigning group ");
        console.log(error);
      });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Button
          variant="link"
          onClick={() => this.props.history.push("/group-setup")}
        >
          Go back
        </Button>
        <div style={{ marginTop: "20px" }} />
        <p>
          Take a look at the current groups and find the one you want to join!
        </p>

        <Row>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-basic">
                {this.state.selected
                  ? this.state.selected
                  : "Select your group"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {this.state.groups.map((group) => {
                  return (
                    <Dropdown.Item
                      key={group.groupName}
                      onClick={() =>
                        this.setState({ selected: group.groupName })
                      }
                    >
                      {group.groupName}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col>
            <Button
              disabled={!this.state.selected}
              variant="primary"
              type="submit"
            >
              Join
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default withAuth(SignUpPage);
