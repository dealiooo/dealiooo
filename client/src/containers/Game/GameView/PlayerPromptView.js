import React, { Component } from 'react';

class PlayerPromptView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null
    };

    this.handleOptionSelected = this.handleOptionSelected.bind(this);
  }

  handleOptionSelected = event => {
    this.setState({
      selectedOption: event.target.value
    });
  };

  render() {
    const { selectedOption } = this.state;
    const {
      promptsInfo,
      onPromptSubmit,
      onCancelClicked,
      contentHeight
    } = this.props;

    return (
      <div
        className="box"
        style={{
          minHeight: `${contentHeight - 20 * 2}px`,
          maxHeight: `${contentHeight - 20 * 2}px`
        }}
      >
        <h1>Select an Option</h1>
        <form onSubmit={onPromptSubmit}>
          <div className="field">
            <div className="control">
              <div className="columns is-centered is-multiline">
                {promptsInfo.options.map(option => (
                  <div className="control column">
                    <input
                      className={`button is-fullwidth ${
                        option === selectedOption
                          ? 'has-background-info has-text-white'
                          : ''
                      }`}
                      name="prompt-option"
                      type="button"
                      onClick={this.handleOptionSelected}
                      value={option}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            className="button is-primary"
            type="submit"
            onClick={onPromptSubmit}
            value={selectedOption}
            disabled={!selectedOption}
          >
            Submit
          </button>
          <button
            className="button is-danger"
            type="button"
            onClick={onCancelClicked}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export default PlayerPromptView;
