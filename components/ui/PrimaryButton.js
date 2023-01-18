import { View, Text, Pressable, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

//object distraction({children})
//another option is props(props.children)
function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        } //for ios
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }} //only for android
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: Colors.colorWhite,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'open-sans-bold',
  },
  //ios
  pressed: {
    opacity: 0.75,
  },
});
