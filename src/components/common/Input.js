import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ({ label, value, onChangeText, keyboardType, secureTextEntry,
  placeholder, autoCorrect, autoCapitalize, returnKeyType }) => {
  const { containerStyle, labelStyle, inputStyle } = styles;
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        returnKeyType={returnKeyType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.inputStyle}
      />
    </View>
  )
}
const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
  },
  labelStyle: {
    flex: 1,
    fontSize: 18
  },
  inputStyle: {
    flex: 2,
  }
}
export {Input};
