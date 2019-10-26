import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';
import HeaderUI from '../../../Components/HeaderUI';
import { News } from '../../../Components';
import styles from './NewsScreenStyles';
const { width, height } = Dimensions.get('window');

const NEWS = [
  {
    id: 1,
    title: 'Công an Hà Nội bổ sung 15 tổ cảnh sát 141',
    date: '2019-10-23T12:59-0500',
    source: 'vnexpress.vn',
    image:
      'https://znews-photo.zadn.vn/w660/Uploaded/ngotgs/2019_10_14/a_1.jpg',
    subDescription:
      'Từ ngày mai (15/10), Công an Hà Nội sẽ có thêm 15 tổ cảnh sát 141 hoạt động ở 12 quận và 3 huyện. Họ được trang bị bộ đàm, súng bắn đạn cao su, dùi cui điện, khóa số 8... ',
    description:
      'Công an Hà Nội sẽ có thêm 15 tổ cảnh sát 141 hoạt động ở 12 quận và 3 huyện. Họ được trang bị bộ đàm, súng bắn đạn cao su, dùi cui điện, khóa số 8...Công an Hà Nội sẽ có thêm 15 tổ cảnh sát 141 hoạt động ở 12 quận và 3 huyện. Họ được trang bị bộ đàm, súng bắn đạn cao su, dùi cui điện, khóa số 8... ',
  },
  {
    id: 2,
    title: 'Công an Hà Nội bổ sung 15 tổ cảnh sát 141',
    date: '2019-10-23',
    source: 'vnexpress.vn',
    image:
      'https://znews-photo.zadn.vn/w660/Uploaded/ngotgs/2019_10_14/a_1.jpg',
    subDescription:
      'Từ ngày mai (15/10), Công an Hà Nội sẽ có thêm 15 tổ cảnh sát 141 hoạt động ở 12 quận và 3 huyện. Họ được trang bị bộ đàm, súng bắn đạn cao su, dùi cui điện, khóa số 8... ',
    description:
      'Công an Hà Nội sẽ có thêm 15 tổ cảnh sát 141 hoạt động ở 12 quận và 3 huyện. Họ được trang bị bộ đàm, súng bắn đạn cao su, dùi cui điện, khóa số 8...Công an Hà Nội sẽ có thêm 15 tổ cảnh sát 141 hoạt động ở 12 quận và 3 huyện. Họ được trang bị bộ đàm, súng bắn đạn cao su, dùi cui điện, khóa số 8... ',
  },
  {
    id: 3,
    title: 'Công an Hà Nội bổ sung 15 tổ cảnh sát 141',
    date: '2019-10-23',
    source: 'vnexpress.vn',
    image:
      'https://znews-photo.zadn.vn/w660/Uploaded/ngotgs/2019_10_14/a_1.jpg',
    subDescription:
      'Từ ngày mai (15/10), Công an Hà Nội sẽ có thêm 15 tổ cảnh sát 141 hoạt động ở 12 quận và 3 huyện. Họ được trang bị bộ đàm, súng bắn đạn cao su, dùi cui điện, khóa số 8... ',
    description:
      'Công an Hà Nội sẽ có thêm 15 tổ cảnh sát 141 hoạt động ở 12 quận và 3 huyện. Họ được trang bị bộ đàm, súng bắn đạn cao su, dùi cui điện, khóa số 8...Công an Hà Nội sẽ có thêm 15 tổ cảnh sát 141 hoạt động ở 12 quận và 3 huyện. Họ được trang bị bộ đàm, súng bắn đạn cao su, dùi cui điện, khóa số 8... ',
  },
];

export default class NewsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: NEWS,
    };
  }

  _renderItem = ({ item, index }) => (
    <News item={item} index={index} navigation={this.props.navigation} />
  );

  render() {
    return (
      <View style={styles.container}>
        <HeaderUI title="Tin Tức" />
        <View style={styles.viewImage}>
          <ImageBackground
            source={{
              uri:
                'https://znews-photo.zadn.vn/w660/Uploaded/ngotgs/2019_10_14/a_1.jpg',
            }}
            style={styles.bannerImage}>
            <View style={styles.textOverImage}>
              <Text style={styles.textOverImageColor}>
                Công an Hà Nội bổ sung 15 tổ cảnh sát 141
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.viewFlat}>
          <FlatList
            data={NEWS}
            extraData={this.state}
            showsVerticalScrollIndicator={false}
            renderItem={this._renderItem}
          />
        </View>
      </View>
    );
  }
}

export { NewsScreen };
