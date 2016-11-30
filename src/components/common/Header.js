import React from 'react';
import { View, Text } from 'react-native';

const Header = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}
const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    paddingTop: 15,
    height: 60,
  },
  title: {
    fontSize: 30,
  }
}
export { Header };
