import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";

import { Button } from '../../components';
import CategorySection from './CategorySection'
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import PlaceCardSection from './PlaceCardSection';
import { getHomeData } from '../../redux/actions/Home';
import SearchInput from '../../components/SearchInput';
import { navigateToSearch,navigateToHome } from '../../navigation/Navigator'
import { TEXTS } from '../../common';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      title: "AHMED"
    }
  }
  onPropertyClose=()=>{
    navigateToHome(this.props.navigation)
}
  componentDidMount() {
    this.props.getHomeData();
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView style={styles.container}>
        <SearchInput  onPress={ () => navigateToSearch(navigation)} />
        <CategorySection title="استكشف" />
        <PlaceCardSection {...this.props} title="أماكن مميزة بالقرب منك"  places = {this.props.places} handleBack={this.onPropertyClose} />
        <PlaceCardSection {...this.props} title="إستراحات مميزة" places = {this.props.places} handleBack={this.onPropertyClose} />
        <PlaceCardSection {...this.props} title="شاليهات مميزة" places = {this.props.places} handleBack={this.onPropertyClose} />
        <Button title={TEXTS.add_estraha} onPress={()=>this.props.navigation.navigate("AddEstrahaScreen")} />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    places : state.home.places,
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getHomeData },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
