import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;

  if (width < 300) {
    imageSize = 150;
  }
  if (height < 400) {
    imageSize = 120;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={styles.rootScreen}>
      <View style={[styles.rootContainer]}>
        <Title style={styles.customButton}>GAME OVER!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require('../assets/images/win.jpg')}
          />
        </View>
        <Text style={styles.summeryText}>
          You take <Text style={styles.highlight}>{roundsNumber}</Text> rounds
          to guess the number
          <Text style={styles.highlight}> {userNumber}</Text>.
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start a new Game</PrimaryButton>
      </View>
    </ScrollView>
  );
}

export default GameOverScreen;

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  rootScreen: {
    flex: 1,
  },
  customButton: {
    fontSize: 24,
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
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
