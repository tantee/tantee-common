import Store from '@/store'
import moment from 'moment'
import { isUndefined } from 'lodash'
import * as helper from '@/lib/helperDateTime'

export function isValidDate(dateString,strict=false) {
  return (!strict && moment(dateString).isValid()) || moment(dateString,['YYYY-MM-DD','DDMMYYYY'],true).isValid()
}

export function isValidDateTime(dateTimeString,strict=false) {
  return (!strict && moment(dateTimeString).isValid()) || moment(dateTimeString,['YYYY-MM-DD HH:mm','DDMMYYYYHHmm'],true).isValid()
}

export function isValidTime(timeString) {
  return moment(timeString,['Hmm','H:mm','HH:mm','HH:mm:ss'],true).isValid()
}

export function parseDate(dateString) {
  if (helper.isValidDate(dateString)) {
    let tmpDate = (moment(dateString,['YYYY-MM-DD','DDMMYYYY'],true).isValid()) ? moment(dateString,['YYYY-MM-DD','DDMMYYYY'],true) :  moment(dateString)
    if (moment.duration(tmpDate.diff(moment())).years() > 300) {
      tmpDate = tmpDate.toObject()
      tmpDate.years = tmpDate.years - 543
    }
    return moment(tmpDate)
  } else {
    return null
  }
}

export function parseDateTime(dateTimeString) {
  if (helper.isValidDateTime(dateTimeString)) {
    let tmpDate = (moment(dateTimeString,['YYYY-MM-DD HH:mm','DDMMYYYYHHmm'],true).isValid()) ? moment(dateTimeString,['YYYY-MM-DD HH:mm','DDMMYYYYHHmm'],true) :  moment(dateTimeString)
    if (moment.duration(tmpDate.diff(moment())).years() > 300) {
      tmpDate = tmpDate.toObject()
      tmpDate.years = tmpDate.years - 543
    }
    return moment(tmpDate)
  } else {
    return null
  }
}

export function parseTime(timeString) {
  if (helper.isValidTime(timeString)) {
    return moment(timeString,['Hmm','H:mm','HH:mm','HH:mm:ss'],true)
  } else {
    return null
  }
}

export function toString(dateTime,formatDate,formatTime=undefined) {
  moment.locale(Store.getters.getConfig('locale'))

  let tmpString = null
  if (moment(dateTime).isValid()) {
    let tmpDateObject = moment(dateTime).toObject()

    if (!isUndefined(formatDate) && (formatDate!=null)) {
      tmpString = moment(dateTime).format(formatDate)
      tmpString = tmpString + ' (' +(tmpDateObject.years+543)+')'
    }

    if (!isUndefined(formatTime)) {
      tmpString = (tmpString) ? tmpString + ' ' + moment(dateTime).format(formatTime) : moment(dateTime).format(formatTime)
      tmpString = tmpString.trim()
    }
  }
  return tmpString
}

export function toDateDataBuddhist(dateTime) {
  let tmpString = null

  if (moment(dateTime).isValid()) {
    let tmpDateObject = moment(dateTime).toObject()

    tmpString = moment(dateTime).format('DD/MM/')
    tmpString = tmpString+(tmpDateObject.years+543)
  }

  return tmpString
}

export function toStringTime(time,second=false) {
  moment.locale(Store.getters.getConfig('locale'))

  let tmpString = null
  if (moment.isMoment(time) || helper.isValidTime(time)) {
    if (!moment.isMoment(time)) time = helper.parseTime(time)
    tmpString = (second) ? time.format('HH:mm:ss น.') : time.format('HH:mm น.')
  }
  return tmpString
}

export function toTinyDate(dateTime) {
  return helper.toString(dateTime, 'L')
}

export function toShortDate(dateTime) {
  return helper.toString(dateTime,'LL')
}

export function toLongDate(dateTime) {
  return helper.toString(dateTime,'LLLL')
}

export function toTinyDateTime(dateTime) {
  return helper.toString(dateTime, 'L', 'HH:mm')
}

export function toShortDateTime(dateTime) {
  return helper.toString(dateTime,'LL','HH:mm')
}

export function toLongDateTime(dateTime) {
  return helper.toString(dateTime,'LLLL','HH:mm')
}

export function diff(dateTime,refDate=undefined) {
  if (!moment.isMoment(dateTime) && helper.isValidDate(dateTime)) dateTime = helper.parseDate(dateTime)
  if (!moment.isMoment(dateTime)) dateTime = moment()

  if (!moment.isMoment(refDate) && helper.isValidDate(refDate)) refDate = helper.parseDate(refDate)
  if (!moment.isMoment(refDate)) refDate = moment()

  return moment.duration(refDate.diff(dateTime))
}

export function today() {
  return moment()
}

export function now() {
  return moment()
}