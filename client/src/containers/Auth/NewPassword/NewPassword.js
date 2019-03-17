import React, { Component } from "react";
import {
  Field,
  Control,
  Input
} from "react-bulma-components/lib/components/form";
import Section from "react-bulma-components/lib/components/section";
import Button from "react-bulma-components/lib/components/button";
import Box from "react-bulma-components/lib/components/box";
import Columns from "react-bulma-components/lib/components/columns";
import Container from "react-bulma-components/lib/components/container";
import Banner from "../../../components/Banner";
import Heading from "react-bulma-components/lib/components/heading";

import { Auth } from "../../../api";

class NewPassword extends Component {
  state = {
    isLoading: false,
    password: "",
    error_message: null
  };

  componentDidMount() {
    this.setState({
      isLoading: true
    });

    const { sid } = this.props.match.params;
    console.log(sid);
    Auth.getNewPassword(sid).then(result => {
      if (!result.ok) {
        window.location = "/login";
      }

      this.setState({ isLoading: false });
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const { sid } = this.props.match.params;
    Auth.postNewPassword(sid, this.state.password).then(result => {
      if (!result.ok) {
        this.setState({ error_message: "Something went wrong" });
      } else {
        window.location = "/";
      }
    });
  };

  render() {
    const { isLoading, password, error_message } = this.state;

    if (isLoading) {
      return <>...Loading</>;
    } else {
      return (
        <Container fluid>
          <Banner />
          <Section>
            {error_message ? (
              <div className="has-text-danger">{error_message}</div>
            ) : null}
            <Columns className="is-centered">
              <Columns.Column size={4}>
                <Box>
                  <form onSubmit={this.onSubmit}>
                    <Field>
                      <Heading className="has-text-centered has-text-black">
                        New Password
                      </Heading>
                      <Control>
                        <Input
                          name="password"
                          type="password"
                          onChange={this.onChange}
                          value={password}
                          placeholder="New Password"
                        />
                      </Control>
                    </Field>
                    <Field>
                      <Control>
                        <Button className="is-fullwidth">Submit</Button>
                      </Control>
                    </Field>
                  </form>
                </Box>
              </Columns.Column>
            </Columns>
          </Section>
        </Container>
      );
    }
  }
}

export default NewPassword;
