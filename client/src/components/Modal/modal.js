import React, { Component } from "react";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleEscapeKey);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEscapeKey);
  }

  handleEscapeKey(event) {
    const { show, onClose } = this.props;

    if (event.keyCode === 27 && show) {
      onClose();
    }
  }

  render() {
    const { show } = this.props;
    if (show) {
      return (
        <div className={`modal ${show ? "is-active" : ""}`}>
          <div class="modal-background" />
          {this.props.children}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Modal;
