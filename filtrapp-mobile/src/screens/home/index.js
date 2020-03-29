import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
  YellowBox,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import IconLogo from '../../assets/logo.png';
import {colors, commonStyles} from '../../config/styles';
import {
  SCREENS,
  ALERTS,
  PLACEHOLDERS,
  BUTTONS,
  VALUES,
} from '../../config/constants';

export default class Home extends Component {
  static navigationOptions = {
    title: SCREENS.HOME,
    header: null,
  };

  constructor(props) {
    YellowBox.ignoreWarnings(['Setting a timer']);
    super(props);
    this.state = {
      ipString: '',
      portString: '',
      isLoading: false,
      image: null,
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
    StatusBar.setHidden(true);
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _onSendPressed = async () => {
    this.setState({isLoading: true});
    var formData = new FormData();
    var file = await FileSystem.readAsStringAsync(this.state.image, {encoding: FileSystem.EncodingType.Base64});
    formData.append("image", file);
    console.log(formData._parts[0][1])
    /* fetch('https://postman-echo.com/post', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .catch(error => {console.error('Error:', error), alert(ALERTS.FAILURE), this.setState({isLoading: false})})
      .then(response => {console.log('Success:', response), alert(ALERTS.SUCCESS), this.setState({isLoading: false})}); */
  };

  _onIpTextChanged = event => {
    this.setState({
      ipString: event.nativeEvent.text,
    });
  };

  _onPortTextChanged = event => {
    this.setState({
      portString: event.nativeEvent.text,
    });
  };

  _onSignInPressed = () => {
    this.props.navigation.navigate(SCREENS.SIGNIN);
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({image: result.uri});
    }
  };

  render() {
    let {image} = this.state;
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" color={colors.white} />
    ) : null;

    return (
      <LinearGradient
        colors={[colors.lightrose, colors.lightpurple]}
        style={styles.gradientContainer}
        start={{x: VALUES.CERO, y: VALUES.CERO}}
        end={{x: VALUES.UNO, y: VALUES.UNO}}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.loginContainer}>
            <Image style={styles.logo} source={IconLogo} />
          </View>
          {spinner}
          <View style={styles.formContainer}>
            <View style={styles.containerForm}>
              <TextInput
                style={styles.input}
                autoCapitalize={VALUES.NONE}
                onSubmitEditing={() => this.passwordInput.focus()}
                autoCorrect={false}
                keyboardType={VALUES.NUMERIC}
                value={this.state.ipString}
                onChange={this._onIpTextChanged}
                underlineColorAndroid={colors.transparent}
                returnKeyType={VALUES.NEXT}
                placeholder={PLACEHOLDERS.IP}
                placeholderTextColor={colors.white}
              />
              <TextInput
                style={styles.input}
                returnKeyType={VALUES.GO}
                keyboardType={VALUES.NUMERIC}
                ref={input => (this.passwordInput = input)}
                placeholder={PLACEHOLDERS.PORT}
                value={this.state.portString}
                onChange={this._onPortTextChanged}
                underlineColorAndroid={colors.transparent}
                placeholderTextColor={colors.white}
              />
              <View style={styles.loginContainer}>
                {image && (
                  <Image
                    source={{uri: image}}
                    style={{width: 200, height: 200}}
                  />
                )}
              </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this._pickImage}>
                <Text style={styles.buttonText}>{BUTTONS.SELECT_IMAGE}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this._onSendPressed}>
                <Text style={styles.buttonText}>{BUTTONS.SEND}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: commonStyles.buttonContainer,
  buttonText: commonStyles.buttonText,
  container: {
    backgroundColor: colors.transparent,
    flex: 1,
  },
  containerForm: {
    padding: 20,
  },
  gradientContainer: {
    flex: 1,
  },
  input: {
    backgroundColor: colors.inputColor,
    borderRadius: 15,
    color: colors.white,
    height: 40,
    marginBottom: 10,
    padding: 10,
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    flex: 1,
    height: '70%',
    resizeMode: 'contain',
    width: '70%',
  },
});
