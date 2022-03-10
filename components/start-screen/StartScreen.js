import { View, Image, TouchableOpacity, Text, Animated, StyleSheet, TextInput  } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Lato_700Bold} from '@expo-google-fonts/lato';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useRef, useState} from "react";

export default function StartScreen({navigation}) {

    const whiteViewWidth = useRef(new Animated.Value(wp('50%'))).current;
    const whiteViewHeight = useRef(new Animated.Value(hp('5%'))).current;

    const yellowViewXY = useRef(new Animated.ValueXY()).current;
    const yellowViewHeight = useRef(new Animated.Value(hp('5%'))).current;

    const [loginMail, setLoginMail] = useState(null);
    const [loginPassword, setLoginPassword] = useState(null);

    const [loginToggled, setLoginToggled] = useState(false);

    let [fontsLoaded] = useFonts({
        Lato_700Bold
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    function toggleSignIn() {
        if (!loginToggled) {
            setLoginToggled(true);
            Animated.timing(whiteViewWidth, {
                toValue: wp('70%'),
                duration: 250,
                useNativeDriver: false
            }).start();
            Animated.timing(whiteViewHeight, {
                toValue: hp('20%'),
                duration: 250,
                useNativeDriver: false
            }).start();
            Animated.timing(yellowViewXY, {
                toValue: { x: 50, y: -75 },
                duration: 250,
                useNativeDriver: false
            }).start();
            Animated.timing(yellowViewHeight, {
                toValue: hp('7%'),
                duration: 250,
                useNativeDriver: false
            }).start();
        } else {
            setLoginToggled(false);
            Animated.timing(whiteViewWidth, {
                toValue: wp('50%'),
                duration: 250,
                useNativeDriver: false
            }).start();
            Animated.timing(whiteViewHeight, {
                toValue: hp('5%'),
                duration: 250,
                useNativeDriver: false
            }).start();
            Animated.timing(yellowViewXY, {
                toValue: { x: 0, y: 0 },
                duration: 250,
                useNativeDriver: false
            }).start();
            Animated.timing(yellowViewHeight, {
                toValue: hp('5%'),
                duration: 250,
                useNativeDriver: false
            }).start();
        }

    }
// TODO: https://www.youtube.com/watch?v=G4jD_u7isXk / Utiliser les React Hook Form
    const LoginForm = ({}) => (
        <View style={styles.signInView}>
            <Text style={styles.signInFormTitle}>Connexion</Text>
            <View style={styles.signInFormView}>
                <TextInput
                    style={styles.textInputSignInForm}
                    placeholder='Enter your mail'
                    value={loginMail}
                    onChangeText={setLoginMail}
                    keyboardType={"email-address"}
                />
                <TextInput
                    style={styles.textInputSignInForm}
                    placeholder='Enter your password'
                    onChangeText={setLoginPassword}
                    value={loginPassword}
                    keyboardType={"visible-password"}
                />
            </View>
        </View>
    )

    return (
        <View style={styles.container}>

            <Image style={styles.backgroundImage} source={require('../../assets/images/startpage-image.png')}/>


            <View style={styles.logoContainer}>
                <Image source={require('../../assets/logo/LOGO_WHITE.png')}/>
            </View>

            <View style={styles.formContainer}>
                <Image style={styles.backgroundFooterImage} source={require('../../assets/images/faded-background-startpage.png')}/>
                <Animated.View style={[styles.connexionView, {width: whiteViewWidth, height: whiteViewHeight}]}>
                    {
                        !loginToggled &&
                        <TouchableOpacity style={styles.connexionButton}  onPress={toggleSignIn}>
                            <Text style={styles.connexionTextStyle}>Connexion</Text>
                        </TouchableOpacity>
                    }
                    {
                        loginToggled && <LoginForm/>
                    }
                </Animated.View>
                <Text style={styles.orText}>Ou</Text>
                <Animated.View style={[styles.signupView, yellowViewXY.getLayout(), {height: yellowViewHeight}]}>
                    <TouchableOpacity style={styles.signupButton}>
                        <Text style={styles.connexionTextStyle}>Inscription</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    backgroundImage: {
        position: 'absolute',
    },
    backgroundFooterImage: {
        position: 'absolute',
        bottom: 0
    },
    logoContainer: {
        flex: 1,
        marginTop: hp('11%'),
    },
    formContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('25%')
    },
    connexionView: {
        backgroundColor: '#ffffff',
    },
    connexionButton: {
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: "center"
    },
    connexionTextStyle: {
        fontFamily: "Lato_700Bold",
    },
    orText: {
        margin: 15,
        color: '#ffffff'
    },
    signupView: {
        width: wp('50%'),
        backgroundColor: '#FFD809'
    },
    signupButton: {
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: "center"
    },
    signInView: {
        width: '100%',
        height: '100%',
        alignItems: "center"
    },
    signInFormTitle: {
        marginTop: hp('1%'),
        fontFamily: "Lato_700Bold",
        fontSize: 18,
    },
    signInFormView: {
        alignItems: "center",
        justifyContent: "space-between",
    },
    textInputSignInForm: {
        width: '80%',
        height: '20%',
        backgroundColor: 'red'
    }
})