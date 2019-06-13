import React, { Component } from 'react';

class PlayerPromptView extends Component {
  render() {
    const {
      promptsInfo,
      onCancelClicked,
      contentHeight,
      onPromptOptionClicked
    } = this.props;

    return (
      <div
        className="box"
        style={{
          minHeight: `${contentHeight - 12 * 2}px`,
          maxHeight: `${contentHeight - 12 * 2}px`
        }}
      >
        <h1>Select a Option</h1>
        <div className="field">
          <div className="control">
            <div className="columns is-centered is-multiline">
              {promptsInfo.options.map((option, i) => (
                <div className="control column" key={i}>
                  <input
                    className={`button is-fullwidth global-light-hover ${
                      promptsInfo.promptMessage === `picking a color`
                        ? `${option} has-text-white`
                        : ''
                    }`}
                    name="prompt-option"
                    type="button"
                    onClick={onPromptOptionClicked}
                    value={option}
                    optionindex={i}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
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
    );
  }
}

export default PlayerPromptView;
