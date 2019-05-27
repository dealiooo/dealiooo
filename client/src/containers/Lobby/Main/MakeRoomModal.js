import React, { Component } from 'react';

import Modal from '../../../components/Modal/modal';

class MakeRoomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      roomName: this.props.roomName,
      playerCapacity: this.props.playerCapacity
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps = props => {
    this.setState({
      roomName: props.roomName,
      playerCapacity: props.playerCapacity
    });
  };

  openModal = () => this.setState({ showModal: true });
  closeModal = () => this.setState({ showModal: false });

  render() {
    const { showModal, roomName, playerCapacity } = this.state;
    const { onChange, onCreate } = this.props;

    return (
      <>
        <button className="button is-info" onClick={this.openModal}>
          <strong>Make a Room</strong>
        </button>
        <Modal show={showModal} onClose={this.closeModal}>
          <div className="modal-card" style={{ borderRadius: '0.5em' }}>
            <header className="modal-card-head has-background-info">
              <h1 className="modal-card-title has-text-centered has-text-white">
                Make a Room
              </h1>
              <button
                className="delete"
                onClick={this.closeModal}
                aria-label="close"
              />
            </header>
            <section className="modal-card-body">
              <form onSubmit={onCreate}>
                <div className="field">
                  <div className="control">
                    <label className="label">Room Name</label>
                    <input
                      className="input"
                      name="roomName"
                      type="text"
                      onChange={onChange}
                      placeholder="Room Name"
                      value={roomName}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">Player Capacity</label>
                    <div className="columns is-centered">
                      {[2, 3, 4, 5].map(playerCapacityValue => (
                        <div className="control column">
                          <input
                            className={`button is-fullwidth ${
                              parseInt(playerCapacity) === playerCapacityValue
                                ? 'has-background-info has-text-white'
                                : ''
                            }`}
                            name="playerCapacity"
                            type="button"
                            onClick={onChange}
                            value={playerCapacityValue}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <div className="columns is-centered">
                      <div className="column is-half">
                        <button
                          className="button is-info is-fullwidth"
                          type="submit"
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </Modal>
      </>
    );
  }
}

export default MakeRoomModal;
