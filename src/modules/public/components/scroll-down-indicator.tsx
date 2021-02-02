import React, { useContext, forwardRef } from "react";
import styled, { keyframes, ThemeContext } from "styled-components";
import { motion, MotionProps } from "framer-motion";
import { Theme } from "theme";

const scrollDownAnimation = keyframes`
    0% { transform: translateY(0); }
   60% { transform: translateY(0); }
   65% { transform: translateY(16px); }
   80% { transform: translateY(0); }
   85% { transform: translateY(16px); }
  100% { transform: translateY(0); }
`;

const StyledLink = styled(motion.a)<{ theme: Theme }>`
  display: inline-block;

  & > svg {
    width: 128px;
    animation: 3s infinite ${scrollDownAnimation} ease-in-out;
  }
`;

interface Props {
  onClick(): void;
}
export const ScrollDownIndicator = forwardRef<HTMLAnchorElement, Props & MotionProps>((props, ref) => {
  const theme = useContext<Theme>(ThemeContext);
  return (
    <StyledLink
      ref={ref}
      href="#"
      initial={props.initial}
      animate={props.animate}
      variants={props.variants}
      transition={props.transition}
      onClick={e => {props.onClick(); e.preventDefault();}}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="128" height="16" viewBox="0 0 128 16">
        <g transform="translate(10 -1520)" fill={theme.colors.dark.gray}>
          <path d="M 54.09068298339844 1535.492431640625 L -7.764240264892578 1524.64404296875 C -8.767640113830566 1524.4677734375 -9.49765682220459 1523.606201171875 -9.499907493591309 1522.595581054688 C -9.500289916992188 1522.4716796875 -9.489506721496582 1522.34765625 -9.467857360839844 1522.226196289062 C -9.290924072265625 1521.225708007812 -8.421957015991211 1520.500122070312 -7.401540279388428 1520.500122070312 C -7.278073787689209 1520.500122070312 -7.154323577880859 1520.510864257812 -7.033723831176758 1520.5322265625 L 54.00386047363281 1531.2373046875 L 54.09022521972656 1531.252563476562 L 54.17660903930664 1531.2373046875 L 115.0329437255859 1520.563720703125 C 115.1554260253906 1520.542602539062 115.2795791625977 1520.53173828125 115.4007797241211 1520.53173828125 C 116.4213409423828 1520.53173828125 117.2907104492188 1521.257446289062 117.4679412841797 1522.257446289062 C 117.4895782470703 1522.381225585938 117.5004577636719 1522.505859375 117.5000762939453 1522.626831054688 C 117.4978103637695 1523.63818359375 116.7676391601562 1524.499633789062 115.7638931274414 1524.67578125 L 54.09068298339844 1535.492431640625 Z" stroke="none"/>
          <path fill={theme.colors.background} d="M -7.40155029296875 1521.000122070312 C -8.178985595703125 1521.000122070312 -8.84088134765625 1521.552124023438 -8.975631713867188 1522.313842773438 C -8.992034912109375 1522.405883789062 -9.000213623046875 1522.5 -8.999916076660156 1522.594482421875 C -8.998199462890625 1523.362426757812 -8.442085266113281 1524.017333984375 -7.677848815917969 1524.151489257812 L 54.09068298339844 1534.98486328125 L 115.6774978637695 1524.183227539062 C 116.4421310424805 1524.049072265625 116.9983520507812 1523.394287109375 117.0000686645508 1522.625366210938 C 117.0003509521484 1522.533569335938 116.9919815063477 1522.438354492188 116.9756164550781 1522.3447265625 C 116.8407669067383 1521.583862304688 116.1784515380859 1521.03173828125 115.400764465332 1521.03173828125 C 115.3080673217773 1521.03173828125 115.2125854492188 1521.040161132812 115.1193008422852 1521.056274414062 L 54.26296615600586 1531.729858398438 L 54.09021759033203 1531.760131835938 L 53.9174690246582 1531.729858398438 L -7.120597839355469 1521.024536132812 C -7.212600708007812 1521.00830078125 -7.307136535644531 1521.000122070312 -7.40155029296875 1521.000122070312 M -7.40155029296875 1520.000122070312 C -7.250297546386719 1520.000122070312 -7.097648620605469 1520.01318359375 -6.946868896484375 1520.039794921875 L 54.09021759033203 1530.744873046875 L 114.9465484619141 1520.0712890625 C 115.0968704223633 1520.045288085938 115.2495193481445 1520.03173828125 115.400764465332 1520.03173828125 C 116.6641159057617 1520.03173828125 117.7406692504883 1520.93115234375 117.9602661132812 1522.170166015625 C 117.9869537353516 1522.322875976562 118.0005340576172 1522.47705078125 118.0000686645508 1522.62841796875 C 117.9972686767578 1523.882202148438 117.0930480957031 1524.9501953125 115.8503036499023 1525.168212890625 L 54.09068298339844 1536.000122070312 L -7.850601196289062 1525.136474609375 C -9.093368530273438 1524.918212890625 -9.997100830078125 1523.85009765625 -9.999916076660156 1522.5966796875 C -10.00038146972656 1522.44482421875 -9.987266540527344 1522.290771484375 -9.960113525390625 1522.138427734375 C -9.740966796875 1520.8994140625 -8.6649169921875 1520.000122070312 -7.40155029296875 1520.000122070312 Z" stroke="none"/>
        </g>
      </svg>
    </StyledLink>
  );
});
