import { View, Text, Pressable, StyleSheet } from 'react-native';

//object distraction({children})
//another option is props(props.children)
function PrimaryButton({ children }) {
  function pressedHandler() {}
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        } //for ios
        onPress={pressedHandler}
        android_ripple={{ color: '#640233' }} //only for android
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
    backgroundColor: '#72063c',
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  //ios
  pressed: {
    opacity: 0.75,
  },
});
