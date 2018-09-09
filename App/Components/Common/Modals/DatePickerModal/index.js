/* import React from 'react';
import PropTypes from 'prop-types';
import { View, Modal } from 'react-native';
import moment from 'moment';
import styled from 'styled-components';
import { Calendar } from 'react-native-calendars';
import I18n from '../../../../I18n';
import Colors from '../../../../Themes/Colors';
import Text from '../../Text';
import Block from '../../Block';
import Row from '../../Row';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Date = styled(Text.L)`
  color: ${Colors.actionYellow};
`;
//------------------------------------------------------------------------------
// Specify style for calendar container element. Default = {}
const style = {
  // borderWidth: 1,
  // borderColor: 'gray',
  height: 350,
};
//------------------------------------------------------------------------------
// Specify theme properties to override specific styles for calendar parts. Default = {}
const theme = {
  backgroundColor: '#ffffff',
  calendarBackground: Colors.lightGray,
  textSectionTitleColor: '#b6c1cd',
  selectedDayBackgroundColor: '#00adf5',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#00adf5',
  dayTextColor: '#2d4150',
  // textDisabledColor: '#d9e1e8',
  dotColor: '#00adf5',
  selectedDotColor: '#ffffff',
  // arrowColor: 'orange',
  monthTextColor: 'blue',
  textDayFontFamily: 'monospace',
  textMonthFontFamily: 'monospace',
  textDayHeaderFontFamily: 'monospace',
  textMonthFontWeight: 'bold',
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16,
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DateModal = ({
  // value,
  visible,
  onClose,
  onSelect,
  // ...rest
}) => (
  <Modal
    visible={visible}
    onClose={onClose}
    // {...rest}
  >
    <View>
      <Block>
        <Row
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Text.ML>{I18n.t('Select a date')}</Text.ML>
          {/* <Date>{value && moment(value).format('ddd, MMM D')}</Date> //}
        </Row>
      </Block>
      <Calendar
        // style={style}
        // theme={theme}
        // current={value ? value.toISOString().slice(0, 10) : null}
        current={new Date().toISOString().slice(0, 10)}
        minDate={new Date().toISOString().slice(0, 10)}
        onDayPress={(day) => { onSelect(day.dateString); }}
      />
    </View>
  </Modal>
);

DateModal.propTypes = {
  // value: PropTypes.instanceOf(Date),
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
};

DateModal.defaultProps = {
  // value: new Date(),
  visible: false,
  onClose: () => {},
  onSelect: () => {},
};

export default DateModal;
*/


import React from 'react';
import PropTypes from 'prop-types';
// import { Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import I18n from '../../../../I18n';
import Text from '../../Text';
import Modal from '../Modal';
// import { ModalOuter, ModalInner } from '../../../PlanGame/style';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DateModal = ({ visible, onSelect }) => (
  <Modal
    visible={visible}
    animationType="fade"
    onRequestClose={() => { onSelect(null); }}
    transparent
  >
    <Text.L>{I18n.t('Select a date')}</Text.L>
    <Calendar
      current={new Date().toISOString().slice(0, 10)}
      minDate={new Date().toISOString().slice(0, 10)}
      onDayPress={(day) => { onSelect(day.dateString); }}
    />
  </Modal>
);

DateModal.propTypes = {
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
};

DateModal.defaultProps = {
  visible: false,
  onSelect: () => {},
};

export default DateModal;

/*


import React from 'react';
import PropTypes from 'prop-types';
// import { Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import I18n from '../../../../I18n';
import Text from '../../Text';
import Modal from '../Modal';
// import { ModalOuter, ModalInner } from '../../../PlanGame/style';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DateModal = ({ visible, onSelect }) => (
  <Modal
    visible={visible}
    animationType="fade"
    onRequestClose={() => { onSelect(null); }}
    transparent
  >
    <ModalOuter>
      <ModalInner>
        <Text.L>{I18n.t('Select a date')}</Text.L>
        <Calendar
          current={new Date().toISOString().slice(0, 10)}
          minDate={new Date().toISOString().slice(0, 10)}
          onDayPress={(day) => { onSelect(day.dateString); }}
        />
      </ModalInner>
    </ModalOuter>
  </Modal>
);

DateModal.propTypes = {
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
};

DateModal.defaultProps = {
  visible: false,
  onSelect: () => {},
};

export default DateModal;


*/