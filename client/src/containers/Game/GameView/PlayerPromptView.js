import React, { Component } from 'react';

class PlayerPromptView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
      selectedIndex: null
    };

    this.handleOptionSelected = this.handleOptionSelected.bind(this);
  }

  handleOptionSelected = event => {
    this.setState({
      selectedOption: event.target.value,
      selectedIndex: event.target.getAttribute('optionindex')
    });
  };

  render() {
    const { selectedOption, selectedIndex } = this.state;
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
        <h1>Select a Option</h1>
        <form onSubmit={onPromptSubmit}>
          <div className="field">
            <div className="control">
              <div className="columns is-centered is-multiline">
                {promptsInfo.options.map((option, i) => (
                  <div className="control column" key={i}>
                    <input
                      className={`button is-fullwidth is-rounded ${
                        option === selectedOption
                          ? 'has-background-info has-text-white'
                          : ''
                      }`}
                      name="prompt-option"
                      type="button"
                      onClick={this.handleOptionSelected}
                      value={option}
                      optionindex={i}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="control has-text-centered">
            <button
              className="button is-primary is-medium is-rounded"
              type="submit"
              onClick={onPromptSubmit}
              value={selectedOption}
              disabled={!selectedOption}
              optionindex={selectedIndex}
            >
              Submit
            </button>
            <div className="control has-text-right">
              <button
                className="button is-danger is-rounded"
                type="button"
                onClick={onCancelClicked}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default PlayerPromptView;
