import React, { Component } from "react";
import { StyleSheet, View, Modal, ActivityIndicator, Text } from "react-native";

class ErrorHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { errorOccurred: false, message: null };
  }

  componentDidCatch(error, info) {
    this.setState({ errorOccurred: true, message: info });
  }

  render() {
    return this.state.errorOccurred ? (
      <View>
        <Text style={{ textAlign: "center", fontSize: 16, padding: 10 }}>
          Something went wrong!
        </Text>
        {__DEV__ ? (
          <Text style={{ textAlign: "center", fontSize: 8, padding: 10 }}>
            {this.state.message}
          </Text>
        ) : null}
      </View>
    ) : (
      this.props.children
    );
  }
}
export default ErrorHandler;
