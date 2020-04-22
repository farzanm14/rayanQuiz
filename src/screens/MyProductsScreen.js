import React, { PureComponent, Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import HeaderComponent from '../components/HeaderComponent'
import ProductListItem from '../components/ProductListItem'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import primary from '../assets/theme/lightModeColors'
import Http from '../services/HttpService'

export default class MyProductsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getlistLoading: true,
            productList: []
        };
    }

    componentWillMount() {
        this.sendGetListOfProductsReq()
    }

    sendGetListOfProductsReq = () => {
        Http.httpGetJwt("user/product").then(res => {
            if (res.status == 200) {
                this.setState({ productList: res.data.active_orders })
            }
            // console.log('get list res', res)

        }).catch(err => {
            // console.log('get list err', err)
        })

        this.setState({ getlistLoading: false })
    }

    navigateToCreateScreen = () => {
        this.props.navigation.navigate('CreateNewProductScreen')
    }

    render() {
        return (
            <View style={styles.mainCont}>
                <HeaderComponent title=" لیست محصولات من" buttonTitle="+ ایجاد آیتم" onPress={this.navigateToCreateScreen} />
                <View style={styles.listContainer}>
                    {
                        this.state.getlistLoading ? <ActivityIndicator /> :
                            <FlatList
                                data={this.state.productList}
                                ListEmptyComponent={<Text style={styles.emptyListText}>هنوزمحصولی ایجاد نکرده اید</Text>}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity onPress={() => alert('view press')} style={styles.tagComponent} key={index}>
                                        <ProductListItem />
                                    </TouchableOpacity>
                                )}
                            />
                    }
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    mainCont: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
    },
    addNewBtn: {
        marginVertical: hp('2%'),
        alignSelf: 'center',
        color: primary.orange_khanjar
    },
    emptyListText: { alignSelf: 'center', color: 'gray' }

});
