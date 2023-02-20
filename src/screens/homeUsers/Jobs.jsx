import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, StyleSheet, View } from 'react-native';

import { OfferCard } from '../../components/swipe/OfferCard';
import { Footer } from '../../components/swipe/Footer';
import { ACTION_OFFSET, CARD } from '../../constants/constants';
import { JobsOfferts as jobsArray } from '../../../assets/data/data';

export const JobsScreen = () => {
  const [jobs, setJobs] = useState(jobsArray);
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!jobs.length) {
      setJobs(jobsArray);
    }
  }, [jobs.length]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > ACTION_OFFSET;

      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * CARD.OUT_OF_SCREEN,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(() => {
    setJobs((prevState) => prevState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const handleChoice = useCallback(
    (direction) => {
      Animated.timing(swipe.x, {
        toValue: direction * CARD.OUT_OF_SCREEN,
        duration: 400,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [removeTopCard, swipe.x]
  );

  return (
    <View style={styles.container}>
      {jobs
        .map((job, index) => {
          const isFirst = index === 0;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};

          return (
            <OfferCard
              key={job.job_id}
              rol={job.rol}
              direccion={job.direccion}
              descripcion={job.descripcion}
              bgColor={job.bgColor}
              isFirst={isFirst}
              swipe={swipe}
              tiltSign={tiltSign}
              {...dragHandlers}
            />
          );
        })
        .reverse()}

      <Footer handleChoice={handleChoice} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
