import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating';


export class Rating extends Component {

    render() {
        const {style, starSize } = this.props;
        return (
            <View style={[styles.container, style]} >
                <StarRating
                    starSize={15 | starSize}
                    disabled={this.props.disabled}
                    maxStars={5}
                    rating={this.props.starCount}
                    fullStarColor={"#FAD961"}
                    {...this.props}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    //    position: "absolute",
        width: 20,
        marginRight:50,
    }
})
