import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StatusBar, TextInput, StyleSheet, Button } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Http from '../services/HttpService'
import Storage from '../services/StorageService'
// import {
//     getUser, checkLoginStatus } from '../../redux/actions/Global.Actions'


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginLoding: false,
            phone: null,
            password: null
        };
        console.disableYellowBox = true;

    }

    sendLoginReq = () => {
        this.setState({ loginLoding: true })
        const body = new FormData()

        body.append(
            'email',
            this.state.phone
        )

        body.append(
            "password",
            this.state.password
        )

        Http.httpPost('api/login', body).then(res => {
            console.log("__SIGN IN req response is", res)
            if (res.data.success) {
                Storage.saveItem('token', res.headers.token)
                this.props.navigation.replace('MyProductsScreen')
                this.setState({ loginLoding: false })
            } else {
                alert('دوباره تلاش کنید')
            }
        }).catch(err => {
            this.setState({ loginLoding: false })
            alert("اطلاعات وردی صحیح نبود ، دوباره تلاش کنید")
            console.log("__SIGN IN sign request's err is", err)
        })
    }


    render() {
        return (
            <LinearGradient style={styles.gradientContainer}
                start={{ x: 0, y: 0 }} end={{ x: 1.1, y: 1.1 }}
                colors={['#1962AB', '#165493', '#12467A', '#0E3862', '#0B2A49', '#071C31', '#030D18']} >

                <StatusBar hidden={true} animated={true} networkActivityIndicatorVisible={true} showHideTransition='slide' backgroundColor='#000' />
                <Image resizeMode="contain" style={styles.logoStyle} source={require('../assets/images/rayanLogo.png')} />

                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.commentInput}
                        selectTextOnFocus
                        placeholder='شماره تلفن'
                        keyboardType='number-pad'
                        onChangeText={(phone) => this.setState({ phone })}
                    // ref={input => { this.textInput = input }}
                    />

                    <TextInput
                        secureTextEntry={true}
                        style={styles.commentInput}
                        selectTextOnFocus
                        placeholder='رمز عبور'
                        onChangeText={(password) => this.setState({ password })}
                    />

                    {this.state.loginLoding ?
                        <ActivityIndicator /> :
                        <Button title='ورود' onPress={this.sendLoginReq} />
                    }
                </View>
            </LinearGradient>
        );
    }
}


const styles = StyleSheet.create({
    gradientContainer: { flex: 1, width: '100%', height: '100%', justifyContent: 'center' },
    logoStyle: {
        justifyContent: 'center', height: hp('20%'), width: wp('60%'), alignSelf: 'center'
    },
    commentInput: {
        fontFamily: 'IRANSansWeb(FaNum)',
        textAlign: 'right',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',

    },
    formContainer: {
        backgroundColor: 'white', height: hp('30%'),
        justifyContent: 'center', alignItems: 'center',
        marginHorizontal: wp('10%'), borderRadius: wp('5%')
    },


});




// function mapStateToProps(state, props) {
//     return {
//         isLoggedin: state.GlobalReducer.isLoggedin,
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({
//         getUser,

//     }, dispatch);
// }

export default LoginScreen
//  connect(mapStateToProps, mapDispatchToProps)(LoginScreen);


