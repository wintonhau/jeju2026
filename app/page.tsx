import React, { useState, useMemo, useEffect } from 'react';

// 內建 PDF 憑證完整詳細資料 (還原上傳 PDF 之內容)
const VOUCHER_DETAILS = {
  "shilla_winton": {
    title: "[Trip.com] Shilla Stay Voucher_WINTON.pdf",
    type: "hotel",
    provider: "Trip.com",
    hotelName: "濟州機場新羅舒泰酒店 (Shilla Stay Jeju)",
    address: "100, Noyeon-ro, 63133 濟州市, 濟州特別自治道, 韓國",
    phone: "+82-2-22300700, +82-647179000",
    guestName: "HAU KWAN CHUN WINTON",
    confirmNo: "1658112137713587",
    pinCode: "3188",
    orderNo: "1658112137712155",
    checkIn: "2026年8月7日 (週五) 15:00 後",
    checkOut: "2026年8月8日 (週六) 12:00 前",
    roomType: "標準家庭兩張雙人床房 (Standard Family Twin)",
    capacity: "4名成人",
    meals: "不包括任何餐膳",
    price: "HK$ 1,133.62 (網上預付已付款，含增值稅 HK$119.42)",
    cancellation: "2026年8月5日 23:59前免費取消；8月6日23:59前取消費用 HK$656.81；之後不設退款。"
  },
  "shilla_hiuching": {
    title: "[Trip.com] Shilla Stay Voucher_HIUCHING.pdf",
    type: "hotel",
    provider: "Trip.com",
    hotelName: "濟州機場新羅舒泰酒店 (Shilla Stay Jeju)",
    address: "100, Noyeon-ro, 63133 濟州市, 濟州特別自治道, 韓國",
    phone: "+82-2-22300700, +82-647179000",
    guestName: "KWOK HIU CHING",
    confirmNo: "1658112137723666",
    pinCode: "4747",
    orderNo: "1658112137722709",
    checkIn: "2026年8月7日 (週五) 15:00 後",
    checkOut: "2026年8月8日 (週六) 12:00 前",
    roomType: "標準家庭兩張雙人床房 (Standard Family Twin)",
    capacity: "4名成人",
    meals: "不包括任何餐膳",
    price: "HK$ 1,133.62 (網上預付已付款，含增值稅 HK$119.42)",
    cancellation: "2026年8月5日 23:59前免費取消；8月6日23:59前取消費用 HK$656.81；之後不設退款。"
  },
  "sk_jason": {
    title: "[SK Rent-a-Car] Your reservation is successfully made_Jason.pdf",
    type: "car",
    provider: "SK Rent-a-Car",
    driverName: "Ho Ching Kan (Jason Ho)",
    resNo: "260002579748",
    carModel: "Sonata 2.0 Gasoline",
    insurance: "Full CDW (全險包賠)",
    totalPayment: "KRW 280,360",
    pickupTime: "2026-08-12 09:30",
    returnTime: "2026-08-14 18:30",
    location: "Jeju Branch (濟州分店)",
    address: "44 Gonghang-ro 1-gil, Jeju-si, Jeju-do",
    phone: "+82-1599-9111",
    shuttle: "濟州機場 Domestic Arrivals Gate 5 出來過馬路，前往 Shuttle Bus Zone 1, Platform 2 搭乘免費接駁巴士 (約每 6 分鐘一班)。",
    requirements: "1. 國際駕駛執照 (IDP Class B)\n2. 本國駕照正本\n3. 護照 (英文姓名須與IDP一致)\n4. 駕駛者本人信用卡"
  },
  "sk_walter": {
    title: "[SK Rent-a-Car] Your reservation is successfully made_Walter.pdf",
    type: "car",
    provider: "SK Rent-a-Car",
    driverName: "Wong Tsz Ho (Walter Wong)",
    resNo: "260002592346",
    carModel: "Staria 2.2 Diesel 11P (11人座)",
    insurance: "Full CDW (全險包賠)",
    totalPayment: "KRW 419,900",
    pickupTime: "2026-08-12 09:30",
    returnTime: "2026-08-14 18:30",
    location: "Jeju Branch (濟州分店)",
    address: "44 Gonghang-ro 1-gil, Jeju-si, Jeju-do",
    phone: "+82-1599-9111",
    shuttle: "濟州機場 Domestic Arrivals Gate 5 出來過馬路，前往 Shuttle Bus Zone 1, Platform 2 搭乘免費接駁巴士 (約每 6 分鐘一班)。",
    requirements: "1. 國際駕駛執照 (IDP Class D - 10座以上專用)\n2. 本國駕照正本\n3. 護照 (英文姓名須與IDP一致)\n4. 駕駛者本人信用卡"
  },
  "airbnb_miheon": {
    title: "[Airbnb] Reservation Receipt_Jeju Miheon.pdf",
    type: "airbnb",
    provider: "Airbnb",
    propertyName: "[제주미헌] 컨템포러리 미니멀리즘 한옥 스테이 (濟州美軒 韓屋)",
    address: "32-4 Yonghwa-ro 9-gil, Cheju, Jeju-do, South Korea",
    host: "Miya (+82 10-6622-2019)",
    confirmNo: "HMPY9ZP8KR",
    checkIn: "2026年8月12日 (週三) 15:00 後",
    checkOut: "2026年8月14日 (週五) 11:00 前",
    capacity: "9名成人 (最多11名)",
    price: "HK$ 6,189.56 (2晚總額)",
    paymentDetails: "5月5日付 HK$2,971.08；7月28日付 HK$3,218.48 (Mastercard 2586)",
    houseRules: "最多11人入住；禁止攜帶寵物；安靜時間：22:00 - 07:00",
    cancellation: "7月13日 15:00 前可免費取消；8月5日 15:00 前取消可獲部分退款。"
  }
};

