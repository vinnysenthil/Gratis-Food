import React from 'react';
import { Text, View, Image,  } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';

// Functional component used to display detailed information of the event after a particular event from list has been chosen
const EventDetail = ({ event }) => {
  const { title, imageURL, description } = event;
  //title, imageURL
  const { thumbnailStyle, headerContentStyle, thumbnailContainerStyle,
          headerTextStyle, } = styles;

  return (
      <Card>

        <CardSection>
          <View style={thumbnailContainerStyle}>
            <Image source=imageURL style={thumbnailStyle}/>
          </View>

          <View style={headerContentStyle}>
            <Text style={headerTextStyle}> {title} </Text>
            <Text> { description } </Text>
          </View>
        </CardSection>
      </Card>
    );
  };

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  }
};


export default EventDetail;
