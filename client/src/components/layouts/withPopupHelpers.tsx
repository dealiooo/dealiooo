import React from 'react';
import 'react-popper-tooltip/dist/styles.css';

export const withTooltip = TooltipComponent => ({
  arrowRef,
  tooltipRef,
  getArrowProps,
  getTooltipProps,
  placement,
}) => (
  <div {...getTooltipProps({ ref: tooltipRef })}>
    {/* TODO: customize arrow-style to fit design */}
    <div {...getArrowProps({ ref: arrowRef, className: 'tooltip-arrow', 'data-placement': placement })} />
    <TooltipComponent />
  </div>
);

export const withTrigger = (WrapperComponent = 'span', renderTrigger) => ({ getTriggerProps, triggerRef }) => (
  <WrapperComponent {...getTriggerProps({ ref: triggerRef, className: 'trigger' })}>{renderTrigger()}</WrapperComponent>
);