const INITIAL_DATA = [
  { 
    id: 101, 
    date: "2026-08-07", 
    time: "02:00 - 06:05", 
    title: "✈️ LJ714", 
    remarks: "航空公司：真航空\n樂器盒三邊總和（A+B+C）不多於115cm的情況下可免費攜帶上機，而且必須可以存放在機上機架或座位下。\ne-Arrival Card：https://qcode.kdca.go.kr", 
    naver: "https://naver.me/5TiWH09m", 
    website: "https://www.jinair.com/booking/index", 
    instagram: "https://www.instagram.com/jinair_northeastasia/",
    aitips: true
  },
  { 
    id: 102, 
    date: "2026-08-07", 
    time: "08:00 - 12:00", 
    title: "♨️ 君悅酒店汗蒸幕", 
    businessStart: "06:00",
    businessEnd: "26:00",
    cost: "₩30,000 / 4h", 
    naver: "https://naver.me/FvEgr36B", 
    website: "https://www.hyatt.com/grand-hyatt/ko-KR/cjugh-grand-hyatt-jeju", 
    instagram: "https://www.instagram.com/grandhyattjeju",
    aitips: true
  },
  { 
    id: 103, 
    date: "2026-08-07", 
    time: "12:30 - 13:30", 
    title: "🍜 張元手工刀削麵 (장원손칼국수)", 
    businessStart: "11:00",
    businessEnd: "22:00 (星期日休息)", 
    naver: "https://naver.me/5BcFydH6",
    aitips: true
  },
  { 
    id: 104, 
    date: "2026-08-07", 
    time: "15:00", 
    title: "🏨 Check in (酒店)", 
    remarks: "酒店名稱：濟州新羅舒泰酒店\n入住時間：15:00\n\n📌 預訂資訊 1:\n旅客姓名：HAU KWAN CHUN WINTON\n確認編號：1658112137713587\nPIN碼：3188\n\n📌 預訂資訊 2:\n旅客姓名：KWOK HIU CHING\n確認編號：1658112137723666\nPIN碼：4747", 
    cost: "早餐：₩25,000", 
    naver: "https://naver.me/xrSQElJI", 
    website: "https://www.shillastay.com/jeju/index.do", 
    instagram: "https://www.instagram.com/shillastay_official",
    pdfs: [
      { id: "shilla_winton", name: "[Trip.com] Shilla Stay Voucher_WINTON.pdf" },
      { id: "shilla_hiuching", name: "[Trip.com] Shilla Stay Voucher_HIUCHING.pdf" }
    ],
    aitips: true
  },
  { 
    id: 105, 
    date: "2026-08-07", 
    time: "15:00 - 20:00", 
    title: "🛍️ 自由時間",
    aitips: false
  },
  { 
    id: 106, 
    date: "2026-08-07", 
    time: "20:00 - 22:00", 
    title: "🥩 熟成到 濟州本店", 
    businessStart: "11:30",
    businessEnd: "22:00", 
    naver: "https://naver.me/53lKwzKI", 
    instagram: "https://www.instagram.com/suksungdo__official",
    aitips: true
  },
  { 
    id: 201, 
    date: "2026-08-08", 
    time: "09:00 - 10:00", 
    title: "🥖 Paris Baguette 新濟州店", 
    businessStart: "07:00",
    businessEnd: "25:00", 
    naver: "https://naver.me/FoE5NRrL", 
    website: "http://www.paris.co.kr/", 
    instagram: "https://instagram.com/parisbaguette_kr",
    aitips: true
  },
  { 
    id: 202, 
    date: "2026-08-08", 
    time: "12:00", 
    title: "🏨 Check out", 
    remarks: "酒店名稱：濟州新羅舒泰酒店\n退房時間：12:00\n\n📌 預訂資訊 1:\n旅客姓名：HAU KWAN CHUN WINTON\n確認編號：1658112137713587\n\n📌 預訂資訊 2:\n旅客姓名：KWOK HIU CHING\n確認編號：1658112137723666", 
    cost: "早餐：₩25,000", 
    naver: "https://naver.me/xrSQElJI", 
    website: "https://www.shillastay.com/jeju/index.do", 
    instagram: "https://www.instagram.com/shillastay_official",
    pdfs: [
      { id: "shilla_winton", name: "[Trip.com] Shilla Stay Voucher_WINTON.pdf" },
      { id: "shilla_hiuching", name: "[Trip.com] Shilla Stay Voucher_HIUCHING.pdf" }
    ],
    aitips: false
  },
  { 
    id: 203, 
    date: "2026-08-08", 
    time: "15:00", 
    title: "🏫 Check in (宿舍)", 
    remarks: "宿舍名稱：濟州大學 我羅校區 學生生活館 6 號館\n登記：1 號館\n入住時間：12:00", 
    naver: "https://naver.me/5TiWH09m",
    aitips: true
  },
  {
    id: 204,
    date: "2026-08-08",
    time: "16:45 - 17:00",
    title: "🚌 集合 / 乘車",
    aitips: false
  },
  {
    id: 205, 
    date: "2026-08-08", 
    time: "17:00",
    title: "🍽️ 韓式地道料理", 
    aitips: false
  },
  { 
    id: 206, 
    date: "2026-08-08", 
    time: "19:30", 
    title: "🎶 開幕音樂會 (濟州文化中心)", 
    remarks: "官方日程表：https://file.jiwef.org/calendar/2026_jiwef_summer_schedule_en.webp", 
    naver: "https://naver.me/GBF7AVic", 
    website: "https://www.jiwef.org/en", 
    instagram: "https://www.instagram.com/JIWEF/", 
    aitips: true
  },
  { 
    id: 301, 
    date: "2026-08-09", 
    time: "TBC", 
    title: "🚌 集合 / 乘車",
    aitips: false
  },
  { 
    id: 302, 
    date: "2026-08-09", 
    time: "12:00 - 12:10", 
    title: "🎧 Sound Check", 
    remarks: "🎼 曲目\n1. Merry Go Round\n2. Concertango (Mvt. III)\n3. Pops March “Wonderful Days”", 
    naver: "https://naver.me/x3jCxGT0", 
    website: "https://org.jje.go.kr/lifelo/index.jje", 
    aitips: false
  },
  { 
    id: 303, 
    date: "2026-08-09", 
    time: "TBC", 
    title: "🍜 濟州豚肉麵線", 
    aitips: false
  },
  { 
    id: 304, 
    date: "2026-08-09", 
    time: "14:30", 
    title: "🚌 集合 / 乘車", 
    aitips: false
  },
  { 
    id: 305, 
    date: "2026-08-09", 
    time: "16:55 - 17:15", 
    title: "🎺 演出 (濟州學生文化院)", 
    remarks: "🎼 曲目\n1. Merry Go Round\n2. Concertango (Mvt. III)\n3. Pops March “Wonderful Days”\n\n👔 演出服飾\nGents: Black suit, white shirt, white bow tie, black socks and formal black shoes\nLadies: All black and formal black shoes", 
    naver: "https://naver.me/x3jCxGT0", 
    website: "https://org.jje.go.kr/lifelo/index.jje", 
    aitips: false
  },
  { 
    id: 306, 
    date: "2026-08-09", 
    time: "TBC", 
    title: "🛍️ 東門市場",
    naver: "https://naver.me/Gald0M2Q",
    instagram: "https://www.instagram.com/enjoydongmun/", 
    aitips: true
  },
  { 
    id: 307, 
    date: "2026-08-09", 
    time: "TBC", 
    title: "🥘 濟州鄉土料理", 
    aitips: false
  },

  { 
    id: 401, 
    date: "2026-08-10", 
    time: "TBC", 
    title: "🌋 萬丈窟", 
    cost: "入場費：₩4,000（成人）",
    naver: "https://naver.me/FXwJDUCY",
    website: "https://www.jeju.go.kr/geopark/en/intro/manganggul.htm", 
    aitips: true
  },
  { 
    id: 402, 
    date: "2026-08-10", 
    time: "TBC", 
    title: "🛖 城邑民俗村", 
    naver: "https://naver.me/GDa2NxZJ",
    website: "http://www.jeju.go.kr/seongeup/index.htm",
    instagram: "https://www.instagram.com/jejuseongeup/", 
    aitips: true
  },
  { 
    id: 403, 
    date: "2026-08-10", 
    time: "TBC", 
    title: "🐔 濟州人蔘雞湯",
    aitips: false
  },
  { 
    id: 404, 
    date: "2026-08-10", 
    time: "TBC", 
    title: "⛰️ 城山日出峰",
    cost: "付費道路：₩5,000（成人）",
    naver: "https://naver.me/xa5Rn5U3",
    website: "https://www.jeju.go.kr/jejuwnh/heritage/seongsan/intro.htm",
    aitips: true
  },
  { 
    id: 405, 
    date: "2026-08-10", 
    time: "TBC", 
    title: "🌊 涉地可支",
    naver: "https://naver.me/xoH8AY7q",
    aitips: true
  },
  { 
    id: 406, 
    date: "2026-08-10", 
    time: "TBC", 
    title: "🥓 濟州黑豚烤肉", 
    aitips: false
  },
  { 
    id: 501, 
    date: "2026-08-11", 
    time: "TBC", 
    title: "🍵 O'sulloc 雪綠茶博物館", 
    naver: "https://naver.me/5uIYATBA", 
    website: "https://www.osulloc.com/", 
    instagram: "https://www.instagram.com/osulloc_official/",
    aitips: true
  },
  { 
    id: 502, 
    date: "2026-08-11", 
    time: "TBC",
    title: "🍽️ 韓式地道料理",
    aitips: false
  },
  { id: 503, 
    date: "2026-08-11", 
    time: "TBC", 
    title: "🌉 龍淵溪谷 / 吊橋", 
    naver: "https://naver.me/xVBxgRDw", 
    aitips: true
  },
  { 
    id: 504,
    date: "2026-08-11",
    time: "TBC",
    title: "🐉 龍頭岩", 
    naver: "https://naver.me/IDFUMguf",
    aitips: true
  },
  { 
    id: 505, 
    date: "2026-08-11", 
    time: "16:30", 
    title: "🚌 集合 / 乘車", 
    aitips: false
  },
  { 
    id: 506, 
    date: "2026-08-11", 
    time: "16:40 - 17:10", 
    title: "🎧 Sound Check", 
    remarks: "曲目:\n1. Moonlight Dragon\n2. Yiddish Dances (Mvt. I & V)\n3. Pops March “Wonderful Days”\n\n👔 演出服飾:\n🧍🏻‍♂️ Gents: Black suit, white shirt, white bow tie, black socks and formal black shoes\n🧍🏻‍♀️ Ladies: All black and formal black shoes", 
    naver: "https://naver.me/x3jCxGT0", 
    website: "https://org.jje.go.kr/lifelo/index.jje",
    aitips: false
  },
  { 
    id: 507, 
    date: "2026-08-11", 
    time: "17:15", 
    title: "🚌 集合 / 乘車", 
    aitips: false
  },
  { 
    id: 508, 
    date: "2026-08-11", 
    time: "TBC", 
    title: "🍲 濟州海鮮鍋", 
    aitips: false
  },
  { 
    id: 509, 
    date: "2026-08-11", 
    time: "19:30", 
    title: "🎺 演出 (塔洞海邊戶外廣場)", 
    remarks: "🎼 曲目\n1. Moonlight Dragon\n2. Yiddish Dances (Mvt. I & V)\n3. Pops March “Wonderful Days”\n\n👔 演出服飾\nHKFWO Polo and long pants", 
    naver: "https://naver.me/x3jCxGT0", 
    website: "https://org.jje.go.kr/lifelo/index.jje",
    aitips: false
  },
  { 
    id: 601, 
    date: "2026-08-12", 
    time: "09:30", 
    title: "🚗 租車", 
    remarks: "租車公司：SK Rent-a-Car",
    businessStart: "07:30",
    businessEnd: "22:00", 
    naver: "https://naver.me/FY3ygasV", 
    website: "https://www.skcarrental.com", 
    instagram: "https://www.instagram.com/skrentacar_official",
    pdfs: [
      { id: "sk_jason", name: "[SK Rent-a-Car] Your reservation is successfully made_Jason.pdf" },
      { id: "sk_walter", name: "[SK Rent-a-Car] Your reservation is successfully made_Walter.pdf" }
    ],
    aitips: true
  },
  { 
    id: 602, 
    date: "2026-08-12", 
    time: "11:30 - 13:30", 
    title: "☕ 濟州堂", 
    businessStart: "10:00",
    businessEnd: "21:00", 
    naver: "https://naver.me/5Kb3j2gu", 
    instagram: "https://www.instagram.com/jejudang_official/", 
    aitips: true
  },
  { 
    id: 603, 
    date: "2026-08-12", 
    time: "14:00 - 18:00", 
    title: "🦙 曉星朋友動物園", 
    cost: "入場費：₩18,000", 
    businessStart: "09:00",
    businessEnd: "18:00", 
    naver: "https://naver.me/FBe2u54z", 
    instagram: "https://www.instagram.com/ahobang_zoo/", 
    aitips: true
  },
  { 
    id: 604, 
    date: "2026-08-12", 
    time: "19:00", 
    title: "🛖 Check in (民宿)", 
    remarks: "民宿名稱：濟州美軒 韓屋\n入住時間：15:00\n確認編號：HMPY9ZP8KR", 
    naver: "https://naver.me/56RtEv5h", 
    website: "https://www.hanokjeju.com/ko", 
    instagram: "http://www.instagram.com/hanok_jejumiheon",
    pdfs: [
      { id: "airbnb_miheon", name: "[Airbnb] Reservation Receipt_Jeju Miheon.pdf" }
    ], 
    aitips: true
  },
  { 
    id: 701, 
    date: "2026-08-13", 
    time: "09:00", 
    title: "🌈 彩虹海岸道路", 
    naver: "https://naver.me/xDJuqiEu", 
    aitips: true
  },
  { 
    id: 702, 
    date: "2026-08-13", 
    time: "09:00 - 10:15", 
    title: "☕ Cafe Namo Namo", 
    businessStart: "08:00",
    businessEnd: "20:00", 
    naver: "https://naver.me/I55aZTg5", 
    instagram: "https://www.instagram.com/cafe_namonamo/", 
    aitips: true
  },
  { 
    id: 703, 
    date: "2026-08-13", 
    time: "10:30 - 11:00", 
    title: "🐎 小馬燈塔", 
    remarks: "", 
    naver: "https://naver.me/5ss8tJpX", 
    aitips: true
  },
  { 
    id: 704, 
    date: "2026-08-13", 
    time: "12:00 - 19:00", 
    title: "🏎️ 9.81 Park", 
    businessStart: "09:00",
    businessEnd: "20:00", 
    naver: "https://naver.me/IgJG8AuB", 
    website: "https://www.981park.com/", 
    instagram: "https://www.instagram.com/9.81park/", 
    aitips: true
  },
  { 
    id: 705, 
    date: "2026-08-13", 
    time: "13:30 - 14:30", 
    title: "🥦 Broccollege 9.81 店", 
    businessStart: "09:00",
    businessEnd: "20:00", 
    naver: "https://naver.me/5ne4A0KZ", 
    instagram: "https://www.instagram.com/broccollege/", 
    aitips: true
  },
  { 
    id: 801, 
    date: "2026-08-14", 
    time: "11:00", 
    title: "🛖 Check out", 
    remarks: "民宿名稱：濟州美軒\n退房時間：11:00\n確認編號：HMPY9ZP8KR", 
    naver: "https://naver.me/56RtEv5h", 
    website: "https://www.hanokjeju.com/ko", 
    instagram: "http://www.instagram.com/hanok_jejumiheon",
    pdfs: [
      { id: "airbnb_miheon", name: "[Airbnb] Reservation Receipt_Jeju Miheon.pdf" }
    ], 
    aitips: false
  },
  { 
    id: 802, 
    date: "2026-08-14", 
    time: "12:00 - 14:00", 
    title: "🦪 海女廚房", 
    businessStart: "11:00-12:30 / 14:00-15:30 / 17:00-18:30 (星期一至三休息)", 
    cost: "₩69,000 (Course A) / ₩89,000 (Course B)",
    naver: "https://naver.me/5jJTNF2x", 
    website: "https://haenyeokitchen.com/branch/bukchon",
    instagram: "https://www.instagram.com/haenyeo_kitchen/", 
    aitips: true
  },
  { 
    id: 803, 
    date: "2026-08-14", 
    time: "14:00 - 18:00", 
    title: "🛍️ 自由時間", 
    remarks: "地下街營業時間：10:00-22:00", 
    naver: "https://naver.me/53lKljbn", 
    aitips: false
  },
  { 
    id: 804, 
    date: "2026-08-14", 
    time: "18:30", 
    title: "🚗 還車", 
    remarks: "租車公司：SK Rent-a-Car",
    businessStart: "07:30",
    businessEnd: "22:00", 
    naver: "https://naver.me/FY3ygasV", 
    website: "https://www.skcarrental.com", 
    instagram: "https://www.instagram.com/skrentacar_official",
    pdfs: [
      { id: "sk_jason", name: "[SK Rent-a-Car] Your reservation is successfully made_Jason.pdf" },
      { id: "sk_walter", name: "[SK Rent-a-Car] Your reservation is successfully made_Walter.pdf" }
    ], 
    aitips: true
  },
  { 
    id: 805, 
    date: "2026-08-14", 
    time: "21:30 - 23:35", 
    title: "✈️ LJ713", 
    remarks: "航空公司：真航空\n樂器盒三邊總和（A+B+C）不多於115cm的情況下可免費攜帶上機，而且必須可以存放在機上機架或座位下。", 
    naver: "https://naver.me/5TiWH09m", 
    website: "https://www.jinair.com/booking/index", 
    instagram: "https://www.instagram.com/jinair_northeastasia/",
    aitips: true
  }
];

