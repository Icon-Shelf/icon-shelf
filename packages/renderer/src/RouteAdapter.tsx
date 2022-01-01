/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { FC } from "react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const RouteAdapter: FC = ({ children }) => {
  const reactRouterNavigate = useNavigate();
  const reactRouterLocation = useLocation();

  const adaptedHistory = useMemo(
    () => ({
      // can disable eslint for parts here, location.state can be anything
      replace(location: Location) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        // @ts-ignore
        reactRouterNavigate(location, { replace: true, state: location.state });
      },
      push(location: Location) {
        reactRouterNavigate(location, {
          replace: false,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          // @ts-ignore
          state: location.state,
        });
      },
    }),
    [reactRouterNavigate]
  );
  // https://github.com/pbeshai/use-query-params/issues/196
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return children({ history: adaptedHistory, reactRouterLocation });
};
