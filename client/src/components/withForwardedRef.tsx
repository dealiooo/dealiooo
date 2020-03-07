import React, { forwardRef } from 'react';

const withForwardedRef = (Component: React.ComponentType<any>) => {
  const refForwardingComponent = (props, ref) => <Component {...props} forwardedRef={ref} />;
  refForwardingComponent.displayName = `withForwardedRef(${Component.displayName || Component.name || 'Component'})`;

  return forwardRef(refForwardingComponent);
};

export default withForwardedRef;