const ACCOMMODATION_NAV = {
  "2026-08-07": { label: "導航至酒店", naver: "https://naver.me/xrSQElJI" },
  "2026-08-08": { label: "導航至宿舍", naver: "https://naver.me/F8u1mjKD" },
  "2026-08-09": { label: "導航至宿舍", naver: "https://naver.me/F8u1mjKD" },
  "2026-08-10": { label: "導航至宿舍", naver: "https://naver.me/F8u1mjKD" },
  "2026-08-11": { label: "導航至宿舍", naver: "https://naver.me/F8u1mjKD" },
  "2026-08-12": { label: "導航至民宿", naver: "https://naver.me/56RtEv5h" },
  "2026-08-13": { label: "導航至民宿", naver: "https://naver.me/56RtEv5h" }
};

const shouldShowAiTips = (item) => {
  if (!item || !item.title) return false;
  // Use item.aitips property instead of undefined global variable
  return !!item.aitips;
};

const formatDateDisplay = (dateStr) => {
  if (!dateStr) return "";
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  const d = new Date(year, month - 1, day);
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  const weekday = weekdays[d.getDay()];
  return `${day}/${month} (${weekday})`;
};

const renderTextWithLinks = (text) => {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a 
          key={index} 
          href={part} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 underline hover:text-blue-800 break-all font-medium"
          onClick={(e) => e.stopPropagation()}
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

const fetchTipForSingleItem = async (item) => {
  const systemPrompt = `你是一位專業且親切的濟州島旅遊專家。
請針對使用者提供的濟州島行程景點，使用嚴格的「香港繁體中文書面語」（適合香港遊客閱讀，風格親切流暢），提供 80-100 字內的景點介紹以及實用遊客注意事項。
內容要精煉有價值，切忌贅述。請直接給出建議，不要重複標題或哈囉問候。`;

  const userPrompt = `景點/項目：${item.title}
預計時間：${item.time || 'Unspecified'}
備註資訊：${item.remarks || '無'}
費用資訊：${item.cost || '無'}`;

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY; // Enter API key here if needed
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: userPrompt }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] }
  };

  let attempts = 0;
  const maxAttempts = 5;
  let delay = 1000;

  while (attempts < maxAttempts) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const result = await response.json();
      const generatedText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        return generatedText.trim();
      } else {
        throw new Error("No text candidate returned");
      }
    } catch (err) {
      attempts++;
      if (attempts >= maxAttempts) {
        throw err;
      }
      await new Promise(res => setTimeout(res, delay));
      delay *= 2;
    }
  }
};

