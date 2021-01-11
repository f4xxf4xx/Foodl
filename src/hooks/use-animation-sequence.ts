import { useEffect, DependencyList } from "react";
import CancellationToken from "cancellationtoken";

export function useAnimationSequence(
  animations: Array<(token: CancellationToken) => Promise<void>>,
  deps?: DependencyList
) {
  useEffect(() => {
    const { cancel, token } = CancellationToken.create();
    (async () => {
      for(const animation of animations) {
        if (token.isCancelled) return;
        await animation(token);
      }
    })();
    return () => cancel();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
