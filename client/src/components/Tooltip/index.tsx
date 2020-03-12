import React from 'react';
import TooltipTrigger from 'react-popper-tooltip';
import { TooltipTriggerProps } from 'react-popper-tooltip/dist/types';

import { TooltipContainer, TooltipArrow, TriggerWrapper } from './style';
import { Overwrite } from '../../types';

type TooltipProps = Overwrite<
  Partial<TooltipTriggerProps>,
  {
    tooltip: JSX.Element;
    children: React.ReactNode;
  }
> & {
  triggerWrapper?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
};

const Tooltip: React.FC<TooltipProps> = ({ children, tooltip, triggerWrapper, delayShow = 100, ...props }) => (
  <TooltipTrigger
    {...props}
    delayShow={delayShow}
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