const PdfModal = ({ pdfId, onClose }) => {
  if (!pdfId || !VOUCHER_DETAILS[pdfId]) return null;
  const details = VOUCHER_DETAILS[pdfId];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 flex flex-col">
        {/* Modal Header */}
        <div className="p-4 bg-slate-900 text-white flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xl">📄</span>
            <div>
              <h3 className="font-bold text-base leading-tight">{details.title}</h3>
              <p className="text-sm text-slate-300 font-medium">{details.provider} 官方電子確認檔憑證</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Voucher Content */}
        <div className="p-5 space-y-4 text-sm text-gray-800">
          {details.type === "hotel" ? (
            <>
              <div className="border-b pb-3 border-gray-100">
                <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 font-bold rounded-md text-xs mb-1">
                  🏨 飯店入住憑證 (Hotel Voucher)
                </span>
                <h4 className="font-extrabold text-base text-gray-900">{details.hotelName}</h4>
                <p className="text-gray-500 mt-1">📍 {details.address}</p>
                <p className="text-gray-500">📞 {details.phone}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <div>
                  <p className="text-gray-400 font-medium text-xs">入住旅客 (Guest)</p>
                  <p className="font-bold text-gray-800 mt-0.5">{details.guestName}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-medium text-xs">可入住人數</p>
                  <p className="font-bold text-gray-800 mt-0.5">{details.capacity}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-medium text-xs">確認編號 (Confirmation No.)</p>
                  <p className="font-bold text-blue-600 mt-0.5 tracking-wider">{details.confirmNo}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-medium text-xs">PIN 碼 (PIN Code)</p>
                  <p className="font-bold text-red-600 mt-0.5 tracking-wider">{details.pinCode}</p>
                </div>
              </div>

              <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p><strong>入住時間：</strong>{details.checkIn}</p>
                <p><strong>退房時間：</strong>{details.checkOut}</p>
                <p><strong>房型：</strong>{details.roomType}</p>
                <p><strong>餐點服務：</strong>{details.meals}</p>
                <p><strong>付款詳情：</strong>{details.price}</p>
              </div>

              <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200/80 text-amber-900 text-sm">
                <p className="font-bold mb-1">⚠️ 取消政策與條款：</p>
                <p className="leading-relaxed">{details.cancellation}</p>
              </div>
            </>
          ) : details.type === "airbnb" ? (
            <>
              <div className="border-b pb-3 border-gray-100">
                <span className="inline-block px-2.5 py-1 bg-rose-50 text-rose-700 font-bold rounded-md text-xs mb-1">
                  🛖 Airbnb 民宿預約憑證 (Airbnb Receipt)
                </span>
                <h4 className="font-extrabold text-base text-gray-900">{details.propertyName}</h4>
                <p className="text-gray-500 mt-1">📍 {details.address}</p>
                <p className="text-gray-500 mt-0.5">👤 房東 (Host)：{details.host}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <div>
                  <p className="text-gray-400 font-medium text-xs">確認代碼 (Confirmation Code)</p>
                  <p className="font-bold text-rose-600 mt-0.5 tracking-wider">{details.confirmNo}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-medium text-xs">入住人數</p>
                  <p className="font-bold text-gray-800 mt-0.5">{details.capacity}</p>
                </div>
              </div>

              <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p><strong>入住時間：</strong>{details.checkIn}</p>
                <p><strong>退房時間：</strong>{details.checkOut}</p>
                <p><strong>總費用：</strong><span className="font-bold text-rose-600">{details.price}</span></p>
                <p><strong>付款記錄：</strong>{details.paymentDetails}</p>
              </div>

              <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200/80 text-amber-900 text-sm">
                <p className="font-bold mb-1">🏡 房屋守則 (House Rules)：</p>
                <p className="leading-relaxed">{details.houseRules}</p>
              </div>

              <div className="bg-sky-50 p-3 rounded-xl border border-sky-100 text-sky-900 text-sm">
                <p className="font-bold mb-1">ℹ️ 取消政策 (Cancellation Policy)：</p>
                <p className="leading-relaxed">{details.cancellation}</p>
              </div>
            </>
          ) : (
            <>
              <div className="border-b pb-3 border-gray-100">
                <span className="inline-block px-2.5 py-1 bg-red-50 text-red-700 font-bold rounded-md text-xs mb-1">
                  🚗 租車預約憑證 (Car Rental Confirmation)
                </span>
                <h4 className="font-extrabold text-base text-gray-900">{details.provider} - {details.location}</h4>
                <p className="text-gray-500 mt-1">📍 {details.address}</p>
                <p className="text-gray-500">📞 {details.phone}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <div>
                  <p className="text-gray-400 font-medium text-xs">主要駕駛員 (Primary Driver)</p>
                  <p className="font-bold text-gray-800 mt-0.5">{details.driverName}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-medium text-xs">預約單號 (Reservation No.)</p>
                  <p className="font-bold text-blue-600 mt-0.5 tracking-wider">{details.resNo}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-medium text-xs">租用車型 (Car Model)</p>
                  <p className="font-bold text-gray-800 mt-0.5">{details.carModel}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-medium text-xs">保險方案 (Insurance)</p>
                  <p className="font-bold text-emerald-600 mt-0.5">{details.insurance}</p>
                </div>
              </div>

              <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p><strong>取車時間：</strong>{details.pickupTime}</p>
                <p><strong>還車時間：</strong>{details.returnTime}</p>
                <p><strong>總支付金額：</strong><span className="font-bold text-red-600">{details.totalPayment}</span></p>
              </div>

              <div className="bg-sky-50 p-3 rounded-xl border border-sky-100 text-sky-900">
                <p className="font-bold mb-1">🚌 機場接駁車搭乘指引 (Shuttle Bus)：</p>
                <p className="leading-relaxed">{details.shuttle}</p>
              </div>

              <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200/80 text-amber-900 text-sm">
                <p className="font-bold mb-1">📋 取車當天必須攜帶文件：</p>
                <p className="whitespace-pre-line leading-relaxed">{details.requirements}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ItineraryCard = ({ item, aiTipData, onRetry, onOpenPdf }) => {
  const [expanded, setExpanded] = useState(false);
  const showAiTips = shouldShowAiTips(item);
  
  const hasExpandableContent = Boolean(
    item.businessStart || 
    item.businessEnd || 
    item.remarks || 
    item.cost || 
    showAiTips || 
    (item.pdfs && item.pdfs.length > 0)
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-3.5 overflow-hidden transition-all duration-300 hover:shadow-md relative group">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0047A0]"></div>
      
      <div 
        className={`p-3.5 pl-5 flex justify-between items-center gap-2 ${hasExpandableContent ? 'cursor-pointer' : ''}`}
        onClick={() => hasExpandableContent && setExpanded(!expanded)}
      >
        <div className="flex flex-col min-w-0 flex-1 pr-1">
          <span className="text-xs font-bold text-[#CD2E3A] tracking-wider mb-0.5">
            {item.time}
          </span>
          <h3 className="text-base font-bold text-gray-800 leading-tight truncate">
            {item.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          {item.naver && (
            <a 
              href={item.naver} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs rounded-lg font-bold shadow-2xs hover:bg-emerald-100 transition-colors flex items-center justify-center active:scale-95"
              title="Naver Map"
            >
              <span>📍</span>
            </a>
          )}
          {item.website && (
            <a 
              href={item.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-2 py-1 bg-sky-50 text-sky-700 border border-sky-200 text-xs rounded-lg font-bold shadow-2xs hover:bg-sky-100 transition-colors flex items-center justify-center active:scale-95"
              title="官網"
            >
              <span>🌐</span>
            </a>
          )}
          {item.instagram && (
            <a 
              href={item.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-2 py-1 bg-pink-50 text-pink-700 border border-pink-200 text-xs rounded-lg font-bold shadow-2xs hover:bg-pink-100 transition-colors flex items-center justify-center active:scale-95"
              title="Instagram"
            >
              <span>📸</span>
            </a>
          )}
          {hasExpandableContent && (
            <button 
              onClick={() => setExpanded(!expanded)}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors ml-0.5 rounded-lg hover:bg-gray-100"
              aria-label="展開詳情"
            >
              <svg className={`w-5 h-5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {expanded && hasExpandableContent && (
        <div className="px-5 pb-4 pt-2 bg-gray-50/60 border-t border-gray-100 flex flex-col gap-2.5">
          <div className="text-sm text-gray-700 space-y-2 mt-1">
            
            {/* 1. 備註 (Remarks) */}
            {item.remarks && (
              <div className="flex gap-2 items-start bg-white px-3 py-2.5 rounded-xl border border-gray-100 shadow-2xs">
                <span className="font-semibold text-gray-700 w-24 shrink-0 pt-0.5">📝 備註</span>
                <span className="text-gray-600 flex-1 whitespace-pre-wrap leading-relaxed">{renderTextWithLinks(item.remarks)}</span>
              </div>
            )}

            {/* 2. 營業時間 (Business Hours) */}
            {(item.businessStart || item.businessEnd) && (
              <div className="flex gap-2 items-start bg-white px-3 py-2.5 rounded-xl border border-gray-100 shadow-2xs">
                <span className="font-semibold text-gray-700 w-24 shrink-0 pt-0.5">⏰ 營業時間</span>
                <span className="text-gray-600 flex-1 leading-relaxed">
                  {item.businessStart && item.businessEnd ? `${item.businessStart} - ${item.businessEnd}` : (item.businessStart || item.businessEnd)}
                </span>
              </div>
            )}

            {/* 3. 費用 (Cost) */}
            {item.cost && (
              <div className="flex gap-2 items-start bg-white px-3 py-2.5 rounded-xl border border-gray-100 shadow-2xs">
                <span className="font-semibold text-gray-700 w-24 shrink-0 pt-0.5">💰 費用</span>
                <span className="text-gray-600 flex-1 leading-relaxed">{item.cost}</span>
              </div>
            )}

            {/* 4. 附件 (Attachments) */}
            {item.pdfs && item.pdfs.length > 0 && (
              <div className="flex gap-2 items-start bg-white px-3 py-2.5 rounded-xl border border-gray-100 shadow-2xs">
                <span className="font-semibold text-gray-700 w-24 shrink-0 pt-0.5 flex items-center gap-1">
                  <span>📎</span> 附件
                </span>
                <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                  {item.pdfs.map((pdf, idx) => (
                    <button
                      key={idx}
                      onClick={() => onOpenPdf(pdf.id)}
                      className="text-blue-600 hover:text-blue-800 text-left font-medium hover:underline truncate block transition-colors group"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform inline-block">📄 {pdf.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 5. AI Tips */}
            {showAiTips && (
              <div className="flex gap-2 items-start bg-gradient-to-r from-amber-50/90 to-orange-50/80 px-3 py-2.5 rounded-xl border border-amber-200/70 shadow-2xs relative overflow-hidden transition-all">
                <span className="font-semibold text-amber-900 w-24 shrink-0 pt-0.5 flex items-center gap-1">
                  <span>💡</span> AI Tips
                </span>

                <div className="flex-1 min-w-0">
                  {(!aiTipData || aiTipData.status === 'loading') ? (
                    <div className="flex items-center gap-2 text-amber-800 text-sm py-1 animate-pulse">
                      <svg className="animate-spin h-4 w-4 text-amber-600 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>AI 旅遊小貼士載入中...</span>
                    </div>
                  ) : aiTipData.status === 'error' ? (
                    <div className="flex items-center justify-between text-sm text-amber-900 py-0.5">
                      <span>網路繁忙，可點擊重試</span>
                      <button 
                        onClick={() => onRetry(item)}
                        className="px-2 py-1 bg-amber-200/80 hover:bg-amber-300 rounded text-amber-950 font-bold transition-colors text-xs shrink-0"
                      >
                        重試 🔄
                      </button>
                    </div>
                  ) : (
                    <p className="text-amber-950 text-sm whitespace-pre-wrap leading-relaxed font-normal">
                      {aiTipData.text}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [selectedDate, setSelectedDate] = useState("2026-08-07");
  const [aiTipsMap, setAiTipsMap] = useState({});
  const [activePdfModal, setActivePdfModal] = useState(null);

  // 網頁載入時一次性在背景為所有合適景點生成 AI Tips
  useEffect(() => {
    let isMounted = true;

    const loadAllTipsOnPageLoad = async () => {
      const eligibleItems = INITIAL_DATA.filter(shouldShowAiTips);

      const initialStatusMap = {};
      eligibleItems.forEach(item => {
        initialStatusMap[item.id] = { status: 'loading' };
      });
      setAiTipsMap(initialStatusMap);

      for (const item of eligibleItems) {
        if (!isMounted) break;
        try {
          const tipText = await fetchTipForSingleItem(item);
          if (isMounted) {
            setAiTipsMap(prev => ({
              ...prev,
              [item.id]: { status: 'success', text: tipText }
            }));
          }
        } catch (error) {
          console.error(`Error generating tip for item ${item.id}:`, error);
          if (isMounted) {
            setAiTipsMap(prev => ({
              ...prev,
              [item.id]: { status: 'error' }
            }));
          }
        }
      }
    };

    loadAllTipsOnPageLoad();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRetryTip = async (item) => {
    setAiTipsMap(prev => ({
      ...prev,
      [item.id]: { status: 'loading' }
    }));
    try {
      const tipText = await fetchTipForSingleItem(item);
      setAiTipsMap(prev => ({
        ...prev,
        [item.id]: { status: 'success', text: tipText }
      }));
    } catch (error) {
      setAiTipsMap(prev => ({
        ...prev,
        [item.id]: { status: 'error' }
      }));
    }
  };

  const availableDates = useMemo(() => {
    const dateOrder = ["2026-08-07", "2026-08-08", "2026-08-09", "2026-08-10", "2026-08-11", "2026-08-12", "2026-08-13", "2026-08-14"];
    const dates = [...new Set(INITIAL_DATA.map(i => i.date))];
    return dates.sort((a, b) => {
      const indexA = dateOrder.indexOf(a);
      const indexB = dateOrder.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      return a.localeCompare(b);
    });
  }, []);

  const currentItems = useMemo(() => {
    return INITIAL_DATA
      .filter(i => i.date === selectedDate)
      .sort((a, b) => (a.time || "").localeCompare(b.time || ""));
  }, [selectedDate]);

  const accommodationNav = ACCOMMODATION_NAV[selectedDate];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-800 pb-16">
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0047A0] via-white to-[#CD2E3A]"></div>
        <div className="max-w-2xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900 flex items-center gap-2">
              Jeju 2026 <span className="text-2xl">🍊</span>
            </h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">濟州國際管樂節 2026 🎺</p>
          </div>
          <div className="text-3xl opacity-90 drop-shadow-sm">🗿</div>
        </div>

        <div className="max-w-2xl mx-auto px-4 pt-2 pb-4 flex items-center overflow-x-auto gap-2.5 no-scrollbar">
          {availableDates.map(date => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all shadow-2xs ${
                selectedDate === date 
                  ? 'bg-[#0047A0] text-white ring-2 ring-blue-300 ring-offset-2 scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {formatDateDisplay(date)}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span>📅</span> {formatDateDisplay(selectedDate)} 行程表
          </h2>
          
          <div className="flex items-center gap-2">
            <a 
              href="https://www.kma.go.kr/nchn/index.do" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1 bg-gray-100 text-gray-700 border border-gray-200 text-xs rounded-lg font-bold shadow-2xs hover:bg-gray-200 transition-colors flex items-center gap-1 active:scale-95"
            >
              <span>氣象廳</span>⛅
            </a>
            {accommodationNav && (
              <a 
                href={accommodationNav.naver} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1 bg-gray-100 text-gray-700 border border-gray-200 text-xs rounded-lg font-bold shadow-2xs hover:bg-gray-200 transition-colors flex items-center gap-1 active:scale-95"
              >
                <span>{accommodationNav.label}</span>🧭
              </a>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {currentItems.map(item => (
            <ItineraryCard 
              key={item.id} 
              item={item} 
              aiTipData={aiTipsMap[item.id]} 
              onRetry={handleRetryTip}
              onOpenPdf={(pdfId) => setActivePdfModal(pdfId)}
            />
          ))}
        </div>
      </main>

      {/* PDF 文件檢視彈窗 Modal */}
      {activePdfModal && (
        <PdfModal 
          pdfId={activePdfModal} 
          onClose={() => setActivePdfModal(null)} 
        />
      )}
    </div>
  );
}
