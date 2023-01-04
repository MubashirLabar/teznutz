import React, { useState } from 'react';
import { animated, useTransition } from 'react-spring';

interface Props {
  dirPath: string;
  imagesLength: number;
  extension: string;
}

const AnimatedImages = (props: Props) => {
  const [index, setIndex] = useState(1);
  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 2500 },
    onRest: (_a, _b, item) => {
      if (index === item) {
        setIndex((state) => ((state + 1) % props.imagesLength) + 1);
      }
    },
    exitBeforeEnter: true,
  });

  return (
    <>
      {transitions((style, i) => (
        <animated.img
          className={`vector ${props.dirPath}`}
          src={require(`../assets/images/${props.dirPath}/${i}.${props.extension}`)}
          style={{ ...style }}
        />
      ))}
    </>
  );
};

export default AnimatedImages;
