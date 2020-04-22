import React, { PureComponent } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import HeaderComponent from '../components/HeaderComponent'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import primary from '../assets/theme/lightModeColors';
import Http from '../services/HttpService'

class CreateNewProductScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            description: null,
            price: null,
            count: null,
            reqLoading: false
        };
    }

    backPress = () => { this.props.navigation.goBack(null) }

    render() {
        return (
            <View style={styles.mainContainer}>
                <HeaderComponent title="ایجاد محصول جدید" onPress={this.backPress} buttonTitle="بازگشت" />
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.commentInput}
                        selectTextOnFocus
                        placeholder='عنوان آیتم'
                        onChangeText={(name) => this.setState({ name })}
                    />
                    <TextInput
                        multiline={true}
                        style={styles.commentInput}
                        selectTextOnFocus
                        placeholder='توضیحات'
                        onChangeText={(description) => this.setState({ description })}
                    />
                    <TextInput
                        style={styles.commentInput}
                        selectTextOnFocus
                        keyboardType='number-pad'
                        placeholder={"قیمت " + "(تومان)"}
                        onChangeText={(price) => this.setState({ price })}
                    />
                    <TextInput
                        style={styles.commentInput}
                        selectTextOnFocus
                        keyboardType='number-pad'
                        placeholder="تعداد"
                        onChangeText={(count) => this.setState({ count })}
                    />
                </View>
                {
                    this.state.reqLoading ? <ActivityIndicator /> :
                        <Text style={styles.createBtn} onPress={this.sendCreateReq}> ایجاد آیتم </Text>

                }
            </View>
        );
    }


    sendCreateReq = () => {
        const body = new FormData()
        body.append('name', this.state.name)
        body.append('short_description', " ")
        body.append('description', this.state.description)
        body.append('product_group_id', "")
        body.append('min_price', this.state.price)
        body.append('city_id', "")
        body.append('image', "")
        body.append('count', this.state.count)
        body.append('item_unit_id', "")

        Http.httpPostJwt('api/user/product/store', body).then(response => {
            console.log("__CREATE NEW ITEM___ res is:", response)
        }).catch(error => {
            console.log("__CREATE NEW ITEM___ error is:", error)

        })
        this.setState({ reqLoading: false })

    }
}


const styles = StyleSheet.create({
    mainContainer: { flex: 1, alignItems: 'center' },
    gradientContainer: { flex: 1, width: '100%', height: '100%', justifyContent: 'center' },
    logoStyle: {
        justifyContent: 'center', height: hp('20%'), width: wp('60%'), alignSelf: 'center'
    },
    commentInput: {
        fontFamily: 'IRANSansWeb(FaNum)',
        textAlign: 'right',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: wp('4%'),
        width: '100%',
        marginVertical: hp('1%')
    },
    formContainer: {
        width: '100%',
        paddingHorizontal: wp('3%'),
        justifyContent: 'space-around', alignItems: 'center',
        marginHorizontal: wp('10%'), borderRadius: wp('5%')
    },
    createBtn: {
        color: 'white',
        backgroundColor: primary.orange_khanjar,
        padding: wp('2%'),
        borderRadius: wp('4%')
    }

});

export default CreateNewProductScreen;


