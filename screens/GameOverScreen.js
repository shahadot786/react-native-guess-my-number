import { View, ImageBackground, StyleSheet, Image, Text } from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  return (
    <ImageBackground
      source={require('../assets/images/win-bg.jpg')}
      resizeMode="cover"
      style={styles.rootScreen}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.rootContainer}>
        <Title style={styles.customButton}>GAME OVER!</Title>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/win.jpg')}
          />
        </View>
        <Text style={styles.summeryText}>
          You take <Text style={styles.highlight}>{roundsNumber}</Text>{' '}
          rounds to guess the number
          <Text style={styles.highlight}> {userNumber}</Text>.
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start a new Game</PrimaryButton>
      </View>
    </ImageBackground>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.3,
  },
  customButton: {
    fontSize: 24,
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.colorWhite,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summeryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary800,
  },
});
