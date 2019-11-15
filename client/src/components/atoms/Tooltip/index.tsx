import React from 'react';
import styled from 'styled-components';
import TooltipTrigger from 'react-popper-tooltip';

import './tooltip.css';

const Tooltip = ({ children, tooltip, triggerWrapperAs, ...props }) => (
  <TooltipTrigger
    {...props}
    tooltip={({ arrowRef, tooltipRef, getArrowProps, getTooltipProps, placement }) => (
      <div
        {...getTooltipProps({
          ref: tooltipRef,
          className: 'tooltip-container',
        })}
      >
        <div
          {...getArrowProps({
            ref: arrowRef,
            className: 'tooltip-arrow',
            'data-placement': placement,
          })}
        />
        {tooltip}
      </div>
    )}
  >
    {({ getTriggerProps, triggerRef }) => (
      <TriggerWrapper
        as={triggerWrapperAs}
        {...getTriggerProps({
          className: 'trigger',
          ref: triggerRef,
        })}
      >
        {children}
      </TriggerWrapper>
    )}
  </TooltipTrigger>
);

const TriggerWrapper = styled.span``;

export default Tooltip;
