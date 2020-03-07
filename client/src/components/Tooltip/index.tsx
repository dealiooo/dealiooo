import React from 'react';
import TooltipTrigger from 'react-popper-tooltip';

import { TooltipContainer, TooltipArrow, TriggerWrapper } from './style';

const Tooltip: React.FC = ({ children, tooltip, triggerWrapper, delay = 100, ...props }) => (
  <TooltipTrigger
    {...props}
    delayShow={delay}
    tooltip={({ arrowRef, tooltipRef, getArrowProps, getTooltipProps, placement }) => (
      <TooltipContainer
        {...getTooltipProps({
          className: 'tooltip-container',
          ref: tooltipRef,
        })}
      >
        <TooltipArrow
          {...getArrowProps({
            className: 'tooltip-arrow',
            ref: arrowRef,
            'data-placement': placement,
          })}
        />
        {tooltip}
      </TooltipContainer>
    )}
  >
    {({ getTriggerProps, triggerRef }) => (
      <TriggerWrapper
        as={triggerWrapper}
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

export default Tooltip;
