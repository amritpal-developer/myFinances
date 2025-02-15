import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
const CommonFlatList = ({renderItem, style, data, horizontalFlag,contentContainerStyle}) => {
  return (
    <FlatList
      horizontal={horizontalFlag}
      style={style ? style : ''}
      data={data ? data : null}
      contentContainerStyle={contentContainerStyle}
      renderItem={renderItem ? renderItem : ''}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CommonFlatList;

const styles = StyleSheet.create({});
