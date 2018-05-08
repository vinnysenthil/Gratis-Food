import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, View, Image, TouchableOpacity } from 'react-native';

import { employeesFetch } from '../../actions';
import Card from './Card';
import CardSection from './CardSection';

// Home Screen which will show all events
// As of last push, only renderList() and render() is doing something meaningful
class EventsList extends Component {
      testEvent = require('./TestData/TestData.json');
      testEvent1 = require('./TestData/TestData1.json');
      testEvent2 = require('./TestData/TestData2.json');
      testEvent3 = require('./TestData/TestData3.json');
      testEvent4 = require('./TestData/TestData4.json');
      testEvent5 = require('./TestData/TestData5.json');
      componentWillMount() {
          // this.createDataSource(this.props);

      }

      componentWillReceiveProps(nextProps) {
          this.createDataSource(nextProps);
      }

      createDataSource({ events }) {
          const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
          });
          this.dataSource = ds.cloneWithRows(events);
      }

      getDateTime(event){
        const oneDay = 24*60*60*1000;
        const oneHour = 60*60*1000;
        const oneWeek = 7*24*60*60*1000;
        const now = new Date(Date.now());
        const endTime = new Date(event.endTime);
        const differenceDay = Math.round(Math.abs((endTime.getTime() - now.getTime())/(oneDay)));
        const differenceHour = Math.round(Math.abs((endTime.getTime() - now.getTime())/(oneHour)));
        const differenceWeek = Math.round(Math.abs((endTime.getTime() - now.getTime())/(oneWeek)));

        if(differenceDay >= 1 && differenceDay < 7)
          return differenceDay + " day(s) left";
        else if(differenceDay == 0)
          return differenceHour + " hour(s) left";
        else if(differenceDay >= 7)
          return differenceWeek + " week(s) left";

      }
      //RenderList renders an event on the screen
      renderList(event){
        return(
          <TouchableOpacity>
            <Card>
              <CardSection>
              <View style={styles.headerContentStyle}>
                <View style={styles.thumbnailContainerStyle}>
                  <Image
                    source={{ uri: event.imageURL }}
                    style={styles.thumbnailStyle} />
                </View>
                <View style={styles.textContainerStyle}>
                  <Text style={styles.headerTextStyle}> { event.title } </Text>
                  <Text numberOfLines={2} style={styles.eventDescriptionTextStyle}> { event.description } </Text>
                  <View style={styles.eventLocationTimeStyle}>
                    <Text style={styles.eventLocationTextStyle}> { event.location.shortAddress } </Text>
                    <Text style={styles.eventTimeTextStyle}> {this.getDateTime(event)} </Text>
                  </View>
                </View>
              </View>
              </CardSection>
            </Card>
          </TouchableOpacity>
        );
      }

      render() {
        return(
          <ScrollView>
            {this.renderList(this.testEvent2)}
            {this.renderList(this.testEvent)}
            {this.renderList(this.testEvent1)}
            {this.renderList(this.testEvent3)}
            {this.renderList(this.testEvent4)}
            {this.renderList(this.testEvent5)}
          </ScrollView>
        )
      }
    }

    const mapStateToProps = state => {
      const events = _.map(state.events, (val, uid) => {
        return { ...val, uid };
      });

      return { events };
    };

    const styles = {
        headerContentStyle: {
          flexDirection: 'row',
          justifyContent: 'space-between'
        },
        headerTextStyle: {
          fontWeight: 'bold',
        },
        textContainerStyle: {
          justifyContent: 'flex-start',
        },
        thumbnailStyle: {
          height: 100,
          width: 100,
        },
        thumbnailContainerStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 5,
          marginRight: 5
        },
        eventDescriptionTextStyle: {
          width: 300,
          flex: 1,
          color: '#000000',
          opacity: .73
        },
        eventLocationTimeStyle:{
          flexDirection: 'row',
          justifyContent: 'flex-start'
        },
        eventLocationTextStyle:{
          flex: 1,
          color: '#000000',
          opacity: .73
        },
        eventTimeTextStyle:{
          flex: 1,
          color: '#000000',
          opacity: .73
        }
    };

export default connect(mapStateToProps, { employeesFetch })(EventsList);
