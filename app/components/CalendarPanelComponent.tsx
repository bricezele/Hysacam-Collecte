/**
 * Project HysacamCollecte
 * File CalendarPanelComponent
 * Path app/components
 * Created by BRICE ZELE
 * Date: 07/12/2021
 */
import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {ScaledSheet} from 'react-native-size-matters';
import {BaseColor, useTheme} from "../config/Theme";
import {useTranslation} from "react-i18next";
import {scaleHeight, scaleWidth} from "../utils/Tools";

const CalendarItem = () => {
    const {colors} = useTheme();
    const {t} = useTranslation();
    const date = moment().format();
    const [dateSelect, setDateSelect] = useState(date);
    const markedDay = {
        [dateSelect.dateString]: {selected: true, marked: true},
    };
    LocaleConfig.locales.en = {
        monthNames: [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Aout',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre',
        ],
        monthNamesShort: [
            'Jan',
            'Fev',
            'Mar',
            'Avr',
            'Mai',
            'Jun',
            'Jul',
            'Aou',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
        dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    };
    LocaleConfig.defaultLocale = 'en';
    return (
        <Calendar
            style={styles.calendarView}
            firstDay={1}
            startFromMonday={true}
            current={date}
            markedDates={markedDay}
            onDayPress={(dateChose) => setDateSelect(dateChose)}
            theme={{
                arrowColor: '#FFF',
                'stylesheet.calendar.header': {
                    week: {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: scaleWidth(16),
                        marginTop: scaleHeight(24),
                        marginBottom: scaleHeight(14),
                    },
                    dayHeader: {
                        color: BaseColor.whiteColor,
                        fontWeight: '600',
                        fontSize: scaleHeight(14),
                        textAlign: 'center',
                    },
                },
                selectedDayBackgroundColor: BaseColor.whiteColor,
                calendarBackground: colors.primary,
                textDayFontSize: scaleHeight(12),
                textMonthFontWeight: '500',
                textMonthFontSize: scaleHeight(18),
                textDayHeaderFontSize: scaleHeight(12),
                monthTextColor: BaseColor.whiteColor,
                dayTextColor: BaseColor.whiteColor,
                todayTextColor: BaseColor.whiteColor,
                textDisabledColor: '#D5D5D5',
                selectedDayTextColor: colors.primary,
            }}
        />
    );
};

export default CalendarItem;

const styles = ScaledSheet.create({
    calendarView: {
        borderBottomLeftRadius: scaleWidth(16),
        borderBottomRightRadius: scaleWidth(16),
        overflow: 'hidden',
        paddingBottom: scaleHeight(20),
    },
});
