import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import styles from './NewsDetailScreenStyles';

const {width, height} = Dimensions.get('window');

export default class NewsDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.state.params.item,
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={{uri: this.state.item.image}}
            style={styles.imageNews}
          />
          <View style={styles.viewTitle}>
            <Text style={styles.textTitle}>{this.state.item.title}</Text>
          </View>
          <View style={styles.viewTime}>
            <Text style={styles.textTime}>{this.state.item.date}</Text>
          </View>
          <View style={styles.viewDescription}>
            <Text style={styles.textDescription}>
              {this.state.item.description}
              Canberra cho biết họ ủng hộ tự do báo chí nhưng nhấn mạnh "không
              ai vượt quá luật pháp". "Điều đó bao gồm tôi, bất kỳ nhà báo nào
              hoặc bất kỳ ai khác", Thủ tướng Scott Morrison nói trong tuyên bố
              hôm 20/10. Hồi tháng 6, các cuộc đột kích của cảnh sát vào Tập
              đoàn Truyền thông Australia (ABC) và nhà của một nhà báo News Corp
              Australia gây làn sóng phản đối dữ đội. Các tổ chức truyền thông
              cho biết các cuộc đột kích được triển khai dựa trên các bài báo
              với nguồn tin từ những người tố giác. Một bài báo đưa ra các cáo
              buộc về tội ác chiến tranh, một bài báo khác vạch trần nỗ lực theo
              dõi thông tin công dân của chính phủ. Chiến dịch biểu tình hôm
              21/10 được Liên minh Quyền được biết phát động và nhận được sự
              hưởng ứng đông đảo từ các hãng tin, đài phát thanh và báo điện tử.
              Chiến dịch này khẳng định luật an ninh trở nên cứng rắn hơn trong
              2 thập kỷ qua đe dọa báo chí điều tra, làm xói mòn "quyền được
              biết" của công chúng. Trên Twitter cá nhân, Michael Miller, Chủ
              tịch điều hành của News Corp Australia đăng tải hình ảnh trang
              nhất các tờ báo đồng loạt bị bôi đen, kêu gọi công chúng chất vấn
              chính phủ: "Họ đang cố giấu chúng ta điều gì?". Giám đốc điều hành
              ABC David Anderson cũng bày tỏ quan ngại "Australia có nguy cơ trở
              thành nền dân chủ bí mật nhất thế giới". Kể từ khi luật chống gián
              điệp mới được đưa ra năm 2018, các cơ quan truyền thông vận động
              để các nhà báo và người tố giác được miễn trừ khi báo cáo thông
              tin nhạy cảm. Các tổ chức cũng kêu gọi các quyền tự do lớn hơn
              trong các lĩnh vực khác, như cải cách tự do thông tin và luật
              chống phỉ báng.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
