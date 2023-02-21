import React, { useCallback } from 'react';
import { Animated, Image, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Choice } from './Choice';
import { ACTION_OFFSET, CARD } from '../../constants/constants';

export function OfferCard({
  job_id,
  rol,
  direccion,
  descripcion,
  isFirst,
  swipe,
  tiltSign,
  ...rest
}) {
  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
    outputRange: ['8deg', '0deg', '-8deg'],
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, ACTION_OFFSET],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-ACTION_OFFSET, -25],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  const renderChoice = useCallback(() => {
    return (
      <>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.likeContainer,
            { opacity: likeOpacity },
          ]}
        >
          <Choice type="like" />
        </Animated.View>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.nopeContainer,
            { opacity: nopeOpacity },
          ]}
        >
          <Choice type="nope" />
        </Animated.View>
      </>
    );
  }, [likeOpacity, nopeOpacity]);

  return (
    <Animated.View
      style={[styles.container, isFirst && animatedCardStyle]}
      {...rest}
    >
      <View style={styles.rol}>
        <Text style={styles.hightligh}>Rol a ejercer</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Nombre de la Empresa: </Text>
          {rol.nombreEmpresa}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Rol a ejercer: </Text>
          {rol.puesto}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Modalidad: </Text>
          {rol.modalidad}
        </Text>
      </View>
      <View style={styles.rol}>
        <Text style={styles.text}>
          <Text style={styles.bold}>Región: </Text>
          {direccion.region}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>País: </Text>
          {direccion.pais}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Ciudad: </Text>
          {direccion.ciudad}
        </Text>
      </View>
      <View style={styles.rol}>
        <Text style={styles.hightligh}>Descripción del puesto:</Text>
        <Text style={styles.long} numberOfLines={4}>
          {descripcion}
        </Text>
      </View>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={styles.gradient}
      />

      {isFirst && renderChoice()}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: CARD.WIDTH,
    height: CARD.HEIGHT,
    borderRadius: CARD.BORDER_RADIUS,
    flex: 1,
    top: 45,
    backgroundColor: '#D7E6EA',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
    borderRadius: CARD.BORDER_RADIUS,
  },
  choiceContainer: {
    position: 'absolute',
    top: 100,
  },
  likeContainer: {
    left: 15,
    transform: [{ rotate: '-30deg' }],
  },
  nopeContainer: {
    right: 15,
    transform: [{ rotate: '30deg' }],
  },
  rol: {
    padding: 20,
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
  },
  hightligh: {
    paddingHorizontal: 10,
    fontSize: 22,
    backgroundColor: 'lightgreen',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  long: {
    fontSize: 18,
    maxHeight: 85,
    marginBottom: 5,
  },
  bold: {
    fontWeight: '700',
  },
});
