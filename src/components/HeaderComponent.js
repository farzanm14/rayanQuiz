import React, { PureComponent } from 'react';
import { Platform, Image, StyleSheet } from 'react-native'
import { View, Text, Button, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import primary from '../assets/theme/lightModeColors';

class HeaderComponent extends PureComponent {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <View style={styles.headerBg}>
                <View style={styles.textcontainer}>
                    <View style={styles.btnHolder}>
                        <Text style={styles.backBtn} onPress={this.props.onPress}> {this.props.buttonTitle} </Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{this.props.title}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default HeaderComponent

const styles = StyleSheet.create({
    headerBg: {
        backgroundColor: primary.blue_primary, height: hp('6%'),
        marginVertical: hp('2%'), marginHorizontal: wp('3%'),
        borderRadius: wp('8%'),
        justifyContent: 'center', alignItems: 'center'
    },
    textcontainer: {
        flex: 3,
        paddingHorizontal: wp('3%'),
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:'space-between'
    },
    title: { color: 'white', fontSize: wp('4.5%'), textAlign: 'right', },
    backBtn: { fontSize: wp('2.5%'), color: 'white', },
    titleContainer: { justifyContent: 'center', alignItems: 'flex-end', flex: 1 },
    btnHolder: { justifyContent: 'flex-start', alignItems: 'flex-start', }
});
