import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {width} from '../utils/data';
const CommonFlatList = ({
  renderItem,
  style,
  data,
  horizontalFlag,
  contentContainerStyle,
  decelerationRate,
  snapToInterval,
  bounces,
  scrollEventThrottle,
  snapToAlignment,
  keyExtractor
}) => {
  return (
    <FlatList
      horizontal={horizontalFlag}
      style={style ? style : ''}
      data={data ? data : null}
      keyExtractor={keyExtractor} 
      contentContainerStyle={contentContainerStyle}
      renderItem={renderItem ? renderItem : ''}
      showsHorizontalScrollIndicator={false}
      decelerationRate={decelerationRate || 'fast'} // 🚀 Faster stopping for better snapping
      snapToInterval={snapToInterval || width * 0.32} // 📸 snap at each card size (card width + margin)
      snapToAlignment={snapToAlignment || 'start'} // start from the left
      bounces={bounces || true} // iOS only (gives soft bounce)
      scrollEventThrottle={scrollEventThrottle || 16}
    />
  );
};
export default CommonFlatList;

const styles = StyleSheet.create({});
